"use client";

import { Lock, KeyRound, Server, ShieldCheck, Eye, LifeBuoy } from "lucide-react";
import { Container } from "../primitives/Container";
import { SectionLabel } from "../primitives/SectionLabel";
import { RevealText, Stagger } from "../primitives/RevealText";
import { Button } from "../primitives/Button";
import { enterpriseContent } from "@/lib/content";

const iconMap = [Lock, KeyRound, Server, ShieldCheck, Eye, LifeBuoy];

export function Enterprise() {
  // Count words on earlier lines so the trailing reveal keeps its rhythm.
  const wordsBeforeFirstLine = 0;
  const wordsBeforeSecondLine =
    enterpriseContent.headline[0]?.split(" ").length ?? 0;
  return (
    <section id="enterprise" className="py-20 sm:py-24 lg:py-32 hairline-t">
      <Container size="wide">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <SectionLabel className="mb-6">{enterpriseContent.label}</SectionLabel>
            <div className="max-w-3xl">
              {enterpriseContent.headline.map((line, i) => (
                <RevealText
                  key={i}
                  as="h2"
                  baseDelay={
                    (i === 0 ? wordsBeforeFirstLine : wordsBeforeSecondLine) *
                    0.04
                  }
                  className="block font-serif font-normal text-[clamp(1.75rem,4vw,2.75rem)] tracking-[-0.015em] text-balance text-ink-primary leading-[1.1]"
                >
                  {line}
                </RevealText>
              ))}
              <p className="mt-5 text-base sm:text-lg text-ink-secondary leading-relaxed max-w-2xl text-balance">
                {enterpriseContent.supporting}
              </p>
            </div>
            <Stagger delay={0.5} className="mt-8">
              <Button withArrow href="/enterprise" variant="outline">
                {enterpriseContent.cta}
              </Button>
            </Stagger>
          </div>

          <div className="grid sm:grid-cols-2 gap-px hairline rounded-lg overflow-hidden">
            {enterpriseContent.features.map((feature, i) => {
              const Icon = iconMap[i];
              return (
                <div
                  key={feature.title}
                  className="bg-bg-surface/40 p-6 lg:p-7 hover:bg-bg-surface/60 transition-colors"
                >
                  <Icon
                    className="w-5 h-5 text-ink-secondary mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-serif text-lg text-ink-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
