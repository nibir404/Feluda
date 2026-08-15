"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Brain,
  type LucideIcon,
  Search,
  GitMerge,
  ClipboardCheck,
  Cpu,
  Compass,
  GitPullRequest,
  Users,
  Sparkles,
  Network,
} from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import type { NavColumn } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Search,
  GitMerge,
  ClipboardCheck,
  Cpu,
  Compass,
  GitPullRequest,
  Users,
  Sparkles,
  Network,
};

interface MegaMenuProps {
  label: string;
  href: string;
  columns: NavColumn[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function MegaMenu({ label, href, columns }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const panelId = useId();
  const prefersReducedMotion = useReducedMotion();
  const isActive = pathname.startsWith(href);

  const items = columns.flatMap((col) => col.items);

  // Hover-to-open only on fine pointer devices (desktops).
  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches
    ) {
      setOpen(true);
    }
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  // Click toggle (works on touch + non-hover devices).
  const handleClick = () => {
    setOpen((v) => !v);
  };

  // Escape closes; arrow keys navigate items; outside click closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const links =
          panelRef.current?.querySelectorAll<HTMLAnchorElement>(
            'a[role="menuitem"]'
          );
        if (!links || links.length === 0) return;
        const active = document.activeElement as HTMLElement | null;
        const idx = Array.from(links).indexOf(active as HTMLAnchorElement);
        const nextIdx =
          e.key === "ArrowDown"
            ? (idx + 1) % links.length
            : (idx - 1 + links.length) % links.length;
        links[nextIdx]?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on resize to avoid stale positioning.
  useEffect(() => {
    if (!open) return;
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={handleClick}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={panelId}
        onFocus={handleEnter}
        className={clsx(
          "label-mono px-3 py-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base inline-flex items-center gap-1",
          open || isActive
            ? "text-ink-primary"
            : "text-ink-secondary hover:text-ink-primary"
        )}
      >
        {label}
        <svg
          viewBox="0 0 12 12"
          className={clsx(
            "w-2.5 h-2.5 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        >
          <path
            d="M3 5l3 3 3-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dimmed page backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 top-[16rem] z-30 bg-bg-base/60 backdrop-blur-md pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={panelId}
            role="menu"
            aria-label={label}
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -16 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -8 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: EASE,
            }}
            className="fixed left-0 right-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto bg-bg-base border-b hairline-bright"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-14 py-10 lg:py-14">
              <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
                {/* Left intro column */}
                <div className="hidden lg:block">
                  <p className="label-mono text-ink-tertiary mb-3">Explore</p>
                  <p className="font-serif text-2xl text-ink-primary leading-tight">
                    {label}
                  </p>
                  <p className="mt-2 text-sm text-ink-secondary leading-relaxed">
                    {items.length} capabilities across {label.toLowerCase()}.
                  </p>
                  <Link
                    href={href}
                    role="menuitem"
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-sm"
                  >
                    Explore all {label.toLowerCase()}
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.75}
                    />
                  </Link>
                </div>

                {/* Right items list */}
                <ul role="none">
                  {items.map((item, i) => {
                    const Icon = item.icon ? iconMap[item.icon] : null;
                    return (
                      <motion.li
                        key={item.href}
                        role="none"
                        initial={
                          prefersReducedMotion
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 6 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: EASE,
                          delay: prefersReducedMotion
                            ? 0
                            : 0.05 + i * 0.04,
                        }}
                        className="hairline-b last:border-b-0"
                      >
                        <Link
                          role="menuitem"
                          href={item.href}
                          tabIndex={open ? 0 : -1}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-4 py-4 focus-visible:outline-none focus-visible:bg-bg-surface focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                        >
                          {Icon && (
                            <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 hairline rounded-sm text-ink-secondary group-hover:text-ink-primary transition-colors">
                              <Icon
                                className="w-4 h-4"
                                strokeWidth={1.5}
                              />
                            </span>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-serif font-medium text-ink-primary">
                              {item.title}
                            </p>
                            <p className="text-xs text-ink-tertiary leading-snug mt-0.5">
                              {item.description}
                            </p>
                          </div>
                          <ArrowRight
                            className="w-3.5 h-3.5 text-ink-tertiary opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 flex-shrink-0"
                            strokeWidth={1.5}
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}