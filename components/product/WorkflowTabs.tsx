"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
import { WorkflowTab } from "@/lib/types";

interface WorkflowTabsProps {
  tabs: WorkflowTab[];
}

const tabVisuals: Record<string, { files: number; services: number; commits: number }> = {
  understand: { files: 27, services: 8, commits: 6 },
  investigate: { files: 12, services: 3, commits: 4 },
  analyze: { files: 18, services: 5, commits: 7 },
  review: { files: 4, services: 3, commits: 2 },
  onboard: { files: 32, services: 9, commits: 11 },
};

export function WorkflowTabs({ tabs }: WorkflowTabsProps) {
  const [active, setActive] = useState(tabs[0].id);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];
  const visual = tabVisuals[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Engineering workflows"
        className="relative flex items-center gap-1 hairline-b mb-8 overflow-x-auto"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={clsx(
                "relative px-4 py-3 text-sm font-medium transition-colors focus-ring rounded-t-sm whitespace-nowrap",
                isActive
                  ? "text-ink-primary"
                  : "text-ink-tertiary hover:text-ink-secondary"
              )}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="workflow-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="grid lg:grid-cols-[1.4fr_1fr] gap-6"
        >
          <div className="rounded-lg bg-bg-surface/40 hairline overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 hairline-b bg-bg-base/30">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-ink-tertiary/40" />
                <span className="w-2 h-2 rounded-full bg-ink-tertiary/40" />
                <span className="w-2 h-2 rounded-full bg-ink-tertiary/40" />
              </div>
              <span className="label-mono text-ink-secondary">
                Feluda · {activeTab.label}
              </span>
              <span className="w-2 h-2 rounded-full hairline" />
            </div>
            <div className="p-6 space-y-4">
              <p className="label-mono text-ink-tertiary">
                {activeTab.scenario ?? activeTab.context}
              </p>
              <h4 className="font-serif text-xl text-ink-primary leading-tight">
                Feluda helps answer
              </h4>
              <ul className="space-y-3 pt-2">
                {activeTab.questions.map((q, i) => (
                  <li
                    key={q}
                    className="flex items-start gap-3 text-sm text-ink-secondary leading-relaxed"
                  >
                    <span className="label-mono text-ink-tertiary pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-bg-surface hairline overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 hairline-b bg-bg-base/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-ink-tertiary/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-ink-tertiary/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-ink-tertiary/40" />
              </div>
              <span className="label-mono text-ink-secondary">
                Context
              </span>
              <span className="w-2.5 h-2.5 rounded-full hairline" />
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="label-mono text-ink-tertiary mb-3">
                  In context
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <Stat label="Files" value={visual.files} />
                  <Stat label="Services" value={visual.services} />
                  <Stat label="Commits" value={visual.commits} />
                </div>
              </div>
              <div className="pt-4 hairline-t">
                <p className="label-mono text-ink-tertiary mb-3">
                  Relevant
                </p>
                <ul className="space-y-2 text-[12px] font-mono text-ink-secondary">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-ink-secondary" />
                    authentication.service.ts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-ink-secondary" />
                    payment.middleware.ts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-ink-secondary" />
                    api.contracts.ts
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-bg-base hairline p-3">
      <p className="label-mono text-ink-tertiary">
        {label}
      </p>
      <p className="text-xl font-mono font-normal text-ink-primary mt-1.5">
        {value}
      </p>
    </div>
  );
}
