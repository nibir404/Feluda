"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import heat from "@/lib/heatmap.json";
import { Dither, SecHead, wrap } from "../ui";

/* ---------- Hero: report stack (fans out on hover) ---------- */
export function ReportStack() {
  const [fan, setFan] = useState(false);
  return (
    <div className="relative mx-auto h-[520px] w-[360px] max-w-full lg:mt-10 lg:w-[460px]" onMouseEnter={() => setFan(true)} onMouseLeave={() => setFan(false)} onClick={() => setFan((f) => !f)} data-cursor>
      <motion.div animate={{ rotate: fan ? 14 : 8, x: fan ? 40 : 0 }} transition={{ type: "spring", stiffness: 120, damping: 16 }} className="absolute left-[60px] top-[30px] h-[470px] w-[300px] origin-top-left rounded-[12px] border border-border bg-[#10110F] sm:w-[360px]" />
      <motion.div animate={{ rotate: fan ? 6 : 3, x: fan ? 18 : 0 }} transition={{ type: "spring", stiffness: 120, damping: 16 }} className="absolute left-[30px] top-[15px] h-[470px] w-[300px] origin-top-left rounded-[12px] border border-border bg-sidebar sm:w-[360px]" />
      <motion.div animate={{ rotate: fan ? -5 : -3, y: fan ? -8 : 0 }} transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="absolute left-0 top-0 flex h-[470px] w-[300px] origin-top-left flex-col gap-[18px] rounded-[12px] border border-border bg-panel p-8 shadow-[0_40px_80px_#00000080] sm:w-[360px]">
        <div className="flex justify-between font-mono text-[10px] leading-3 tracking-[0.14em] text-muted"><span>FELUDA ATTACK · REPORT</span><span>SOC 2 · ISO</span></div>
        <p className="text-[26px] font-semibold leading-8 tracking-[-0.03em] sm:text-[30px]">White-box assessment of checkout-api</p>
        <div className="flex gap-5 border-y border-border py-4">
          {[["2", "exploited", "text-danger"], ["331", "blocked", ""], ["42", "endpoints", ""]].map(([n, l, c]) => (
            <div key={l} className="flex flex-col gap-0.5"><span className={`text-[30px] font-semibold leading-9 ${c}`}>{n}</span><span className="text-[11px] leading-[14px] text-muted">{l}</span></div>
          ))}
        </div>
        <div className="flex flex-col gap-2.5 text-[13px] leading-4">
          <p>FEL-142 · Cross-tenant order read</p><p>FEL-143 · JWT alg=none impersonation</p><p className="text-muted">11 hypotheses disproved, with evidence</p>
        </div>
        <motion.div initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1, rotate: -6 }} transition={{ delay: 1, type: "spring", stiffness: 200, damping: 12 }}
          className="mt-auto self-start rounded-[4px] border-2 border-danger px-3 py-1.5 font-mono text-[12px] leading-4 tracking-[0.12em] text-danger">ACTION REQUIRED</motion.div>
      </motion.div>
    </div>
  );
}

