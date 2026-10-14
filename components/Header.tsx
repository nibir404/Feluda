"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "@/lib/site";
import Logo from "./Logo";

const mono = "font-mono text-[11px] leading-[14px] tracking-[0.1em]";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(scrollY > 40);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(null); }, [path]);

  if (path.startsWith("/docs")) return null;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? "bg-bg/75 backdrop-blur-xl" : ""}`}>
      {/* Utility bar — collapses on scroll */}
      <div className={`hidden overflow-hidden border-b border-[#EEEEE514] transition-[height,opacity] duration-500 md:block ${scrolled ? "h-0 opacity-0" : "h-9 opacity-100"}`}>
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-10">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            <span className={`${mono} text-muted`}>ALL SYSTEMS OPERATIONAL · 1,284 PRS REVIEWED THIS WEEK</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/changelog" className={`${mono} text-muted hover:text-text`}>CHANGELOG</Link>
            <Link href="/roadmap" className={`${mono} text-muted hover:text-text`}>ROADMAP</Link>
            <Link href="/about#security" className={`${mono} text-muted hover:text-text`}>STATUS</Link>
            <Link href="/changelog" className={`${mono} text-accent hover:brightness-125`}>MEMORY · JOIN WAITLIST →</Link>
          </div>
        </div>
      </div>

      <nav aria-label="Primary" onMouseLeave={() => setOpen(null)} className={`relative mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-[padding] duration-500 md:px-10 ${scrolled ? "py-2.5 lg:py-3" : "py-3 lg:py-5"}`}>
        <Link href="/" className="flex items-center gap-3 lg:w-[280px]" aria-label="Feluda home">
          <Logo size={28} />
          <span className="text-[21px] font-semibold lg:text-[23px] leading-7 tracking-[-0.03em]">feluda.</span>
          <span className="hidden rounded-[4px] border border-border px-1.5 py-[3px] font-mono text-[10px] leading-3 tracking-[0.1em] text-muted sm:inline">BY PUKU</span>
        </Link>

        <ul className="hidden items-center gap-0.5 rounded-full border border-[#EEEEE51A] bg-[#1516148C] p-1 backdrop-blur-[16px] lg:flex">
          {nav.map((n) => {
            const active = path.startsWith(n.href);
            const hasMenu = "items" in n;
            return (
              <li key={n.href} onMouseEnter={() => setOpen(hasMenu ? n.label : null)}>
                <Link href={n.href} className={`relative block rounded-full px-4 py-[9px] text-[14px] leading-[18px] transition-colors ${active ? "text-text" : "text-muted hover:text-text"}`}>
                  {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-hover" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  <span className="relative">{n.label}{hasMenu && " ▾"}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-end gap-5 lg:w-[280px]">
          <Link href="https://puku.sh/login" className="hidden text-[14px] leading-[18px] text-text hover:text-accent sm:block">Sign in</Link>
          <span className="hidden sm:block"><Link href="/pricing" className="btn btn-primary">Get started</Link></span>
          <span className="sm:hidden"><Link href="/pricing" className="btn btn-primary btn-sm">Get started</Link></span>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div key={open} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-[calc(100%-4px)] hidden w-[560px] -translate-x-1/2 overflow-hidden rounded-[12px] border border-border bg-sidebar/95 p-2 backdrop-blur-xl lg:block">
              {nav.filter((n) => n.label === open).map((n) => "items" in n && (
                <ul key={n.label} className="grid grid-cols-3 gap-1">
                  {n.items.map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} className="group block rounded-[8px] p-4 hover:bg-hover">
                        <span className="font-mono text-[10px] tracking-[0.1em] text-accent">{n.chapter.toUpperCase()}</span>
                        <span className="mt-2 block text-[15px]">{it.label}</span>
                        <span className="mt-1 block text-[13px] text-muted">{it.note}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

    </header>
  );
}
