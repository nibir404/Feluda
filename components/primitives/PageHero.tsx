"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import { Container } from "./Container";
import { Button } from "./Button";
import { RevealText, Stagger } from "./RevealText";

interface PageHeroProps {
  eyebrow?: string;
  /** Single string OR array of lines (each line word-revealed). */
  headline: string | string[];
  supporting?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  headline,
  supporting,
  primaryCta,
  secondaryCta,
  align = "left",
  className,
  children,
}: PageHeroProps) {
  const lines = Array.isArray(headline) ? headline : [headline];
  // Compound delay across lines so trailing reveal continues line-by-line.
  let wordsBefore = 0;
  return (
    <section
      className={clsx(
        "relative pt-28 sm:pt-36 lg:pt-44 pb-16 lg:pb-20",
        className
      )}
    >
      <Container size="wide" className="relative">
        <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center")}>
          {eyebrow && (
            <p className="label-mono text-ink-secondary mb-6">{eyebrow}</p>
          )}
          {lines.map((line, i) => {
            const baseDelay = 0.1 + wordsBefore * 0.04;
            wordsBefore += line.split(" ").length;
            return (
              <RevealText
                key={i}
                as="h1"
                baseDelay={baseDelay}
                className="block font-serif font-normal text-[clamp(2.25rem,5.5vw,4.25rem)] tracking-[-0.02em] leading-[1.05] text-balance text-ink-primary break-words"
              >
                {line}
              </RevealText>
            );
          })}
          {supporting && (
            <Stagger
              delay={0.3}
              className="mt-6 text-base sm:text-lg text-ink-secondary leading-relaxed max-w-2xl text-balance"
            >
              {supporting}
            </Stagger>
          )}
          {(primaryCta || secondaryCta) && (
            <Stagger delay={0.45} className="mt-8 flex flex-wrap items-center gap-3">
              {primaryCta && (
                <Button withArrow href={primaryCta.href}>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button variant="outline" href={secondaryCta.href}>
                  {secondaryCta.label}
                </Button>
              )}
            </Stagger>
          )}
        </div>
        {children && <div className="mt-14 lg:mt-20">{children}</div>}
      </Container>
    </section>
  );
}
