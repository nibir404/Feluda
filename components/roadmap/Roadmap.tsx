"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Dither, wrap } from "../ui";

type Item = { title: string; desc: string; live?: boolean; screen?: () => React.ReactNode };
type Lane = { name: string; no: string; color: string; items: Item[] };

const ease = [0.16, 1, 0.3, 1] as const;

function useTick(ms: number, n: number) {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((x) => (x + 1) % n), ms); return () => clearInterval(id); }, [ms, n]);
  return i;
}

const Frame = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`overflow-hidden rounded-[8px] border border-border bg-sidebar font-mono text-[10px] leading-[18px] ${className}`}>{children}</div>
);

function Diff() {
  const fixed = useTick(2200, 2) === 1;
  return (
    <Frame>
      <p className="px-2.5 text-muted">40  const user = await db.find(id)</p>
      <p className={`px-2.5 transition-colors duration-500 ${fixed ? "text-muted/50 line-through" : "bg-[#FF91981F] text-danger"}`}>41− return res.json(user)</p>
      <motion.p animate={{ opacity: fixed ? 1 : 0.25 }} className="bg-[#94C7A01F] px-2.5 text-success">41+ return res.json(pick(user))</motion.p>
      <p className="border-t border-border px-2.5 py-1.5 text-accent">● feluda · {fixed ? "resolved ✓" : "leaks password_hash"}</p>
    </Frame>
  );
}

function Fix() {
  const [on, setOn] = useState(false);
  return (
    <Frame className="flex items-center gap-2 p-3">
      <span className="flex-1 text-muted">confidence <motion.span key={String(on)} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className={on ? "text-success" : "text-warning"}>{on ? "5/5" : "3/5"}</motion.span></span>
      <button onClick={(e) => { e.stopPropagation(); setOn((x) => !x); }} className={`rounded-[6px] px-2.5 py-1 font-sans text-[11px] font-semibold transition-colors ${on ? "border border-border text-success" : "bg-text text-bg"}`}>{on ? "Applied ✓" : "Apply fix"}</button>
    </Frame>
  );
}

function Memory() {
  const rules = ["use zod at edges", "no raw SQL", "pick() responses", "no console.log"];
  const n = useTick(1500, rules.length);
  return (
    <Frame className="flex flex-wrap gap-1.5 p-3">
      {rules.map((r, i) => <span key={r} className={`rounded-full border px-2 py-0.5 transition-colors duration-500 ${i === n ? "border-accent/60 text-accent" : "border-border text-muted"}`}>{i === n ? "+ " : ""}{r}</span>)}
    </Frame>
  );
}

function Bars() {
  const t = useTick(1800, 3);
  const sets = [[30, 45, 38, 62, 55, 90], [40, 35, 58, 48, 72, 84], [25, 52, 44, 70, 60, 96]];
  return (
    <Frame className="flex h-16 items-end gap-1.5 p-3">
      {sets[t].map((h, i) => <motion.span key={i} animate={{ height: `${h}%` }} transition={{ duration: 0.8, ease }} className={`flex-1 rounded-[2px] ${i === 5 ? "bg-[#B0B3FC99]" : "bg-[#ffffff14]"}`} />)}
    </Frame>
  );
}

function Pentest() {
  const steps = [["✓ recon · 42 routes", "text-success"], ["✓ auth bypass · 0", "text-success"], ["● IDOR on /orders/:id", "text-danger"], ["○ SSRF probe…", "text-muted"]];
  const n = useTick(900, steps.length + 2);
  return (
    <Frame className="flex h-[88px] flex-col p-3 leading-[16px]">
      {steps.map(([s, c], i) => <motion.span key={s} animate={{ opacity: i <= n ? 1 : 0, x: i <= n ? 0 : -6 }} className={c}>{s}</motion.span>)}
    </Frame>
  );
}

function Surface() {
  const nodes = [[20, 12], [24, 46], [118, 10], [122, 44]];
  const hot = useTick(1200, 4);
  return (
    <Frame className="grid h-[76px] place-items-center">
      <svg width="140" height="56" viewBox="0 0 140 56">
        {nodes.map(([x, y], i) => <line key={i} x1="70" y1="28" x2={x} y2={y} stroke={i === hot ? "#9DA193" : "#34362E"} className="transition-colors duration-500" />)}
        <circle cx="70" cy="28" r="6" fill="#B0B3FC" />
        {nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === hot ? 5 : 4} fill={i === hot ? "#EEEEE5" : "#5a5d52"} className="transition-all duration-500" />)}
      </svg>
    </Frame>
  );
}

