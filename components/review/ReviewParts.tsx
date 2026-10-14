"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Dither, SecHead, Toggle, wrap } from "../ui";

/* ---------- Hero card ---------- */
export function HeroCard() {
  const [conf, setConf] = useState(3);
  return (
    <div className="flex flex-col gap-4 rounded-[16px] border border-[#EEEEE51F] bg-[#1C1D1AD9] p-7 backdrop-blur">
      <div className="flex justify-between font-mono text-[11px] leading-[14px] tracking-[0.1em]">
        <span className="text-muted">PR #476 · BILLING</span><span className="text-success">✓ REVIEWED IN 41S</span>
      </div>
      <p className="text-[22px] font-semibold leading-7 tracking-[-0.02em]">Migrate billing to v3 schema</p>
      <div className="flex gap-2 font-mono text-[11px] leading-[14px]">
        <span className="rounded-[4px] bg-[#FF91981F] px-2 py-1 text-danger">1 HIGH</span>
        <span className="rounded-[4px] bg-[#E8B1871F] px-2 py-1 text-warning">2 MED</span>
        <span className="rounded-[4px] bg-hover px-2 py-1 text-muted">4 LOW</span>
      </div>
      <div className="flex flex-col gap-2.5 border-t border-border pt-4">
        <p className="font-mono text-[11px] leading-[14px] tracking-[0.1em] text-muted">CONFIDENCE · TAP TO RESCORE</p>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((k) => (
            <button key={k} aria-label={`Confidence ${k}`} onClick={() => setConf(k)} className="group h-5 flex-1 py-1.5">
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1, backgroundColor: k <= conf ? "#b0b3fc" : "#34362e" }} transition={{ delay: 0.6 + k * 0.08 }} className="block h-2 origin-left rounded-[4px] group-hover:brightness-125" />
            </button>
          ))}
        </div>
        <p className="text-[15px] leading-[18px]">{conf} / 5 · {["Do not merge yet", "Needs a second look", "Merge after fixing the null currency path", "Safe once the test lands", "Safe to merge"][conf - 1]}</p>
      </div>
    </div>
  );
}

