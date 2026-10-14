"use client";
import { useEffect, useRef, useState } from "react";
import Logo from "../Logo";
import s from "./Hero.module.css";

type View = "Pentests" | "Pull requests" | "Agent activity";
type Status = "open" | "patched" | "resolved";
const cases = [
  { id: "FEL-142", title: "Any customer can read another tenant’s orders", severity: "CRITICAL", score: "9.1", file: "src/orders/handler.ts", endpoint: "/v1/orders/8812", explanation: "Logged in as customer-b, the agent changed the order ID and received tenant-a’s order. The handler loads by ID without checking the caller’s tenant.", before: "  where: { id: params.id },", after: "  where: { id: params.id, tenantId: ctx.user.tenantId },", code: "const order = await db.orders.findFirst({", end: "if (!order) throw new NotFound();", steps: ["Sign up as any customer", "Walk sequential order IDs", "Read another tenant’s orders"], paths: ["POST /signup", "GET /v1/orders/8800…8899", "4,812 orders · 2 tenants"] },
  { id: "FEL-143", title: "Unsigned tokens bypass authentication", severity: "HIGH", score: "8.8", file: "src/auth/verify.ts", endpoint: "/v1/account", explanation: "The agent supplied an unsigned token with alg=none. The token parser accepted the claims without verifying a signature, allowing an attacker to impersonate another account.", before: "const claims = jwt.decode(token);", after: "const claims = jwt.verify(token, publicKey, {", code: "// Verify signature before trusting claims", end: "  algorithms: ['RS256'] });", steps: ["Create an unsigned token", "Request a protected resource", "Read another account’s profile"], paths: ["JWT header: alg=none", "GET /v1/account", "Signature verification bypassed"] },
];
const events = ["Recon mapped 42 API endpoints", "idor-07 replayed the order request as customer-b", "authz-02 verified tenant ownership is missing", "validator-01 reproduced the exploit independently", "Fix agent prepared a tenant-scoped query"];

