"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { entries } from "@/lib/changelog";
import { wrap } from "../ui";

const catC: Record<string, string> = { ATTACK: "bg-[#FF91981F] text-danger", REVIEW: "bg-[#B0B3FC1F] text-accent", PLATFORM: "bg-hover text-muted", ROADMAP: "border border-dashed border-border text-muted" };
const kinds = [["NEW", "bg-[#94C7A01F] text-success"], ["IMPROVED", "bg-[#B0B3FC1F] text-accent"], ["FIXED", "bg-hover text-muted"], ["BREAKING", "bg-[#FF91981F] text-danger"]] as const;

export default function Changelog() {
  const [cat, setCat] = useState("All");
  const [kind, setKind] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [sub, setSub] = useState(false);
  const [subbed, setSubbed] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [newCount, setNewCount] = useState(2);
  const [wait, setWait] = useState(false);
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { const last = localStorage.getItem("feluda-cl-last"); if (last) setNewCount(entries.filter((e) => e.iso > last && e.cat !== "ROADMAP").length); localStorage.setItem("feluda-cl-last", new Date().toISOString().slice(0, 10)); } catch {}
    const k = (e: KeyboardEvent) => { if (e.key === "/" && !(e.target as HTMLElement).closest("input,textarea")) { e.preventDefault(); search.current?.focus(); } };
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, []);
  const list = useMemo(() => entries.filter((e) => (cat === "All" || e.cat === cat.toUpperCase() || (cat === "Platform" && e.cat === "PLATFORM")) && (!kind || e.kind === kind) && (e.title + e.body + e.details.join(" ")).toLowerCase().includes(q.toLowerCase())), [cat, kind, q]);
  const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <>
      <section className="border-b border-border">
        <div className={`${wrap} flex flex-col items-start justify-between gap-8 pb-12 pt-36 md:pt-[202px] lg:flex-row lg:items-end`}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-4">
            <p className="font-mono text-[12px] leading-4 tracking-[0.16em] text-accent">THE CASE LOG</p>
            <h1 className="max-w-[760px] text-[clamp(48px,6.2vw,88px)] font-semibold leading-[0.955] tracking-[-0.05em]">What the detective learned lately.</h1>
          </motion.div>
          <div className="flex gap-1 rounded-full border border-border p-1">
            {["All", "Review", "Attack", "Platform"].map((c) => (
              <button key={c} onClick={() => setCat(c)} className="relative rounded-full px-4 py-2 text-[14px] leading-[18px]">
                {cat === c && <motion.span layoutId="cl-cat" className="absolute inset-0 rounded-full bg-hover" />}<span className={`relative ${cat === c ? "text-text" : "text-muted"}`}>{c}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="sticky top-[62px] z-20 border-b border-border bg-sidebar/95 backdrop-blur">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-3 py-5`}>
          <label className="flex h-[42px] w-full items-center gap-3 rounded-[10px] border border-border bg-bg px-3.5 focus-within:border-accent md:w-[420px]">
            <input ref={search} value={q} onChange={(e) => setQ(e.target.value)} placeholder='Search releases, e.g. "GitLab"' aria-label="Search releases" className="min-w-0 flex-1 bg-transparent text-[14px] leading-[18px] outline-none placeholder:text-muted" />
            <kbd className="rounded-[4px] bg-hover px-[7px] py-[3px] font-mono text-[11px] leading-[14px]">/</kbd>
          </label>
          <div className="flex gap-1.5">
            {kinds.map(([k, c]) => (
              <button key={k} onClick={() => setKind(kind === k ? null : k)} className={`rounded-[4px] px-2.5 py-1.5 font-mono text-[11px] leading-[14px] tracking-[0.08em] transition-all ${c} ${kind && kind !== k ? "opacity-35" : ""} ${kind === k ? "ring-1 ring-current" : ""}`}>{k}</button>
            ))}
          </div>
          <div className="relative">
            <button onClick={() => setSub((s) => !s)} className="flex h-[42px] items-center gap-2 rounded-full border border-border px-4 hover:bg-hover">
              <span className="text-[14px] leading-[18px]">{subbed ? `Subscribed · ${subbed}` : "Subscribe"}</span><span className="hidden text-[12px] leading-4 text-muted sm:inline">RSS · Email · Slack · Webhook ▾</span>
            </button>
            <AnimatePresence>
              {sub && (
                <motion.ul initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute right-0 top-full z-30 mt-2 w-[220px] rounded-[10px] border border-border bg-panel p-1 shadow-xl">
                  {[["RSS", "/changelog/rss.xml"], ["Email", ""], ["Slack", ""], ["Webhook", ""]].map(([n, h]) => (
                    <li key={n}><a href={h || "#"} onClick={(e) => { if (!h) e.preventDefault(); setSubbed(n); setSub(false); }} className="flex justify-between rounded-[6px] px-3 py-2 text-[13px] hover:bg-hover"><span>{n}</span><span className="text-muted">{h ? "open ↗" : "connect"}</span></a></li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {newCount > 0 && (
        <div className={`${wrap} flex items-center gap-4 pt-5`}>
          <span className="h-px flex-1 bg-accent" /><span className="font-mono text-[11px] leading-[14px] tracking-[0.14em] text-accent">{newCount} NEW SINCE YOUR LAST VISIT · SEP 30</span><span className="h-px flex-1 bg-accent" />
        </div>
      )}

      <section className={`${wrap} pb-24 md:pb-[112px]`}>
        <AnimatePresence initial={false}>
          {list.map((e, i) => (
            <motion.article key={e.title} id={slug(e.title)} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`flex scroll-mt-40 flex-col gap-6 py-14 md:flex-row md:gap-16 ${i < list.length - 1 ? "border-b border-border" : ""}`}>
              <div className="flex shrink-0 flex-col gap-2 self-start md:sticky md:top-[160px] md:w-[200px]">
                <p className={`font-mono text-[12px] leading-4 tracking-[0.08em] ${e.cat === "ROADMAP" ? "text-muted" : ""}`}>{e.date}</p>
                {e.version && <button onClick={() => { navigator.clipboard?.writeText(`${location.origin}/changelog#${slug(e.title)}`); setCopied(e.title); setTimeout(() => setCopied(null), 1200); }} className="text-left font-mono text-[11px] leading-[14px] text-muted hover:text-text">{e.version} · {copied === e.title ? "copied ✓" : "# copy link"}</button>}
                <span className={`self-start rounded-[4px] px-2 py-[3px] font-mono text-[11px] leading-[14px] tracking-[0.08em] ${catC[e.cat]}`}>{e.cat}</span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <h2 className="text-[26px] font-semibold leading-[34px] tracking-[-0.03em] md:text-[32px] md:leading-10">{e.title}</h2>
                <p className="max-w-[680px] text-[17px] leading-[27px] text-muted">{e.body}</p>
                {e.stats && (
                  <div className="flex max-w-[680px] gap-4 rounded-[12px] border border-border bg-panel p-5">
                    {e.stats.map(([v, l, red]) => <div key={l} className="flex flex-1 flex-col gap-1"><span className={`text-[22px] font-semibold leading-[34px] md:text-[28px] ${red ? "text-danger" : ""}`}>{v}</span><span className="text-[13px] leading-4 text-muted">{l}</span></div>)}
                  </div>
                )}
                {e.details.length > 0 && (
                  <div className="max-w-[680px]">
                    <button onClick={() => setOpen(open === e.title ? null : e.title)} className="text-[14px] text-accent hover:brightness-125">{open === e.title ? "− Hide details" : `+ ${e.details.length} changes in this release`}</button>
                    <AnimatePresence>{open === e.title && (
                      <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        {e.details.map((d) => <li key={d} className="flex gap-3 border-t border-border py-3 text-[15px] first:mt-3"><span className={`rounded-[4px] px-1.5 font-mono text-[10px] leading-5 ${kinds.find((k) => k[0] === e.kind)![1]}`}>{e.kind}</span>{d}</li>)}
                      </motion.ul>
                    )}</AnimatePresence>
                  </div>
                )}
                {e.waitlist && <button onClick={() => setWait(true)} className="flex h-[42px] items-center self-start rounded-[8px] border border-border px-[18px] text-[15px] leading-[18px] hover:border-accent">{wait ? "✓ You're on the list" : "Join the waitlist"}</button>}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
        {!list.length && <p className="py-24 text-center text-[15px] text-muted">No releases match. <button onClick={() => { setQ(""); setKind(null); setCat("All"); }} className="text-accent">Clear filters</button></p>}
      </section>
    </>
  );
}
