"use client";

import clsx from "clsx";
import { ReactNode } from "react";

interface MonoStatProps {
  value: ReactNode;
  label: ReactNode;
  className?: string;
}

/**
 * MonoStat — large monospaced value with a small caption underneath.
 * Used in the hero stat strip (Brixel pattern: <1s, 300,000+, 98B+).
 */
export function MonoStat({ value, label, className }: MonoStatProps) {
  return (
    <div className={clsx("px-4 py-3", className)}>
      <p className="font-mono text-xl sm:text-2xl text-ink-primary leading-none">
        {value}
      </p>
      <p className="mt-2 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-tertiary">
        {label}
      </p>
    </div>
  );
}
