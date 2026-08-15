"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "li";
  /** Per-word delay in seconds. Default 0.04 (~40ms). */
  perWordDelay?: number;
  /** Initial delay before the first word appears. Default 0. */
  baseDelay?: number;
  /** Optional aria-label override (defaults to the joined string). */
  ariaLabel?: string;
}

/**
 * RevealText — trailing reveal animation for headlines.
 *
 * Splits a single string of text into per-word `<motion.span>`s and animates
 * each from `opacity:0 + small y-offset` to `opacity:1 + y:0`, with a per-word
 * delay so the rightmost words of the line arrive last (the trailing reveal).
 *
 * Accessibility:
 * - The container element gets an `aria-label` of the full string so screen
 *   readers announce the headline cleanly.
 * - Each animated span is `aria-hidden` (decorative).
 * - `useReducedMotion()` skips the y-offset (opacity-only fade).
 *
 * Multi-line headlines: render one `<RevealText>` per line, threading
 * `baseDelay` between them so the trailing delay continues across lines.
 */
export function RevealText({
  children,
  className,
  as: Tag = "h2",
  perWordDelay = 0.04,
  baseDelay = 0,
  ariaLabel,
}: RevealTextProps) {
  const reduced = useReducedMotion();
  const words = children.split(" ");

  // Build per-word motion variants.
  const wordVariants: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Tag className={className} aria-label={ariaLabel ?? children}>
      {words.map((w, i) => (
        <motion.span
          key={`${i}-${w}`}
          aria-hidden="true"
          className="inline-block"
          initial="hidden"
          animate="show"
          variants={wordVariants}
          transition={{
            duration: 0.5,
            delay: baseDelay + i * perWordDelay,
            ease: EASE,
          }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}

/**
 * RevealLines — convenience wrapper for multi-line headlines.
 *
 * Renders N `<RevealText>` elements (one per line) with a shared
 * `baseDelay` that compounds across lines so the trailing reveal continues.
 */
interface RevealLinesProps {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  perLinePerWordDelay?: number;
  perWordDelay?: number;
  baseDelay?: number;
}

export function RevealLines({
  lines,
  className,
  as = "h1",
  perLinePerWordDelay = 0.12,
  perWordDelay = 0.04,
  baseDelay = 0,
}: RevealLinesProps) {
  // Estimate words across all lines so the next line starts after the previous
  // line's last word begins its reveal.
  let cumulativeWords = 0;
  return (
    <span className={className} aria-label={lines.join(" ")}>
      {lines.map((line, lineIdx) => {
        const lineBaseDelay = baseDelay + cumulativeWords * perWordDelay;
        cumulativeWords += line.split(" ").length;
        // We render the line as a single <span> wrapping per-word RevealText.
        // To preserve <h1>/<h2>/etc semantics, we only use the `as` on the
        // first line.
        const Tag: any = lineIdx === 0 ? as : "span";
        const display = lineIdx === 0 ? "block" : "block";
        return (
          <Tag key={lineIdx} className={display} aria-hidden="true">
            <RevealText
              as="span"
              baseDelay={lineBaseDelay}
              perWordDelay={perWordDelay}
              ariaLabel={line}
            >
              {line}
            </RevealText>
          </Tag>
        );
      })}
    </span>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

/**
 * Stagger — generic staggered entrance for non-headline blocks.
 * Used by supporting paragraphs, CTA rows, etc.
 */
export function Stagger({
  children,
  className,
  delay = 0,
  yOffset = 8,
}: StaggerProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}