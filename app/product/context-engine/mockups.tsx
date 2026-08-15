"use client";

import { CodeMockup } from "@/components/primitives/CodeMockup";
import { Cpu, ArrowRight } from "lucide-react";

/** Mint — inputs. */
export function InputsMockup() {
  return (
    <CodeMockup title="Inputs" subtitle="ingestion" variant="code">
      <ul className="space-y-2 font-mono text-[11.5px]">
        {[
          "Repository",
          "Feluda ingestion layer",
          "Code structure analysis",
          "Relationship understanding",
          "Change awareness",
        ].map((s) => (
          <li
            key={s}
            className="flex items-center gap-2 text-ink-on-code/85"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ink-on-code/50" />
            {s}
          </li>
        ))}
      </ul>
    </CodeMockup>
  );
}

/** Sea — the engine. */
export function EngineMockup() {
  return (
    <CodeMockup title="Context Engine" subtitle="architecture" variant="code">
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <Cpu className="w-7 h-7 text-accent" strokeWidth={1.5} />
        </div>
        <p className="font-serif text-[14px] text-ink-on-code leading-snug text-center">
          Continuously builds &amp; updates system understanding.
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-ink-on-code/15">
          <span className="label-mono text-status-safe">Continuous</span>
          <span className="font-mono text-[11px] text-ink-on-code/55">v 0.42</span>
        </div>
      </div>
    </CodeMockup>
  );
}

/** Periwinkle — Feluda experiences. */
export function OutputsMockup() {
  return (
    <CodeMockup title="Feluda Experiences" subtitle="powered by context" variant="code">
      <ul className="grid grid-cols-2 gap-2">
        {["Understand", "Investigate", "Analyze", "Review"].map((exp) => (
          <li
            key={exp}
            className="flex items-center justify-between rounded-md bg-ink-on-code/[0.06] border border-ink-on-code/15 px-3 py-2 font-mono text-[11.5px] text-ink-on-code"
          >
            {exp}
            <ArrowRight className="w-3 h-3 text-ink-on-code/55" strokeWidth={1.5} />
          </li>
        ))}
      </ul>
    </CodeMockup>
  );
}