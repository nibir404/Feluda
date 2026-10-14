"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const recon = [
  ["Checkout & payments", "POST /v1/cart · POST /v1/coupons/apply · POST /v1/checkout · GET /v1/orders/{id}"],
  ["Auth & sessions", "POST /auth/login · POST /auth/refresh · POST /auth/2fa · JWT (HS256)"],
  ["Integrations", "POST /v1/webhooks (outbound URL) · S3 uploads · Stripe callbacks"],
  ["Trust boundaries", "3 roles · 2 tenants · admin API on same host"],
];
const plan = [
  ["● CONFIRMED", "#C97A80", "Sequential order ids + no tenant filter → cross-tenant read", "FEL-142", "#B0B3FC", true],
  ["● CONFIRMED", "#C97A80", "JWT library accepts alg=none → impersonate any user", "FEL-143", "#B0B3FC", true],
  ["○ DISPROVED", "#8FA894", "Webhook URL reaches cloud metadata (SSRF)", "blocked · 422", "#62665B", false],
  ["○ DISPROVED", "#8FA894", "Customer can PATCH own role to admin", "blocked · 403", "#62665B", false],
  ["– SKIPPED", "#ABA088", "Checkout with stolen 2FA session — needed a code", "Run with human in the loop", "#B0B3FC", false],
] as const;
const agents = [
  ["idor-07", "Swap order ids between tenant-a and tenant-b sessions", "▲ Exploited · FEL-142", "#C97A80", "5m 40s", ["login tenant-a", "GET /v1/orders/1043 → 200 (tenant-b)", "PII in response", "exploited"]],
  ["jwt-01", "Re-sign tokens with alg=none, HS/RS confusion, weak secrets", "▲ Exploited · FEL-143", "#B88C77", "3m 12s", ["decode JWT", "set alg=none, sub=admin", "GET /admin → 200", "exploited"]],
  ["sqli-03", "60 SQL/NoSQL payloads on /v1/coupons/apply", "✓ Blocked", "#8FA894", "7m 03s", ["' OR 1=1 --", "{\"$ne\":null}", "60/60 → 422", "blocked"]],
  ["ssrf-01", "Point webhook URL at 169.254.169.254 and internal hosts", "✓ Blocked", "#8FA894", "2m 48s", ["169.254.169.254", "localhost:6379", "allowlist enforced", "blocked"]],
  ["biz-05", "Replay checkout with a hijacked session behind 2FA", "– Skipped · needs input", "#ABA088", "0m 40s", ["replay session", "2FA challenge", "awaiting human", "skipped"]],
] as const;
const surface = [
  ["1", "#C97A80", "Subdomain takeover", true],
  ["3", "#B88C77", "Leaked credentials", false],
  ["4", "#ABA088", "Exposed ports", false],
  ["2", "#ABA088", "Weak TLS", false],
  ["1", "#ABA088", "Email spoofing", false],
  ["0", "#8FA894", "DNS zone transfer", false],
] as const;

