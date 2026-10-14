"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { bySlug } from "@/lib/docs";
import { useDocs } from "./DocsShell";
import { CodeTabs, Crumbs, Feedback } from "./Article";

const copy = {
  GitHub: { body: "Install the Feluda GitHub App on your organization and pick the repositories it can read. You'll come back here automatically.", cta: "Install GitHub App", scopes: ["contents: read", "pull_requests: write", "checks: write"] },
  GitLab: { body: "Authorize Feluda with GitLab OAuth and choose the groups it can read. Merge requests get the identical flow.", cta: "Authorize GitLab", scopes: ["read_repository", "api: merge_requests", "pipelines: write"] },
  "GitLab self-hosted": { body: "Add your GitLab instance URL and an application ID from your GitLab admin. Available on Puku Enterprise.", cta: "Add GitLab instance", scopes: ["read_repository", "api: merge_requests", "pipelines: write"] },
} as const;

function Step({ n, title, right, active, children, done }: { done: number; n: number; title: string; right: React.ReactNode; active: boolean; children?: React.ReactNode }){
    const isDone = n <= done, locked = n > done + 1;
    return (
      <div id={n === 3 ? "step-3" : undefined} className={`scroll-mt-40 border-b border-border last:border-0 ${active ? "border-l-2 border-l-accent bg-panel" : ""} ${locked ? "opacity-55" : ""}`}>
        <div className={`flex items-center gap-4 px-5 ${active ? "pt-[22px]" : "py-[18px]"}`}>
          <motion.span layout className={`grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px] leading-[14px] ${isDone ? "bg-[#94C7A026] text-success" : active ? "bg-accent text-accent-ink" : "border border-border"}`}>{isDone ? "✓" : n}</motion.span>
          <span className={`flex-1 ${isDone ? "text-[16px] leading-5 text-muted" : active ? "text-[18px] font-semibold leading-[22px]" : "text-[16px] leading-5"}`}>{title}</span>
          {right}
        </div>
        <AnimatePresence initial={false}>{active && children && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="flex flex-col gap-5 px-5 pb-6 pt-5">{children}</div></motion.div>}</AnimatePresence>
      </div>
    );
}

