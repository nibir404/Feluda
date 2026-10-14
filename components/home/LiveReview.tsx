"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "../Logo";

type Line = { n: string; t: string; kind?: "add" | "hit" };
const findings = [
  {
    sev: "HIGH", c: "danger", title: "Race condition on token refresh", loc: "session/refresh.ts:42", file: "session/refresh.ts", stat: "+12 −4", conf: 3,
    lines: [
      { n: "39", t: "  export async function refresh(session) {" }, { n: "40", t: "    const token = await store.get(session.id)" },
      { n: "41 +", t: "  if (isExpired(token)) {", kind: "add" }, { n: "42 +", t: "    const next = await provider.refresh(token)", kind: "hit" },
      { n: "43 +", t: "    await store.set(session.id, next)", kind: "add" }, { n: "44 +", t: "  }", kind: "add" },
    ] as Line[],
    body: "Two parallel requests can both see an expired token and refresh it twice. The provider then revokes the first refresh token, so one user is randomly logged out. I traced this to the 0.4% of 401s in production since Sep 28.",
    fix: "+ return lock(session.id, async () => {\n+   const next = await provider.refresh(token)\n+   await store.set(session.id, next)\n+ })",
  },
  {
    sev: "MED", c: "warning", title: "Unhandled rejection in retry loop", loc: "session/retry.ts:18", file: "session/retry.ts", stat: "+6 −1", conf: 4,
    lines: [
      { n: "15", t: "  export function withRetry(fn, n = 3) {" }, { n: "16", t: "    return async (...args) => {" },
      { n: "17 +", t: "    for (let i = 0; i < n; i++) {", kind: "add" }, { n: "18 +", t: "      fn(...args).catch(() => sleep(2 ** i))", kind: "hit" },
      { n: "19 +", t: "    }", kind: "add" }, { n: "20", t: "  }" },
    ] as Line[],
    body: "The promise from fn() is never awaited, so failures escape the loop and crash the worker on Node 20. The last attempt's error is also swallowed, hiding real outages.",
    fix: "+ try { return await fn(...args) }\n+ catch (e) { if (i === n - 1) throw e\n+   await sleep(2 ** i) }",
  },
  {
    sev: "LOW", c: "muted", title: "Magic number for TTL", loc: "config/session.ts:7", file: "config/session.ts", stat: "+1 −1", conf: 5,
    lines: [
      { n: "5", t: "  export const session = {" }, { n: "6", t: "    cookie: 'sid'," },
      { n: "7 +", t: "    ttl: 86400," , kind: "hit" }, { n: "8", t: "  }" },
    ] as Line[],
    body: "86400 is repeated in three files with two different meanings (seconds vs. ms in cache.ts). Name it once so the next change doesn’t miss a copy.",
    fix: "+ export const SESSION_TTL_S = 60 * 60 * 24\n+   ttl: SESSION_TTL_S,",
  },
];
const sevStyle: Record<string, string> = { danger: "bg-danger/[.14] text-danger", warning: "bg-warning/[.14] text-warning", muted: "bg-hover text-muted" };

