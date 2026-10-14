"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const tabs = {
  "01 PR Analysis": [
    ["PR Summary", "A text summary of the changes", true],
    ["Sequence Diagrams", "How the change flows between services", false],
    ["Issue Table", "The files that matter, ranked", true],
    ["Confidence Score", "Out of 5, with the reasoning", true],
  ],
  "02 Comment Scope": [
    ["Logic bugs", "Null paths, races, wrong conditions", true],
    ["Security holes", "Injection, auth, secrets, IDOR", true],
    ["Performance", "N+1 queries, hot loops, leaks", true],
    ["Style nits", "Off by default. Your linter has this.", false],
  ],
  "03 Commit Behavior": [
    ["Suggested fixes", "One-click commit on the line", true],
    ["Request changes on HIGH", "Blocks merge until resolved", true],
    ["Re-review on push", "Resolves its own threads", true],
    ["Auto-push fixes", "To a side branch, never main", false],
  ],
  "04 Developer Tools": [
    ["Slack digest", "One message per merged PR", false],
    ["Linear issues", "For findings you defer", true],
    ["Puku memory", "Learns your codebase conventions", true],
    ["CLI", "feluda review --local before you push", false],
  ],
} as const;
type Tab = keyof typeof tabs;

export default function Configure() {
  const [tab, setTab] = useState<Tab>("01 PR Analysis");
  const [on, setOn] = useState<Record<string, boolean>>(() => Object.fromEntries(Object.values(tabs).flat().map(([k, , v]) => [k, v])));
  const [open, setOpen] = useState<Record<string, boolean>>({ "Confidence Score": false });
  const flip = (k: string) => setOn((s) => ({ ...s, [k]: !s[k] }));

  const preview = [
    on["PR Summary"] && { k: "PR Summary", body: <p className="text-[14px] leading-[21px] text-muted">Moves token refresh into middleware. Introduces a race when two requests refresh at once.</p> },
    on["Sequence Diagrams"] && { k: "Sequence Diagrams", body: <pre className="font-mono text-[12px] leading-5 text-muted">{"client ──▶ middleware ──▶ refresh()\n        └▶ middleware ──▶ refresh()  ⚠ same token"}</pre> },
    on["Issue Table"] && { k: "Issue Table", body: <pre className="overflow-x-auto font-mono text-[12px] leading-5 text-muted">{[on["Logic bugs"] || on["Security holes"] ? "HIGH  session/refresh.ts:42   race on refresh" : null, on["Logic bugs"] ? "MED   session/retry.ts:18     unhandled reject" : null, on["Style nits"] ? "LOW   config/session.ts:7     magic TTL" : null, on["Performance"] ? "LOW   orders/list.ts:31       N+1 on items" : null].filter(Boolean).join("\n") || "No findings in scope."}</pre> },
    on["Confidence Score"] && { k: "Confidence Score", inline: <span className="font-mono text-[13px] leading-4 text-accent">●●●○○ 3/5</span>, body: <p className="text-[14px] leading-[21px] text-muted">Race reproduced from 2 prod traces; retry issue inferred from code only.</p> },
    on["Suggested fixes"] && { k: "Suggested fix", inline: <span className="rounded-[6px] bg-success/15 px-2 py-0.5 font-mono text-[11px] text-success">commit</span>, body: <pre className="font-mono text-[12px] leading-5 text-success">{"+ return lock(session.id, refreshOnce)"}</pre> },
  ].filter(Boolean) as { k: string; body: React.ReactNode; inline?: React.ReactNode }[];

  return (
    <section className="border-t border-border" aria-labelledby="cfg-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-24 md:px-12 md:py-[112px] xl:px-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-accent">REVIEW CONFIGURATION · TRY IT</p>
            <h2 id="cfg-title" className="max-w-[620px] text-[clamp(38px,4.5vw,56px)] font-semibold leading-[1.04] tracking-[-0.04em]">Tell the detective what to report.</h2>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col rounded-panel border border-border bg-panel">
            <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-border p-2 scrollbar-none">
              {(Object.keys(tabs) as Tab[]).map((t) => (
                <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className="relative shrink-0 rounded-[6px] px-3 py-2 text-[14px] leading-[18px]">
                  {tab === t && <motion.span layoutId="cfg-tab" className="absolute inset-0 rounded-[6px] bg-hover" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
                  <span className={`relative ${tab === t ? "text-text" : "text-muted"}`}>{t}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.ul key={tab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}>
                {tabs[tab].map(([k, d], i) => (
                  <li key={k} className={i < 3 ? "border-b border-border" : ""}>
                    <button role="switch" aria-checked={on[k]} onClick={() => flip(k)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-hover/40">
                      <span className="flex flex-col gap-1"><span className="text-[16px] leading-5">{k}</span><span className="text-[14px] leading-[18px] text-muted">{d}</span></span>
                      <span className={`flex h-[22px] w-[38px] shrink-0 items-center rounded-full p-[3px] transition-colors duration-300 ${on[k] ? "justify-end bg-accent" : "justify-start bg-border"}`}>
                        <motion.span layout transition={{ type: "spring", stiffness: 700, damping: 34 }} className={`h-4 w-4 rounded-full ${on[k] ? "bg-accent-ink" : "bg-muted"}`} />
                      </span>
                    </button>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 flex-col gap-3 rounded-panel border border-border bg-sidebar p-6 lg:w-[500px]">
            <p className="font-mono text-[11px] leading-[14px] tracking-[0.1em] text-muted">PREVIEW · WHAT FELUDA POSTS ON YOUR PR</p>
            <AnimatePresence initial={false}>
              {preview.map((p) => (
                <motion.div key={p.k} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                  <div className="flex flex-col gap-1.5 rounded-[8px] border border-border bg-panel px-4 py-3.5">
                    <button onClick={() => setOpen((o) => ({ ...o, [p.k]: !(o[p.k] ?? true) }))} className="flex items-center justify-between text-left">
                      <span className="text-[15px] font-semibold leading-[18px]">{(open[p.k] ?? true) ? "▾" : "▸"} {p.k}</span>{p.inline}
                    </button>
                    <AnimatePresence initial={false}>
                      {(open[p.k] ?? true) && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">{p.body}</motion.div>}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {!preview.length && <p className="py-8 text-center text-[14px] text-muted">Nothing enabled. Feluda will stay quiet.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
