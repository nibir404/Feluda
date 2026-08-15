"use client";

import { Container } from "../primitives/Container";
import { SectionLabel } from "../primitives/SectionLabel";
import { SectionHeader } from "../primitives/SectionHeader";
import { CodebaseGraph } from "../product/CodebaseGraph";
import { contextProblemContent } from "@/lib/content";

export function ContextProblem() {
  return (
    <section id="context" className="py-24 lg:py-32">
      <Container size="wide">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          <div>
            <SectionLabel className="mb-6">
              {contextProblemContent.label}
            </SectionLabel>
            <SectionHeader
              headline={contextProblemContent.headline}
              supporting={contextProblemContent.supporting}
            />
          </div>

          <div className="rounded-lg bg-bg-surface hairline p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 hairline-b">
              <span className="label-mono text-ink-tertiary">
                Dependency Chain
              </span>
              <span className="label-mono text-ink-tertiary inline-flex items-center gap-1.5">
                Single change · many effects
              </span>
            </div>
            <CodebaseGraph
              nodes={contextProblemContent.chain}
              highlightIndex={0}
            />
            <p className="mt-6 text-xs text-ink-tertiary font-mono leading-relaxed">
              A single change in one service can cascade through authentication, downstream services, and observability layers. The cost of understanding compounds faster than the code itself.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
