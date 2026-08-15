"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ProductWindowProps {
  title?: string;
  subtitle?: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "ghost";
  noPadding?: boolean;
  noChrome?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProductWindow({
  title,
  subtitle,
  badge,
  children,
  className,
  variant = "default",
  noPadding = false,
  noChrome = false,
}: ProductWindowProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className={clsx(
        "rounded-lg overflow-hidden",
        variant === "ghost" ? "" : "hairline",
        variant === "elevated"
          ? "bg-bg-surface"
          : variant === "ghost"
          ? "bg-bg-surface/40"
          : "bg-bg-surface/60",
        className
      )}
    >
      {!noChrome && (
        <div className="flex items-center justify-between px-4 py-2.5 hairline-b">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-ink-tertiary/40" />
            <span className="w-2 h-2 rounded-full bg-ink-tertiary/40" />
            <span className="w-2 h-2 rounded-full bg-ink-tertiary/40" />
          </div>
          <div className="flex items-center gap-2 min-w-0">
            {title && (
              <span className="label-mono text-ink-secondary truncate">
                {title}
              </span>
            )}
            {subtitle && (
              <>
                <span className="text-ink-tertiary text-xs">·</span>
                <span className="font-mono text-[10px] text-ink-tertiary truncate">
                  {subtitle}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {badge}
            <span className="w-2 h-2 rounded-full hairline" />
          </div>
        </div>
      )}
      <div className={clsx(!noPadding && "p-5 sm:p-6")}>{children}</div>
    </motion.div>
  );
}