"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export interface RailItem {
  id: string;
  label: string;
}

interface SideRailProps {
  items: RailItem[];
  className?: string;
}

/**
 * SideRail — sticky vertical nav used to scroll-spy across a stack of
 * colored cards. Renders a small column of mono uppercase labels
 * connected by a hairline rule; the active item uses ink-primary,
 * inactive items use ink-tertiary.
 *
 * Behavior:
 *   - IntersectionObserver watches each target id; the topmost
 *     intersecting item is "active".
 *   - Clicking a label scrolls the target into view smoothly and
 *     updates the URL hash.
 *   - On mobile, the rail is hidden; the eyebrow label on each card
 *     carries the navigation.
 */
export function SideRail({ items, className }: SideRailProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const targets = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => !!el);
    if (targets.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry whose center is closest to the viewport top.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0,
      }
    );
    targets.forEach((t) => observerRef.current?.observe(t));
    return () => observerRef.current?.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Section navigation"
      className={clsx(
        "hidden lg:block lg:sticky lg:top-32 lg:self-start",
        className
      )}
    >
      <div className="relative pl-4">
        {/* Vertical hairline */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-2 bottom-2 w-px bg-border-subtle/40"
        />
        <ul className="space-y-5">
          {items.map((it) => {
            const active = it.id === activeId;
            return (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(it.id);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                      history.replaceState(null, "", `#${it.id}`);
                      setActiveId(it.id);
                    }
                  }}
                  className={clsx(
                    "label-mono transition-colors focus-ring rounded-sm block",
                    active
                      ? "text-ink-primary"
                      : "text-ink-tertiary hover:text-ink-secondary"
                  )}
                >
                  <span
                    className={clsx(
                      "inline-block w-3 h-px mr-3 align-middle transition-colors",
                      active ? "bg-ink-primary" : "bg-border-subtle/50"
                    )}
                  />
                  {it.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}