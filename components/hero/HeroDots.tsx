"use client";

import { motion } from "framer-motion";
import { useId } from "react";

interface HeroDotsProps {
  /** Density of the dot grid. Larger = sparser. Default 22. */
  spacing?: number;
  /** Dot radius in px. Default 0.7. */
  dotSize?: number;
  /** Opacity 0-1 of the dots. Default 0.18. */
  opacity?: number;
  className?: string;
}

/**
 * HeroDots — minimal monochrome dotted backdrop.
 *
 * Renders an SVG <pattern> of small square dots in a regular grid at
 * `spacing` px intervals. Used as a subtle texture behind the hero
 * content so the page reads as editorial but not flat.
 *
 * Pattern is fully monochrome — uses currentColor so it inverts with
 * theme via text-ink-* classes.
 */
export function HeroDots({
  spacing = 22,
  dotSize = 0.7,
  opacity = 0.18,
  className,
}: HeroDotsProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "_");
  return (
    <motion.svg
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <defs>
        <pattern
          id={`hero-dots-${id}`}
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={spacing / 2} cy={spacing / 2} r={dotSize} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#hero-dots-${id})`} />
    </motion.svg>
  );
}
