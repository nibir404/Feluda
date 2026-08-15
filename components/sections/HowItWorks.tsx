"use client";

import { Container } from "../primitives/Container";
import { ProductWindow } from "../primitives/ProductWindow";
import { SectionLabel } from "../primitives/SectionLabel";
import { SectionHeader } from "../primitives/SectionHeader";
import { Pipeline } from "../product/Pipeline";
import { howItWorksContent } from "@/lib/content";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <Container size="wide">
        <div className="max-w-3xl mb-14">
          <SectionLabel className="mb-6">{howItWorksContent.label}</SectionLabel>
          <SectionHeader headline={howItWorksContent.headline} />
        </div>

        <ProductWindow title="Feluda Pipeline" subtitle="architecture">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="label-mono text-ink-tertiary mb-6">
                Continuous Pipeline
              </p>
              <Pipeline steps={howItWorksContent.steps} />
            </div>

            <div className="space-y-5">
              <div className="rounded-md bg-bg-base hairline p-5 space-y-3">
                <p className="label-mono text-ink-tertiary">
                  Input
                </p>
                <code className="block font-mono text-[12px] text-ink-secondary">
                  $ feluda connect --repo=payments-platform
                </code>
                <p className="text-xs text-ink-tertiary leading-relaxed">
                  Read-only scope, scoped credentials, audited access.
                </p>
              </div>

              <div className="rounded-md bg-bg-base hairline p-5 space-y-3">
                <p className="label-mono text-ink-tertiary">
                  Output
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-mono text-ink-secondary px-2 py-1 rounded-sm bg-bg-surface">
                    Codebase map
                  </span>
                  <span className="text-xs font-mono text-ink-secondary px-2 py-1 rounded-sm bg-bg-surface">
                    Dependency graph
                  </span>
                  <span className="text-xs font-mono text-ink-secondary px-2 py-1 rounded-sm bg-bg-surface">
                    Change history
                  </span>
                  <span className="text-xs font-mono text-ink-secondary px-2 py-1 rounded-sm bg-bg-surface">
                    Risk model
                  </span>
                </div>
              </div>

              <div className="rounded-md bg-bg-base hairline p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-status-safe" />
                  <p className="label-mono text-status-safe">
                    Continuous
                  </p>
                </div>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  Context evolves as your codebase changes. No manual refresh, no stale analysis.
                </p>
              </div>
            </div>
          </div>
        </ProductWindow>
      </Container>
    </section>
  );
}
