"use client";

import { CodeMockup } from "@/components/primitives/CodeMockup";
import { RiskBadge } from "@/components/primitives/RiskBadge";

/** Mint — PR diff window. */
export function PRDiffMockup() {
  return (
    <CodeMockup title="Pull Request" subtitle="feature/auth-update" variant="code">
      <div className="space-y-2 font-mono text-[11.5px] leading-6">
        <p className="text-ink-on-code/55">
          <span className="text-status-safe">+</span> if (ctx.user?.iat) {"{"}
        </p>
        <p className="pl-4 text-ink-on-code/85">
          await payment.charge(ctx.user)
        </p>
        <p className="text-ink-on-code/55">{"}"}</p>
        <p className="text-status-critical">
          - if (ctx.user) {"{"}
        </p>
        <p className="pl-4 text-ink-on-code/85 line-through decoration-status-critical/40">
          await payment.charge(ctx.user)
        </p>
        <p className="text-status-critical">{"}"}</p>
      </div>
    </CodeMockup>
  );
}

/** Sea — risk classifier. */
export function RiskMockup() {
  return (
    <CodeMockup title="Risk" subtitle="Feluda scoring" variant="code">
      <div className="space-y-3">
        {[
          { level: "LOW" as const, width: 22 },
          { level: "MEDIUM" as const, width: 48 },
          { level: "HIGH" as const, width: 100 },
        ].map((row) => (
          <div key={row.level} className="flex items-center gap-4">
            <RiskBadge level={row.level} />
            <div className="flex-1 h-1.5 rounded-full bg-ink-on-code/15 overflow-hidden">
              <div
                className={
                  row.level === "LOW"
                    ? "h-full bg-status-safe"
                    : row.level === "MEDIUM"
                    ? "h-full bg-status-attention"
                    : "h-full bg-status-critical"
                }
                style={{ width: `${row.width}%` }}
              />
            </div>
            <span className="font-mono text-[11px] text-ink-on-code/55 w-8 text-right">
              {row.width}%
            </span>
          </div>
        ))}
      </div>
    </CodeMockup>
  );
}

/** Periwinkle — impacted systems. */
export function ImpactMockup() {
  return (
    <CodeMockup title="Impacted Systems" subtitle="3 services" variant="code">
      <ul className="space-y-2">
        {[
          { svc: "auth-service", tag: "Direct" },
          { svc: "payment-router", tag: "Transitive" },
          { svc: "checkout-api", tag: "Transitive" },
        ].map((s) => (
          <li
            key={s.svc}
            className="flex items-center justify-between rounded-md bg-ink-on-code/[0.04] border border-ink-on-code/15 px-3 py-2"
          >
            <span className="font-mono text-[11.5px] text-ink-on-code">
              {s.svc}
            </span>
            <span className="font-mono text-[10px] text-ink-on-code/55 uppercase tracking-wider">
              {s.tag}
            </span>
          </li>
        ))}
      </ul>
    </CodeMockup>
  );
}