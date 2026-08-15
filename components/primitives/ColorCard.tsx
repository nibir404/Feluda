"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { RevealText, Stagger } from "./RevealText";
import { ColorChecklist, type CheckItem } from "./ColorChecklist";

export type Tone = "mint" | "sea" | "peri";

const TONE_CLASSES: Record<Tone, string> = {
  mint: "bg-bg-panel-mint text-ink-on-panel",
  sea: "bg-bg-panel-sea text-ink-on-sea",
  peri: "bg-bg-panel-peri text-ink-on-panel",
};

const TONE_DOT_CLASSES: Record<Tone, string> = {
  mint: "bg-ink-on-panel/80",
  sea: "bg-ink-on-sea/80",
  peri: "bg-ink-on-panel/80",
};

interface ColorCardProps {
  tone: Tone;
  eyebrow: string;
  /** Card title. Single string OR array of lines (each word-revealed). */
  heading: string | string[];
  supporting?: string;
  /** 2-up feature checklist (typically 2-4 items). */
  checks: CheckItem[];
  /** Right-column dark mockup window. */
  mockup: ReactNode;
  /** Optional id for scroll-spy / SideRail anchoring. */
  id?: string;
  className?: string;
}

/**
 * ColorCard — the colored card from the reference.
 *
 * Layout: `bg-bg-panel-{tone}` rounded-lg p-6 lg:p-10; grid
 * `lg:grid-cols-[1fr_1.1fr] gap-10`. Left = eyebrow + RevealText
 * heading + Stagger supporting + 2-up checklist. Right = the dark
 * code mockup window.
 *
 * Three tones cycle: mint → sea → peri.
 */
export function ColorCard({
  tone,
  eyebrow,
  heading,
  supporting,
  checks,
  mockup,
  id,
  className,
}: ColorCardProps) {
  const lines = Array.isArray(heading) ? heading : [heading];
  let wordsBefore = 0;
  // Inks swap for the dark sea card.
  const inkClass = tone === "sea" ? "text-ink-on-sea" : "text-ink-on-panel";
  const inkSoftClass =
    tone === "sea" ? "text-ink-on-sea/75" : "text-ink-on-panel/75";
  return (
    <section
      id={id}
      className={clsx(
        "rounded-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden",
        TONE_CLASSES[tone],
        className
      )}
    >
      {/* Faint dotted texture for editorial depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 dot-grid opacity-30 pointer-events-none"
      />

      <div className="relative grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-10 items-start">
        {/* Left: text block */}
        <div>
          <p
            className={clsx(
              "label-mono inline-flex items-center gap-2",
              inkSoftClass
            )}
          >
            <span className={clsx("w-1.5 h-1.5 rounded-full", TONE_DOT_CLASSES[tone])} />
            {eyebrow}
          </p>

          <h3
            aria-label={lines.join(" ")}
            className={clsx(
              "mt-3 font-serif font-normal text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.015em] leading-[1.1] text-balance",
              inkClass
            )}
          >
            {lines.map((line, i) => {
              const baseDelay = 0.05 + wordsBefore * 0.04;
              wordsBefore += line.split(" ").length;
              return (
                <span key={i} className="block" aria-hidden="true">
                  <RevealText as="span" baseDelay={baseDelay} ariaLabel={line}>
                    {line}
                  </RevealText>
                </span>
              );
            })}
          </h3>

          {supporting && (
            <Stagger
              delay={0.25}
              className={clsx(
                "mt-4 text-sm leading-relaxed max-w-md",
                inkSoftClass
              )}
            >
              {supporting}
            </Stagger>
          )}

          <ColorChecklist
            items={checks}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
          />
        </div>

        {/* Right: dark mockup window */}
        <div>{mockup}</div>
      </div>
    </section>
  );
}