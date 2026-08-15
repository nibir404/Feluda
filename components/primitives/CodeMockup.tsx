"use client";

import clsx from "clsx";
import { ReactNode } from "react";

interface CodeMockupProps {
  title?: string;
  subtitle?: string;
  /** Optional list of tabs rendered as a row of mono caps pills. */
  tabs?: string[];
  /** Optional active tab index. */
  activeTab?: number;
  /** Body content. */
  children: ReactNode;
  /** Visual style. Default `code` (dark code-window with chrome bar). */
  variant?: "code" | "panel";
  className?: string;
}

/**
 * CodeMockup — the dark mockup window that sits on the right side of a
 * ColorCard. Renders the chrome bar (3 dots + title/subtitle + badge)
 * plus a content slot. Used for the dark "code window" / "performance
 * mode" / "table" sub-panels inside each card.
 *
 * Note: `panel` variant is for a slightly lighter sub-panel (e.g. the
 * "Accelerated" cream highlight inside the periwinkle card in the
 * reference).
 */
export function CodeMockup({
  title,
  subtitle,
  tabs,
  activeTab,
  children,
  variant = "code",
  className,
}: CodeMockupProps) {
  const isCode = variant === "code";
  return (
    <div
      className={clsx(
        "rounded-lg overflow-hidden",
        isCode
          ? "bg-bg-code border border-border/20"
          : "bg-bg-cream/90 border border-border/15",
        className
      )}
    >
      {/* Chrome bar */}
      <div
        className={clsx(
          "flex items-center justify-between px-4 py-2.5",
          isCode ? "border-b border-ink-on-code/15" : "border-b border-ink-on-panel/15"
        )}
      >
        <div className="flex items-center gap-1.5">
          <span
            className={clsx(
              "w-2 h-2 rounded-full",
              isCode ? "bg-ink-on-code/35" : "bg-ink-on-panel/35"
            )}
          />
          <span
            className={clsx(
              "w-2 h-2 rounded-full",
              isCode ? "bg-ink-on-code/35" : "bg-ink-on-panel/35"
            )}
          />
          <span
            className={clsx(
              "w-2 h-2 rounded-full",
              isCode ? "bg-ink-on-code/35" : "bg-ink-on-panel/35"
            )}
          />
        </div>
        <div className="flex items-center gap-2 min-w-0">
          {title && (
            <span
              className={clsx(
                "label-mono truncate",
                isCode ? "text-ink-on-code" : "text-ink-on-panel"
              )}
            >
              {title}
            </span>
          )}
          {subtitle && (
            <>
              <span
                className={clsx(
                  "text-xs",
                  isCode ? "text-ink-on-code/40" : "text-ink-on-panel/40"
                )}
              >
                ·
              </span>
              <span
                className={clsx(
                  "font-mono text-[10px] truncate",
                  isCode ? "text-ink-on-code/60" : "text-ink-on-panel/60"
                )}
              >
                {subtitle}
              </span>
            </>
          )}
        </div>
        <span
          className={clsx(
            "w-2 h-2 rounded-full",
            isCode
              ? "border border-ink-on-code/30"
              : "border border-ink-on-panel/30"
          )}
        />
      </div>

      {/* Tabs */}
      {tabs && tabs.length > 0 && (
        <div
          className={clsx(
            "flex items-center gap-1 px-4 py-2 border-b",
            isCode
              ? "border-ink-on-code/15"
              : "border-ink-on-panel/15"
          )}
        >
          {tabs.map((t, i) => {
            const active = i === activeTab;
            return (
              <span
                key={t}
                className={clsx(
                  "px-2.5 py-1 rounded-sm label-mono",
                  isCode
                    ? active
                      ? "bg-ink-on-code/10 text-ink-on-code"
                      : "text-ink-on-code/55"
                    : active
                    ? "bg-ink-on-panel/10 text-ink-on-panel"
                    : "text-ink-on-panel/55"
                )}
              >
                {t}
              </span>
            );
          })}
        </div>
      )}

      {/* Body */}
      <div className="p-5">{children}</div>
    </div>
  );
}