function Heat() {
  const t = useTick(700, 1000);
  return (
    <Frame className="flex flex-wrap gap-[3px] p-3">
      {Array.from({ length: 20 }, (_, i) => {
        const v = (Math.sin(i * 1.7 + t * 0.9) + 1) / 2;
        return <span key={i} className="h-4 w-4 rounded-[3px] transition-opacity duration-700" style={{ background: "#9DA193", opacity: 0.08 + v * 0.5 }} />;
      })}
    </Frame>
  );
}

function Providers() {
  return (
    <Frame className="flex gap-2 p-3">
      <span className="rounded-[6px] bg-hover px-2.5 py-1 text-text">GitHub ✓</span>
      <span className="rounded-[6px] bg-hover px-2.5 py-1 text-text">GitLab ✓</span>
      <span className="rounded-[6px] border border-dashed border-border px-2.5 py-1 text-muted">Bitbucket</span>
    </Frame>
  );
}

function Yaml() {
  const scopes = ["low", "medium", "high"];
  const s = useTick(1600, 3);
  return (
    <Frame className="whitespace-pre p-3 leading-4 text-muted">
      {"review:\n  scope: "}<motion.span key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent">{scopes[s]}</motion.span>{'\n  ignore: ["docs/**"]'}
    </Frame>
  );
}

const lanes: Lane[] = [
  { name: "Review", no: "01", color: "#B0B3FC", items: [
    { title: "Pull request review", desc: "Reads every pull request, traces the bug to its root cause and comments with the fix.", live: true, screen: Diff },
    { title: "One-click fixes", desc: "Turns a finding into a ready commit you can apply straight from the PR comment.", live: true, screen: Fix },
    { title: "Review memory", desc: "Learns your team's conventions and past feedback so reviews get sharper over time.", live: true, screen: Memory },
    { title: "Review analytics", desc: "Shows where bugs come from — by repo, author and bug class — over time.", live: true, screen: Bars },
    { title: "Review in your IDE", desc: "Runs the same review in your editor before you even push." },
  ] },
  { name: "Attack", no: "02", color: "#FF9198", items: [
    { title: "Agentic pentests", desc: "AI agents attack your staging app, prove what's exploitable and hand you the fix.", live: true, screen: Pentest },
    { title: "Attack surface", desc: "Maps every domain, endpoint and service you expose to the internet.", live: true, screen: Surface },
    { title: "Exploit heatmap", desc: "Shows which parts of your app get hit hardest, so you know where to harden first.", live: true, screen: Heat },
    { title: "Continuous pentests", desc: "Re-runs attacks automatically on every deploy instead of once a quarter." },
    { title: "Authenticated DAST", desc: "Tests your app logged in as real roles to find access-control bugs." },
    { title: "API discovery & fuzzing", desc: "Finds undocumented endpoints and throws malformed input at them." },
  ] },
  { name: "Supply chain", no: "03", color: "#E8B187", items: [
    { title: "Secrets detection", desc: "Catches API keys, tokens and passwords in a pull request before they reach main." },
    { title: "Dependency scanning", desc: "Flags vulnerable open-source packages and suggests the safe version." },
    { title: "License risks", desc: "Warns when a dependency's license conflicts with how you ship." },
    { title: "Infrastructure as code", desc: "Checks Terraform, Kubernetes and Docker files for risky configuration." },
  ] },
  { name: "Workflow", no: "04", color: "#94C7A0", items: [
    { title: "GitHub & GitLab", desc: "Install once and Feluda joins every pull or merge request as a check.", live: true, screen: Providers },
    { title: ".feluda.yml rules", desc: "Configure scope, ignored paths and rules in a file that lives in your repo.", live: true, screen: Yaml },
    { title: "Bitbucket", desc: "The same review flow for Bitbucket pull requests." },
    { title: "Slack & Jira", desc: "Sends findings to the right channel and opens tickets automatically." },
    { title: "SSO & audit log", desc: "SAML sign-in and a full record of who changed what." },
  ] },
];

const all = lanes.flatMap((l) => l.items);
const liveCount = all.filter((i) => i.live).length;

function Skeleton() {
  return (
    <div className="relative flex flex-col gap-2 overflow-hidden rounded-[8px] border border-dashed border-border p-3">
      {[70, 45, 58].map((w) => <span key={w} className="h-1.5 rounded-full bg-hover" style={{ width: `${w}%` }} />)}
      <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2.4s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </div>
  );
}

function Card({ item, color }: { item: Item; color: string }) {
  const [notify, setNotify] = useState(false);
  const [open, setOpen] = useState(false);
  const Screen = item.screen;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease }}
      whileHover={{ y: -3 }}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      tabIndex={0}
      className={`group relative flex flex-col gap-[18px] rounded-[12px] px-4 pb-[18px] pt-4 transition-colors ${item.live ? "border border-border bg-panel/70 backdrop-blur-[2px] hover:border-[#4a4c42] hover:shadow-[0_20px_40px_#00000066]" : "border border-dashed border-border hover:border-muted/50 hover:shadow-[0_20px_40px_#00000066]"}`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-[12px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(240px circle at 50% 0%, #ffffff08, transparent 70%)` }} />
      <div className="relative min-h-[88px]">
        <div className={`transition-all duration-500 ${open ? "scale-[0.98] opacity-0 blur-[2px]" : ""}`}>{Screen ? <Screen /> : <Skeleton />}</div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.35, ease }} className="absolute inset-0 flex flex-col gap-2.5 px-0.5 pt-0.5">
              <span className="font-mono text-[10px] tracking-[0.1em] text-muted">{item.live ? "WHAT IT DOES" : "WHAT IT WILL DO"}</span>
              <span className="text-[14px] leading-5 text-[#C9CBBF]">{item.desc}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="relative flex items-end justify-between gap-3">
        <span className={`text-[20px] font-semibold leading-6 tracking-[-0.02em] ${item.live || open ? "text-text" : "text-muted"} transition-colors`}>{item.title}</span>
        {item.live ? (
          <span className="shrink-0 rounded-full border border-border px-2 py-[3px] font-mono text-[10px] text-muted"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-success align-middle" />LIVE</span>
        ) : (
          <button onClick={(e) => { e.stopPropagation(); setNotify((n) => !n); }} className={`shrink-0 rounded-full px-2 py-[3px] font-mono text-[10px] transition-colors ${notify ? "border border-border text-text" : "border border-dashed border-border text-muted hover:text-text"}`}>
            <AnimatePresence mode="wait" initial={false}><motion.span key={String(notify)} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="block">{notify ? "NOTIFY ✓" : "SOON"}</motion.span></AnimatePresence>
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Roadmap() {
  const [filter, setFilter] = useState<"all" | "live" | "soon">("all");
  const show = (i: Item) => filter === "all" || (filter === "live" ? i.live : !i.live);
  return (
    <div className="relative overflow-hidden">
    <div aria-hidden className="dots dots-fade pointer-events-none absolute inset-x-0 top-0 h-[900px] opacity-60" />
    <Dither size={[1400, 1400]} className="left-1/2 top-[-900px] -translate-x-1/2 opacity-[0.12]" />
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[300px] h-[400px] bg-gradient-to-b from-transparent to-bg" />
    <section className={`${wrap} relative flex flex-col gap-12 pb-28 pt-36 md:gap-16 md:pt-[202px]`}>
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="flex flex-col gap-5">
          <span className="font-mono text-[12px] tracking-[0.12em] text-accent">ROADMAP · OCT 2026</span>
          <h1 className="text-[clamp(52px,7vw,88px)] font-semibold leading-none tracking-[-0.045em]">The case board.</h1>
        </motion.div>
        <div className="flex gap-1 self-start rounded-full border border-border p-1 md:self-auto">
          {([["all", `All · ${all.length}`], ["live", `Live · ${liveCount}`], ["soon", `Soon · ${all.length - liveCount}`]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} className={`relative rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] ${filter === k ? "text-text" : "text-muted hover:text-text"}`}>
              {filter === k && <motion.span layoutId="rm-filter" className="absolute inset-0 rounded-full bg-hover" />}<span className="relative">{l}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {lanes.map((lane, li) => (
          <motion.div key={lane.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: li * 0.08, ease }} className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-border px-1 pb-3 pt-1">
              <span className="flex items-center gap-2.5 text-[16px] font-medium"><span className="h-1.5 w-1.5 rounded-full" style={{ background: lane.color }} />{lane.name}</span>
              <span className="font-mono text-[11px] text-muted">{lane.no} · {lane.items.filter((i) => i.live).length}/{lane.items.length}</span>
            </div>
            <AnimatePresence mode="popLayout">
              {lane.items.filter(show).map((it) => <Card key={it.title} item={it} color={lane.color} />)}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
    </div>
  );
}
