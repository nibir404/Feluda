const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BEARER_TOKEN = process.env.FUNCHOLE_TOKEN || 'fh_mcp__ByW5VspAQP50G_rfINBVnt80tN9FKD3n8BtEL8eQGY';
const MCP_URL = 'https://app.funchole.dev/mcp';
const DEDICATED_GATEWAY_ID = '449c3345-365b-4d61-9eda-f378466fc61e'; // tem43n.funchole.dev

class FuncholeClient {
  constructor(token) {
    this.token = token;
    this.sessionId = null;
  }

  async init() {
    console.log('[FuncHole] Initializing MCP session...');
    const res = await fetch(MCP_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'text/event-stream, application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: { name: 'feluda-deployer', version: '1.0.0' }
        }
      })
    });

    if (!res.ok) {
      throw new Error(`Failed to initialize MCP session: ${res.status} ${res.statusText}`);
    }

    this.sessionId = res.headers.get('mcp-session-id');
    console.log('[FuncHole] Session established:', this.sessionId);
  }

  async callTool(name, args = {}) {
    const res = await fetch(MCP_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'text/event-stream, application/json',
        'Content-Type': 'application/json',
        'Mcp-Session-Id': this.sessionId
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Math.floor(Math.random() * 100000),
        method: 'tools/call',
        params: { name, arguments: args }
      })
    });

    const text = await res.text();
    const dataLine = text.split('\n').find(l => l.startsWith('data:'));
    if (!dataLine) {
      throw new Error(`Invalid response from MCP tool ${name}: ${text}`);
    }
    const json = JSON.parse(dataLine.slice(5).trim());
    if (json.error) {
      throw new Error(`MCP error calling ${name}: ${JSON.stringify(json.error)}`);
    }
    const content = json.result?.content?.[0]?.text;
    if (json.result?.isError) {
      throw new Error(`Tool ${name} failed: ${content}`);
    }
    try {
      return JSON.parse(content);
    } catch {
      return content;
    }
  }
}

function prepareDeployFiles() {
  console.log('[FuncHole] Building static Next.js production export locally...');
  execSync('npm run build', { stdio: 'inherit' });

  const files = [];
  const binaryMap = {};
  const outDir = path.join(process.cwd(), 'out');

  function scan(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(outDir, fullPath);

      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile()) {
        if (entry.name === 'hero-concept.png') continue;

        if (entry.name.endsWith('.woff2') || entry.name.endsWith('.webp') || entry.name.endsWith('.png')) {
          binaryMap[relPath] = fs.readFileSync(fullPath).toString('base64');
        } else {
          const content = fs.readFileSync(fullPath, 'utf8');
          files.push({ path: `dist/${relPath}`, content });
          files.push({ path: `out/${relPath}`, content });
        }
      }
    }
  }

  scan(outDir);

  // Standalone zero-dependency package.json
  const staticPkgJson = {
    name: 'feluda-web-static',
    version: '1.0.0',
    private: true,
    scripts: {
      build: 'node restore-binaries.js'
    }
  };

  files.push({
    path: 'package.json',
    content: JSON.stringify(staticPkgJson, null, 2)
  });

  // Binary restoration script for fonts and webp images
  const restoreScript = `const fs = require('fs');
const path = require('path');

const binaryData = ${JSON.stringify(binaryMap)};

for (const [relPath, b64] of Object.entries(binaryData)) {
  const buf = Buffer.from(b64, 'base64');
  for (const dir of ['dist', 'out']) {
    const target = path.join(process.cwd(), dir, relPath);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, buf);
  }
}
console.log('Successfully restored ' + Object.keys(binaryData).length + ' binary assets in dist/ and out/.');
`;

  files.push({
    path: 'restore-binaries.js',
    content: restoreScript
  });

  return files;
}

