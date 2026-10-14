"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Dither, SecHead, wrap } from "../ui";
import { faqs } from "@/lib/faqs";

export function Plans() {
  const [hover, setHover] = useState<number | null>(null);
  const feats = [
    ["✓ Feluda Review on every pull request", "✓ Feluda Attack: pentests, AI code analysis, attack surface", "✓ [—]K requests / month, shared by the team", "✓ GitHub and GitLab · Slack digest"],
    ["✓ Everything in Team", "✓ Custom request volume and pentest cadence", "✓ SSO, audit logs, SOC 2 / ISO report pack", "✓ Self-hosted GitLab · dedicated support"],
  ];
  const list = (items: string[], k: number) => (
    <ul className="relative flex flex-col">
      {items.map((f, i) => (
        <motion.li key={f} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.06 + k * 0.1 }} className="border-t border-border py-[11px] text-[15px] leading-[18px]">{f}</motion.li>
      ))}
    </ul>
  );
  return (
    <section>
      <div className={`${wrap} flex flex-col gap-4 pb-10 lg:flex-row`}>
        <motion.div whileHover={{ opacity: 1 }} className="flex shrink-0 flex-col gap-5 rounded-[16px] border border-dashed border-border p-8 opacity-70 lg:w-[300px]">
          <p className="font-mono text-[11px] leading-[14px] tracking-[0.12em] text-muted">PUKU FREE · PRO</p>
          <p className="text-[28px] font-semibold leading-[34px] tracking-[-0.02em]">Feluda not included</p>
          <a href="#faq" className="mt-auto flex h-[46px] items-center justify-center rounded-[8px] border border-border text-[15px] leading-[18px] hover:bg-hover">Upgrade to Team</a>
        </motion.div>
        <motion.div onMouseEnter={() => setHover(0)} onMouseLeave={() => setHover(null)} animate={{ y: hover === 0 ? -6 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="relative flex flex-1 flex-col gap-5 overflow-hidden rounded-[16px] border border-accent bg-panel p-7 shadow-[0_30px_80px_-30px_rgba(176,179,252,.35)] md:p-9">
          <Dither size={[320, 320]} className="-top-[60px] left-[55%] opacity-35" />
          <div className="relative flex justify-between">
            <span className="font-mono text-[11px] leading-[14px] tracking-[0.12em] text-accent">PUKU TEAM</span>
            <span className="rounded-[4px] bg-accent px-2 py-[3px] font-mono text-[11px] leading-[14px] tracking-[0.12em] text-accent-ink">INCLUDES FELUDA</span>
          </div>
          <div className="relative flex items-baseline gap-2"><span className="text-[56px] font-semibold leading-[78px] tracking-[-0.05em] md:text-[64px]">$—</span><span className="text-[16px] leading-5 text-muted">per seat / month</span></div>
          {list(feats[0], 0)}
          <Link href="https://puku.sh/upgrade?plan=team" className="btn btn-primary relative mt-auto">Start with Puku Team</Link>
        </motion.div>
        <motion.div onMouseEnter={() => setHover(1)} onMouseLeave={() => setHover(null)} animate={{ y: hover === 1 ? -6 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="flex flex-1 flex-col gap-5 rounded-[16px] border border-border bg-bg p-7 md:p-9">
          <div className="flex justify-between">
            <span className="font-mono text-[11px] leading-[14px] tracking-[0.12em]">PUKU ENTERPRISE</span>
            <span className="rounded-[4px] border border-border px-2 py-[3px] font-mono text-[11px] leading-[14px] tracking-[0.12em]">INCLUDES FELUDA</span>
          </div>
          <p className="text-[56px] font-semibold leading-[78px] tracking-[-0.05em] md:text-[64px]">Custom</p>
          {list(feats[1], 1)}
          <Link href="/about#contact" className="mt-auto flex h-[50px] items-center justify-center rounded-[8px] border border-text text-[16px] leading-5 transition-colors hover:bg-text hover:text-bg">Talk to us</Link>
        </motion.div>
      </div>
    </section>
  );
}

const repos = [["checkout-api", "42 endpoints · 3 roles", 4.2], ["web-dashboard", "61 routes · 2 roles", 6.1], ["auth-service", "18 endpoints · 1 role", 2.8]] as const;
export function Estimator() {
  const [on, setOn] = useState([true, true, false]);
  const [black, setBlack] = useState(false);
  const total = repos.reduce((s, r, i) => s + (on[i] ? r[2] : 0), 0) * (black ? 1.35 : 1);
  const left = 12.4;
  const fits = total <= left;
  const pct = Math.min(100, (total / left) * 100);
  return (
    <section className="border-t border-border">
      <div className={`${wrap} flex flex-col gap-8 py-24 md:py-[112px]`}>
        <SecHead eyebrow="ESTIMATE A PENTEST · TRY IT" title="Know the cost before the case opens." sideW={400} side="Tick the repos you'd test. Feluda sizes the scope from endpoints and roles and shows the requests it will draw from your plan." />
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-5 self-start rounded-[12px] border border-[#34362E] bg-[#1C1D1A] p-6">
            <div className="flex flex-col gap-1.5">
              <p className="text-[20px] font-semibold leading-[26px]">Estimate a pentest</p>
              <p className="text-[13px] leading-5 text-[#9DA193]">We read your repos, endpoints and roles and size the scope for you. Price updates as you pick.</p>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-[#34362E]">
              {repos.map(([n, d, c], i) => (
                <label key={n} className={`flex cursor-pointer items-center gap-3 px-3.5 py-3 transition-colors hover:bg-[#242620] ${i < 2 ? "border-b border-[#34362E]" : ""}`}>
                  <input type="checkbox" className="sr-only" checked={on[i]} onChange={() => setOn((o) => o.map((v, k) => (k === i ? !v : v)))} />
                  <motion.span animate={{ backgroundColor: on[i] ? "#B0B3FC" : "rgba(0,0,0,0)", borderColor: on[i] ? "#B0B3FC" : "#62665B" }} className="grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border text-[11px] leading-3 text-[#242449]">{on[i] && "✓"}</motion.span>
                  <span className={`flex-1 text-[13px] leading-[18px] ${on[i] ? "text-[#EEEEE5]" : "text-[#9DA193]"}`}>{n}</span>
                  <span className={`hidden text-[12px] leading-4 sm:block ${on[i] ? "text-[#9DA193]" : "text-[#62665B]"}`}>{d}</span>
                  <span className={`w-[70px] shrink-0 text-right text-[13px] leading-[18px] ${on[i] ? "text-[#EEEEE5]" : "text-[#62665B]"}`}>{c}K</span>
                </label>
              ))}
            </div>
            <button onClick={() => setBlack((b) => !b)} className="self-start text-[13px] leading-[18px] text-[#B0B3FC] hover:brightness-125">{black ? "← Back to white-box pricing" : "No repo access? See black-box pricing →"}</button>
          </div>
          <div className="flex shrink-0 flex-col gap-4 self-start rounded-[12px] border border-[#34362E] bg-[#1C1D1A] p-6 lg:w-[340px]">
            <p className="text-[11px] leading-4 tracking-[0.08em] text-[#9DA193]">{black ? "BLACK-BOX PENTEST" : "FULL PENTEST · RECOMMENDED"}</p>
            <AnimatePresence mode="wait">
              <motion.p key={total.toFixed(1)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-[40px] font-semibold leading-[44px] tracking-[-0.02em]">~{total.toFixed(1)}K requests</motion.p>
            </AnimatePresence>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#2A2C26]"><motion.div animate={{ width: `${pct}%`, backgroundColor: fits ? "#B0B3FC" : "#FF9198" }} className="h-full rounded-full" /></div>
            <p className={`text-[13px] leading-[18px] ${fits ? "text-[#9DA193]" : "text-danger"}`}>{left}K left this month · {fits ? "✓ fits your Team plan" : "exceeds plan — runs pause at 90%"}</p>
            <span className="h-px bg-[#34362E]" />
            <p className="flex justify-between text-[13px] leading-[18px]"><span className="text-[#9DA193]">Continuous, per month</span><span>~{(total * 0.7).toFixed(1)}K</span></p>
            <p className="text-[12px] leading-[18px] text-[#62665B]">Based on your last 30 days of commits. Docs-only and test-only changes are free.</p>
            <button disabled={!total} className="flex h-9 items-center justify-center rounded-[6px] bg-[#B0B3FC] text-[14px] font-semibold leading-[18px] text-[#242449] transition hover:brightness-110 disabled:opacity-40">Start pentest with these repos</button>
            <p className="text-[12px] leading-[18px] text-[#9DA193]">Counts against your Puku Team plan. Report is SOC 2 / ISO-ready.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RequestMath() {
  const cells = [["PR REVIEW", "~[—] req", "per average pull request"], ["AI CODE ANALYSIS", "~4.2K req", "2 repos, ~38k lines"], ["FULL PENTEST", "~10.3K req", "2 services, 103 routes"], ["SAFETY", "90%", "runs pause at this share of your limit"]];
  return (
    <section className="border-y border-border">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
        {cells.map(([k, v, d], i) => (
          <div key={k} className={`group flex flex-col gap-2 px-5 py-10 transition-colors hover:bg-panel md:py-12 ${i ? "lg:border-l" : ""} ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} border-border ${i === 0 ? "md:pl-12 xl:pl-24" : "md:px-12"} ${i === 3 ? "xl:pr-24" : ""}`}>
            <p className="font-mono text-[11px] leading-[14px] tracking-[0.12em] text-muted">{k}</p>
            <p className="text-[30px] font-semibold leading-10 tracking-[-0.04em] transition-colors group-hover:text-accent md:text-[40px] md:leading-[48px]">{v}</p>
            <p className="text-[14px] leading-[18px] text-muted">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="scroll-mt-24">
      <div className={`${wrap} flex flex-col gap-10 py-24 md:py-[112px] lg:flex-row lg:gap-16`}>
        <h2 className="shrink-0 text-[clamp(34px,3.6vw,44px)] font-semibold leading-[1.1] tracking-[-0.04em] lg:w-[380px]">Questions before you sign.</h2>
        <ul className="flex-1 border-b border-border">
          {faqs.map(([q, a], i) => (
            <li key={q} className="border-t border-border">
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)} className="group flex w-full justify-between gap-6 py-6 text-left">
                <span className="text-[17px] leading-6 transition-colors group-hover:text-accent md:text-[19px]">{q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} className="text-[20px] leading-6 text-accent">{open === i ? "–" : "+"}</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <span className="block max-w-[680px] pb-6 text-[15px] leading-6 text-muted">{a}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
