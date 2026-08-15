"use client";

import { CodeMockup } from "@/components/primitives/CodeMockup";

/** Mint card — Ask a question, get a verified answer. */
export function AskMockup() {
  return (
    <CodeMockup title="Feluda · Ask" subtitle="payments-platform / main" variant="code">
      <div className="space-y-4">
        <div>
          <p className="label-mono text-ink-on-code/55 mb-1.5">Question</p>
          <p className="font-serif italic text-[14px] text-ink-on-code leading-snug">
            &ldquo;How does authentication propagate through the payments
            service?&rdquo;
          </p>
        </div>
        <div>
          <p className="label-mono text-ink-on-code/55 mb-2">Files Touched</p>
          <ul className="space-y-1.5 font-mono text-[11.5px] text-ink-on-code/85">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ink-on-code/50" />
              auth.middleware.ts
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ink-on-code/50" />
              payment.service.ts
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ink-on-code/50" />
              token.util.ts
            </li>
          </ul>
        </div>
      </div>
    </CodeMockup>
  );
}

/** Sea card — symbol map / dependency graph. */
export function MapMockup() {
  return (
    <CodeMockup title="Symbol Map" subtitle="payments-platform" variant="code">
      <div className="font-mono text-[11.5px] leading-6 text-ink-on-code">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          <span className="text-ink-on-code/50">SRC</span>
          <span>auth.middleware.ts:validate()</span>
          <span className="text-ink-on-code/50">→</span>
          <span className="text-accent">payment.service.ts</span>
          <span className="text-ink-on-code/50">→</span>
          <span>orders.controller.ts:create()</span>
          <span className="text-ink-on-code/50">→</span>
          <span>webhook.router.ts:handle()</span>
        </div>
        <div className="mt-4 pt-3 border-t border-ink-on-code/15">
          <p className="label-mono text-ink-on-code/55 mb-1.5">Edges</p>
          <p className="text-[11.5px] text-ink-on-code/85">
            4 callers · 12 dependents · 0 cyclic refs
          </p>
        </div>
      </div>
    </CodeMockup>
  );
}

/** Periwinkle card — onboarding view. */
export function OnboardMockup() {
  return (
    <CodeMockup title="Onboarding" subtitle="new-engineer" variant="code">
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-md bg-ink-on-code/[0.06] border border-ink-on-code/15 px-3 py-2.5">
          <span className="text-[12px] text-ink-on-code">Welcome tour</span>
          <span className="label-mono text-status-safe">3 of 5</span>
        </div>
        <ul className="space-y-1.5 font-mono text-[11.5px] text-ink-on-code/85">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-status-safe" />
            Where auth lives
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-status-safe" />
            How requests flow
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-status-attention" />
            Where business logic lives
          </li>
        </ul>
      </div>
    </CodeMockup>
  );
}