"use client";

import { Container } from "../primitives/Container";
import { ProductWindow } from "../primitives/ProductWindow";
import { SectionLabel } from "../primitives/SectionLabel";
import { SectionHeader } from "../primitives/SectionHeader";
import { FindingCard } from "../product/FindingCard";
import { PRDiffPanel } from "../product/PRDiffPanel";
import { reviewContent } from "@/lib/content";

export function Review() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 hairline-t">
      <Container size="wide">
        <div className="max-w-3xl mb-14">
          <SectionLabel className="mb-6">{reviewContent.label}</SectionLabel>
          <SectionHeader
            headline={reviewContent.headline.join(" ")}
            supporting={reviewContent.supporting}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-lg bg-bg-surface/40 overflow-hidden hairline">
            <div className="flex items-center justify-between px-4 py-2.5 hairline-b">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-ink-tertiary/40" />
                <span className="w-2 h-2 rounded-full bg-ink-tertiary/40" />
                <span className="w-2 h-2 rounded-full bg-ink-tertiary/40" />
              </div>
              <span className="label-mono text-ink-secondary">
                Diff · Pull Request
              </span>
              <span className="w-2 h-2 rounded-full hairline" />
            </div>
            <div className="p-4 sm:p-5">
              <PRDiffPanel />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="label-mono text-ink-tertiary">
                Feluda Review
              </span>
              <span className="label-mono text-ink-tertiary">
                1 of 3 findings
              </span>
            </div>
            <FindingCard finding={reviewContent.finding} />
          </div>
        </div>
      </Container>
    </section>
  );
}