export default function LiveReview() {
  const [sel, setSel] = useState(0);
  const [applied, setApplied] = useState<number[]>([]);
  const [trace, setTrace] = useState(false);
  const [dismissed, setDismissed] = useState<number[]>([]);
  const f = findings[sel];
  const done = applied.includes(sel);
  const resolved = applied.length + dismissed.length;
  const conf = Math.min(5, 3 + resolved);

  return (
    <section className="border-t border-border" aria-labelledby="live-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-24 md:px-12 md:py-[112px] xl:px-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-accent">LIVE REVIEW · INTERACTIVE</p>
            <h2 id="live-title" className="max-w-[680px] text-[clamp(38px,4.5vw,56px)] font-semibold leading-[1.04] tracking-[-0.04em]">Catches the bug your reviewer scrolled past.</h2>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-panel border border-border bg-sidebar lg:flex-row">
          <div className="flex shrink-0 flex-col border-b border-border lg:w-[360px] lg:border-b-0 lg:border-r">
            <div className="flex flex-col gap-1 border-b border-border p-5">
              <p className="font-mono text-[11px] leading-[14px] tracking-[0.06em] text-muted">PR #482 · api-gateway</p>
              <p className="text-[17px] font-semibold leading-[22px]">Refresh session tokens in background</p>
            </div>
            {findings.map((x, i) => (
              <button key={x.loc} onClick={() => { setSel(i); setTrace(false); }}
                className={`flex gap-3 border-l-2 px-5 py-4 text-left transition-colors ${sel === i ? "bg-hover" : "border-transparent hover:bg-hover/50"}`}
                style={{ borderLeftColor: sel === i ? `var(--color-${x.c === "muted" ? "muted" : x.c})` : "transparent" }}>
                <span className={`h-fit rounded-[4px] px-1.5 py-0.5 font-mono text-[11px] leading-[14px] ${sevStyle[x.c]}`}>{x.sev}</span>
                <span className="flex flex-col gap-1">
                  <span className={`text-[15px] leading-[18px] ${applied.includes(i) || dismissed.includes(i) ? "text-muted line-through" : ""}`}>{x.title}</span>
                  <span className="font-mono text-[12px] leading-4 text-muted">{x.loc}</span>
                </span>
                {applied.includes(i) && <span className="ml-auto self-center text-success">✓</span>}
              </button>
            ))}
            <div className="mt-auto flex flex-col gap-2 border-t border-border p-5">
              <p className="font-mono text-[11px] leading-[14px] tracking-[0.06em] text-muted">CONFIDENCE</p>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((k) => <motion.span key={k} animate={{ backgroundColor: k < conf ? "#b0b3fc" : "#34362e" }} className="h-1.5 w-11 rounded-[3px]" />)}
              </div>
              <p className="text-[14px] leading-[18px]">{conf} / 5 · {conf === 5 ? "Safe to merge" : "Safe to merge after the fix"}</p>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col bg-bg pb-5 pr-5">
            <div className="flex justify-between border-b border-border px-5 py-3.5 font-mono text-[13px] leading-4">
              <span>{f.file}</span><span className="text-muted">{f.stat}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={sel + String(done)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-x-auto py-3 font-mono text-[13px] leading-6 scrollbar-none">
                {f.lines.map((l) => (
                  <div key={l.n} className={`whitespace-pre px-5 ${l.kind === "hit" ? (done ? "border-l-2 border-success bg-success/[.14]" : "border-l-2 border-danger bg-danger/[.14]") : l.kind === "add" ? "bg-success/[.08]" : ""}`}>
                    <span className={l.kind ? "text-success" : "text-muted"}>{l.n.padEnd(5)}{l.kind === "hit" && done ? f.fix.split("\n")[0].replace(/^\+ /, "") : l.t}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={sel} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="ml-5 flex flex-col gap-3.5 rounded-[10px] border border-accent bg-panel p-5 md:ml-auto md:w-[calc(100%-56px)]">
                <div className="flex items-center gap-2.5">
                  <Logo size={20} />
                  <b className="text-[15px] font-semibold leading-[18px]">feluda</b>
                  <span className="text-[13px] leading-4 text-muted">commented just now</span>
                </div>
                <p className="text-[15px] leading-[23px]">{f.body}</p>
                <pre className="overflow-x-auto rounded-[6px] bg-sidebar px-3.5 py-3 font-mono text-[13px] leading-[21px] text-success">{f.fix}</pre>
                <AnimatePresence>
                  {trace && (
                    <motion.ol initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-wrap items-center gap-2 overflow-hidden font-mono text-[11px]">
                      {["diff " + f.file, "3 callers read", "1,204 log lines", "hypothesis confirmed"].map((s, i, a) => (
                        <li key={s} className="flex items-center gap-2"><span className="rounded-[6px] border border-border px-2 py-1">{s}</span>{i < a.length - 1 && <span className="text-accent">→</span>}</li>
                      ))}
                    </motion.ol>
                  )}
                </AnimatePresence>
                <div className="flex flex-wrap gap-2.5">
                  <button disabled={done} onClick={() => setApplied((a) => [...a, sel])} className="btn btn-primary disabled:opacity-60">{done ? "Fix applied ✓" : "Apply fix"}</button>
                  <button onClick={() => setTrace((t) => !t)} className="flex h-9 items-center rounded-[6px] border border-border px-3.5 text-[14px] hover:bg-hover">{trace ? "Hide trace" : "Show trace"}</button>
                  <button onClick={() => { setDismissed((d) => (d.includes(sel) ? d : [...d, sel])); setSel((sel + 1) % 3); }} className="flex h-9 items-center px-3.5 text-[14px] text-muted hover:text-text">Dismiss</button>
                  {resolved > 0 && <button onClick={() => { setApplied([]); setDismissed([]); }} className="ml-auto font-mono text-[11px] text-muted hover:text-text">reset</button>}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