export default function QuickStart() {
  const page = bySlug("quick-start")!;
  const { provider, setProvider, setToc } = useDocs();
  const [done, setDone] = useState(2);
  const [installing, setInstalling] = useState(false);
  const [open, setOpen] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const [repos, setRepos] = useState<string[]>(["api-gateway"]);
  useEffect(() => { setToc([{ id: "progress", title: "Your progress" }, { id: "step-3", title: "Connect provider" }, { id: "config", title: "Config file" }, { id: "troubleshooting", title: "Troubleshooting" }]); }, [setToc]);
  useEffect(() => { if (!installing) return; const id = setTimeout(() => { setInstalling(false); setDone(3); }, 2600); return () => clearTimeout(id); }, [installing]);
  const c = copy[provider];


  return (
    <article className="flex flex-col gap-7 px-5 pb-24 pt-10 md:px-16 md:pt-12">
      <Crumbs page={page} />
      <motion.header initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-3">
        <h1 className="text-[clamp(36px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.04em]">Your first case in five steps.</h1>
        <p className="text-[14px] leading-[18px] text-muted">4 min · Updated Oct 10, 2026 · Works for GitHub and GitLab</p>
      </motion.header>

      <div id="progress" className="flex scroll-mt-40 items-center gap-4 rounded-[12px] border border-[#B0B3FC4D] bg-[#B0B3FC0F] px-5 py-4">
        <div className="relative grid h-10 w-10 shrink-0 place-items-center">
          <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90"><circle cx="20" cy="20" r="17" fill="none" stroke="#34362e" strokeWidth="3" /><motion.circle cx="20" cy="20" r="17" fill="none" stroke="#b0b3fc" strokeWidth="3" strokeLinecap="round" strokeDasharray={107} animate={{ strokeDashoffset: 107 - (107 * done) / 5 }} /></svg>
          <span className="font-mono text-[12px] leading-4">{done}/5</span>
        </div>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-[15px] leading-[18px]">Signed in as puku · Puku Team</p>
          <p className="text-[13px] leading-4 text-muted">{done >= 5 ? "Case closed. Your first review is live." : `We checked off what's already done in your workspace. Pick up at step ${done + 1}.`}</p>
        </div>
        <button onClick={() => { setDone(2); setRepos(["api-gateway"]); }} className="shrink-0 text-[13px] leading-4 text-muted hover:text-text">Not you? Reset</button>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-border">
        <Step done={done} n={1} title="Continue with Puku" active={false} right={<span className="font-mono text-[11px] text-success">DETECTED</span>} />
        <Step done={done} n={2} title="Profile and personal settings" active={false} right={<span className="font-mono text-[11px] text-success">DETECTED</span>} />
        <Step done={done} n={3} title="Connect your code provider" active={done === 2} right={done >= 3 ? <span className="font-mono text-[11px] text-success">CONNECTED</span> : <span className="font-mono text-[11px] text-accent">~1 MIN</span>}>
          <div className="flex flex-wrap gap-1 self-start rounded-[8px] border border-border bg-bg p-1">
            {(Object.keys(copy) as (keyof typeof copy)[]).map((p) => (
              <button key={p} onClick={() => setProvider(p)} className={`relative rounded-[6px] px-3.5 py-1.5 text-[13px] leading-4 ${provider === p ? "text-text" : "text-muted hover:text-text"}`}>
                {provider === p && <motion.span layoutId="qs-prov" className="absolute inset-0 rounded-[6px] bg-hover" />}<span className="relative">{p}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait"><motion.p key={provider} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[15px] leading-6 text-[#C9CBBF]">{c.body}</motion.p></AnimatePresence>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setInstalling(true)} disabled={installing} className="btn btn-primary">{c.cta}</button>
            <button onClick={() => { navigator.clipboard?.writeText("https://puku.sh/feluda/install?org=puku"); setLinkCopied(true); setTimeout(() => setLinkCopied(false), 1500); }} className="btn btn-secondary">{linkCopied ? "Link copied ✓" : "Copy link for an admin"}</button>
            <span className="flex items-center gap-2 pl-2"><span className={`h-2 w-2 rounded-full ${installing ? "animate-pulse bg-warning" : "bg-warning"}`} /><span className="text-[13px] leading-4 text-muted">{installing ? "Installation detected… verifying" : "Waiting for installation… checks every 5s"}</span></span>
          </div>
          <div className="rounded-[8px] border border-border bg-bg">
            <button onClick={() => setOpen((o) => !o)} className={`flex w-full justify-between px-4 py-3 ${open ? "border-b border-border" : ""}`}>
              <span className="text-[14px] leading-[18px]">{open ? "▾" : "▸"} What Feluda can access</span><span className="font-mono text-[11px] leading-[14px] text-muted">4 SCOPES · READ-MOSTLY</span>
            </button>
            <AnimatePresence initial={false}>{open && <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><div className="flex flex-wrap gap-x-6 gap-y-2 px-4 py-3 font-mono text-[12px] leading-4 text-muted">{c.scopes.map((s) => <span key={s}>{s}</span>)}<span className="text-success">admin: never</span></div></motion.div>}</AnimatePresence>
          </div>
        </Step>
        <Step done={done} n={4} title="Pick repositories" active={done === 3} right={done >= 4 ? <span className="font-mono text-[11px] text-success">{repos.length} SELECTED</span> : <span className="text-[13px] leading-4 text-muted">{done < 3 ? "Unlocks after step 3" : "~30s"}</span>}>
          <div className="flex flex-wrap gap-2">{["api-gateway", "checkout-api", "web-dashboard", "billing", "auth-service"].map((r) => (
            <button key={r} onClick={() => setRepos((x) => (x.includes(r) ? x.filter((y) => y !== r) : [...x, r]))} className={`rounded-full border px-3.5 py-2 font-mono text-[13px] ${repos.includes(r) ? "border-accent bg-[#B0B3FC1A]" : "border-border text-muted hover:text-text"}`}>{repos.includes(r) ? "✓ " : ""}{r}</button>
          ))}</div>
          <button disabled={!repos.length} onClick={() => setDone(4)} className="btn btn-primary self-start disabled:opacity-40">Enable {repos.length} repo{repos.length === 1 ? "" : "s"}</button>
        </Step>
        <Step done={done} n={5} title="Open a pull request and watch the first review" active={done === 4} right={done >= 5 ? <span className="font-mono text-[11px] text-success">REVIEWED</span> : <span className="text-[13px] leading-4 text-muted">~60s</span>}>
          <p className="text-[15px] leading-6 text-[#C9CBBF]">Push any branch to {repos[0] ?? "a repo"} and open a pull request. Feluda joins as a check and comments within a minute.</p>
          <button onClick={() => setDone(5)} className="btn btn-primary self-start">I opened one — watch it</button>
        </Step>
      </div>

      <section id="config" className="scroll-mt-40">
        <CodeTabs tabs={[
          { name: ".feluda.yml", lines: ["review:", "  scope: medium        # comment on medium+ findings", "  retrigger_on_push: true", '  ignore: ["docs/**"]'], hl: 2 },
          { name: "Dashboard", lines: ["Puku → Feluda → Review settings", "  Comment scope ........ Medium", "  Retrigger on push .... On", "  Ignored paths ........ docs/**"], hl: 2 },
        ]} />
      </section>

      <div id="troubleshooting" className="flex scroll-mt-40 gap-3.5 rounded-[12px] border border-border bg-panel px-5 py-4">
        <span className="shrink-0 font-mono text-[12px] leading-4 text-accent">TIP</span>
        <p className="text-[14px] leading-[22px] text-[#C9CBBF]">No admin rights? Use &ldquo;Copy link for an admin&rdquo;. Feluda emails you when they finish, and this page picks up where you left off.</p>
      </div>
      <Feedback slug="quick-start" />
    </article>
  );
}
