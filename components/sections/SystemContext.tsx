"use client";

import { Container } from "../primitives/Container";
import { SectionLabel } from "../primitives/SectionLabel";
import { SectionHeader } from "../primitives/SectionHeader";
import { CodebaseGraph } from "../product/CodebaseGraph";
import { systemContextContent } from "@/lib/content";

export function SystemContext() {
  return (
    <section className="py-24 lg:py-32">
      <Container size="wide">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-surface hairline mb-6">
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink-secondary uppercase">
                {systemContextContent.badge}
              </span>
            </div>
            <SectionLabel className="mb-6">{systemContextContent.label}</SectionLabel>
            <SectionHeader
              headline={systemContextContent.headline}
              supporting={systemContextContent.supporting}
            />
            <p className="mt-6 text-xs text-ink-tertiary font-mono leading-relaxed">
              Multi-repository intelligence is on our roadmap. Single-repository intelligence is available today.
            </p>
          </div>

          <div className="rounded-lg bg-bg-surface hairline p-6 sm:p-10">
            <CodebaseGraph nodes={systemContextContent.repos} variant="hub" />
          </div>
        </div>
      </Container>
    </section>
  );
}