/* ---------- Launch wizard ---------- */
const types = ["Web app", "API", "Android app", "MCP server", "AI / LLM feature"];
export function Launch() {
  const [type, setType] = useState("API");
  const [url, setUrl] = useState("https://staging.checkout.puku.sh");
  const [ctx, setCtx] = useState([["puku/checkout-api", "repository · main"], ["docs/openapi.yaml", "OpenAPI 3.1 · 42 endpoints"]]);
  const [never, setNever] = useState(["/v1/payments/live/*", "/admin/billing/*"]);
  const [draft, setDraft] = useState("");
  const [step, setStep] = useState(0);
  const verified = /^https:\/\/[\w.-]+\.puku\.sh/.test(url);
  const reqs = (2.4 + ctx.length * 0.9 - never.length * 0.1 + (type === "Web app" ? 1.1 : type === "API" ? 0 : 0.6)).toFixed(1);
  const extra = [["docs/architecture.md", "Markdown · 12 KB"], ["puku/web-dashboard", "repository · main"], ["puku/checkout-api", "repository · main"], ["docs/openapi.yaml", "OpenAPI 3.1 · 42 endpoints"]];
  const addCtx = () => setCtx((c) => { const next = extra.find((e) => !c.some((x) => x[0] === e[0])); return next ? [...c, next] : c; });
  return (
    <section>
      <div className={`${wrap} flex flex-col gap-10 py-24 md:py-[112px]`}>
        <SecHead tone="danger" eyebrow="01 TARGET · 02 ACCESS · 03 REVIEW & LAUNCH" title="Point it at staging. That's the setup." side="Feluda pre-fills the target from your repo, verifies ownership through your deployment, and respects the paths you never want touched." />
        <div className="rounded-[16px] border border-border bg-bg p-5 md:p-10">
          <div className="flex flex-col gap-10 lg:flex-row">
            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div key="0" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex min-w-0 flex-1 flex-col gap-7">
                  <div className="flex flex-col gap-2.5">
                    <p className="text-[28px] font-semibold leading-[34px] tracking-[-0.02em]">What should we attack?</p>
                    <p className="text-[14px] leading-[22px] text-[#9DA193]">We pre-filled this from puku/checkout-api. Change anything that looks off.</p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <p className="text-[14px] font-medium leading-[18px]">Target type</p>
                    <div className="flex flex-wrap gap-2">
                      {types.map((t) => (
                        <button key={t} onClick={() => setType(t)} className={`flex h-10 items-center gap-2 rounded-[6px] border px-4 text-[14px] leading-[18px] transition-colors ${type === t ? "border-[#B0B3FC] bg-[#24254A] text-[#EEEEE5]" : "border-[#34362E] text-[#9DA193] hover:text-text"}`}>
                          {t}{t === "API" && <span className="text-[11px] leading-[14px] text-[#B0B3FC]">DETECTED</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <p className="text-[14px] font-medium leading-[18px]">Base URL</p>
                    <label className="flex h-11 items-center gap-3 rounded-[8px] border border-[#34362E] bg-[#1C1D1A] px-3.5 focus-within:border-accent">
                      <input value={url} onChange={(e) => setUrl(e.target.value)} aria-label="Base URL" className="min-w-0 flex-1 bg-transparent text-[14px] leading-[18px] outline-none" />
                      <AnimatePresence mode="wait">
                        {verified
                          ? <motion.span key="v" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="shrink-0 rounded-[6px] bg-[#25352B] px-2 py-1 text-[12px] leading-4 text-[#A7CFB2]">✓ Ownership verified</motion.span>
                          : <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="shrink-0 rounded-[6px] bg-[#3A3022] px-2 py-1 text-[12px] leading-4 text-warning">Unverified</motion.span>}
                      </AnimatePresence>
                    </label>
                    <p className="text-[13px] leading-[18px] text-[#9DA193]">Verified automatically via your GitHub deployment. Use staging — some tests create or delete data.</p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between">
                      <p className="text-[14px] font-medium leading-[18px] text-[#9DA193]">Code context (recommended)</p>
                      <button onClick={addCtx} className="text-[13px] leading-[18px] text-[#B0B3FC] hover:brightness-125">+ Add repo or spec</button>
                    </div>
                    <div className="overflow-hidden rounded-[8px] border border-[#34362E] bg-[#1C1D1A]">
                      <AnimatePresence initial={false}>
                        {ctx.map(([n, d], i) => (
                          <motion.div key={n} layout initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={`flex items-center gap-3 px-3.5 py-3 ${i ? "border-t border-[#34362E]" : ""}`}>
                            <span className="min-w-0 flex-1 truncate text-[13px] leading-[18px]">{n}</span>
                            <span className="hidden text-[12px] leading-4 text-[#9DA193] sm:block">{d}</span>
                            <button aria-label={`Remove ${n}`} onClick={() => setCtx((c) => c.filter((x) => x[0] !== n))} className="text-[16px] leading-[18px] text-[#62665B] hover:text-danger">×</button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {!ctx.length && <p className="px-3.5 py-3 text-[13px] text-[#62665B]">Black-box mode — no code context.</p>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <p className="text-[14px] font-medium leading-[18px]">Never touch (optional)</p>
                    <div className="flex min-h-11 flex-wrap items-center gap-2 rounded-[8px] border border-[#34362E] bg-[#1C1D1A] px-2.5 py-2 focus-within:border-accent">
                      {never.map((n) => (
                        <motion.button layout key={n} onClick={() => setNever((x) => x.filter((y) => y !== n))} className="rounded-[4px] bg-[#242620] px-2 py-1 text-[12px] leading-4 hover:bg-[#2f312a]">{n} ×</motion.button>
                      ))}
                      <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && draft.trim()) { setNever((x) => [...x, draft.trim()]); setDraft(""); } }}
                        placeholder="Add path or domain…" aria-label="Add excluded path" className="min-w-[140px] flex-1 bg-transparent text-[13px] leading-[18px] outline-none placeholder:text-[#62665B]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <button disabled={!verified} onClick={() => setStep(1)} className="flex h-9 items-center rounded-[6px] bg-[#B0B3FC] px-5 text-[14px] font-semibold leading-[18px] text-[#242449] transition hover:brightness-110 disabled:opacity-40">Continue to access</button>
                    <button onClick={() => { setUrl("https://staging.checkout.puku.sh"); setNever(["/v1/payments/live/*", "/admin/billing/*"]); }} className="flex h-9 items-center px-4 text-[14px] leading-[18px] text-[#9DA193] hover:text-text">Cancel</button>
                    <span className="ml-auto hidden text-[12px] leading-4 text-[#62665B] sm:block">⌘ ↵ to continue</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex min-w-0 flex-1 flex-col gap-6">
                  <p className="text-[28px] font-semibold leading-[34px] tracking-[-0.02em]">{step === 1 ? "How should agents sign in?" : "Ready to launch"}</p>
                  {step === 1 ? (
                    <>
                      {[["customer-a", "tenant-a · role: customer"], ["customer-b", "tenant-b · role: customer"], ["admin", "tenant-a · role: admin"]].map(([u, r]) => (
                        <div key={u} className="flex items-center justify-between rounded-[8px] border border-[#34362E] bg-[#1C1D1A] px-4 py-3"><span className="text-[14px]">{u}<span className="ml-3 text-[12px] text-[#9DA193]">{r}</span></span><span className="text-[12px] text-[#A7CFB2]">✓ test account</span></div>
                      ))}
                      <div className="flex gap-3"><button onClick={() => setStep(2)} className="flex h-9 items-center rounded-[6px] bg-[#B0B3FC] px-5 text-[14px] font-semibold text-[#242449]">Review & launch</button><button onClick={() => setStep(0)} className="h-9 px-4 text-[14px] text-[#9DA193] hover:text-text">Back</button></div>
                    </>
                  ) : (
                    <>
                      <p className="text-[14px] leading-6 text-[#9DA193]">{type} · {url} · {ctx.length ? "white-box" : "black-box"} · {never.length} excluded paths. 402 agents will be paced inside your request windows.</p>
                      <div className="flex gap-3"><button onClick={() => setStep(3)} className="flex h-9 items-center rounded-[6px] bg-danger px-5 text-[14px] font-semibold text-[#2A1E20]">Launch assessment</button><button onClick={() => setStep(1)} className="h-9 px-4 text-[14px] text-[#9DA193] hover:text-text">Back</button></div>
                    </>
                  )}
                  {step === 3 && <Launching onDone={() => setStep(0)} />}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex shrink-0 flex-col gap-5 self-start rounded-[12px] border border-[#34362E] bg-[#1C1D1A] p-6 lg:w-[320px]">
              <p className="text-[11px] leading-4 tracking-[0.08em] text-[#9DA193]">ESTIMATE</p>
              <div className="flex flex-col gap-1">
                <motion.p key={reqs} initial={{ opacity: 0.4, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[32px] font-semibold leading-[38px] tracking-[-0.02em]">~{reqs}K requests</motion.p>
                <p className="text-[13px] leading-[18px] text-[#9DA193]">of 12.4K left this month · paced across 2 × 5h windows · ~3h</p>
              </div>
              <span className="h-px bg-[#34362E]" />
              <div className="flex flex-col gap-3 text-[13px] leading-[18px]">
                <p className="flex justify-between"><span className="text-[#9DA193]">Endpoints mapped</span><span>42</span></p>
                <p className="flex justify-between"><span className="text-[#9DA193]">Mode</span><span>{ctx.length ? "white-box" : "black-box"}</span></p>
                <p className="flex justify-between"><span className="text-[#9DA193]">Excluded paths</span><span>{never.length}</span></p>
              </div>
              <span className="h-px bg-[#34362E]" />
              <p className="text-[13px] leading-5 text-[#9DA193]">Paced to stay inside your 5h and weekly windows. Pauses safely if you hit a limit.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Launching({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);
  useEffect(() => { const id = setInterval(() => setP((x) => Math.min(100, x + 1.5)), 50); return () => clearInterval(id); }, []);
  return (
    <div className="flex flex-col gap-3">
      <div className="h-1 overflow-hidden rounded-full bg-[#2A2C26]"><div className="h-full bg-danger transition-[width]" style={{ width: `${p}%` }} /></div>
      <p className="font-mono text-[12px] text-[#9DA193]">{p < 30 ? "recon · mapping endpoints" : p < 70 ? `agents · ${Math.round(p * 4)} / 402 running` : p < 100 ? "exploit · validating findings" : "done · 2 exploited, 331 blocked"}</p>
      {p >= 100 && <button onClick={onDone} className="self-start text-[13px] text-[#B0B3FC]">Start over</button>}
    </div>
  );
}

/* ---------- Finding + coverage ---------- */
const rows = ["Access control", "Auth / JWT", "Injection", "Business logic", "SSRF", "File upload", "Rate limiting", "Info leak"];
const depth = ["none", "light", "medium", "deep", "exploited"];
function Heatmap() {
  const [h, setH] = useState<[number, number] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col gap-3.5 rounded-[12px] border border-[#34362E] bg-[#141512] p-[22px]">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-[15px] font-semibold leading-5">Attack depth per endpoint</p>
        <div className="flex items-center gap-2 text-[11px] leading-[14px] text-[#62665B]">
          none{["#2A2C26", "#4A4C7A", "#7E81D0", "#B0B3FC"].map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}deep
          <span className="h-2.5 w-2.5 rounded-full bg-[#C97A80]" />exploited
        </div>
      </div>
      <div ref={ref} className="flex gap-3.5 overflow-x-auto scrollbar-none" onMouseLeave={() => setH(null)}>
        <div className="flex w-[110px] shrink-0 flex-col justify-between py-px">
          {rows.map((r, i) => <span key={r} className={`text-[11px] leading-4 transition-colors ${h?.[0] === i ? "text-text" : "text-[#9DA193]"}`}>{r}</span>)}
        </div>
        <svg viewBox="0 0 918 170" className="h-[170px] w-[918px] shrink-0">
          {heat.rows.map((row, y) => row.split("").map((v, x) => (
            <motion.circle key={`${x}-${y}`} cx={8 + x * 22} cy={8 + y * 22} r={h && h[0] === y && h[1] === x ? 9 : 7} fill={heat.pal[+v]}
              initial={{ opacity: 0 }} whileInView={{ opacity: h && h[0] !== y && h[1] !== x ? 0.35 : 1 }} viewport={{ once: false }} transition={{ delay: h ? 0 : x * 0.012 }}
              onMouseEnter={() => setH([y, x])} style={{ cursor: "pointer" }} />
          )))}
        </svg>
      </div>
      <p className="pl-[124px] text-[11px] leading-4 text-[#62665B]">
        {h ? `${rows[h[0]]} · endpoint ${h[1] + 1} of 42 · ${depth[+heat.rows[h[0]][h[1]]]}` : "← 42 endpoints, grouped by flow →"}
      </p>
    </div>
  );
}
export function Finding() {
  const [state, setState] = useState<"open" | "pr" | "retest" | "fixed">("open");
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);
  const [path, setPath] = useState(0);
  useEffect(() => { const id = setInterval(() => setPath((p) => (p + 1) % 4), 1400); return () => clearInterval(id); }, []);
  const retest = () => { setState("retest"); setTimeout(() => setState(applied ? "fixed" : "open"), 1800); };
  return (
    <section className="border-t border-border bg-sidebar">
      <div className={`${wrap} flex flex-col gap-10 py-24 md:py-[112px]`}>
        <SecHead tone="danger" eyebrow="THE FINDING · FEL-142" title="Proof, not a guess. Replay included." titleW={700} sideW={400} side="Every confirmed issue comes with the exact requests, the impact in plain words, and the fix. Click Retest after you ship it." />
        <div className="flex flex-col gap-7 rounded-[16px] border border-border bg-bg p-5 md:p-10">
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <AnimatePresence mode="wait">
                {state === "fixed"
                  ? <motion.span key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[4px] bg-[#25352B] px-[7px] py-[3px] text-[11px] leading-[14px] text-[#A7CFB2]">RESOLVED · RETEST FAILED TO EXPLOIT</motion.span>
                  : <motion.span key="c" className="rounded-[4px] bg-[#3A2427] px-[7px] py-[3px] text-[11px] leading-[14px] text-[#C97A80]">CRITICAL · CVSS 9.1</motion.span>}
              </AnimatePresence>
              <span className="text-[12px] leading-4 text-[#8FA894]">✓ Validated by 2 agents</span>
              <span className="text-[12px] leading-4 text-[#9DA193]">FEL-142 · CWE-639 · OWASP API1:2023</span>
            </div>
            <p className={`text-[26px] font-semibold leading-[34px] tracking-[-0.02em] md:text-[32px] md:leading-10 ${state === "fixed" ? "text-muted line-through decoration-success/60" : ""}`}>Any customer can read another tenant&apos;s orders</p>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => { setState("pr"); setApplied(true); }} className="flex h-9 items-center rounded-[6px] bg-[#B0B3FC] px-3.5 text-[14px] font-semibold leading-[18px] text-[#242449] hover:brightness-110">{state === "pr" || applied ? "PR #512 opened ↗" : "Open AutoFix PR"}</button>
              <button onClick={retest} className="flex h-9 items-center gap-2 rounded-[6px] border border-[#34362E] px-3.5 text-[14px] leading-[18px] hover:bg-hover">
                {state === "retest" && <span className="h-3 w-3 animate-spin rounded-full border border-accent border-t-transparent" />}Retest
              </button>
              {["Create Jira issue", "Assign"].map((b) => <button key={b} className="flex h-9 items-center rounded-[6px] border border-[#34362E] px-3.5 text-[14px] leading-[18px] hover:bg-hover">{b}</button>)}
              <button className="ml-auto text-[13px] leading-[18px] text-[#9DA193] hover:text-text">Ignore ▾</button>
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-[11px] leading-4 tracking-[0.08em] text-[#9DA193]">WHAT HAPPENED</p>
                <p className="text-[15px] leading-6">Logged in as customer-b, the agent changed the order id in GET /v1/orders/{"{id}"} and received tenant A&apos;s full order — name, address and last 4 card digits. The handler loads by id without checking the caller&apos;s tenant.</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="text-[11px] leading-[14px] tracking-[0.08em] text-[#9DA193]">PROOF</span><span className="hidden text-[12px] leading-4 text-[#5C6056] sm:inline">Replayed as customer-b · 1 request</span></span>
                  <button onClick={() => { navigator.clipboard?.writeText("curl -H 'Authorization: Bearer eyJ…' https://staging.checkout.puku.sh/v1/orders/8812"); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="text-[13px] leading-4 text-[#B0B3FC] hover:brightness-125">{copied ? "Copied ✓" : "Copy as cURL"}</button>
                </div>
                <div className="flex flex-col overflow-hidden rounded-[10px] border border-[#2A2C26] bg-[#161814] md:flex-row">
                  <div className="flex flex-col border-b border-[#2A2C26] md:w-1/2 md:border-b-0 md:border-r">
                    <div className="flex h-10 items-center gap-2 border-b border-[#2A2C26] px-3.5">
                      <span className="rounded-[4px] bg-[#242620] px-1.5 py-0.5 text-[10px] leading-3 text-[#D6D6CC]">GET</span><span className="text-[12px] leading-4">/v1/orders/8812</span><span className="ml-auto text-[10px] leading-3 text-[#5C6056]">REQUEST</span>
                    </div>
                    <div className="flex flex-col gap-2 px-3.5 py-3 text-[11px] leading-[14px]">
                      <p className="flex gap-2.5"><span className="w-[92px] shrink-0 text-[#5C6056]">Host</span><span className="text-[#D6D6CC]">staging.checkout.puku.sh</span></p>
                      <p className="flex items-center gap-2.5"><span className="w-[92px] shrink-0 text-[#5C6056]">Authorization</span><span className="text-[#D6D6CC]">Bearer eyJ…</span><span className="rounded-[4px] border border-[#34362E] px-1.5 py-px text-[10px] leading-3 text-[#9DA193]">customer-b</span></p>
                      <p className="flex gap-2.5"><span className="w-[92px] shrink-0 text-[#5C6056]">Owns order</span><span className="text-[#9DA193]">No · belongs to tenant-a</span></p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex h-10 items-center gap-2 border-b border-[#2A2C26] px-3.5">
                      <span className={`rounded-[4px] px-1.5 py-0.5 text-[10px] leading-3 ${state === "fixed" ? "bg-[#25352B] text-[#A7CFB2]" : "bg-[#2A2422] text-[#C97A80]"}`}>{state === "fixed" ? "404 Not Found" : "200 OK"}</span>
                      <span className="text-[12px] leading-4 text-[#9DA193]">{state === "fixed" ? "as expected" : "expected 403"}</span><span className="ml-auto text-[10px] leading-3 text-[#5C6056]">RESPONSE · 182ms</span>
                    </div>
                    <div className={`flex flex-col gap-2 px-3.5 py-3 text-[11px] leading-[14px] transition-opacity ${state === "fixed" ? "opacity-30" : ""}`}>
                      {[["id", "8812"], ["tenant", "tenant-a"], ["customer", "Ayesha K.", "PII"], ["card", "•••• 4242", "PCI"]].map(([k, v, t]) => (
                        <p key={k} className="flex items-center gap-2.5"><span className="w-[70px] shrink-0 text-[#5C6056]">{k}</span><span className="text-[#D6D6CC]">{v}</span>{t && <span className="text-[10px] leading-3 text-[#C97A80]">{t}</span>}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="text-[11px] leading-[14px] tracking-[0.08em] text-[#9DA193]">SUGGESTED FIX</span><span className="hidden text-[12px] leading-4 text-[#5C6056] sm:inline">Scope the lookup to the caller&apos;s tenant</span></span>
                  <button onClick={() => setApplied(true)} className="text-[13px] leading-4 text-[#B0B3FC] hover:brightness-125">{applied ? "Applied ✓" : "Open in IDE"}</button>
                </div>
                <div className="overflow-hidden rounded-[10px] border border-[#2A2C26] bg-[#161814]">
                  <div className="flex h-[38px] items-center gap-2.5 border-b border-[#2A2C26] px-3.5">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="#9DA193"><path d="M2 1h5l3 3v9H2z M7 1v3h3" /></svg>
                    <span className="text-[12px] leading-4 text-[#D6D6CC]">src/orders/handler.ts</span>
                    <span className="ml-auto text-[11px] text-[#8FA894]">+2</span><span className="text-[11px] text-[#C97A80]">−1</span>
                  </div>
                  <div className="overflow-x-auto py-1.5 scrollbar-none">
                    {([["41", "", "const order = await db.orders.findFirst({"], ["42", "−", "  where: { id: params.id },"], ["42", "+", "  where: { id: params.id, tenantId: ctx.user.tenantId },"], ["43", "", "});"], ["44", "+", "if (!order) throw new NotFound();"]] as const).map(([n, s, c], i) => (
                      <motion.div key={i} initial={false} animate={{ backgroundColor: s === "−" ? "#221E1D" : s === "+" ? (applied ? "#25352B" : "#1C211D") : "rgba(0,0,0,0)" }} className="flex h-6 min-w-max items-center">
                        <span className="w-11 shrink-0 pr-2.5 text-right text-[11px] text-[#5C6056]">{n}</span>
                        <span className={`w-5 shrink-0 text-[11px] ${s === "+" ? "text-[#8FA894]" : "text-[#C97A80]"}`}>{s}</span>
                        <span className={`whitespace-pre font-mono text-[12px] leading-4 ${s === "+" ? "text-[#EEEEE5]" : "text-[#9DA193]"} ${s === "−" ? "line-through" : ""}`}>{c}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-5 lg:w-[320px]">
              <div className="flex flex-col gap-3 rounded-[12px] border border-[#34362E] bg-[#1C1D1A] p-5">
                <p className="text-[11px] leading-4 tracking-[0.08em] text-[#9DA193]">ATTACK PATH · REPLAYING</p>
                {[["Sign up as any customer", "POST /signup", "#4A4C7A", "#B0B3FC"], ["Walk sequential order ids", "GET /v1/orders/8800…8899", "#6B5640", "#ABA088"]].map(([t, s, b, c], i) => (
                  <div key={t} className="flex gap-3">
                    <div className="flex w-[22px] shrink-0 flex-col items-center">
                      <span className={`grid h-[22px] w-[22px] place-items-center rounded-full border text-[11px] transition-all ${path === i ? "scale-110 shadow-[0_0_12px_rgba(176,179,252,.5)]" : ""}`} style={{ borderColor: b, color: c }}>{i + 1}</span>
                      <span className="min-h-3.5 w-px flex-1" style={{ background: i ? "#C97A80" : "#4A4C7A" }} />
                    </div>
                    <div className="flex flex-col gap-[3px] pb-3.5"><span className="text-[13px] leading-[18px]">{t}</span><span className="font-mono text-[11px] leading-[14px] text-[#62665B]">{s}</span></div>
                  </div>
                ))}
                <div className="flex gap-3">
                  <span className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[#C97A80] text-[11px] text-[#2A1E20] transition-all ${path === 2 ? "scale-110 shadow-[0_0_14px_rgba(201,122,128,.7)]" : ""}`}>3</span>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-semibold leading-[18px] text-[#C97A80]">Read every tenant&apos;s orders + PII</span>
                    <div className="flex gap-1.5">{["4,812 orders", "2 tenants"].map((x) => <span key={x} className="rounded-[4px] bg-[#2A1E20] px-[7px] py-[3px] text-[11px] leading-[14px] text-[#C97A80]">{x}</span>)}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-[12px] border border-[#34362E] bg-[#1C1D1A] p-5 text-[13px] leading-[18px]">
                {[["Found in", "Run #3 · 2h ago"], ["Introduced by", "PR #198 · a3f9e1c", true], ["Compliance", "SOC 2 CC6.1 · ISO A.8.3"], ["Fix effort", "~5 min · 1 file"]].map(([k, v, a]) => (
                  <p key={k as string} className="flex justify-between gap-3"><span className="text-[#9DA193]">{k}</span><span className={`text-[12px] ${a ? "text-[#B0B3FC]" : ""}`}>{v}</span></p>
                ))}
              </div>
              <p className="text-[13px] leading-5 text-[#9DA193]">After you merge, Feluda retests this exact exploit automatically and closes the finding when it fails.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-[24px] font-semibold leading-[30px] tracking-[-0.02em] md:text-[28px] md:leading-[34px]">And proof of what was tested, endpoint by endpoint.</p>
          <Heatmap />
        </div>
      </div>
    </section>
  );
}

/* ---------- Code analysis ---------- */
const repos = [["checkout-api", "25 files · 22k LOC", 2.6], ["web-dashboard", "31 files · 16k LOC", 2.2], ["docs context", "openapi + 2 md", -0.6]] as const;
export function CodeAnalysis() {
  const [on, setOn] = useState([true, true, true]);
  const [run, setRun] = useState<"idle" | "run" | "done">("idle");
  const total = useMemo(() => repos.reduce((s, r, i) => s + (on[i] ? r[2] : 0), 0), [on]);
  const used = Math.max(0, Math.round((total / 20) * 120));
  const saved = on[2] ? 6 : 0;
  const ref = useRef<ReturnType<typeof setTimeout>>(undefined);
  return (
    <section className="border-t border-border">
      <div className={`${wrap} flex flex-col items-center gap-12 py-24 md:py-[112px] lg:flex-row lg:gap-16`}>
        <div className="flex shrink-0 flex-col gap-5 lg:w-[400px]">
          <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-danger">AI CODE ANALYSIS</p>
          <h2 className="text-[clamp(36px,4vw,48px)] font-semibold leading-[1.04] tracking-[-0.04em]">A security audit of the code itself.</h2>
          <p className="text-[17px] leading-[26px] text-muted">Pick repos and docs. See the exact request cost before you start. Results land in Pull Requests and Slack.</p>
        </div>
        <div className="flex w-full min-w-0 flex-1 flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <p className="text-[12px] leading-4 tracking-[0.08em] text-[#9DA193]">CODE SECURITY AUDIT · {on.slice(0, 2).filter(Boolean).length} REPOS</p>
            <p className="text-[30px] font-semibold leading-[38px] tracking-[-0.02em]">{run === "idle" ? "Ready when you are" : run === "run" ? "Auditing…" : "Audit complete · 7 findings"}</p>
          </div>
          <div className="relative flex flex-col gap-[18px] overflow-hidden rounded-[12px] border border-[#34362E] bg-[#141512] p-6">
            <Dither size={[560, 520]} className="-right-[300px] -top-[200px] opacity-20" />
            <div className="relative flex flex-wrap items-baseline gap-3">
              <motion.span key={total} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="text-[56px] font-semibold leading-[64px] tracking-[-0.04em] md:text-[64px]">{total.toFixed(1)}K</motion.span>
              <span className="text-[16px] leading-5 text-[#9DA193]">requests · of 12.4K left · ~{Math.max(1, Math.round(total / 2))}h</span>
            </div>
            <svg viewBox="0 0 416 52" className="relative w-full max-w-[416px]">
              {Array.from({ length: 120 }, (_, i) => {
                const fill = i < used ? "#9EA1E0" : i < used + saved ? "#8FA894" : "#2A2C26";
                return <motion.circle key={i} cx={5 + (i % 30) * 14} cy={5 + Math.floor(i / 30) * 14} r="5" animate={{ fill }} transition={{ delay: (i % 30) * 0.01 }} />;
              })}
            </svg>
            <div className="relative flex flex-wrap gap-[18px] text-[11px] leading-[14px]">
              <span className="text-[#B0B3FC]">● this audit {total.toFixed(1)}K</span>{on[2] && <span className="text-[#8FA894]">● docs context −600</span>}<span className="text-[#62665B]">● left this month 8.2K / 20K</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 rounded-[10px] border border-[#34362E] bg-[#10110F] px-5 py-[18px] text-[12px] leading-5">
            {repos.map(([n, d, c], i) => (
              <button key={n} onClick={() => setOn((o) => o.map((v, k) => (k === i ? !v : v)))} className={`flex gap-2.5 text-left transition-opacity ${on[i] ? "" : "opacity-35 line-through"}`}>
                <span className="w-[110px] shrink-0 sm:w-[130px]">{n}</span><span className="hidden w-[150px] shrink-0 text-[#9DA193] sm:block">{d}</span>
                <span className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-[#34362E]">{".".repeat(80)}</span>
                <span className={`w-[60px] shrink-0 text-right ${c < 0 ? "text-[#8FA894]" : ""}`}>{c < 0 ? "−600" : `${c}K`}</span>
              </button>
            ))}
            <span className="my-1 h-px bg-[#34362E]" />
            <p className="flex gap-2.5"><span className="flex-1">total</span><span className="w-[80px] text-right text-[#B0B3FC]">{total.toFixed(1)}K req</span></p>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button disabled={run === "run" || total <= 0} onClick={() => { setRun("run"); clearTimeout(ref.current); ref.current = setTimeout(() => setRun("done"), 2200); }}
              className="flex h-11 items-center gap-2 rounded-[6px] bg-[#B0B3FC] px-5 text-[14px] font-semibold leading-[18px] text-[#242449] hover:brightness-110 disabled:opacity-60">
              {run === "run" && <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#242449] border-t-transparent" />}{run === "done" ? "View results →" : `Start audit · ${total.toFixed(1)}K requests`}
            </button>
            <button onClick={() => setRun("idle")} className="flex h-9 items-center px-4 text-[14px] text-[#9DA193] hover:text-text">Back</button>
            <span className="ml-auto hidden text-[12px] leading-4 text-[#9DA193] sm:block">results land in Pull Requests + Slack</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Surface ---------- */
const surface = [
  ["promo.puku.sh", "CNAME → puku-promo.herokuapp.com (unclaimed)", "Takeover possible", "#C97A80", "Surface", "Remove DNS record"],
  ["3 employee accounts", "@puku.sh · seen in a 2026 stealer-log dump", "Leaked credentials", "#B88C77", "Darknet", "Force reset"],
  ["db-replica.puku.sh:5432", "PostgreSQL reachable from the internet", "Exposed database port", "#ABA088", "Surface", "View fix"],
  ["mail.puku.sh", "DMARC p=none · SPF softfail", "Spoofable sender", "#ABA088", "Quick scan", "Copy DNS record"],
] as const;
export function Surface() {
  const [done, setDone] = useState<number[]>([]);
  const [busy, setBusy] = useState<number | null>(null);
  const act = (i: number) => { setBusy(i); setTimeout(() => { setDone((d) => [...d, i]); setBusy(null); }, 900); };
  return (
    <section className="border-t border-border">
      <div className={`${wrap} flex flex-col gap-10 py-24 md:py-[112px]`}>
        <SecHead tone="danger" eyebrow="ATTACK SURFACE · MONITORED DAILY" title="Everything you expose to the internet." side="Subdomain takeovers, leaked credentials, open ports and spoofable mail, each with the one action that fixes it." />
        <div className="overflow-x-auto rounded-[12px] border border-[#34362E] bg-[#1C1D1A] scrollbar-none">
          <div className="min-w-[720px]">
            <div className="flex gap-[18px] border-b border-[#34362E] px-6 py-3 text-[11px] leading-4 tracking-[0.08em] text-[#62665B]">
              <span className="flex-1">ASSET</span><span className="w-[200px] shrink-0">ISSUE</span><span className="w-[120px] shrink-0">SCAN</span><span className="w-[150px] shrink-0">ACTION</span>
            </div>
            {surface.map(([a, d, iss, c, scan, action], i) => (
              <motion.div key={a} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`flex items-center gap-[18px] px-6 py-4 transition-colors hover:bg-[#242620] ${i < 3 ? "border-b border-[#34362E]" : ""}`}>
                <span className={`flex flex-1 flex-col gap-1 ${done.includes(i) ? "opacity-40" : ""}`}><span className="text-[14px] leading-[18px]">{a}</span><span className="text-[12px] leading-4 text-[#9DA193]">{d}</span></span>
                <span className="w-[200px] shrink-0 text-[13px] leading-[18px]" style={{ color: done.includes(i) ? "#8FA894" : c }}>{done.includes(i) ? "✓ Resolved" : iss}</span>
                <span className="w-[120px] shrink-0 text-[12px] leading-4 text-[#9DA193]">{scan}</span>
                <button disabled={done.includes(i)} onClick={() => act(i)} className="flex w-[150px] shrink-0 items-center gap-2 text-left text-[13px] leading-[18px] text-[#B0B3FC] enabled:hover:brightness-125 disabled:text-[#62665B]">
                  {busy === i && <span className="h-3 w-3 animate-spin rounded-full border border-accent border-t-transparent" />}{done.includes(i) ? "Done" : action}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
