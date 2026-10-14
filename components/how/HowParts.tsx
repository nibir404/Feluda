"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import traffic from "@/lib/traffic.json";
import { wrap } from "../ui";

/* ---------- Case rooms (iso SVG from the design) ---------- */
export function RoomsSvg({ svg }: { svg: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [room, setRoom] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => { if (!auto) return; const id = setInterval(() => setRoom((r) => (r + 1) % 3), 2600); return () => clearInterval(id); }, [auto]);
  useEffect(() => { ref.current!.dataset.room = String(room); }, [room]);
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full">
        <div ref={ref} className="rooms mx-auto w-full max-w-[1248px] [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
      <div className="flex gap-1 rounded-full border border-border p-1">
        {["01 Observe", "02 Investigate", "03 Resolve"].map((l, i) => (
          <button key={l} onClick={() => { setRoom(i); setAuto(false); }} className="relative rounded-full px-4 py-2 text-[13px] leading-4">
            {room === i && <motion.span layoutId="room-pill" className="absolute inset-0 rounded-full bg-hover" />}
            <span className={`relative ${room === i ? "text-text" : "text-muted"}`}>{l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Evidence intake ---------- */
const logs = [
  ["GET", "/v1/orders/8812", "200", "idor-07", "38ms", true],
  ["POST", "/v1/coupons/apply", "500", "sqli-03", "911ms", true],
  ["PATCH", "/v1/users/me", "403", "authz-02", "21ms", false],
  ["POST", "/v1/webhooks", "422", "ssrf-01", "17ms", false],
  ["POST", "/auth/login", "200", "rate-04", "64ms", false],
  ["GET", "/v1/orders?limit=10000", "400", "dos-01", "9ms", false],
] as const;
const details: Record<string, { hops: [string, string, boolean?][]; code: string; status: string; msg: string; ms: string; err: string; note: string }> = {
  "sqli-03": { hops: [["agent", "0ms"], ["edge", "2ms"], ["checkout-api", "6ms"], ["postgres", "1,004ms", true]], code: "X' OR pg_sleep(1)--", status: "500", msg: "Internal Server Error", ms: "1,012ms", err: "QueryFailedError: canceling statement due to statement timeout", note: "Timing leaked but not exploitable — validation agent marked as false positive. Stack trace exposure filed as FEL-147." },
  "idor-07": { hops: [["agent", "0ms"], ["edge", "2ms"], ["checkout-api", "31ms", true], ["postgres", "5ms"]], code: "GET /v1/orders/8812 as customer-b", status: "200", msg: "OK — expected 403", ms: "38ms", err: "Order belongs to tenant-a", note: "Exploited. Filed as FEL-142 with a replay and an AutoFix PR." },
  "authz-02": { hops: [["agent", "0ms"], ["edge", "2ms"], ["checkout-api", "19ms"]], code: '{"role":"admin"}', status: "403", msg: "Forbidden", ms: "21ms", err: "role is not writable", note: "Blocked. Hypothesis disproved with evidence." },
  "ssrf-01": { hops: [["agent", "0ms"], ["edge", "2ms"], ["checkout-api", "15ms"]], code: "url=http://169.254.169.254/", status: "422", msg: "Unprocessable", ms: "17ms", err: "host not in allowlist", note: "Blocked by the webhook allowlist." },
  "rate-04": { hops: [["agent", "0ms"], ["edge", "2ms"], ["auth", "62ms"]], code: "500 logins / 10s", status: "200", msg: "OK", ms: "64ms", err: "no 429 after 500 attempts", note: "Flagged as medium: missing rate limit on /auth/login." },
  "dos-01": { hops: [["agent", "0ms"], ["edge", "2ms"], ["checkout-api", "7ms"]], code: "limit=10000", status: "400", msg: "Bad Request", ms: "9ms", err: "limit must be ≤ 100", note: "Blocked by input validation." },
};
function Traffic() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [h, setH] = useState<number | null>(null);
  return (
    <div ref={ref} className="overflow-x-auto scrollbar-none">
      <svg viewBox="0 0 1053 150" className="h-[150px] min-w-[720px] w-full" preserveAspectRatio="none" onMouseLeave={() => setH(null)}>
        {traffic.cols.map((col, x) => col.split("").map((c, k) => (
          <motion.rect key={`${x}-${k}`} x={x * 11} y={142 - k * 8} width="8" height="6" rx="1" fill={traffic.pal[+c]}
            initial={{ opacity: 0 }} animate={inView ? { opacity: h === null || h === x ? 1 : 0.4 } : {}} transition={{ delay: h === null && inView ? x * 0.012 + k * 0.01 : 0, duration: 0.25 }}
            onMouseEnter={() => setH(x)} />
        )))}
      </svg>
    </div>
  );
}
export function Intake() {
  const [sel, setSel] = useState("sqli-03");
  const [filter, setFilter] = useState(true);
  const [copied, setCopied] = useState(false);
  const [streamed, setStreamed] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => { if (!inView) return; const id = setInterval(() => setStreamed((n) => (n >= logs.length ? n : n + 1)), 260); return () => clearInterval(id); }, [inView]);
  const rows = logs.slice(0, streamed).filter((l) => l[5]);
  const d = details[sel];
  return (
    <section>
      <div className={`${wrap} flex flex-col gap-3 pt-24 md:pt-[112px]`}>
        <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-accent">01 · OBSERVE</p>
        <h2 className="max-w-[700px] text-[clamp(36px,4.5vw,56px)] font-semibold leading-[1.04] tracking-[-0.04em]">It starts with the evidence.</h2>
      </div>
      <div ref={ref} className={`${wrap} flex flex-col gap-6 pb-24 pt-10 md:pb-[112px]`}>
        <div className="flex flex-col gap-3.5 rounded-[12px] border border-[#34362E] bg-[#141512] p-[22px]">
          <div className="flex flex-wrap items-end gap-6 md:gap-9">
            {[["48,212", "REQUESTS SENT", ""], ["7.4/s", "PEAK · CAP 10/s", ""], ["0.3%", "5XX FROM YOUR APP", "text-[#C97A80]"]].map(([v, l, c]) => (
              <div key={l} className="flex flex-col gap-0.5"><span className={`text-[28px] font-semibold leading-9 tracking-[-0.02em] md:text-[32px] ${c}`}>{v}</span><span className="text-[10px] leading-[14px] tracking-[0.1em] text-[#9DA193]">{l}</span></div>
            ))}
            <span className="ml-auto hidden text-[11px] leading-4 text-[#62665B] lg:block">15:30 ─────────── 4h 32m ─────────── 20:02</span>
          </div>
          <Traffic />
          <div className="flex flex-wrap gap-4 text-[11px] leading-[14px]"><span className="text-[#7E81D0]">▪ 2xx/4xx</span><span className="text-[#C97A80]">▪ 5xx spike · 16:20 — safe mode auto-paused 40s</span></div>
        </div>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="min-w-0 flex-1 overflow-hidden rounded-[12px] border border-[#34362E] bg-[#10110F]">
            <div className="flex items-center gap-2.5 border-b border-[#34362E] px-4 py-3">
              <button onClick={() => setFilter((f) => !f)} className="flex-1 truncate text-left text-[13px] leading-[18px] text-[#9DA193] hover:text-text">Filter: {filter ? "status:5xx OR agent:idor-*" : "all requests"} <span className="text-[#62665B]">· click to toggle</span></button>
              <button className="text-[12px] leading-4 text-[#B0B3FC] hover:brightness-125">Export HAR</button>
            </div>
            <div className="overflow-x-auto scrollbar-none">
              <AnimatePresence initial={false}>
                {(filter ? rows : logs.slice(0, streamed)).map((l, i, a) => (
                  <motion.button key={l[3]} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} onClick={() => setSel(l[3])}
                    className={`flex w-full min-w-[460px] items-center gap-3 px-4 py-2.5 text-left text-[12px] leading-4 transition-colors ${i < a.length - 1 ? "border-b border-[#22231F]" : ""} ${sel === l[3] ? "bg-[#1E1F2A]" : "hover:bg-[#191a17]"}`}>
                    <span className={`w-11 shrink-0 ${l[0] === "PATCH" ? "text-[#B0B3FC]" : "text-[#9DA193]"}`}>{l[0]}</span>
                    <span className="flex-1 text-[#EEEEE5]">{l[1]}</span>
                    <span className={`w-10 shrink-0 ${l[5] ? "text-[#C97A80]" : "text-[#9DA193]"}`}>{l[2]}</span>
                    <span className="w-[70px] shrink-0 text-[#9DA193]">{l[3]}</span>
                    <span className="w-11 shrink-0 text-[#62665B]">{l[4]}</span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={sel} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex h-fit shrink-0 flex-col gap-3 rounded-[12px] border border-[#34362E] bg-[#10110F] p-[18px] lg:w-[440px]">
              <div className="flex justify-between">
                <span className="text-[11px] leading-4 tracking-[0.08em] text-[#9DA193]">REQUEST #31,077 · {sel}</span>
                <button onClick={() => { navigator.clipboard?.writeText(`curl https://staging.checkout.puku.sh${logs.find((l) => l[3] === sel)![1]}`); setCopied(true); setTimeout(() => setCopied(false), 1200); }} className="text-[12px] leading-4 text-[#B0B3FC]">{copied ? "Copied ✓" : "Copy cURL"}</button>
              </div>
              <div className="flex items-start">
                {d.hops.map(([n, ms, hot], i) => (
                  <div key={n} className="contents">
                    {i > 0 && <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: i * 0.15 }} className="relative top-[11px] h-px flex-1 origin-left" style={{ background: hot ? "#5C3E40" : "#34362E" }} />}
                    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="flex shrink-0 flex-col items-center gap-1 px-1">
                      <span className={`rounded-[5px] border px-2 py-[3px] text-[10px] leading-3 ${hot ? "border-[#5C3E40] bg-[#2A2422] text-[#C97A80]" : "border-[#34362E] bg-[#1C1D1A] text-[#D6D6CC]"}`}>{n}</span>
                      <span className={`text-[10px] leading-3 ${hot ? "text-[#C97A80]" : "text-[#5C6056]"}`}>{ms}</span>
                    </motion.div>
                  </div>
                ))}
              </div>
              <span className="h-px bg-[#34362E]" />
              <div className="overflow-hidden rounded-[10px] border border-[#2A2C26] bg-[#161814]">
                <div className="flex h-[34px] items-center gap-2 border-b border-[#2A2C26] px-3"><span className="rounded-[4px] bg-[#242620] px-1.5 py-0.5 text-[10px] leading-3 text-[#D6D6CC]">{logs.find((l) => l[3] === sel)![0]}</span><span className="truncate text-[12px] leading-4">{logs.find((l) => l[3] === sel)![1]}</span></div>
                <div className="flex gap-2.5 border-b border-[#2A2C26] px-3 py-2.5 text-[11px] leading-[14px]"><span className="w-11 shrink-0 text-[#5C6056]">code</span><span className="font-mono text-[#D6D6CC]">{d.code}</span></div>
                <div className="flex h-[34px] items-center gap-2 border-b border-[#2A2C26] px-3">
                  <span className={`rounded-[4px] px-1.5 py-0.5 text-[10px] leading-3 ${d.status.startsWith("5") || d.status === "200" ? "bg-[#2A2422] text-[#C97A80]" : "bg-[#242620] text-[#9DA193]"}`}>{d.status}</span>
                  <span className="text-[12px] leading-4 text-[#9DA193]">{d.msg}</span><span className="ml-auto text-[10px] leading-3 text-[#5C6056]">{d.ms}</span>
                </div>
                <div className="flex gap-2.5 px-3 py-2.5 text-[11px] leading-[14px]"><span className="w-11 shrink-0 text-[#5C6056]">error</span><span className="text-[#D6D6CC]">{d.err}</span></div>
              </div>
              <p className="text-[12px] leading-[18px] text-[#9DA193]">{d.note}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------- Investigate + Resolve ---------- */
const steps = [["00:04", "Read 3 files, 14 callers of refresh()", "Middleware calls it on every request"], ["00:19", "Hypothesis: concurrent refresh without a lock", "Two requests can both see an expired token"], ["00:52", "Checked 1,204 production log lines", "Paired refresh calls 1 ms apart, then 401s"], ["01:58", "Confirmed · high severity", "2 other theories discarded with evidence"]];
const diff = [[" ", "  export async function refresh(session) {"], ["-", "-   if (isExpired(token)) {"], ["+", "+   return lock(session.id, async () => {"], ["+", "+     if (!isExpired(await store.get(session.id))) return"], [" ", "      const next = await provider.refresh(token)"], [" ", "      await store.set(session.id, next)"], ["+", "+   })"]];
export function InvestigateResolve() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [n, setN] = useState(0);
  const [committed, setCommitted] = useState(false);
  useEffect(() => { if (!inView) return; const id = setInterval(() => setN((x) => (x >= 4 ? x : x + 1)), 700); return () => clearInterval(id); }, [inView]);
  return (
    <section className="border-t border-border">
      <div ref={ref} className={`${wrap} flex flex-col gap-16 py-24 md:py-[112px] lg:flex-row lg:gap-6`}>
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-accent">02 · INVESTIGATE</p>
            <h2 className="text-[clamp(34px,3.6vw,44px)] font-semibold leading-[1.1] tracking-[-0.04em]">Hypotheses, then proof.</h2>
          </div>
          <div className="flex flex-col rounded-[16px] border border-border bg-panel p-5 md:p-7">
            {steps.map(([t, a, b], i) => {
              const last = i === 3;
              return (
                <button key={t} onClick={() => setN(i + 1)} className={`flex gap-5 py-4 text-left transition-opacity duration-500 ${i ? "border-t border-border" : ""} ${i < n ? "opacity-100" : "opacity-25"}`}>
                  <span className={`w-14 shrink-0 font-mono text-[12px] leading-4 ${last ? "text-accent" : "text-muted"}`}>{t}</span>
                  <span className="flex flex-col gap-1">
                    <span className={`text-[16px] leading-5 ${last ? "text-accent" : ""}`}>{a}{i === n - 1 && !last && <span className="caret" />}</span>
                    <span className="text-[14px] leading-[18px] text-muted">{b}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-accent">03 · RESOLVE</p>
            <h2 className="text-[clamp(34px,3.6vw,44px)] font-semibold leading-[1.1] tracking-[-0.04em]">Only the conclusion reaches you.</h2>
          </div>
          <div className="overflow-hidden rounded-[16px] border border-border bg-panel">
            <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
              <span className="truncate font-mono text-[12px] leading-4">feluda/fix-refresh-race → main</span>
              <span className={`shrink-0 font-mono text-[11px] leading-[14px] tracking-[0.08em] ${committed ? "text-accent" : "text-success"}`}>{committed ? "MERGED" : "CHECKS PASSING"}</span>
            </div>
            <pre className="overflow-x-auto px-6 py-5 font-mono text-[13px] leading-[22px] text-muted scrollbar-none">
              {diff.map(([k, l], i) => (
                <motion.span key={i} initial={{ opacity: 0 }} animate={n >= 4 ? { opacity: 1 } : { opacity: 0.25 }} transition={{ delay: i * 0.08 }}
                  className={`block ${k === "+" ? (committed ? "text-success" : "text-text") : k === "-" ? "text-danger/70 line-through" : ""}`}>{l}</motion.span>
              ))}
            </pre>
            <div className="flex flex-col items-start justify-between gap-4 border-t border-border px-6 py-4 sm:flex-row sm:items-center">
              <span className="text-[14px] leading-[18px] text-muted">+3 −1 · authored by feluda · reviewed by you</span>
              <button onClick={() => setCommitted(true)} disabled={committed} className="btn btn-primary disabled:opacity-70">{committed ? "Committed ✓" : "Commit fix"}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Data handling ---------- */
const data = [["Read only what the review needs", "The diff, its dependencies and the repos you enable. Nothing else."], ["Least-privilege access", "GitHub App and GitLab OAuth scopes limited to the repositories you choose."], ["Pentests stay on staging", "Ownership is verified, never-touch paths are honored, and runs pause at your plan limits."], ["Retention and training", "[To confirm with security] Retention window and model-training policy."]];
export function DataHandling() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="border-t border-border">
      <div className={`${wrap} flex flex-col gap-10 py-24 md:py-[112px] lg:flex-row lg:gap-16`}>
        <div className="flex shrink-0 flex-col gap-4 lg:w-[420px]">
          <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-accent">YOUR CODE, YOUR RULES</p>
          <h2 className="text-[clamp(34px,3.6vw,44px)] font-semibold leading-[1.1] tracking-[-0.04em]">What happens to your code.</h2>
        </div>
        <ul className="flex-1 border-b border-border">
          {data.map(([t, d], i) => (
            <li key={t} className="border-t border-border">
              <button onMouseEnter={() => setOpen(i)} onMouseLeave={() => setOpen(null)} onClick={() => setOpen(open === i ? null : i)} className="group flex w-full gap-8 py-6 text-left">
                <span className="w-10 shrink-0 font-mono text-[12px] leading-[22px] text-accent">0{i + 1}</span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-[18px] leading-[22px] transition-transform duration-300 group-hover:translate-x-1">{t}</span>
                  <span className={`text-[15px] leading-[23px] transition-colors ${open === i ? "text-text" : "text-muted"}`}>{d}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
