"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  ["You open a pull request", "Nothing to install per repo"],
  ["Feluda joins as a check", "Reviewing… usually under a minute"],
  ["It comments on the exact line", "Bugs and security holes, ranked"],
  ["It posts the verdict", "Summary, issue table, confidence"],
  ["You commit the fix. Same on GitLab.", "Merge requests get the identical flow"],
];
type P = "github" | "gitlab";
const theme = {
  github: { bg: "#0D1117", bar: "#161B22", line: "#30363D", text: "#E6EDF3", sub: "#7D8590", body: "#C9D1D9", tab: "#F78166", open: "#238636", btn: "#238636", label: "Pull request #482", tabs: ["Conversation", "Commits 3", "Checks 2", "Files changed 3"], url: "puku/api-gateway · Pull request #482", who: "samnan wants to merge 3 commits into main", commit: "Commit suggestion", pending: "#D29922" },
  gitlab: { bg: "#18171D", bar: "#1F1E24", line: "#3A383F", text: "#ECECEF", sub: "#89888D", body: "#DCDCDE", tab: "#FC6D26", open: "#108548", btn: "#1F75CB", label: "Merge request !482", tabs: ["Overview", "Commits 3", "Pipelines 2", "Changes 3"], url: "puku/api-gateway · Merge request !482", who: "samnan requested to merge refresh-bg into main", commit: "Apply suggestion", pending: "#C17D10" },
};