/* ---------- PR inbox ---------- */
const prs = [
  ["Test5", "node-express", 4, "5h ago", "done", 1],
  ["Test8", "node-express", 3, "7h ago", "done", 1],
  ["Refresh session tokens in background", "api-gateway", 482, "1d ago", "done", 3],
  ["Migrate billing to v3 schema", "billing", 476, "2d ago", "done", 3],
  ["Add invoice export endpoint", "api-gateway", 471, "3d ago", "running", 0],
  ["Coupon stacking guard", "checkout", 468, "4d ago", "done", 5],
] as const;
const PrIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B0B3FC" strokeWidth="1.5"><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /><path d="M6 7v10M18 17v-5a5 5 0 0 0-5-5h-2m3-3-3 3 3 3" /></svg>
);
export function PRInbox() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const per = 2;
  const list = useMemo(() => prs.filter((p) => `${p[0]} ${p[1]} #${p[2]}`.toLowerCase().includes(q.toLowerCase())), [q]);
  const pages = Math.max(1, Math.ceil(list.length / per));
  const p = Math.min(page, pages - 1);
  const shown = list.slice(p * per, p * per + per);
  return (
    <section>
      <div className={`${wrap} flex flex-col gap-12 py-24 md:py-[112px] lg:flex-row lg:gap-16`}>
        <div className="flex shrink-0 flex-col gap-4 lg:w-[380px]">
          <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-accent">PULL REQUESTS · TRY THE SEARCH</p>
          <h2 className="text-[clamp(36px,4vw,48px)] font-semibold leading-[1.04] tracking-[-0.04em]">Every review, one search away.</h2>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-8 rounded-[16px] border border-border bg-panel p-5 md:p-8">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[12px] leading-4 tracking-[0.08em] text-[#9DA193]">PULL REQUESTS</p>
            <p className="text-[32px] font-semibold leading-10 tracking-[-0.02em]">Recent Reviews</p>
            <p className="text-[14px] leading-[22px] text-[#9DA193]">Pull requests and merge requests Feluda has reviewed.</p>
          </div>
          <label className="flex h-11 w-full max-w-[420px] items-center gap-3 rounded-[8px] border border-[#34362E] bg-[#1C1D1A] px-3.5 transition-colors focus-within:border-accent">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9DA193" strokeWidth="1.5"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>
            <input value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} placeholder="Search pull requests" aria-label="Search pull requests" className="min-w-0 flex-1 bg-transparent text-[14px] leading-[18px] outline-none placeholder:text-[#9DA193]" />
            {q && <button onClick={() => setQ("")} className="text-[12px] text-muted hover:text-text">clear</button>}
          </label>
          <div className="min-h-[178px] overflow-hidden rounded-[12px] border border-[#34362E] bg-[#1C1D1A]">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((r, i) => (
                <motion.a key={r[2]} href="#" onClick={(e) => e.preventDefault()} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className={`group flex items-center gap-4 p-5 transition-colors hover:bg-[#242620] md:gap-[18px] md:p-6 ${i < shown.length - 1 ? "border-b border-[#34362E]" : ""}`}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-[#242620] group-hover:bg-[#2c2e27]"><PrIcon /></span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className="truncate text-[17px] font-semibold leading-[22px] text-[#EEEEE5]">{r[0]}</span>
                    <span className="truncate font-mono text-[12px] leading-4 text-[#9DA193]">{r[1]} · #{r[2]} · 1 review · {r[3]}</span>
                  </span>
                  {r[4] === "done"
                    ? <span className="hidden rounded-[6px] bg-[#25352B] px-[9px] py-1.5 text-[12px] leading-4 text-[#A7CFB2] sm:block">✓ Completed</span>
                    : <span className="hidden items-center gap-1.5 rounded-[6px] bg-[#3A3022] px-[9px] py-1.5 text-[12px] leading-4 text-warning sm:flex"><span className="h-2.5 w-2.5 animate-spin rounded-full border border-warning border-t-transparent" />Reviewing</span>}
                  <span className="font-mono text-[13px] leading-4 text-[#9DA193]">{r[5]}/5</span>
                  <span className="text-[20px] leading-6 text-[#9DA193] transition-transform group-hover:translate-x-1">›</span>
                </motion.a>
              ))}
            </AnimatePresence>
            {!shown.length && <p className="p-10 text-center text-[14px] text-muted">No reviews match &ldquo;{q}&rdquo;.</p>}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12px] leading-4 text-[#9DA193]">{list.length ? `${p * per + 1}–${p * per + shown.length} of ${list.length}` : "0 of 0"}</span>
            <div className="flex items-center gap-1 text-[17px] leading-[22px]">
              {[["«", 0], ["‹", p - 1]].map(([s, to]) => <button key={s} disabled={p === 0} onClick={() => setPage(to as number)} className="p-2 text-[#62665B] enabled:hover:text-text">{s}</button>)}
              {Array.from({ length: pages }, (_, i) => (
                <button key={i} onClick={() => setPage(i)} className={`grid h-8 w-8 place-items-center rounded-[6px] font-mono text-[12px] ${i === p ? "border border-[#34362E] bg-[#1C1D1A] text-[#EEEEE5]" : "text-[#62665B] hover:text-text"}`}>{i + 1}</button>
              ))}
              {[["›", p + 1], ["»", pages - 1]].map(([s, to]) => <button key={s} disabled={p >= pages - 1} onClick={() => setPage(to as number)} className="p-2 text-[#62665B] enabled:hover:text-text">{s}</button>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Analytics ---------- */
const ranges = {
  "All time": { stats: ["1,284", "3.2h", "213", "12/14"], sub: ["in the last 30 days", "−41% since Feluda", "31 high · 92 medium", "via GitHub"], a: [190, 160, 140, 100, 70, 42, 18], b: [205, 188, 170, 160, 148, 140, 128], tip: ["Sep 27 · 64 reviews", "9 bugs caught"] },
  "This week": { stats: ["212", "2.9h", "38", "12/14"], sub: ["since Monday", "−9% vs last week", "6 high · 17 medium", "via GitHub"], a: [150, 120, 160, 90, 110, 60, 80], b: [200, 190, 196, 170, 184, 160, 176], tip: ["Thu · 48 reviews", "11 bugs caught"] },
  "This month": { stats: ["874", "3.0h", "142", "12/14"], sub: ["October", "−22% vs September", "19 high · 61 medium", "via GitHub"], a: [180, 150, 130, 140, 90, 70, 50], b: [206, 196, 190, 180, 170, 166, 150], tip: ["Oct 9 · 71 reviews", "14 bugs caught"] },
} as const;
type Range = keyof typeof ranges;
const curve = (ys: readonly number[]) => {
  const x = (i: number) => (i * 1182) / (ys.length - 1);
  return ys.map((y, i) => (i === 0 ? `M0,${y}` : `C${x(i - 0.5)},${ys[i - 1]} ${x(i - 0.5)},${y} ${x(i)},${y}`)).join(" ");
};

export function Analytics() {
  const [r, setR] = useState<Range>("All time");
  const [hover, setHover] = useState(4);
  const d = ranges[r];
  const labels = ["TOTAL REVIEWS", "AVG MERGE TIME", "BUGS CAUGHT", "REPOS ENABLED"];
  const hx = (hover * 1182) / 6, hy = d.a[hover];
  const exportCsv = () => {
    const csv = "metric,value,note\n" + labels.map((l, i) => `${l},${d.stats[i]},${d.sub[i]}`).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `feluda-analytics-${r.toLowerCase().replace(" ", "-")}.csv`;
    a.click();
  };
  return (
    <section id="analytics" className="scroll-mt-24 border-t border-border">
      <div className={`${wrap} flex flex-col gap-10 py-24 md:py-[112px]`}>
        <SecHead eyebrow="ANALYTICS · ALL TIME / THIS WEEK / THIS MONTH" title="Count the bugs that never shipped." side="PR reviews and bugs caught over time, by severity, ready to export for your next planning review." />
        <div className="flex flex-col gap-7 rounded-[16px] border border-border bg-panel p-5 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-1 overflow-x-auto scrollbar-none">
              {(Object.keys(ranges) as Range[]).map((k) => (
                <button key={k} onClick={() => setR(k)} className="relative shrink-0 rounded-[6px] px-3.5 py-2 text-[14px] leading-[18px]">
                  {r === k && <motion.span layoutId="an-tab" className="absolute inset-0 rounded-[6px] bg-hover" />}
                  <span className={`relative ${r === k ? "text-text" : "text-muted"}`}>{k}</span>
                </button>
              ))}
            </div>
            <button onClick={exportCsv} className="shrink-0 rounded-[6px] border border-border px-3.5 py-2 text-[14px] leading-[18px] hover:bg-hover">Export</button>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:flex lg:justify-between">
            {labels.map((l, i) => (
              <div key={l} className="flex flex-col gap-1.5 lg:w-[260px]">
                <p className="font-mono text-[11px] leading-[14px] tracking-[0.08em] text-muted">{l}</p>
                <AnimatePresence mode="wait">
                  <motion.p key={r + i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-[36px] font-medium leading-[44px] tracking-[-0.04em] md:text-[48px] md:leading-[58px]">{d.stats[i]}</motion.p>
                </AnimatePresence>
                <p className={`text-[13px] leading-4 ${i === 1 ? "text-success" : "text-muted"}`}>{d.sub[i]}</p>
              </div>
            ))}
          </div>
          <div className="relative overflow-x-auto scrollbar-none">
            <svg viewBox="0 0 1182 220" className="min-w-[640px]" onMouseMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); setHover(Math.max(0, Math.min(6, Math.round(((e.clientX - b.left) / b.width) * 6)))); }}>
              {[55, 110, 165, 219].map((y) => <line key={y} x1="0" x2="1182" y1={y} y2={y} stroke="#34362E" />)}
              <motion.path key={r + "a"} d={curve(d.a)} fill="none" stroke="#B0B3FC" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
              <motion.path key={r + "b"} d={curve(d.b)} fill="none" stroke="#FF9198" strokeWidth="2" strokeDasharray="4 6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
              <line x1={hx} x2={hx} y1="0" y2="219" stroke="#34362E" strokeDasharray="2 4" />
              <motion.circle cx={hx} cy={hy} initial={false} animate={{ cx: hx, cy: hy }} r="5" fill="#B0B3FC" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              <motion.g animate={{ x: Math.min(hx + 12, 1182 - 160), y: Math.max(hy - 40, 0) }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                <rect width="150" height="54" rx="8" fill="#242620" stroke="#34362E" />
                <text x="14" y="22" fontSize="13" fill="#EEEEE5">{hover === 4 ? d.tip[0] : `Point ${hover + 1} · ${Math.round((220 - hy) / 2.4)} reviews`}</text>
                <text x="14" y="42" fontSize="13" fill="#FF9198">{hover === 4 ? d.tip[1] : `${Math.round((220 - d.b[hover]) / 8)} bugs caught`}</text>
              </motion.g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Rules ---------- */
const levels = [["Low", "Quietest. Only the most severe findings are commented on."], ["Medium", "Balanced. Comments on P2s less often."], ["High", "Everything, including nitpicks."]] as const;
function Preview({ items }: { items: string[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4 lg:w-[424px] lg:shrink-0">
      <p className="font-mono text-[11px] leading-[14px] tracking-[0.6px] text-[#9DA193]">PREVIEW / THE COMMENT FELUDA WILL POST</p>
      <div className="flex flex-col gap-4 rounded-[12px] border border-[#34362E] bg-[#1C1D1A] p-6">
        <p className="text-[18px] font-semibold leading-[22px]">feluda</p>
        <span className="h-px bg-[#34362E]" />
        <AnimatePresence initial={false}>
          {items.map((it) => (
            <motion.div key={it} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <button onClick={() => setOpen(open === it ? null : it)} className="flex w-full justify-between rounded-[6px] bg-[#242620] px-4 py-3.5 text-left hover:bg-[#2c2e27]">
                <span className="text-[14px] leading-[18px]">{it}</span>
                <span className={`text-[16px] leading-5 text-[#9DA193] transition-transform ${open === it ? "rotate-90" : ""}`}>›</span>
              </button>
              <AnimatePresence>{open === it && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-4 pt-2 text-[13px] leading-5 text-muted">{{ "PR Summary": "Migrates billing reads to the v3 schema; currency can now be null.", "Issue Table": "HIGH billing/convert.ts:31 · null currency\nMED invoices/pdf.ts:12 · stale cache", "Confidence Score": "●●●○○ 3/5 — reproduced on staging data.", "Style nits": "8 naming and import-order suggestions.", "Re-review on push": "Re-reviewed after 2 new commits · 1 thread resolved." }[it] ?? ""}</motion.p>}</AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
export function Rules() {
  const [tab, setTab] = useState<"scope" | "commit">("scope");
  const [lvl, setLvl] = useState(1);
  const [retrigger, setRetrigger] = useState(true);
  const [desc, setDesc] = useState(false);
  const scopeItems = ["PR Summary", "Issue Table", "Confidence Score", ...(lvl === 2 ? ["Style nits"] : [])].slice(0, lvl === 0 ? 2 : 4);
  const commitItems = ["PR Summary", "Issue Table", ...(retrigger ? ["Re-review on push"] : []), "Confidence Score"];
  const card = (active: boolean, which: "scope" | "commit", body: React.ReactNode) => (
    <motion.div layout onClick={() => !active && setTab(which)} animate={{ opacity: active ? 1 : 0.55 }}
      className={`rounded-[16px] border bg-bg p-5 md:p-10 ${active ? "border-solid border-border" : "cursor-pointer border-dashed border-border hover:opacity-80"}`}>
      <div className="flex flex-col gap-8 lg:flex-row">{body}</div>
    </motion.div>
  );
  return (
    <section className="border-t border-border">
      <div className={`${wrap} flex flex-col gap-10 py-24 md:py-[112px]`}>
        <SecHead eyebrow="HOUSE RULES" title="Decide how loud the detective gets.">
          <div className="flex gap-1 rounded-full border border-border p-1">
            {([["scope", "Comment scope"], ["commit", "Commit behavior"]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className="relative rounded-full px-4 py-2 text-[14px] leading-[18px]">
                {tab === k && <motion.span layoutId="rules-tab" className="absolute inset-0 rounded-full bg-hover" />}
                <span className={`relative ${tab === k ? "text-text" : "text-muted"}`}>{l}</span>
              </button>
            ))}
          </div>
        </SecHead>
        <div className={`flex gap-10 ${tab === "commit" ? "flex-col-reverse" : "flex-col"}`}>
          {card(tab === "scope", "scope", <>
            <div className="flex flex-1 flex-col gap-5 lg:max-w-[640px]">
              <p className="text-[26px] font-semibold leading-[115%] md:text-[30px]">How much should Feluda comment?</p>
              <p className="text-[15px] leading-[150%] text-[#9DA193]">Sets the severity threshold a finding must clear before it becomes a comment.</p>
              <div role="radiogroup" className="flex flex-col gap-5">
                {levels.map(([t, d], i) => (
                  <button key={t} role="radio" aria-checked={lvl === i} onClick={(e) => { e.stopPropagation(); setTab("scope"); setLvl(i); }}
                    className={`flex items-center justify-between gap-4 rounded-[12px] border p-6 text-left transition-colors duration-300 ${lvl === i ? "border-[#B0B3FC] bg-[#242620]" : "border-[#34362E] bg-[#1C1D1A] hover:border-[#4a4c42]"}`}>
                    <span className="flex flex-col gap-2"><span className="text-[18px] font-medium leading-[22px]">{t}</span><span className="text-[14px] leading-[18px] text-[#9DA193]">{d}</span></span>
                    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors ${lvl === i ? "border-[#B0B3FC] bg-[#B0B3FC]" : "border-[#34362E]"}`} />
                  </button>
                ))}
              </div>
            </div>
            <Preview items={scopeItems} />
          </>)}
          {card(tab === "commit", "commit", <>
            <div className="flex flex-1 flex-col gap-5 lg:max-w-[640px]">
              <p className="text-[26px] font-semibold leading-[115%] md:text-[30px]">How should Feluda behave on new commits?</p>
              <p className="text-[15px] leading-[150%] text-[#9DA193]">Controls what happens when someone pushes to an open pull request.</p>
              {([["Retrigger review on new commits", "A fresh review on each push.", retrigger, () => setRetrigger(!retrigger)], ["Update PR description", "Appends findings into the PR body. Gets messy with templates.", desc, () => setDesc(!desc)]] as const).map(([t, d, v, f]) => (
                <div key={t} className="rounded-[12px] border border-[#34362E] bg-[#1C1D1A] px-6 py-2">
                  <div className="flex items-center justify-between gap-4 py-4">
                    <span className="flex flex-col gap-[5px]"><span className="text-[16px] font-medium leading-5">{t}</span><span className="text-[14px] leading-[18px] text-[#9DA193]">{d}</span></span>
                    <span onClick={(e) => { e.stopPropagation(); setTab("commit"); }}><Toggle on={v} onChange={f} size="sm" label={t} /></span>
                  </div>
                </div>
              ))}
            </div>
            <Preview items={commitItems} />
          </>)}
        </div>
      </div>
    </section>
  );
}

/* ---------- Memory + integrations ---------- */
export function MemoryIntegrations() {
  const [mail, setMail] = useState<"idle" | "open" | "done">("idle");
  const [email, setEmail] = useState("");
  return (
    <section>
      <div className={`${wrap} flex flex-col gap-6 pb-24 md:pb-[112px] lg:flex-row`}>
        <div className="relative flex min-h-[360px] flex-1 flex-col justify-between gap-8 overflow-hidden rounded-[16px] border border-border bg-panel p-8 md:p-10">
          <Dither size={[420, 420]} className="left-[45%] top-[120px] opacity-50" />
          <div className="relative flex flex-col gap-3.5">
            <p className="font-mono text-[11px] leading-[14px] tracking-[0.12em] text-accent">MEMORY · COMING SOON</p>
            <p className="max-w-[400px] text-[30px] font-semibold leading-[36px] tracking-[-0.03em] md:text-[36px] md:leading-10">A detective never forgets a case.</p>
          </div>
          <div className="relative">
            <AnimatePresence mode="wait">
              {mail === "idle" && <motion.button key="b" exit={{ opacity: 0 }} onClick={() => setMail("open")} className="flex h-[42px] items-center rounded-[8px] border border-border bg-bg px-[18px] text-[15px] leading-[18px] hover:border-accent">Join the waitlist</motion.button>}
              {mail === "open" && (
                <motion.form key="f" initial={{ opacity: 0, width: 160 }} animate={{ opacity: 1, width: "100%" }} onSubmit={(e) => { e.preventDefault(); if (/\S+@\S+\.\S+/.test(email)) setMail("done"); }} className="flex h-[42px] max-w-[360px] items-center rounded-[8px] border border-accent bg-bg pl-4 pr-1">
                  <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" aria-label="Email" className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted" />
                  <button className="h-[34px] rounded-[6px] bg-accent px-3 text-[13px] font-semibold text-accent-ink">Join</button>
                </motion.form>
              )}
              {mail === "done" && <motion.p key="d" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex h-[42px] items-center font-mono text-[12px] tracking-[0.1em] text-success">✓ YOU&apos;RE ON THE LIST</motion.p>}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex min-h-[360px] flex-1 flex-col justify-between gap-8 rounded-[16px] border border-border bg-panel p-8 md:p-10">
          <div className="flex flex-col gap-3.5">
            <p className="font-mono text-[11px] leading-[14px] tracking-[0.12em] text-accent">WORKS WHERE YOU WORK</p>
            <p className="max-w-[420px] text-[30px] font-semibold leading-[36px] tracking-[-0.03em] md:text-[36px] md:leading-10">Connect in two minutes. No config files.</p>
          </div>
          <ul>
            {[["GitHub", "GITHUB APP · LIVE", true], ["GitLab", "OAUTH · LIVE", true], ["Slack", "RESULTS DIGEST", false]].map(([n, s, live]) => (
              <li key={n as string} className="group flex justify-between border-t border-border py-3.5">
                <span className="text-[16px] leading-5 transition-transform group-hover:translate-x-1">{n}</span>
                <span className={`flex items-center gap-2 font-mono text-[12px] leading-4 ${live ? "text-success" : "text-muted"}`}>{live && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />}{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
