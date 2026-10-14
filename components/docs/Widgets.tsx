"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const label = "font-mono text-[11px] leading-[14px] tracking-[0.12em]";
const Card = ({ n, title, tone = "accent", right, children }: { n: string; title: string; tone?: "accent" | "danger" | "warning"; right?: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3.5 rounded-[16px] border border-border bg-panel p-6 md:p-7">
    <div className="flex items-center justify-between gap-3">
      <span className={`${label} ${tone === "danger" ? "text-danger" : tone === "warning" ? "text-warning" : "text-accent"}`}>{n} · {title} <span className="text-muted">· TRY IT</span></span>
      {right}
    </div>
    {children}
  </div>
);
const Pill = ({ on, onClick, children, kind = "outline" }: { on: boolean; onClick: () => void; children: React.ReactNode; kind?: "outline" | "fill" | "ghost" }) => (
  <button onClick={onClick} className={`rounded-full px-3.5 py-2 text-[14px] leading-[18px] transition-colors ${kind === "fill" ? (on ? "bg-accent text-accent-ink" : "border border-border text-muted hover:text-text") : kind === "ghost" ? (on ? "bg-hover text-text" : "text-muted hover:text-text") : on ? "border border-accent bg-[#B0B3FC1A] text-text" : "border border-border text-muted hover:text-text"}`}>{children}</button>
);
function useCopy() { const [c, setC] = useState(false); return [c, (t: string) => { navigator.clipboard?.writeText(t); setC(true); setTimeout(() => setC(false), 1200); }] as const; }

/* 01 quick start progress (used in docs home rail) */
export function QuickProgress({ done }: { done: number }) {
  return <div className="h-1.5 rounded-[3px] bg-border"><motion.div animate={{ width: `${(done / 5) * 100}%` }} className="h-1.5 rounded-[3px] bg-accent" /></div>;
}

function PlanW() {
  const [p, setP] = useState("Team");
  const ok = p === "Team" || p === "Enterprise";
  return (
    <Card n="02" title="PUKU TEAM REQUIREMENTS">
      <p className="text-[18px] leading-[22px]">Which Puku plan is your workspace on?</p>
      <div className="flex flex-wrap gap-2">{["Free", "Pro", "Team", "Enterprise"].map((x) => <Pill key={x} on={p === x} onClick={() => setP(x)}>{x}</Pill>)}</div>
      <AnimatePresence mode="wait">
        <motion.div key={String(ok)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className={`flex flex-col gap-1.5 rounded-[10px] border p-4 ${ok ? "border-[#94C7A04D] bg-[#94C7A014]" : "border-[#E8B1874D] bg-[#E8B18714]"}`}>
          <p className={`text-[15px] leading-[18px] ${ok ? "text-success" : "text-warning"}`}>{ok ? "✓ Feluda Review and Attack are included" : "Feluda isn't included on " + p}</p>
          <p className="text-[14px] leading-[18px] text-muted">{ok ? "An org admin needs to connect a provider once." : <>Upgrade to Team to bring in the detective. <Link href="/pricing" className="text-accent">See plans →</Link></>}</p>
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}
function ScopesW() {
  const [p, setP] = useState<"GitHub" | "GitLab">("GitHub");
  const rows = p === "GitHub"
    ? [["contents", "READ", "text-muted"], ["pull_requests", "READ · WRITE", "text-warning"], ["checks", "READ · WRITE", "text-warning"], ["admin, secrets", "NEVER", "text-success"]]
    : [["read_repository", "READ", "text-muted"], ["api (merge requests)", "READ · WRITE", "text-warning"], ["pipelines", "READ · WRITE", "text-warning"], ["admin, secrets", "NEVER", "text-success"]];
  return (
    <Card n="03" title="CONNECT A PROVIDER" right={<div className="flex gap-1">{(["GitHub", "GitLab"] as const).map((x) => <button key={x} onClick={() => setP(x)} className={`rounded-full px-2.5 py-1 text-[12px] leading-4 ${p === x ? "bg-hover text-text" : "text-muted"}`}>{x}</button>)}</div>}>
      <p className="text-[18px] leading-[22px]">Exactly what Feluda can touch</p>
      <AnimatePresence mode="wait">
        <motion.div key={p} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {rows.map(([k, v, c], i) => (
            <div key={k} className="flex justify-between border-t border-border py-2.5"><span className={`font-mono text-[13px] leading-4 ${i === 3 ? "text-muted" : ""}`}>{k}</span><span className={`font-mono text-[11px] leading-[14px] ${c}`}>{v}</span></div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}
function AnalysisW() {
  const [on, setOn] = useState<Record<string, boolean>>({ Summary: true, Diagrams: false, "Issue table": true, Confidence: true });
  const [open, setOpen] = useState<Record<string, boolean>>({ Summary: true, "Issue table": true, Confidence: false, Diagrams: true });
  const body: Record<string, string> = { Summary: "Moves token refresh into middleware.", Diagrams: "client → middleware → refresh() ×2", "Issue table": "HIGH refresh.ts:42 · MED retry.ts:18 · LOW session.ts:7", Confidence: "3/5 — race reproduced from 2 prod traces." };
  const head: Record<string, string> = { Summary: "Summary", Diagrams: "Sequence diagram", "Issue table": "Issue table · 3 rows", Confidence: "Confidence · 3/5" };
  return (
    <Card n="04" title="PR ANALYSIS">
      <div className="flex flex-wrap gap-2">{Object.keys(on).map((k) => <Pill key={k} kind="fill" on={on[k]} onClick={() => setOn((s) => ({ ...s, [k]: !s[k] }))}>{k}</Pill>)}</div>
      <div className="flex min-h-[120px] flex-col gap-2 rounded-[10px] border border-border bg-sidebar p-4">
        <AnimatePresence initial={false}>
          {Object.keys(on).filter((k) => on[k]).map((k) => (
            <motion.div key={k} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <button onClick={() => setOpen((s) => ({ ...s, [k]: !s[k] }))} className="text-[13px] font-semibold leading-4">{open[k] ? "▾" : "▸"} {head[k]}</button>
              {open[k] && <p className="pt-1.5 text-[12px] leading-4 text-muted">{body[k]}</p>}
            </motion.div>
          ))}
        </AnimatePresence>
        {!Object.values(on).some(Boolean) && <p className="text-[12px] text-muted">Nothing enabled — Feluda only posts inline findings.</p>}
      </div>
    </Card>
  );
}
function ScopeW() {
  const [v, setV] = useState(50);
  const lvl = v < 34 ? "Low" : v < 67 ? "Medium" : "High";
  const per = (0.6 + (v / 100) * 5.4).toFixed(1);
  return (
    <Card n="05" title="COMMENT SCOPE">
      <p className="text-[18px] leading-[22px]">How chatty should Feluda be?</p>
      <div className="flex flex-col gap-2">
        <div className="relative h-5">
          <div className="absolute top-[7px] h-1.5 w-full rounded-[3px] bg-border"><div className="h-1.5 rounded-[3px] bg-accent" style={{ width: `${v}%` }} /></div>
          <input type="range" min={0} max={100} value={v} onChange={(e) => setV(+e.target.value)} aria-label="Comment scope" className="absolute inset-0 w-full cursor-pointer opacity-0" />
          <div className="pointer-events-none absolute top-0 h-5 w-5 rounded-full border-[3px] border-accent bg-text" style={{ left: `calc(${v}% - 10px)` }} />
        </div>
        <div className="flex justify-between text-[12px] leading-4">{["Low", "Medium", "High"].map((x) => <span key={x} className={x === lvl ? "text-text" : "text-muted"}>{x}</span>)}</div>
      </div>
      <div className="flex items-baseline gap-3 rounded-[10px] bg-hover px-4 py-3.5">
        <motion.span key={per} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="shrink-0 text-[32px] font-semibold leading-10 tracking-[-0.03em]">{per}</motion.span>
        <span className="text-[13px] leading-[19px] text-muted">comments per PR, replayed on your last 30 pull requests</span>
      </div>
    </Card>
  );
}
function CommitW() {
  const [txt, setTxt] = useState('# .feluda.yml\nreview:\n  retrigger_on_push: true\n  update_description: false\n  scope: medium\n  ignore: ["docs/**", "*.md"]');
  const [copied, copy] = useCopy();
  const err = useMemo(() => {
    const m = txt.match(/scope:\s*(\S+)/);
    if (m && !["low", "medium", "high"].includes(m[1])) return `scope must be low | medium | high (got "${m[1]}")`;
    const b = txt.match(/(retrigger_on_push|update_description):\s*(\S+)/g)?.find((l) => !/(true|false)$/.test(l));
    if (b) return `${b.split(":")[0].trim()} must be true or false`;
    if (!/^review:/m.test(txt)) return "missing top-level review: key";
    return null;
  }, [txt]);
  return (
    <Card n="06" title="COMMIT BEHAVIOR" right={<button onClick={() => copy(txt)} className={`${label} text-muted hover:text-text`}>{copied ? "COPIED ✓" : "COPY ⧉"}</button>}>
      <textarea value={txt} onChange={(e) => setTxt(e.target.value)} spellCheck={false} rows={6} aria-label=".feluda.yml editor"
        className="w-full resize-none rounded-[10px] bg-sidebar p-4 font-mono text-[13px] leading-[22px] text-[#C9CBBF] outline-none focus:ring-1 focus:ring-accent" />
      <p className={`flex items-center gap-2 text-[13px] leading-4 ${err ? "text-danger" : "text-success"}`}><span className={`h-2 w-2 rounded-full ${err ? "bg-danger" : "bg-success"}`} />{err ?? "Valid · matches dashboard settings"}</p>
    </Card>
  );
}
function ExportW() {
  const [f, setF] = useState("cURL");
  const [copied, copy] = useCopy();
  const code: Record<string, string> = {
    CSV: "date,reviews,bugs_caught\n2026-10-01,61,8\n2026-10-02,58,11",
    JSON: '{ "range": "30d",\n  "reviews": 1284,\n  "bugs_caught": 213 }',
    cURL: 'curl feluda.puku.sh/api/v1/analytics \\\n  -H "Authorization: Bearer $PUKU_TOKEN" \\\n  -d range=30d -d metric=bugs_caught',
  };
  return (
    <Card n="07" title="ANALYTICS & EXPORT" right={<div className="flex gap-1">{["CSV", "JSON", "cURL"].map((x) => <button key={x} onClick={() => setF(x)} className={`rounded-full px-2.5 py-1 text-[12px] leading-4 ${f === x ? "bg-hover text-text" : "text-muted hover:text-text"}`}>{x}</button>)}</div>}>
      <div className="group relative rounded-[10px] bg-sidebar p-4">
        <pre className="overflow-x-auto font-mono text-[12px] leading-5 text-[#C9CBBF] scrollbar-none">{code[f]}</pre>
        <button onClick={() => copy(code[f])} className="absolute right-2 top-2 rounded-[6px] border border-border bg-panel px-2 py-1 text-[11px] opacity-0 transition-opacity group-hover:opacity-100">{copied ? "Copied" : "Copy"}</button>
      </div>
      <p className="text-[12px] leading-4 text-muted">[API shape is a placeholder · confirm with eng]</p>
    </Card>
  );
}
function PentestW() {
  const [t, setT] = useState("API");
  const [paths, setPaths] = useState(["/v1/payments/live/*"]);
  const [d, setD] = useState("");
  const k = ({ "Web app": 5.3, API: 4.2, Android: 6.0, MCP: 2.1, LLM: 3.4 } as Record<string, number>)[t] - paths.length * 0.1 + 0.1;
  return (
    <Card n="08" title="RUN A PENTEST" tone="danger">
      <div className="flex flex-wrap gap-1.5">{["Web app", "API", "Android", "MCP", "LLM"].map((x) => <button key={x} onClick={() => setT(x)} className={`rounded-[6px] border px-3 py-1.5 text-[13px] leading-4 ${t === x ? "border-accent text-text" : "border-border text-muted hover:text-text"}`}>{x}</button>)}</div>
      <div className="flex flex-wrap items-center gap-1.5 rounded-[8px] border border-border p-2.5 focus-within:border-accent">
        {paths.map((p) => <button key={p} onClick={() => setPaths((x) => x.filter((y) => y !== p))} className="rounded-[4px] bg-hover px-2 py-[3px] font-mono text-[12px] leading-4">{p} ×</button>)}
        <input value={d} onChange={(e) => setD(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && d.trim()) { setPaths((x) => [...x, d.trim()]); setD(""); } }} placeholder="never touch…" aria-label="Never touch path" className="min-w-[100px] flex-1 bg-transparent text-[12px] leading-4 outline-none placeholder:text-muted" />
      </div>
      <div className="flex items-baseline justify-between"><motion.span key={k} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="text-[28px] font-semibold leading-[34px] tracking-[-0.03em]">~{k.toFixed(1)}K req</motion.span><span className="text-[13px] leading-4 text-muted">~{Math.ceil(k / 1.5)}h · 2 × 5h windows</span></div>
    </Card>
  );
}
function MeterW() {
  const [on, setOn] = useState([true, true]);
  const total = (on[0] ? 2.6 : 0) + (on[1] ? 2.2 : 0) - (on[0] || on[1] ? 0.6 : 0);
  const dots = Math.round(total * 5.2);
  return (
    <Card n="09" title="AI CODE ANALYSIS" tone="danger">
      <p className="text-[18px] leading-[22px]">Tick repos, watch the meter</p>
      <div className="flex flex-wrap gap-[5px]">{Array.from({ length: 25 }, (_, i) => <motion.span key={i} animate={{ backgroundColor: i < dots ? "#b0b3fc" : "#34362e", scale: i < dots ? 1 : 0.8 }} transition={{ delay: i * 0.015 }} className="h-3.5 w-3.5 rounded-full" />)}</div>
      <div className="flex justify-between text-[13px] leading-4">{[["checkout-api", "2.6K"], ["web-dashboard", "2.2K"]].map(([n, c], i) => <button key={n} onClick={() => setOn((o) => o.map((v, k) => (k === i ? !v : v)))} className={on[i] ? "text-text" : "text-muted line-through"}>{on[i] ? "☑" : "☐"} {n} {c}</button>)}</div>
      <p className="text-[13px] leading-4 text-muted">{total > 0 ? `${total.toFixed(1)}K requests · docs context saves ~600` : "Pick at least one repository"}</p>
    </Card>
  );
}
function SurfaceW() {
  const [state, setState] = useState<"idle" | "scan" | "done">("idle");
  const rows = [["promo.demo.puku.sh", "Takeover possible", "text-danger"], ["mail.demo.puku.sh", "DMARC p=none", "text-warning"], ["api.demo.puku.sh", "TLS 1.3 · clean", "text-success"]];
  return (
    <Card n="10" title="ATTACK SURFACE" tone="danger">
      <div className="flex h-[42px] items-center justify-between rounded-[8px] border border-border bg-bg pl-3.5 pr-1.5">
        <span className="font-mono text-[13px] leading-4">demo.puku.sh</span>
        <button onClick={() => { setState("scan"); setTimeout(() => setState("done"), 1600); }} className="flex items-center gap-1.5 rounded-[6px] bg-accent px-2.5 py-1.5 text-[12px] leading-4 text-accent-ink">{state === "scan" && <span className="h-2.5 w-2.5 animate-spin rounded-full border border-accent-ink border-t-transparent" />}{state === "done" ? "Rescan" : "Scan demo"}</button>
      </div>
      <div className="min-h-[100px]">
        {state === "scan" && <p className="caret py-2 font-mono text-[12px] text-muted">enumerating subdomains </p>}
        {state !== "scan" && rows.slice(0, state === "done" ? 3 : 2).map(([a, b, c], i) => (
          <motion.div key={a} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }} className="flex justify-between border-t border-border py-2"><span className="text-[13px] leading-4">{a}</span><span className={`text-[12px] leading-4 ${c}`}>{b}</span></motion.div>
        ))}
      </div>
      <p className="text-[12px] leading-4 text-muted">Sandbox uses a demo domain only</p>
    </Card>
  );
}
function ComplianceW() {
  const [f, setF] = useState("SOC 2");
  const rows: Record<string, [string, string, string][]> = {
    "SOC 2": [["CC6.1", "FEL-142 · open", "text-danger"], ["CC7.1", "Tested · clear", "text-success"]],
    "ISO 27001": [["A.8.3", "FEL-142 · open", "text-danger"], ["A.8.24", "Tested · clear", "text-success"]],
    PCI: [["6.2.4", "FEL-143 · fixed", "text-success"], ["8.3.1", "Tested · clear", "text-success"]],
  };
  return (
    <Card n="11" title="REPORTS & COMPLIANCE" tone="danger">
      <div className="flex gap-1.5">{Object.keys(rows).map((x) => <Pill key={x} kind="ghost" on={f === x} onClick={() => setF(x)}>{x}</Pill>)}</div>
      <AnimatePresence mode="wait"><motion.div key={f} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{rows[f].map(([a, b, c]) => <div key={a} className="flex justify-between border-t border-border py-2"><span className="font-mono text-[13px] leading-4">{a}</span><span className={`text-[12px] leading-4 ${c}`}>{b}</span></div>)}</motion.div></AnimatePresence>
      <a href="#" onClick={(e) => e.preventDefault()} className="text-[12px] leading-4 text-accent">Download sample report →</a>
    </Card>
  );
}
function DecoderW() {
  const opts = [["Missing installation", "Fix: an org owner installs the Feluda GitHub App, then you retry.", "#install"], ["Access denied", "Fix: add the repository under the app's repository access, then retry.", "#access"], ["Paid plan required", "Fix: switch the workspace to Puku Team in Billing.", "#plan"]];
  const [s, setS] = useState(0);
  return (
    <Card n="12" title="TROUBLESHOOTING" tone="warning">
      <p className="text-[18px] leading-[22px]">What are you seeing?</p>
      <div className="flex flex-col gap-1.5">{opts.map(([o], i) => <button key={o} onClick={() => setS(i)} className={`rounded-[6px] border px-3 py-2 text-left text-[13px] leading-4 ${s === i ? "border-warning text-text" : "border-border text-muted hover:text-text"}`}>{s === i ? "●" : "○"} {o}</button>)}</div>
      <AnimatePresence mode="wait"><motion.p key={s} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[13px] leading-5 text-muted">{opts[s][1]} <a href={opts[s][2]} className="text-accent">Read more →</a></motion.p></AnimatePresence>
    </Card>
  );
}
function LimitsW() {
  const [prs, setPrs] = useState(320);
  const [pt, setPt] = useState(1);
  const pct = Math.round(((prs * 9 + pt * 10300) / 19000) * 100);
  return (
    <Card n="13" title="REQUESTS & LIMITS">
      {[["PRs / month", prs, setPrs, 20, 600, "accent"], ["Pentests / month", pt, setPt, 0, 4, "danger"]].map(([l, v, set, min, max, c]) => (
        <label key={l as string} className="flex flex-col gap-2">
          <span className="flex justify-between text-[13px] leading-4"><span className="text-muted">{l as string}</span><span>{v as number}</span></span>
          <input type="range" min={min as number} max={max as number} value={v as number} onChange={(e) => (set as (n: number) => void)(+e.target.value)} className={`w-full ${c === "danger" ? "accent-[#ff9198]" : "accent-[#b0b3fc]"}`} />
        </label>
      ))}
      <p className={`text-[14px] leading-[18px] ${pct <= 90 ? "text-success" : "text-danger"}`}>{pct <= 90 ? `Fits Puku Team · ~${pct}% of monthly requests` : `~${pct}% — runs pause at 90%. Talk to us about Enterprise.`}</p>
    </Card>
  );
}

export const widgets: Record<string, () => React.ReactElement> = { plan: PlanW, scopes: ScopesW, analysis: AnalysisW, scope: ScopeW, commit: CommitW, export: ExportW, pentest: PentestW, meter: MeterW, surface: SurfaceW, compliance: ComplianceW, decoder: DecoderW, limits: LimitsW };
export function Widget({ id }: { id: string }) { const W = widgets[id]; return W ? <W /> : null; }
