"use client";

import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

/**
 * Pill — small mono uppercase label wrapped in a hairline-bordered chip.
 * Pattern from Brixel: `● NEW ANNOUNCEMENT ON X · READ MORE`.
 */
export function Pill({ children, href, className }: PillProps) {
  const inner = (
    <span
      className={clsx(
        "inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-ink-secondary",
        className
      )}
    >
      {children}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full hairline bg-bg-base/40 px-3.5 py-1.5 hover:bg-bg-surface transition-colors focus-ring"
      >
        {inner}
        <ArrowUpRight
          className="w-3 h-3 text-ink-tertiary"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </Link>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full hairline bg-bg-base/40 px-3.5 py-1.5">
      {inner}
    </span>
  );
}