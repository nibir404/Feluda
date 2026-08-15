"use client";

import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../primitives/Button";
import { Container } from "../primitives/Container";
import { Logo } from "../primitives/Logo";
import { ThemeToggle } from "../theme/ThemeToggle";
import { MegaMenu } from "./MegaMenu";
import {
  productNav,
  solutionsNav,
  topNav,
  routes,
} from "@/lib/content";

export function Navigation() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile drawer on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled || mobileOpen
          ? "bg-bg-base/90 backdrop-blur-md border-b border-border-subtle/40"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Container size="wide">
        <nav
          aria-label="Primary"
          className="flex items-center justify-between h-[72px] gap-4"
        >
          <Link
            href={routes.home}
            aria-label="Feluda home"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-md flex-shrink-0"
          >
            <Logo height={48} width="clamp(150px, 13vw, 200px)" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {topNav.map((item) =>
              "hasMenu" in item && item.hasMenu ? (
                <MegaMenu
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  columns={
                    item.menuKey === "product" ? productNav : solutionsNav
                  }
                />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="label-mono px-3 py-2 whitespace-nowrap text-ink-secondary hover:text-ink-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Compact nav for lg (1024-1279) — only mega menu triggers + key links */}
          <div className="hidden lg:flex xl:hidden items-center gap-1 flex-1 justify-center">
            <MegaMenu
              label="Product"
              href={routes.product.index}
              columns={productNav}
            />
            <MegaMenu
              label="Solutions"
              href={routes.solutions.index}
              columns={solutionsNav}
            />
            <Link
              href={routes.pricing}
              className="label-mono px-3 py-2 whitespace-nowrap text-ink-secondary hover:text-ink-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
            >
              Pricing
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link
              href={routes.auth.signin}
              className="hidden xl:inline label-mono text-ink-secondary hover:text-ink-primary transition-colors px-2 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-md"
            >
              Sign in
            </Link>
            <ThemeToggle variant="compact" />
            <Button size="sm" withArrow href={routes.auth.signup}>
              Start with Feluda
            </Button>
          </div>

          {/* Mobile menu button — visible below lg only */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-ink-secondary hover:text-ink-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-md"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </Container>

      {/* Mobile drawer */}
      {mobileOpen && (
        <motion.div
          ref={mobileDrawerRef}
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden border-t border-border-subtle/40 bg-bg-base/95 backdrop-blur-md max-h-[calc(100dvh-72px)] overflow-y-auto"
        >
          <Container size="wide">
            <div className="py-4 flex flex-col">
              <MobileSection
                label="Product"
                isOpen={openSection === "product"}
                onToggle={() =>
                  setOpenSection((v) => (v === "product" ? null : "product"))
                }
                items={productNav.flatMap((c) => c.items).map((i) => ({
                  label: i.title,
                  href: i.href,
                }))}
                onItemClick={() => setMobileOpen(false)}
              />
              <MobileSection
                label="Solutions"
                isOpen={openSection === "solutions"}
                onToggle={() =>
                  setOpenSection((v) =>
                    v === "solutions" ? null : "solutions"
                  )
                }
                items={solutionsNav.flatMap((c) => c.items).map((i) => ({
                  label: i.title,
                  href: i.href,
                }))}
                onItemClick={() => setMobileOpen(false)}
              />
              {/* Direct links */}
              {topNav
                .filter((i) => !("hasMenu" in i))
                .map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-3 text-sm text-ink-secondary hover:text-ink-primary hover:bg-bg-surface rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                  >
                    {item.label}
                  </Link>
                ))}
              <div className="px-3 pt-4 border-t border-border-subtle/40 mt-2">
                <p className="font-mono text-[10px] tracking-[0.18em] text-ink-tertiary uppercase mb-2">
                  Theme
                </p>
                <ThemeToggle variant="labeled" />
              </div>
              <div className="flex items-center gap-3 px-3 pt-4 pb-2">
                <Link
                  href={routes.auth.signin}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-ink-secondary hover:text-ink-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-md px-2 py-2 -ml-2"
                >
                  Sign in
                </Link>
                <Button
                  size="sm"
                  withArrow
                  href={routes.auth.signup}
                  className="ml-auto"
                  onClick={() => setMobileOpen(false)}
                >
                  Start with Feluda
                </Button>
              </div>
            </div>
          </Container>
        </motion.div>
      )}
    </motion.header>
  );
}

function MobileSection({
  label,
  isOpen,
  onToggle,
  items,
  onItemClick,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  items: { label: string; href: string }[];
  onItemClick: () => void;
}) {
  return (
    <div className="border-b border-border-subtle/40">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-ink-secondary hover:text-ink-primary hover:bg-bg-surface rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
      >
        <span>{label}</span>
        <ChevronDown
          className={clsx(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-180"
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <ul className="pl-3 py-1 pb-2 space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onItemClick}
                className="block px-3 py-2 text-sm text-ink-tertiary hover:text-ink-primary rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}