function Replay({ steps }: { steps: readonly string[] }) {
  const [n, setN] = useState(0);
  useEffect(() => { const id = setInterval(() => setN((x) => (x >= steps.length ? x : x + 1)), 550); return () => clearInterval(id); }, [steps]);
  return (
    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-[#151614]">
      <ol className="flex flex-wrap items-center gap-2 px-6 py-3 font-mono text-[11px]">
        {steps.slice(0, n).map((s, i) => (
          <motion.li key={s} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <span className={`rounded-[6px] border px-2 py-1 ${i === steps.length - 1 ? (s === "exploited" ? "border-[#5A3237] text-[#C97A80]" : "border-[#34362E] text-[#8FA894]") : "border-[#34362E] text-[#EEEEE5]"}`}>{s}</span>
            {i < steps.length - 1 && <span className="text-accent">→</span>}
          </motion.li>
        ))}
        {n < steps.length && <li className="caret text-muted" />}
      </ol>
    </motion.div>
  );
}

export default function AttackTeaser() {
  const [tab, setTab] = useState("Threat model");
  const [watch, setWatch] = useState<string | null>(null);
  const [tile, setTile] = useState<number | null>(0);

  return (
    <section className="border-t border-border bg-sidebar" aria-labelledby="atk-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-24 md:px-12 md:py-[112px] xl:px-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-danger">FELUDA ATTACK · AGENTIC PENTESTS</p>
            <h2 id="atk-title" className="max-w-[700px] text-[clamp(38px,4.5vw,56px)] font-semibold leading-[1.04] tracking-[-0.04em]">Then it breaks in, before someone else does.</h2>
          </div>
          <p className="max-w-[400px] shrink-0 text-[17px] leading-[26px] text-muted">402 agents form hypotheses about your app, try them for real, and only report what they could actually exploit.</p>
        </div>

        <div className="flex flex-col overflow-hidden rounded-[16px] border border-border bg-bg">
          <div className="flex flex-col items-start justify-between gap-3 border-b border-border px-4 py-3 md:flex-row md:items-center">
            <div role="tablist" className="flex gap-1 overflow-x-auto scrollbar-none">
              {["Threat model", "Agents · 402", "Attack surface"].map((t) => (
                <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className="relative shrink-0 rounded-full px-3.5 py-2 text-[14px] leading-[18px]">
                  {tab === t && <motion.span layoutId="atk-tab" className="absolute inset-0 rounded-full bg-hover" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
                  <span className={`relative ${tab === t ? "text-text" : "text-muted"}`}>{t}</span>
                </button>
              ))}
            </div>
            <span className="font-mono text-[11px] leading-[14px] tracking-[0.08em] text-success">✓ COMPLETED · 4H 32M · CHECKOUT-API</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="p-4 md:p-8">
              {tab === "Threat model" && (
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="flex shrink-0 flex-col gap-3.5 self-start rounded-[12px] border border-[#34362E] bg-[#1C1D1A] p-5 lg:w-[420px]">
                    <div className="flex justify-between text-[11px] leading-4 text-[#9DA193]"><span className="tracking-[0.08em]">WHAT RECON FOUND</span><span>42 endpoints · 7 flows</span></div>
                    {recon.map(([h, d], i) => (
                      <motion.div key={h} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }} className="flex flex-col gap-3.5">
                        {i > 0 && <span className="h-px bg-[#34362E]" />}
                        <div className="flex flex-col gap-1.5"><p className="text-[14px] font-semibold leading-[18px] text-[#EEEEE5]">{h}</p><p className="text-[12px] leading-[18px] text-[#9DA193]">{d}</p></div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-1 flex-col self-start rounded-[12px] border border-[#34362E] bg-[#1C1D1A]">
                    <div className="flex flex-wrap justify-between gap-2 border-b border-[#34362E] px-5 py-4">
                      <p className="text-[14px] font-semibold leading-[18px] text-[#EEEEE5]">Attack plan · 18 hypotheses</p>
                      <p className="text-[12px] leading-4 text-[#9DA193]">5 confirmed · 11 disproved · 2 skipped</p>
                    </div>
                    {plan.map(([st, sc, t, r, rc, hot], i) => (
                      <motion.div key={t} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
                        className={`group flex flex-col gap-1 px-5 py-3.5 transition-colors hover:bg-[#242620] md:flex-row md:items-center md:gap-3.5 ${i < 4 ? "border-b border-[#34362E]" : ""}`}>
                        <span className="w-24 shrink-0 text-[11px] leading-[14px]" style={{ color: sc }}>{st}</span>
                        <span className={`flex-1 text-[14px] leading-5 ${hot ? "text-[#EEEEE5]" : "text-[#9DA193]"}`}>{t}</span>
                        <span className="text-[13px] leading-[18px]" style={{ color: rc }}>{r}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              {tab === "Agents · 402" && <AgentGrid />}
              {tab === "Attack surface" && (
                <div className="grid gap-3 md:grid-cols-[1fr_1.2fr]">
                  <pre className="overflow-x-auto rounded-[12px] border border-[#34362E] bg-[#1C1D1A] p-5 font-mono text-[12px] leading-6 text-[#9DA193]">{"checkout-api.acme.dev      443  TLS1.3  ✓\nlegacy.acme.dev            CNAME → unclaimed  ▲\nadmin.acme.dev             443  same host as api\nmail.acme.dev              SPF ~all  DMARC none\nstaging-db.acme.dev        5432 open ▲\ncdn.acme.dev               443  TLS1.2"}</pre>
                  <div className="rounded-[12px] border border-[#34362E] bg-[#1C1D1A] p-5 text-[14px] leading-6 text-[#9DA193]">
                    <p className="font-semibold text-[#EEEEE5]">{surface[tile ?? 0][2]}</p>
                    <p className="mt-2">{["legacy.acme.dev points at a deleted bucket. Anyone can claim it and serve content on your domain.", "3 keys found in public commits and a JS bundle; 1 still valid.", "Postgres, Redis, Elasticsearch and an SSH bastion reachable from the internet.", "Two hosts still negotiate TLS 1.0 / weak ciphers.", "DMARC is missing; spoofed mail from @acme.dev is delivered.", "Zone transfers are refused on all nameservers."][tile ?? 0]}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="overflow-hidden rounded-[16px] border border-border bg-bg p-1">
          <div className="overflow-x-auto rounded-[12px] bg-[#1C1D1A] scrollbar-none">
            <div className="min-w-[760px]">
              <div className="flex gap-[18px] border-b border-[#34362E] px-6 py-3 text-[11px] leading-4 tracking-[0.08em] text-[#62665B]">
                <span className="w-[100px] shrink-0">AGENT</span><span className="flex-1">WHAT IT TRIED</span><span className="w-[160px] shrink-0">RESULT</span><span className="w-[90px] shrink-0">TIME</span><span className="w-[70px] shrink-0">REPLAY</span>
              </div>
              {agents.map(([a, t, r, rc, tm, st], i) => (
                <div key={a} className={i < 4 ? "border-b border-[#34362E]" : ""}>
                  <div className="flex items-center gap-[18px] px-6 py-[15px] transition-colors hover:bg-[#242620]">
                    <span className="w-[100px] shrink-0 font-mono text-[13px] leading-[18px] text-[#EEEEE5]">{a}</span>
                    <span className="flex-1 text-[14px] leading-5 text-[#EEEEE5]">{t}</span>
                    <span className="w-[160px] shrink-0 text-[13px] leading-[18px]" style={{ color: rc }}>{r}</span>
                    <span className="w-[90px] shrink-0 text-[12px] leading-4 text-[#9DA193]">{tm}</span>
                    <button onClick={() => setWatch(watch === a ? null : a)} className="w-[70px] shrink-0 text-left text-[13px] leading-[18px] text-[#B0B3FC] hover:brightness-125">{watch === a ? "■ Stop" : "▶ Watch"}</button>
                  </div>
                  <AnimatePresence>{watch === a && <Replay steps={st} />}</AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {surface.map(([n, c, l, hot], i) => (
            <button key={l} onClick={() => { setTile(i); setTab("Attack surface"); }}
              className={`flex flex-col gap-1.5 rounded-[10px] border p-4 text-left transition-all duration-300 hover:-translate-y-1 ${hot ? "border-[#5A3237] bg-[#2A1E20]" : "border-[#34362E] bg-[#1C1D1A] hover:border-[#4a4c42]"} ${tile === i && tab === "Attack surface" ? "ring-1 ring-accent" : ""}`}>
              <span className="text-[24px] font-semibold leading-7" style={{ color: c }}>{n}</span>
              <span className="text-[13px] leading-[18px] text-[#EEEEE5]">{l}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentGrid() {
  const [cells] = useState(() => Array.from({ length: 402 }, (_, i) => (i === 41 || i === 187 ? 2 : i % 37 === 0 ? 3 : i % 9 === 0 ? 1 : 0)));
  const [h, setH] = useState<number | null>(null);
  const col = ["#2a2b27", "#8FA894", "#C97A80", "#ABA088"];
  const label = ["disproved", "blocked", "exploited", "skipped"];
  return (
    <div>
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(14px, 1fr))" }} onMouseLeave={() => setH(null)}>
        {cells.map((c, i) => (
          <motion.span key={i} onMouseEnter={() => setH(i)} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: (i % 60) * 0.006 }}
            className="aspect-square rounded-[3px] transition-transform hover:scale-150" style={{ background: col[c] }} />
        ))}
      </div>
      <p className="mt-4 font-mono text-[12px] text-muted">{h === null ? "Hover an agent" : `agent-${String(h).padStart(3, "0")} · ${label[cells[h]]}`}</p>
    </div>
  );
}
