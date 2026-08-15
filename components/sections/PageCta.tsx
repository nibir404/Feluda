"use client";

import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { RevealText, Stagger } from "../primitives/RevealText";

interface PageCtaProps {
  headline: string;
  subheadline?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  supporting?: string;
}

export function PageCta({
  headline,
  subheadline,
  primary,
  secondary,
  supporting,
}: PageCtaProps) {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden hairline-t">
      <Container size="default">
        <div className="text-center max-w-2xl mx-auto">
          <RevealText
            as="h2"
            className="font-serif font-normal text-[clamp(2rem,5.5vw,3.5rem)] tracking-[-0.025em] leading-[1.05] text-balance text-ink-primary"
          >
            {headline}
          </RevealText>
          {subheadline && (
            <Stagger
              delay={0.25}
              className="mt-5 text-base sm:text-lg text-ink-secondary leading-relaxed text-balance"
            >
              {subheadline}
            </Stagger>
          )}
          <Stagger
            delay={0.4}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button withArrow href={primary.href}>
              {primary.label}
            </Button>
            {secondary && (
              <Button variant="secondary" href={secondary.href}>
                {secondary.label}
              </Button>
            )}
          </Stagger>
          {supporting && (
            <p className="mt-5 text-xs text-ink-tertiary font-mono">
              {supporting}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
