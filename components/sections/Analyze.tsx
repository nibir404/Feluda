"use client";

import { useState } from "react";
import { ChevronDown, GitBranch, GitMerge, User } from "lucide-react";
import { Container } from "../primitives/Container";
import { ProductWindow } from "../primitives/ProductWindow";
import { RiskBadge } from "../primitives/RiskBadge";
import { SectionLabel } from "../primitives/SectionLabel";
import { SectionHeader } from "../primitives/SectionHeader";
import { analyzeContent } from "@/lib/content";
import clsx from "clsx";

export function Analyze() {
  const { pr } = analyzeContent;
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  return (
    <section className="py-20 sm:py-24 lg:py-32 hairline-t">
      <Container size="wide">
        <div className="max-w-3xl mb-14">
          <SectionLabel className="mb-6">{analyzeContent.label}</SectionLabel>
          <SectionHeader
            headline={analyzeContent.headline}
            supporting={analyzeContent.supporting}
          />
        </div>

        <ProductWindow
          title="Pull Request"
          subtitle="feature/auth-update"
          variant="ghost"
        >
          <div className="space-y-7">
            {/* PR header */}
            <div className="flex flex-wrap items-start gap-4 pb-6 hairline-b">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-bg-base/40 hairline">
                <GitMerge
                  className="w-5 h-5 text-ink-secondary"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-xl text-ink-primary leading-tight">
                  {pr.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-ink-tertiary">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="w-3 h-3" strokeWidth={1.5} />
                    maya.chen
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <GitBranch className="w-3 h-3" strokeWidth={1.5} />
                    {pr.branch}
                  </span>
                  <span>·</span>
                  <span>4 files changed</span>
                </div>
              </div>
              <RiskBadge level={pr.risk} size="md" />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px hairline rounded-md overflow-hidden">
              {pr.stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-bg-surface/40 p-4"
                >
                  <p className="label-mono text-ink-tertiary">{s.label}</p>
                  <p className="mt-2 font-mono text-2xl font-normal text-ink-primary">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Risk classifier */}
            <div className="rounded-md bg-bg-base/40 hairline p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="label-mono text-ink-tertiary">
                  Risk Classification
                </p>
                <span className="label-mono text-ink-tertiary">
                  Feluda scoring
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { level: "LOW" as const, width: 22, active: false },
                  { level: "MEDIUM" as const, width: 48, active: false },
                  { level: "HIGH" as const, width: 100, active: true },
                ].map((row) => (
                  <div key={row.level} className="flex items-center gap-4">
                    <RiskBadge level={row.level} />
                    <div className="flex-1 h-1.5 rounded-full bg-bg-surface overflow-hidden">
                      <div
                        className={clsx(
                          "h-full transition-all duration-500",
                          row.level === "LOW" && "bg-status-safe",
                          row.level === "MEDIUM" && "bg-status-attention",
                          row.level === "HIGH" && "bg-status-critical"
                        )}
                        style={{ width: `${row.width}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-ink-tertiary w-8 text-right">
                      {row.width}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impacted systems */}
            <div className="rounded-md bg-status-critical/5 border border-status-critical/20 p-5">
              <p className="label-mono text-status-critical uppercase mb-3">
                Potential Impact
              </p>
              <div className="flex flex-wrap gap-2">
                {pr.impactedSystems.map((s) => (
                  <span
                    key={s}
                    className="text-sm font-mono text-ink-primary px-3 py-1.5 rounded-md bg-bg-base/40 hairline"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Evidence drawer */}
            <div className="rounded-md bg-bg-base/40 hairline overflow-hidden">
              <button
                type="button"
                onClick={() => setEvidenceOpen((v) => !v)}
                aria-expanded={evidenceOpen}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-bg-surface/50 transition-colors focus-ring rounded-md"
              >
                <span className="text-sm font-medium text-ink-primary">
                  Evidence & linked findings
                </span>
                <ChevronDown
                  className={clsx(
                    "w-4 h-4 text-ink-tertiary transition-transform",
                    evidenceOpen && "rotate-180"
                  )}
                  strokeWidth={1.5}
                />
              </button>
              {evidenceOpen && (
                <div className="px-5 pb-5 pt-2 hairline-t">
                  <ul className="space-y-2.5 text-sm font-mono text-ink-secondary">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-ink-tertiary" />
                      auth.middleware.ts · line 44
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-ink-tertiary" />
                      payment.service.ts · expects verified context
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-ink-tertiary" />
                      commit a84c91f · "Tighten auth validation"
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </ProductWindow>
      </Container>
    </section>
  );
}