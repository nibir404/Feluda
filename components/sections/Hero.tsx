"use client";

import { motion } from "framer-motion";
import { Container } from "../primitives/Container";
import { RevealText, Stagger } from "../primitives/RevealText";
import { HeroDots } from "../hero/HeroDots";
import { HeroBg } from "../hero/HeroBg";
import { heroContent } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero — centered, editorial.
 *
 * The figure is full-bleed ambient backdrop, text/CTA is the single
 * focal point. Same composition at every breakpoint:
 *
 *   ┌──────────────────────────────────────────────────────────────────┐
 *   │                                                                  │
 *   │                  AI CODEBASE INTELLIGENCE  (eyebrow)             │
 *   │                                                                  │
 *   │             Your codebase has answers.                           │
 *   │             Feluda finds them.                                   │
 *   │                                                                  │
 *   │             Feluda builds a deep, evolving understanding …       │
 *   │                                                                  │
 *   │        [Contact sales]   Custom deployment (underlined link)     │
 *   │                                                                  │
 *   │             ────────────── hairline rule ──────────────          │
 *   │                                                                  │
 *   │             Products —                                           │
 *   │             MOVA     Autonomous financial analysis                │
 *   │             FORGE    AI-native orchestration layer                │
 *   │                                                                  │
 *   └──────────────────────────────────────────────────────────────────┘
 *
 * Motion stack:
 *   - Framer Motion <RevealText> for the serif headline (per-word trail).
 *   - <Stagger> for supporting copy + CTA row + products list.
 *   - HeroBg: full-bleed figure with cursor-driven spotlight reveal.
 *   - HeroDots: low-opacity texture across the hero.
 *   - Radial vignette behind the centered text so the headline reads
 *     cleanly while the figure stays visible at the edges.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-bg-base text-ink-primary overflow-hidden"
    >
      {/* Full-bleed figure — spans the hero horizontally and vertically.
          Two layers (base + cursor spotlight) as defined in HeroBg. */}
      <HeroBg
        darkSrc="/Dark BG.png"
        lightSrc="/Light BG.png"
        baseOpacity={0.16}
        spotlightOpacity={0.7}
        spotlightSize={300}
        className="absolute inset-0 h-full w-full pointer-events-auto"
      />

      {/* Minimal dotted pattern — across the whole hero at very low
          opacity, complements the figure without competing. */}
      <HeroDots
        spacing={20}
        dotSize={0.7}
        opacity={0.08}
        className="absolute inset-0 w-full h-full text-ink-primary pointer-events-none"
      />

      {/* Radial vignette behind the centered text — fades the figure
          under the headline/supporting copy so type reads cleanly. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_center,rgb(var(--bg-base)_/_0.85),rgb(var(--bg-base)_/_0.0)_70%)] pointer-events-none"
      />

      {/* Top + bottom edge gradients — feather the figure into the
          canvas above and below. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-bg-base to-transparent pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-bg-base to-transparent pointer-events-none"
      />

      {/* Subtle bottom hairline so the section reads as a discrete card. */}
      <div className="absolute bottom-0 left-0 right-0 h-px hairline-bright" />

      <Container
        size="wide"
        className="relative flex flex-col items-center justify-center min-h-[78vh] sm:min-h-[80vh] lg:min-h-[82vh] pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-24"
      >
        <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl text-center mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
            className="label-mono text-ink-tertiary"
          >
            {heroContent.eyebrow}
          </motion.p>

          {/* Headline — italic serif, per-word trailing reveal.
              Larger ceiling (7rem) gives the headline room to breathe
              at 1920px viewports. */}
          <h1
            aria-label={heroContent.headline.join(" ")}
            className="mt-6 sm:mt-8 font-serif font-normal italic text-[clamp(2.5rem,7.5vw,7rem)] tracking-[-0.025em] leading-[0.98] text-balance text-ink-primary"
          >
            {heroContent.headline.map((line, i) => {
              const wordsBefore = heroContent.headline
                .slice(0, i)
                .reduce((acc, l) => acc + l.split(" ").length, 0);
              return (
                <span key={i} className="block" aria-hidden="true">
                  <RevealText
                    as="span"
                    baseDelay={0.1 + wordsBefore * 0.04}
                    perWordDelay={0.05}
                    ariaLabel={line}
                  >
                    {line}
                  </RevealText>
                </span>
              );
            })}
          </h1>

          <Stagger
            delay={0.55}
            className="mt-7 max-w-xl mx-auto text-sm sm:text-base lg:text-lg text-ink-secondary leading-relaxed text-balance"
          >
            {heroContent.supporting}
          </Stagger>

          <Stagger
            delay={0.7}
            className="mt-8 sm:mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
          >
            <a
              href="/signup"
              className="inline-flex items-center justify-center h-10 px-5 rounded-sm bg-ink-primary text-bg-base text-sm font-medium tracking-wide hover:opacity-90 transition-opacity focus-ring"
            >
              {heroContent.primaryCta}
            </a>
            <a
              href="/contact"
              className="text-sm font-medium text-ink-primary underline underline-offset-4 decoration-ink-secondary/60 hover:decoration-ink-primary transition-colors focus-ring rounded-sm"
            >
              {heroContent.secondaryCta}
            </a>
          </Stagger>

          <Stagger delay={0.85} className="mt-12 sm:mt-14 max-w-md mx-auto">
            <div className="hairline-b" />
            <p className="label-mono text-ink-tertiary mt-5 mb-4">
              Products —
            </p>
            <ul className="space-y-2.5">
              {heroContent.products.map((p) => (
                <li
                  key={p.label}
                  className="grid grid-cols-1 sm:grid-cols-[96px_1fr] items-baseline gap-x-3 gap-y-0.5 text-[13px] sm:text-sm text-center sm:text-left"
                >
                  <span className="font-mono font-medium text-ink-primary uppercase tracking-[0.04em]">
                    {p.label}
                  </span>
                  <span className="font-mono text-ink-secondary">
                    {p.value}
                  </span>
                </li>
              ))}
            </ul>
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