async function deploy() {
  const client = new FuncholeClient(BEARER_TOKEN);
  await client.init();

  // 1. Locate or create Function fn_feluda
  console.log('[FuncHole] Checking functions...');
  const functions = await client.callTool('list_functions', {});
  let fn = functions.find(f => f.functionKey === 'fn_feluda');

  if (!fn) {
    console.log('[FuncHole] Creating function fn_feluda...');
    fn = await client.callTool('create_function', {
      functionKey: 'fn_feluda',
      name: 'Feluda Web Platform',
      description: 'Feluda — AI code review & agentic pentests (Next.js Static)',
      runtime: 'STATIC'
    });
  }
  console.log('[FuncHole] Function:', fn.id, fn.name);

  // 2. Create draft FunctionVersion
  console.log('[FuncHole] Creating draft FunctionVersion...');
  const fnVersion = await client.callTool('create_function_version', {
    functionId: fn.id,
    runtime: 'STATIC',
    startEmpty: true,
    metadata: JSON.stringify({ deployedAt: new Date().toISOString() })
  });
  console.log('[FuncHole] Created version:', fnVersion.id, 'v' + fnVersion.version);

  // 3. Prepare deployment bundle
  const deployFiles = prepareDeployFiles();
  console.log(`[FuncHole] Prepared ${deployFiles.length} files for static deployment`);

  // 4. Submit source
  console.log('[FuncHole] Submitting source files to FuncHole...');
  await client.callTool('submit_function_version_source', {
    functionId: fn.id,
    versionId: fnVersion.id,
    entrypoint: 'package.json',
    files: deployFiles
  });
  console.log('[FuncHole] Source files submitted successfully.');

  // 5. Trigger remote build
  console.log('[FuncHole] Triggering remote build & deploy...');
  await client.callTool('deploy_function_version', {
    functionId: fn.id,
    versionId: fnVersion.id
  });

  // 6. Poll status until READY or FAILED
  console.log('[FuncHole] Polling build status...');
  let status = 'PUBLISHING';
  let attempts = 0;
  while (status === 'PUBLISHING' || status === 'DRAFT') {
    attempts++;
    await new Promise(r => setTimeout(r, 3000));
    const current = await client.callTool('get_function_version', {
      functionId: fn.id,
      versionId: fnVersion.id
    });
    status = current.status;
    process.stdout.write(`  [${attempts * 3}s] Status: ${status}\r`);

    if (status === 'FAILED') {
      console.log('\n[FuncHole] Build failed! Fetching build logs...');
      const logs = await client.callTool('get_function_version_build_logs', {
        functionId: fn.id,
        versionId: fnVersion.id
      });
      console.error('[FuncHole] Build Logs:', JSON.stringify(logs, null, 2));
      throw new Error('Remote build failed');
    }
  }
  console.log(`\n[FuncHole] FunctionVersion build succeeded! Status: ${status}`);

  // 7. Route on Dedicated Gateway (tem43n.funchole.dev) -> /*
  console.log('[FuncHole] Configuring route on Dedicated Gateway (tem43n.funchole.dev)...');
  const gwFlows = await client.callTool('list_flows', { gatewayId: DEDICATED_GATEWAY_ID });
  let dedicatedFlow = gwFlows.find(f => f.flowKey === 'flw_feluda_root' || f.path === '/*');

  if (!dedicatedFlow) {
    console.log('[FuncHole] Creating flow flw_feluda_root (path: /*)...');
    dedicatedFlow = await client.callTool('create_flow', {
      gatewayId: DEDICATED_GATEWAY_ID,
      flowKey: 'flw_feluda_root',
      name: 'Feluda Web Root',
      description: 'Root route for Feluda application',
      httpMethod: 'GET',
      path: '/*',
      priority: 100
    });
  }

  console.log('[FuncHole] Creating new FlowVersion on dedicated gateway...');
  const dFlowVersion = await client.callTool('create_flow_version', {
    flowId: dedicatedFlow.id
  });

  console.log('[FuncHole] Adding step to dedicated FlowVersion...');
  await client.callTool('create_flow_step', {
    flowId: dedicatedFlow.id,
    versionId: dFlowVersion.id,
    stepKey: 'serve-feluda',
    componentType: 'FUNCTION',
    position: 1,
    componentId: fn.id,
    componentVersionId: fnVersion.id
  });

  console.log('[FuncHole] Adopting dedicated FlowVersion...');
  await client.callTool('adopt_flow_version', {
    flowId: dedicatedFlow.id,
    versionId: dFlowVersion.id
  });

  console.log('\n=============================================');
  console.log('🎉 DEPLOYMENT COMPLETE!');
  console.log('Dedicated Gateway Live URL: https://tem43n.funchole.dev/');
  console.log('Function:                  fn_feluda (' + fn.id + ')');
  console.log('FunctionVersion:           ' + fnVersion.id);
  console.log('=============================================\n');
}

deploy().catch(err => {
  console.error('[FuncHole] Deployment failed:', err);
  process.exit(1);
});
