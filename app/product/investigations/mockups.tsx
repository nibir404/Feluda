"use client";

import { CodeMockup } from "@/components/primitives/CodeMockup";
import { StatusDot } from "@/components/primitives/StatusDot";

/** Mint — active incident timeline. */
export function IncidentTimeline() {
  return (
    <CodeMockup title="Incident" subtitle="INC-2241 · payments-platform" variant="code">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="label-mono text-status-critical inline-flex items-center gap-1.5">
            <StatusDot color="critical" />
            Active
          </span>
          <span className="font-mono text-[11px] text-ink-on-code/55">
            last 24h · prod · us-east-1
          </span>
        </div>
        <ul className="space-y-2">
          {[
            { time: "14:02", text: "Checkout latency p99 elevated to 1.8s" },
            { time: "14:06", text: "AuthService deploy a84c91f" },
            { time: "14:09", text: "Payment retries spike on /charge" },
            { time: "14:11", text: "Downstream queue depth increasing" },
          ].map((e) => (
            <li key={e.time} className="flex items-start gap-3">
              <span className="font-mono text-[11px] text-ink-on-code/55 w-12 shrink-0 pt-0.5">
                {e.time}
              </span>
              <span className="font-mono text-[11.5px] text-ink-on-code/85">
                {e.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </CodeMockup>
  );
}

/** Sea — finding with confidence. */
export function FindingPanel() {
  return (
    <CodeMockup title="Finding" subtitle="root cause · 92%" variant="code">
      <div className="space-y-3">
        <p className="font-serif text-[14px] text-ink-on-code leading-snug">
          Auth validation tightened in commit a84c91f rejects session tokens
          missing the <code className="text-accent">iat</code> claim, which
          downstream payment calls depend on.
        </p>
        <div className="flex items-center gap-3 pt-2 border-t border-ink-on-code/15">
          <div className="flex-1 h-1 rounded-full bg-ink-on-code/15 overflow-hidden">
            <div className="h-full bg-accent" style={{ width: "92%" }} />
          </div>
          <span className="font-mono text-[11px] text-ink-on-code">92%</span>
        </div>
        <ul className="space-y-1.5 pt-2">
          {[
            "auth.middleware.ts:44",
            "payment.service.ts:expects iat",
            "commit a84c91f · Tighten auth validation",
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

/** Periwinkle — impact estimate. */
export function ImpactPanel() {
  return (
    <CodeMockup
      title="Impact"
      subtitle="estimated scope"
      variant="code"
      tabs={["Affected", "Recent"]}
      activeTab={0}
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-ink-on-code/[0.06] border border-ink-on-code/15 px-3 py-2.5">
            <p className="label-mono text-ink-on-code/55 mb-1">Users</p>
            <p className="font-mono text-2xl text-ink-on-code">~12k</p>
          </div>
          <div className="rounded-md bg-ink-on-code/[0.06] border border-ink-on-code/15 px-3 py-2.5">
            <p className="label-mono text-ink-on-code/55 mb-1">Services</p>
            <p className="font-mono text-2xl text-ink-on-code">3</p>
          </div>
        </div>
        <ul className="space-y-1.5">
          {[
            { name: "checkout-api", dotClass: "bg-status-critical" },
            { name: "payment-router", dotClass: "bg-status-critical" },
            { name: "subscriptions", dotClass: "bg-status-attention" },
          ].map((s) => (
            <li key={s.name} className="flex items-center gap-2 font-mono text-[11.5px] text-ink-on-code/85">
              <span className={`w-1.5 h-1.5 rounded-full ${s.dotClass}`} />
              {s.name}
            </li>
          ))}
        </ul>
      </div>
    </CodeMockup>
  );
}