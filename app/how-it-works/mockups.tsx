"use client";

import { CodeMockup } from "@/components/primitives/CodeMockup";

/** Mint card — CLI command window showing repo connect + index. */
export function PublishMockup() {
  return (
    <CodeMockup title="dpm" subtitle="publish customer-orders" variant="code">
      <div className="font-mono text-[12.5px] leading-7 text-ink-on-code">
        <p>
          <span className="text-accent">$</span> dpm create-package postgres_prod -n customer-orders --table
        </p>
        <p>
          <span className="text-accent">$</span> dpm build-package customer-orders python
        </p>
        <p>
          <span className="text-accent">$</span> dpm publish customer-orders
        </p>
        <p className="mt-4 text-ink-on-code/60">
          ✓ ready · 0.42s · ready to query
        </p>
      </div>
    </CodeMockup>
  );
}

/** Sea card — code window showing a typed query against the package. */
export function CodeMockupQuery() {
  return (
    <CodeMockup title="query.ts" subtitle="customer-orders" variant="code">
      <pre className="font-mono text-[12px] leading-6 text-ink-on-code whitespace-pre">
{`import { FactsAppEngagement as Snow } from "sn";

async function main() {
  let appfile, foreduration, panelist, strattime;
  let query = Snow.select(
    appTitle.as("App_Name"),
    foreduration.avg().as("Avg_Time_in_app"),
    panelist.countDistinct().as("User_Count"),
    strattime.day.as("Day_of_week")
  );
  query.compile().then(d => console.log("Compiled query:", d));
  query.execute().then(d => console.log(data));
}
main().catch(console.error);`}
      </pre>
    </CodeMockup>
  );
}

/** Periwinkle card — performance mode dropdown. */
export function OptimizeMockup() {
  return (
    <CodeMockup
      title="performance"
      subtitle="accelerated"
      variant="code"
      tabs={["Source", "Tables"]}
      activeTab={0}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-md bg-ink-on-code/[0.04] border border-ink-on-code/15 px-3 py-2.5">
          <span className="flex items-center gap-2 text-[12px] text-ink-on-code/85">
            <span className="w-4 h-4 rounded-full bg-ink-on-code/30" />
            Snowflake_Prod
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-ink-on-code/85">
            <span className="w-3.5 h-3.5 rounded-sm bg-pixel" />
            31
          </span>
        </div>

        <div>
          <p className="text-[11px] text-ink-on-code/55 mb-2 font-mono uppercase tracking-wider">
            Performance Mode
          </p>
          <div className="flex items-center justify-between rounded-md bg-ink-on-code/[0.06] border border-ink-on-code/15 px-3 py-2.5">
            <span className="text-[12px] text-ink-on-code">Accelerated</span>
            <span className="text-ink-on-code/55">▾</span>
          </div>
        </div>
      </div>

      {/* Sub-panel "Performance Mode" callout (cream) */}
      <div className="mt-4 rounded-md bg-bg-cream border border-ink-on-panel/10 p-3 text-ink-on-panel">
        <p className="text-[11px] font-medium uppercase tracking-wider mb-2 text-ink-on-panel/70">
          Performance Mode
        </p>
        <div className="space-y-2">
          <div className="rounded-sm bg-ink-on-panel/5 border border-ink-on-panel/10 px-2.5 py-2">
            <p className="text-[12px] font-medium text-ink-on-panel">Direct</p>
            <p className="text-[11px] text-ink-on-panel/60 leading-snug">
              Queries will run against Snowflake.
            </p>
          </div>
          <div className="rounded-sm bg-bg-code border border-ink-on-code/15 px-2.5 py-2">
            <div className="flex items-start gap-2">
              <span className="w-3.5 h-3.5 mt-0.5 rounded-sm border border-pixel flex items-center justify-center text-pixel text-[10px]">
                ✓
              </span>
              <div>
                <p className="text-[12px] font-medium text-ink-on-code">Accelerated</p>
                <p className="text-[11px] text-ink-on-code/60 leading-snug">
                  Queries run against high performance engine. Select to request access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CodeMockup>
  );
}