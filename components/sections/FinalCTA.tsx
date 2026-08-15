"use client";

import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { RevealText, Stagger } from "../primitives/RevealText";
import { finalCtaContent, outcomesContent } from "@/lib/content";

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative py-32 lg:py-40 overflow-hidden hairline-t"
    >
      <Container size="default">
        <div className="text-center max-w-3xl mx-auto">
          <p className="label-mono text-ink-secondary mb-8">
            {outcomesContent.label}
          </p>

          <RevealText
            as="h2"
            className="font-serif font-normal text-[clamp(2rem,5.5vw,3.75rem)] tracking-[-0.025em] leading-[1.05] text-balance text-ink-primary"
          >
            {finalCtaContent.headline}
          </RevealText>

          <Stagger
            delay={0.3}
            className="mt-6 text-base sm:text-lg text-ink-secondary leading-relaxed text-balance max-w-xl mx-auto"
          >
            {finalCtaContent.subheadline}
          </Stagger>

          {/* Outcome list — collapsed into the CTA */}
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-secondary">
            {outcomesContent.items.slice(0, 3).map((item, i) => (
              <li key={item} className="flex items-center gap-2">
                <span className="font-mono text-ink-tertiary">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif italic">{item}</span>
              </li>
            ))}
          </ul>

          <Stagger
            delay={0.4}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button withArrow size="md" href="/signup">
              {finalCtaContent.primary}
            </Button>
            <Button variant="outline" size="md" href="/contact">
              {finalCtaContent.secondary}
            </Button>
          </Stagger>

          <p className="mt-6 text-xs text-ink-tertiary font-mono">
            {finalCtaContent.supporting}
          </p>
        </div>
      </Container>
    </section>
  );
}
