"use client";

import clsx from "clsx";
import { RevealText, Stagger } from "./RevealText";

interface SectionHeaderProps {
  /** A single string — the headline will be word-revealed. */
  headline: string;
  /** Optional supporting copy. */
  supporting?: string;
  className?: string;
  align?: "left" | "center";
  /** Mono caption eyebrow rendered above the headline. */
  eyebrow?: string;
  /** Optional delay (seconds) before the headline reveal starts. */
  baseDelay?: number;
  /** Optional index for ordinal-style headlines (e.g. "01"). */
  index?: string;
}

/**
 * SectionHeader — eyebrow + serif headline (trailing reveal) + supporting.
 *
 * The headline uses per-word reveal motion by default. Pass the headline as
 * a single string (not ReactNode) so the reveal can split it into words.
 */
export function SectionHeader({
  headline,
  supporting,
  className,
  align = "left",
  eyebrow,
  baseDelay = 0,
  index,
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="label-mono text-ink-secondary mb-5">
          {index && <span className="text-ink-tertiary mr-3">{index}</span>}
          {eyebrow}
        </p>
      )}
      <RevealText
        as="h2"
        baseDelay={baseDelay}
        className="font-serif font-normal text-[clamp(1.75rem,4vw,2.75rem)] tracking-[-0.015em] text-balance text-ink-primary leading-[1.1]"
      >
        {headline}
      </RevealText>
      {supporting && (
        <Stagger
          delay={baseDelay + 0.2}
          className="mt-5 text-base sm:text-lg text-ink-secondary leading-relaxed max-w-2xl text-balance"
        >
          {supporting}
        </Stagger>
      )}
    </div>
  );
}