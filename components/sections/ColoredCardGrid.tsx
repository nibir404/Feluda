"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { Container } from "../primitives/Container";
import { ColorCard, type Tone } from "../primitives/ColorCard";
import { SideRail, type RailItem } from "../primitives/SideRail";
import { RevealText, Stagger } from "../primitives/RevealText";

interface ColoredCardGridProps {
  eyebrow: string;
  /** Section headline. Single string OR array of lines (each word-revealed). */
  headline: string | string[];
  supporting?: string;
  /**
   * Cards to render. Each card receives a `tone` from the cycle
   * mint → sea → peri (3rd card in a row of 3 always cycles). If a
   * page has more than 3 cards, the cycle repeats.
   */
  cards: Array<{
    id?: string;
    eyebrow: string;
    heading: string | string[];
    supporting?: string;
    /** 2-up feature checklist. Should be 2-4 items. */
    checks: { title: string; body: string }[];
    /** Right-column dark mockup. */
    mockup: ReactNode;
  }>;
  /** Optional side rail nav (only used on /how-it-works). */
  rail?: RailItem[];
  /** Override the auto-cycling tone order. */
  toneCycle?: Tone[];
  className?: string;
}

const DEFAULT_CYCLE: Tone[] = ["mint", "sea", "peri"];

/**
 * ColoredCardGrid — generic wrapper used by every inner product /
 * solution page. Renders the eyebrow + big serif headline + supporting
 * above a stack of `<ColorCard>`s, optionally with a `<SideRail>` on
 * the left.
 */
export function ColoredCardGrid({
  eyebrow,
  headline,
  supporting,
  cards,
  rail,
  toneCycle = DEFAULT_CYCLE,
  className,
}: ColoredCardGridProps) {
  const lines = Array.isArray(headline) ? headline : [headline];
  let wordsBefore = 0;
  return (
    <section className={clsx("py-20 lg:py-28", className)}>
      <Container size="wide">
        <div className={clsx(rail ? "grid lg:grid-cols-[140px_1fr] gap-10" : "")}>
          {rail && <SideRail items={rail} />}
          <div>
            {/* Header */}
            <div className="max-w-3xl mb-12 lg:mb-16">
              <p className="label-mono text-ink-secondary mb-6">{eyebrow}</p>
              <h2
                aria-label={lines.join(" ")}
                className="font-serif font-normal text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.02em] text-balance text-ink-primary leading-[1.05]"
              >
                {lines.map((line, i) => {
                  const baseDelay = 0.1 + wordsBefore * 0.04;
                  wordsBefore += line.split(" ").length;
                  return (
                    <span key={i} className="block" aria-hidden="true">
                      <RevealText as="span" baseDelay={baseDelay} ariaLabel={line}>
                        {line}
                      </RevealText>
                    </span>
                  );
                })}
              </h2>
              {supporting && (
                <Stagger
                  delay={0.3}
                  className="mt-5 text-base sm:text-lg text-ink-secondary leading-relaxed max-w-2xl text-balance"
                >
                  {supporting}
                </Stagger>
              )}
            </div>

            {/* Cards */}
            <div className="space-y-6">
              {cards.map((c, i) => (
                <ColorCard
                  key={i}
                  id={c.id}
                  tone={toneCycle[i % toneCycle.length]}
                  eyebrow={c.eyebrow}
                  heading={c.heading}
                  supporting={c.supporting}
                  checks={c.checks}
                  mockup={c.mockup}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}