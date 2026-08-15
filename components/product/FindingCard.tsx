"use client";

import clsx from "clsx";
import { Finding } from "@/lib/types";
import { FileCode, Hash, ExternalLink } from "lucide-react";

interface FindingCardProps {
  finding: Finding;
}

export function FindingCard({ finding }: FindingCardProps) {
  return (
    <div className="rounded-md bg-bg-surface hairline p-5 space-y-5">
      <div className="flex items-center justify-between">
        <span className="label-mono text-ink-tertiary">
          {finding.id}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm hairline text-ink-secondary text-[10px] font-mono uppercase tracking-wider">
          <span className="w-1 h-1 rounded-full bg-ink-secondary" />
          {finding.confidence}
        </span>
      </div>

      <div>
        <p className="text-[14px] text-ink-primary leading-relaxed">
          {finding.text}
        </p>
      </div>

      <div className="space-y-1.5">
        <p className="label-mono text-ink-tertiary">
          Why this matters
        </p>
        <p className="text-[13px] text-ink-secondary leading-relaxed">
          {finding.why}
        </p>
      </div>

      <div className="space-y-2 pt-4 hairline-t">
        <p className="label-mono text-ink-tertiary">
          Evidence
        </p>
        <ul className="space-y-1.5">
          {finding.evidence.map((item) => {
            const isCommit = item.startsWith("commit");
            const Icon = isCommit ? Hash : FileCode;
            return (
              <li
                key={item}
                className="flex items-center gap-2 text-[12px] font-mono text-ink-secondary"
              >
                <Icon className="w-3.5 h-3.5 text-ink-tertiary" strokeWidth={2} />
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center gap-2 pt-4 hairline-t">
        <button
          type="button"
          className={clsx(
            "inline-flex items-center justify-center gap-1.5 h-8 px-3 text-xs font-medium rounded-sm",
            "bg-bg-base hairline text-ink-secondary hover:text-ink-primary transition-colors focus-ring"
          )}
        >
          View context
          <ExternalLink className="w-3 h-3" strokeWidth={2} />
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-sm text-ink-tertiary hover:text-ink-secondary transition-colors focus-ring"
        >
          Dismiss
        </button>
        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-sm text-ink-primary bg-bg-surface hairline hover:bg-bg-base transition-colors focus-ring"
        >
          Resolve
        </button>
      </div>
    </div>
  );
}