export default function PRScroll() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(2);
  const [manual, setManual] = useState<P | null>(null);
  const prov: P = manual ?? (step === 4 ? "gitlab" : "github");
  const t = theme[prov];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({ trigger: "[data-pin]", start: "top 120px", end: "+=1800", pin: true, pinSpacing: true,
          onUpdate: (s) => { setStep(Math.min(4, Math.floor(s.progress * 5))); setManual(null); } });
      });
      mm.add("(max-width: 1023px)", () => {
        let id: ReturnType<typeof setInterval> | undefined;
        const st = ScrollTrigger.create({ trigger: root.current, start: "top 60%", end: "bottom 30%",
          onToggle: (s) => { clearInterval(id); if (s.isActive) id = setInterval(() => setStep((n) => (n + 1) % 5), 3200); } });
        return () => { clearInterval(id); st.kill(); };
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const fixed = step === 4;
  return (
    <section ref={root} className="border-t border-border" aria-labelledby="pr-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-5 py-24 md:px-12 md:py-[120px] xl:px-24">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-accent">WHERE THE WORK HAPPENS · SCROLL</p>
            <h2 id="pr-title" className="max-w-[700px] text-[clamp(38px,4.5vw,56px)] font-semibold leading-[1.04] tracking-[-0.04em]">It shows up in the pull request. Nowhere else to check.</h2>
          </div>
          <div role="tablist" aria-label="Provider" className="flex gap-1 rounded-full border border-border p-1">
            {(["github", "gitlab"] as P[]).map((p) => (
              <button key={p} role="tab" aria-selected={prov === p} onClick={() => setManual(p)} className="relative rounded-full px-[18px] py-2 text-[14px] leading-[18px]">
                {prov === p && <motion.span layoutId="prov-pill" className="absolute inset-0 rounded-full bg-text" transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
                <span className={`relative transition-colors ${prov === p ? "text-[#151614]" : "text-muted"}`}>{p === "github" ? "GitHub" : "GitLab"}</span>
              </button>
            ))}
          </div>
        </div>

        <div data-pin className="flex flex-col items-start gap-10 lg:flex-row lg:gap-14">
          <ol className="flex w-full shrink-0 flex-col lg:w-[340px]">
            {steps.map(([a, b], i) => (
              <li key={a}>
                <button onClick={() => setStep(i)} className={`relative flex w-full gap-4 border-t border-border py-[18px] text-left transition-all duration-500 ${i === 4 ? "border-b" : ""} ${i === step ? "pl-3.5" : "opacity-50 hover:opacity-80"}`}>
                  {i === step && <motion.span layoutId="step-hl" className="absolute inset-0 border-l-2 border-accent bg-[linear-gradient(90deg,rgba(176,179,252,.08),transparent)]" />}
                  <span className={`relative w-6 shrink-0 font-mono text-[12px] leading-4 ${i === step ? "text-accent" : "text-muted"}`}>0{i + 1}</span>
                  <span className="relative flex flex-col gap-1">
                    <span className="text-[17px] leading-[22px]">{a}</span>
                    <span className="text-[14px] leading-[18px] text-muted">{b}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="flex min-h-[495px] w-full flex-1 flex-col overflow-hidden rounded-[14px] border transition-colors duration-700" style={{ background: t.bg, borderColor: t.line }}>
            <div className="flex items-center gap-2 border-b px-4 py-3 transition-colors duration-700" style={{ background: t.bar, borderColor: t.line }}>
              {[0, 1, 2].map((k) => <span key={k} className="h-2.5 w-2.5 rounded-full" style={{ background: t.line }} />)}
              <span className="truncate pl-3 font-mono text-[12px] leading-4" style={{ color: t.sub }}>{t.url}</span>
            </div>
            <div className="flex flex-col gap-2.5 border-b px-6 py-5" style={{ borderColor: t.line }}>
              <p className="text-[20px] font-semibold leading-7 md:text-[22px]" style={{ color: t.text }}>Refresh session tokens in background <span style={{ color: t.sub }}>{prov === "github" ? "#482" : "!482"}</span></p>
              <div className="flex items-center gap-2.5">
                <span className="rounded-full px-2.5 py-1 text-[12px] font-semibold leading-4 text-white" style={{ background: fixed ? "#8957E5" : t.open }}>{fixed ? (prov === "github" ? "Ready" : "Ready") : "Open"}</span>
                <span className="truncate text-[13px] leading-4" style={{ color: t.sub }}>{t.who}</span>
              </div>
            </div>
            <div className="flex gap-6 overflow-x-auto border-b px-6 scrollbar-none" style={{ borderColor: t.line }}>
              {t.tabs.map((x, i) => <span key={x} className="shrink-0 border-b-2 py-3 text-[13px] leading-4" style={{ color: i === 3 ? t.text : t.sub, borderColor: i === 3 ? t.tab : "transparent" }}>{x}</span>)}
            </div>
            <div className="overflow-x-auto px-6 pt-4 scrollbar-none">
              <pre className="font-mono text-[13px] leading-[22px]" style={{ color: t.sub }}>{"  40    const token = await store.get(session.id)\n  41 +  if (isExpired(token)) {"}</pre>
              <pre className="font-mono text-[13px] leading-[22px] transition-colors duration-500" style={{ color: t.text, background: fixed ? "#2EA04326" : step >= 2 ? "#F8514926" : "transparent" }}>
                {fixed ? "  42 +    return lock(session.id, () => provider.refresh(token))" : "  42 +    const next = await provider.refresh(token)"}
              </pre>
            </div>

            <AnimatePresence mode="popLayout">
              {step === 1 && (
                <motion.div key="check" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-6 my-3 flex items-center gap-3 rounded-[8px] border p-4" style={{ background: t.bar, borderColor: t.line }}>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: t.pending, borderTopColor: "transparent" }} />
                  <span className="text-[14px]" style={{ color: t.body }}>feluda / review — reading 3 files, 1,204 log lines…</span>
                </motion.div>
              )}
              {step >= 2 && (
                <motion.div key="comment" layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-6 my-3 flex flex-col gap-3 rounded-[8px] border p-4" style={{ background: t.bar, borderColor: t.line }}>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="h-[22px] w-[22px] rounded-full bg-accent" />
                    <b className="text-[14px] font-semibold leading-[18px]" style={{ color: t.text }}>feluda</b>
                    <span className="rounded-full border px-1.5 py-px text-[11px] leading-[14px]" style={{ borderColor: t.line, color: t.sub }}>bot</span>
                    <span className="rounded-[4px] bg-[#FF91981F] px-1.5 py-0.5 font-mono text-[12px] leading-4 text-[#FF9198]">HIGH · RACE</span>
                    {fixed && <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-[4px] bg-[#2EA04326] px-1.5 py-0.5 font-mono text-[12px] leading-4 text-[#3FB950]">RESOLVED</motion.span>}
                  </div>
                  <p className="text-[14px] leading-[21px]" style={{ color: t.body }}>Two parallel requests can refresh the same token; the provider revokes the first and logs a user out. Seen in 0.4% of 401s since Sep 28.</p>
                  <div className="flex gap-2">
                    <button onClick={() => setStep(4)} className="rounded-[6px] px-3 py-1.5 text-[12px] leading-4 text-white transition-[filter] hover:brightness-110" style={{ background: t.btn }}>{fixed ? "Committed ✓" : t.commit}</button>
                    <button className="rounded-[6px] border px-3 py-1.5 text-[12px] leading-4" style={{ borderColor: t.line, color: t.body }}>Show trace</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-auto flex items-center gap-3 border-t px-6 py-3.5 transition-colors duration-700" style={{ background: t.bar, borderColor: t.line }}>
              <span className="h-2.5 w-2.5 shrink-0 rounded-full transition-colors" style={{ background: fixed ? "#3FB950" : step >= 3 ? "#D29922" : step >= 1 ? t.pending : t.line }} />
              <span className="text-[13px] leading-4" style={{ color: t.body }}>
                {step === 0 ? "Waiting for checks" : step === 1 ? "feluda / review — in progress" : step === 2 ? "feluda / review — 1 high found so far…" : fixed ? "feluda / review — all findings resolved · Approved" : "feluda / review — 1 high, 2 medium found · Changes requested"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 rounded-[14px] border border-[#3A383F] bg-[#1F1E24] px-6 py-5 md:flex-row md:items-center md:gap-6">
          <span className="font-mono text-[11px] leading-[14px] tracking-[0.12em] text-[#FC6D26]">GITLAB · MERGE REQUEST !482</span>
          <span className="flex-1 text-[15px] leading-[18px] text-[#ECECEF]">feluda commented on session/refresh.ts:42 · Pipeline: feluda-review passed with findings</span>
          <button onClick={() => { setManual("gitlab"); setStep(4); }} className="rounded-[6px] bg-[#1F75CB] px-3 py-1.5 text-[13px] leading-4 text-white hover:brightness-110">Apply suggestion</button>
        </div>
      </div>
    </section>
  );
}
