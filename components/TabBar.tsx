"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const Icon = {
  home: <svg viewBox="0 0 24 24" {...s}><path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z" /></svg>,
  review: <svg viewBox="0 0 24 24" {...s}><circle cx="6" cy="6" r="2.2" /><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="12" r="2.2" /><path d="M6 8.2v7.6M8 6h4a4 4 0 0 1 4 4v0" /></svg>,
  attack: <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="7.5" /><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" /></svg>,
  roadmap: <svg viewBox="0 0 24 24" {...s}><rect x="3.5" y="4" width="5" height="16" rx="1.5" /><rect x="10.5" y="4" width="5" height="10" rx="1.5" /><rect x="17.5" y="4" width="3" height="6" rx="1.2" /></svg>,
  more: <svg viewBox="0 0 24 24" {...s}><circle cx="5.5" cy="12" r="1.3" /><circle cx="12" cy="12" r="1.3" /><circle cx="18.5" cy="12" r="1.3" /></svg>,
  pricing: <svg viewBox="0 0 24 24" {...s}><path d="M3.5 12.5 11.5 4.5H19.5V12.5L11.5 20.5z" /><circle cx="15.5" cy="8.5" r="1.3" /></svg>,
  how: <svg viewBox="0 0 24 24" {...s}><path d="m12 3 8.5 4.5L12 12 3.5 7.5zM3.5 12 12 16.5 20.5 12M3.5 16.5 12 21l8.5-4.5" /></svg>,
  docs: <svg viewBox="0 0 24 24" {...s}><path d="M5 4.5h9l5 5v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1zM14 4.5v5h5M8 13h8M8 16.5h5" /></svg>,
  log: <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>,
  about: <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5.5M12 7.8v.2" /></svg>,
  user: <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>,
};

const tabs = [
  { label: "Home", href: "/", icon: Icon.home },
  { label: "Review", href: "/review", icon: Icon.review },
  { label: "Attack", href: "/attack", icon: Icon.attack },
  { label: "Roadmap", href: "/roadmap", icon: Icon.roadmap },
];
const more = [
  { label: "How it works", href: "/how-it-works", icon: Icon.how },
  { label: "Pricing", href: "/pricing", icon: Icon.pricing },
  { label: "Docs", href: "/docs", icon: Icon.docs },
  { label: "Changelog", href: "/changelog", icon: Icon.log },
  { label: "About", href: "/about", icon: Icon.about },
  { label: "Sign in", href: "https://puku.sh/login", icon: Icon.user },
];

/** Mobile app shell: bottom tab bar + "More" sheet. Hidden from lg up. */
export default function TabBar() {
  const path = usePathname();
  const [sheet, setSheet] = useState(false);
  useEffect(() => setSheet(false), [path]);
  useEffect(() => { document.documentElement.style.overflow = sheet ? "hidden" : ""; }, [sheet]);
  const isActive = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  const moreActive = more.some((m) => isActive(m.href));

  return (
    <>
      <AnimatePresence>
        {sheet && (
          <>
            <motion.button aria-label="Close menu" onClick={() => setSheet(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] lg:hidden" />
            <motion.div
              role="dialog" aria-label="More"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, i) => { if (i.offset.y > 80 || i.velocity.y > 500) setSheet(false); }}
              className="fixed inset-x-0 bottom-0 z-[61] rounded-t-[20px] border-t border-border bg-sidebar px-4 pb-[calc(88px+env(safe-area-inset-bottom))] pt-2.5 lg:hidden"
            >
              <span className="mx-auto mb-4 block h-1 w-10 rounded-full bg-border" />
              <div className="grid grid-cols-3 gap-2">
                {more.map((m) => (
                  <Link key={m.href} href={m.href} className={`flex flex-col items-center gap-2 rounded-[14px] border px-2 py-4 text-[13px] transition-colors active:scale-[0.97] ${isActive(m.href) ? "border-accent/40 bg-[#B0B3FC14] text-text" : "border-border bg-panel text-muted"}`}>
                    <span className="h-6 w-6">{m.icon}</span>{m.label}
                  </Link>
                ))}
              </div>
              <Link href="/pricing" className="btn btn-primary mt-3 w-full">Get started with Puku</Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav aria-label="App" className="fixed inset-x-0 bottom-0 z-[62] border-t border-[#EEEEE514] bg-bg/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <ul className="mx-auto grid max-w-[520px] grid-cols-5">
          {tabs.map((t) => {
            const a = isActive(t.href) && !sheet;
            return (
              <li key={t.href}>
                <Link href={t.href} aria-current={a ? "page" : undefined} className={`relative flex h-[60px] flex-col items-center justify-center gap-1 text-[10.5px] transition-colors ${a ? "text-text" : "text-muted"}`}>
                  {a && <motion.span layoutId="tab-dot" className="absolute top-0 h-0.5 w-8 rounded-full bg-accent" transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
                  <motion.span whileTap={{ scale: 0.85 }} className={`h-[22px] w-[22px] ${a ? "text-accent" : ""}`}>{t.icon}</motion.span>
                  {t.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button onClick={() => setSheet((x) => !x)} aria-expanded={sheet} className={`relative flex h-[60px] w-full flex-col items-center justify-center gap-1 text-[10.5px] ${sheet || moreActive ? "text-text" : "text-muted"}`}>
              {(sheet || moreActive) && <motion.span layoutId="tab-dot" className="absolute top-0 h-0.5 w-8 rounded-full bg-accent" />}
              <motion.span whileTap={{ scale: 0.85 }} animate={{ rotate: sheet ? 90 : 0 }} className={`h-[22px] w-[22px] ${sheet || moreActive ? "text-accent" : ""}`}>{Icon.more}</motion.span>
              More
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