export default function ProductDemo({ tour }: { tour: number }) {
  const [view, setView] = useState<View>("Pentests");
  const [selected, setSelected] = useState(0);
  const [statuses, setStatuses] = useState<Status[]>(["open", "open"]);
  const [busy, setBusy] = useState<"replay" | "retest" | "scan" | null>(null);
  const [step, setStep] = useState(-1);
  const [response, setResponse] = useState(false);
  const [message, setMessage] = useState("Choose a finding, replay the exploit, then apply and retest its fix.");
  const [query, setQuery] = useState("");
  const [eventCount, setEventCount] = useState(events.length);
  const [copied, setCopied] = useState(false);
  const [requestTab, setRequestTab] = useState<"request" | "response">("request");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const patch = useRef<HTMLDivElement>(null);
  const c = cases[selected];
  const status = statuses[selected];
  function stop() { if (timer.current) clearInterval(timer.current); timer.current = null; }
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);
  useEffect(() => { if (tour) { setView("Pentests"); setMessage("Start with Replay exploit. Then apply the suggested fix and run Retest."); } }, [tour]);
  function choose(i: number) { stop(); setBusy(null); setSelected(i); setStep(-1); setResponse(false); setCopied(false); setMessage(`Opened ${cases[i].id}. Replay the exploit to inspect the evidence.`); }
  function navigate(next: View) { stop(); setBusy(null); setView(next); setStep(-1); }
  function run(kind: "replay" | "retest") {
    if (busy) return;
    setBusy(kind); setResponse(false); setStep(0); setRequestTab("request");
    setMessage(kind === "retest" ? "Retesting the same request against the demo patch…" : "Replaying the exploit in the demo environment…");
    let n = 0;
    timer.current = setInterval(() => {
      n++; setStep(n);
      if (n === 3) { stop(); setBusy(null); setResponse(true); setRequestTab("response");
        if (kind === "retest" && status !== "open") { setStatuses(prev => prev.map((v, i) => i === selected ? "resolved" : v)); setMessage(`${c.id} resolved. The patched endpoint returns 403. Cross-tenant access is blocked.`); }
        else setMessage(status === "open" ? "Exploit reproduced: 200 OK. The expected response was 403 Forbidden." : "403 Forbidden. The patch blocks this exploit.");
      }
    }, 650);
  }
  function apply() {
    setStatuses(prev => prev.map((v, i) => i === selected ? "patched" : v)); setResponse(false);
    setMessage("Demo patch applied. Run Retest to verify that the exploit is blocked.");
  }
  function scan() {
    if (busy) return;
    setBusy("scan"); setView("Agent activity"); setEventCount(0); setMessage("Demo assessment started. Agents are checking the sample API.");
    let n = 0;
    timer.current = setInterval(() => { n++; setEventCount(n); if(n === events.length) { stop(); setBusy(null); setMessage("Assessment complete. Two findings are ready to inspect."); } }, 700);
  }
  function reset() { stop(); setBusy(null); setStatuses(["open", "open"]); setStep(-1); setResponse(false); setSelected(0); setView("Pentests"); setQuery(""); setCopied(false); setEventCount(events.length); setMessage("Demo reset. Choose a finding to get started."); }
  async function copy() {
    try { await navigator.clipboard.writeText(`curl -H 'Authorization: Bearer DEMO_CUSTOMER_B' 'https://example.test${c.endpoint}'`); setCopied(true); setMessage("Sample cURL copied. It uses an example domain and a demo token."); }
    catch { setMessage("Clipboard unavailable. Sample request: GET https://example.test" + c.endpoint); }
  }
  const blocked = status !== "open";
  return <div className={s.product} aria-label="Interactive Feluda product demo">
    <aside className={s.sidebar}>
      <div className={s.brand}><Logo size={24} /><b>feluda.</b></div>
      <div className={s.org}><b>puku</b><small>GitHub · 14 repositories</small></div>
      <p className={s.navLabel}>WORKSPACE</p>
      {(["Pull requests", "Pentests", "Agent activity"] as View[]).map((v,i) => <button key={v} onClick={() => navigate(v)} aria-current={view === v ? "page" : undefined}><span aria-hidden="true">{["⑂", "◇", "≋"][i]}</span>{v}</button>)}
      <div className={s.sidebarFooter}><span className={s.avatar}>SR</span><div>Samnan Rahee<small>Demo workspace</small></div></div>
    </aside>
    <div className={s.workspace}>
      <header className={s.toolbar}><span>{view} / checkout-api{view === "Pentests" ? ` / ${c.id}` : ""}</span><div><span className={s.demoBadge}>DEMO</span><button onClick={reset}>Reset</button><button onClick={scan} disabled={!!busy}>New pentest</button></div></header>
      <nav className={s.mobileNav} aria-label="Demo sections">{(["Pull requests", "Pentests", "Agent activity"] as View[]).map(v => <button key={v} aria-pressed={view === v} onClick={() => navigate(v)}>{v}</button>)}</nav>
      <div className={s.content}>
        {view === "Pentests" && <>
          <div className={s.findingPicker}><span className={s.label}>ASSESSMENT #2</span><label>Finding <select value={selected} onChange={e => choose(Number(e.target.value))}>{cases.map((x,i) => <option key={x.id} value={i}>{x.id} · {x.severity.toLowerCase()}</option>)}</select></label></div>
          <div className={s.badges}><span className={status === "resolved" ? s.successBadge : s.dangerBadge}>{status === "resolved" ? "RESOLVED" : `${c.severity} · CVSS ${c.score}`}</span><span>✓ Validated by 2 agents</span><span>{c.id} · OWASP API:2023</span></div>
          <h2>{c.title}</h2>
          <div className={s.findingActions}><button className={s.primary} onClick={() => { patch.current?.scrollIntoView({ block: "nearest" }); patch.current?.focus({ preventScroll: true }); }}>Review suggested fix</button><button onClick={() => run("retest")} disabled={!!busy || status === "resolved"}>{busy === "retest" ? "Retesting…" : status === "resolved" ? "Verified ✓" : "Retest"}</button><button onClick={() => run("replay")} disabled={!!busy}>{busy === "replay" ? "Replaying…" : "Replay exploit"}</button></div>
          <div className={s.detailGrid}><div className={s.mainColumn}>
            <section><p className={s.label}>WHAT HAPPENED</p><p className={s.explanation}>{c.explanation}</p></section>
            <section aria-label="Exploit proof"><div className={s.sectionHead}><span className={s.label}>PROOF <span>Replayed as customer-b · 1 request</span></span><button onClick={copy}>{copied ? "Copied ✓" : "Copy as cURL"}</button></div>
              <div className={s.proof}><div className={s.proofTabs}><button aria-pressed={requestTab === "request"} onClick={() => setRequestTab("request")}>Request</button><button aria-pressed={requestTab === "response"} onClick={() => setRequestTab("response")}>Response</button><span className={response && blocked ? s.good : s.bad}>{busy === "replay" || busy === "retest" ? "Running…" : response && blocked ? "403 Forbidden" : "200 OK"}</span></div>
                {requestTab === "request" ? <div className={s.proofBody}><code>GET {c.endpoint}</code><dl><dt>Host</dt><dd>staging.checkout.puku.sh</dd><dt>Authorization</dt><dd>Bearer demo_customer_b</dd><dt>Owns resource</dt><dd>No · belongs to tenant-a</dd></dl></div> : <div className={s.proofBody}><code className={response && blocked ? s.good : s.bad}>{response && blocked ? "Access denied. Tenant isolation verified." : "Unexpected access · expected 403"}</code><pre>{response && blocked ? '{\n  "error": "Forbidden",\n  "data": null\n}' : '{\n  "id": 8812,\n  "tenant": "tenant-a",\n  "customer": "Demo customer"\n}'}</pre></div>}
              </div>
            </section>
            <section ref={patch} tabIndex={-1} className={s.fix} aria-label="Suggested fix"><div className={s.sectionHead}><span className={s.label}>SUGGESTED FIX</span><span className={blocked ? s.good : s.muted}>{blocked ? "✓ Patch applied" : "Scope access to the caller"}</span></div><div className={s.diff}><div>{c.file}<span>+2 −1</span></div><pre><span>41   {c.code}</span><del>42 − {c.before}</del><ins>42 + {c.after}</ins><span>43   {selected === 0 ? "});" : "// Explicit algorithm allowlist"}</span><ins>44 + {c.end}</ins></pre></div><div className={s.patchActions}><button className={s.primary} onClick={apply} disabled={!!busy || blocked}>{blocked ? "Patch applied ✓" : "Apply demo fix"}</button><span>{blocked ? "Retest to verify the fix." : "Changes only this demo."}</span></div></section>
          </div><aside className={s.rail}><section className={s.path}><div className={s.sectionHead}><span className={s.label}>ATTACK PATH</span><span>{busy && busy !== "scan" ? "LIVE" : "3 steps"}</span></div>{c.steps.map((text,i) => <button key={text} className={`${s.pathStep} ${step === i ? s.activeStep : ""}`} onClick={() => {setStep(i);setMessage(`Step ${i+1}: ${text}. ${c.paths[i]}`);}} aria-pressed={step === i}><span>{i+1}</span><div><b>{i === 2 && blocked ? "Access blocked by the patch" : text}</b><code>{c.paths[i]}</code></div></button>)}</section><section className={s.metadata}><dl><dt>Found in</dt><dd>Run #3 · 2h ago</dd><dt>Introduced by</dt><dd>PR #198 · a3f9e1c</dd><dt>Fix effort</dt><dd>~5 min · 1 file</dd><dt>Status</dt><dd className={blocked ? s.good : s.bad}>{status === "resolved" ? "Resolved" : status === "patched" ? "Awaiting retest" : "Open"}</dd></dl></section><p className={s.railNote}>Follow the evidence, inspect the patch, then replay the same request to verify the fix.</p></aside></div>
        </>}
        {view === "Pull requests" && <><p className={s.label}>PULL REQUESTS</p><h2>Recent reviews</h2><p className={s.explanation}>Open a finding to inspect its evidence and suggested fix.</p><input className={s.search} aria-label="Search pull requests" placeholder="Search findings or files…" value={query} onChange={e => setQuery(e.target.value)} /><div className={s.reviewList}>{cases.filter(x => `${x.title} ${x.file} ${x.id}`.toLowerCase().includes(query.toLowerCase())).map(x => {const i=cases.indexOf(x);return <button key={x.id} onClick={() => {choose(i);setView("Pentests");}}><span className={s.avatar}>⑂</span><div><b>{x.title}</b><small>{x.file} · {x.id}</small></div><span className={statuses[i] === "resolved" ? s.good : s.bad}>{statuses[i] === "resolved" ? "Resolved" : x.severity}</span><span>→</span></button>;})}{!cases.some(x => `${x.title} ${x.file} ${x.id}`.toLowerCase().includes(query.toLowerCase())) && <p>No matching reviews. Try “orders” or “auth”.</p>}</div></>}
        {view === "Agent activity" && <><p className={s.label}>ASSESSMENT / LIVE ACTIVITY</p><h2>{busy === "scan" ? "Agents are investigating…" : "Assessment complete"}</h2><p className={s.explanation}>A replay of a sample assessment. No requests are sent to external targets.</p><div className={s.eventList}>{events.slice(0,eventCount).map((event,i) => <div key={event}><time>14:0{i}:11</time><span className={i===3?s.good:s.muted}>✓</span><span>{event}</span></div>)}</div><button className={s.primary} disabled={!!busy} onClick={() => navigate("Pentests")}>Inspect findings →</button></>}
      </div>
      <footer className={s.statusBar}><span className={busy ? s.busyDot : s.statusDot} /><p role="status" aria-live="polite">{message}</p>{busy && <button onClick={() => {stop();setBusy(null);setMessage("Demo run cancelled. You can restart it at any time.");}}>Cancel</button>}</footer>
    </div>
  </div>;
}
