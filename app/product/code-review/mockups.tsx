"use client";

import { CodeMockup } from "@/components/primitives/CodeMockup";

/** Mint — PR review finding. */
export function ReviewFinding() {
  return (
    <CodeMockup title="Feluda Review" subtitle="1 of 3 findings" variant="code">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="label-mono text-status-attention inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-status-attention" />
            Medium
          </span>
          <span className="label-mono text-ink-on-code/55">auth.middleware.ts</span>
        </div>
        <p className="font-serif text-[14px] text-ink-on-code leading-snug">
          Tightened validation now rejects sessions missing the{" "}
          <code className="text-accent">iat</code> claim. Three downstream
          payment paths assume the claim is present.
        </p>
        <ul className="space-y-1.5 pt-2 border-t border-ink-on-code/15">
          {[
            "payment.service.ts:212",
            "orders.controller.ts:88",
            "webhook.router.ts:44",
          ].map((ev) => (
            <li key={ev} className="flex items-center gap-2 font-mono text-[11.5px] text-ink-on-code/85">
              <span className="w-1.5 h-1.5 rounded-full bg-ink-on-code/50" />
              {ev}
            </li>
          ))}
        </ul>
      </div>
    </CodeMockup>
  );
}

/** Sea — pattern comparison. */
export function PatternMockup() {
  return (
    <CodeMockup title="Pattern Check" subtitle="auth · pattern" variant="code">
      <div className="space-y-3 font-mono text-[11.5px] leading-6">
        <div className="rounded-md bg-ink-on-code/[0.04] border border-ink-on-code/15 px-3 py-2">
          <p className="label-mono text-ink-on-code/55 mb-1">Convention (12 sites)</p>
          <p className="text-ink-on-code/85">
            const user = await auth.verify(token, {"{"} required: ["iat", "sub"] {"}"});
          </p>
        </div>
        <div className="rounded-md bg-status-critical/10 border border-status-critical/30 px-3 py-2">
          <p className="label-mono text-status-critical mb-1">This PR</p>
          <p className="text-ink-on-code/85">
            const user = await auth.verify(token, {"{"} required: ["sub"] {"}"});
          </p>
        </div>
      </div>
    </CodeMockup>
  );
}

/** Periwinkle — findings feed. */
export function FindingsFeed() {
  return (
    <CodeMockup title="Findings" subtitle="this PR" variant="code" tabs={["Open", "Resolved"]} activeTab={0}>
      <ul className="space-y-2">
        {[
          { tag: "Pattern", level: "medium" },
          { tag: "Regression", level: "high" },
          { tag: "Convention", level: "low" },
        ].map((f, i) => (
          <li
            key={i}
            className="flex items-center justify-between rounded-md bg-ink-on-code/[0.04] border border-ink-on-code/15 px-3 py-2"
          >
            <span className="font-mono text-[11.5px] text-ink-on-code">{f.tag} #{i + 1}</span>
            <span
              className={
                f.level === "high"
                  ? "font-mono text-[10px] uppercase tracking-wider text-status-critical"
                  : f.level === "medium"
                  ? "font-mono text-[10px] uppercase tracking-wider text-status-attention"
                  : "font-mono text-[10px] uppercase tracking-wider text-status-safe"
              }
            >
              {f.level}
            </span>
          </li>
        ))}
      </ul>
    </CodeMockup>
  );
}