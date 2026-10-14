"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "../Logo";
import { docs, groups, neighbors, paletteItems, type PaletteItem } from "@/lib/docs";

type Provider = "GitHub" | "GitLab" | "GitLab self-hosted";
const Ctx = createContext<{ provider: Provider; setProvider: (p: Provider) => void; askRef: React.RefObject<HTMLInputElement | null>; toc: { id: string; title: string }[]; setToc: (t: { id: string; title: string }[]) => void }>(null!);
export const useDocs = () => useContext(Ctx);

const slugOf = (path: string) => (path === "/docs" ? "quick-start" : path.replace("/docs/", ""));

function Dropdown<T extends string>({ value, options, onChange, hint }: { value: T; options: T[]; onChange: (v: T) => void; hint?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-1.5 rounded-[8px] border border-border px-2.5 py-1.5 hover:bg-hover">
        <span className="text-[13px] leading-4">{value}</span><span className="text-[11px] leading-[14px] text-muted">▾{hint && ` ${hint}`}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-[10px] border border-border bg-panel p-1 shadow-xl">
            {options.map((o) => <li key={o}><button onClick={() => { onChange(o); setOpen(false); }} className={`w-full rounded-[6px] px-3 py-2 text-left text-[13px] hover:bg-hover ${o === value ? "text-text" : "text-muted"}`}>{o}{o === value && " ✓"}</button></li>)}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function Palette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("All");
  const [i, setI] = useState(0);
  const router = useRouter();
  const { askRef } = useDocs();
  const tabs = ["All", "Pages", "Errors", "Settings", "Ask AI"];
  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const items = paletteItems.filter((p) => (tab === "All" || tab === "Ask AI" || p.group === tab) && words.every((w) => (p.title + " " + p.sub).toLowerCase().includes(w)));
    const ask: PaletteItem = { kind: "ASK", title: `Ask the handbook: "${q || "…"}"`, sub: "", href: "#ask", group: "Actions" };
    return tab === "Ask AI" ? [ask] : [...items.slice(0, 8), ...(q ? [ask] : [])];
  }, [q, tab]);
  useEffect(() => { setI(0); }, [q, tab]);
  useEffect(() => { if (open) setQ(""); }, [open]);
  const go = (p: PaletteItem) => {
    onClose();
    if (p.kind === "ASK") { setTimeout(() => { if (askRef.current) { askRef.current.value = q; askRef.current.focus(); askRef.current.form?.requestSubmit(); } }, 50); return; }
    router.push(p.href);
  };
  const groupsOrder: [string, PaletteItem["group"][]][] = [["ERROR CODES", ["Errors"]], ["PAGES", ["Pages", "Settings"]], ["ACTIONS", ["Actions"]]];
  const kindC: Record<string, string> = { ERR: "bg-[#3A2A20] text-warning", DOC: "bg-hover text-muted", WIDGET: "bg-hover text-muted", RUN: "bg-[#24254A] text-accent", ASK: "bg-[#24254A] text-accent" };
  let idx = -1;
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-start justify-center bg-[#0a0a09cc] px-4 pt-[12vh] backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ scale: 0.97, y: -8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0 }} transition={{ type: "spring", stiffness: 420, damping: 32 }}
            onClick={(e) => e.stopPropagation()} className="w-full max-w-[680px] overflow-hidden rounded-[14px] border border-border bg-panel shadow-[0_40px_120px_#000]" role="dialog" aria-label="Search docs">
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search pages, settings, error codes…" aria-label="Search"
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setI((x) => Math.min(list.length - 1, x + 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setI((x) => Math.max(0, x - 1)); }
                  if (e.key === "Enter" && list[i]) go(list[i]);
                  if (e.key === "Tab") { e.preventDefault(); setTab((t) => tabs[(tabs.indexOf(t) + 1) % tabs.length]); }
                  if (e.key === "Escape") onClose();
                }}
                className="flex-1 bg-transparent text-[18px] leading-6 caret-accent outline-none placeholder:text-muted" />
              <kbd className="rounded-[6px] border border-border px-2 py-1 font-mono text-[11px] text-muted">ESC</kbd>
            </div>
            <div className="flex gap-1 border-b border-border px-4 py-2.5">
              {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-[6px] px-3 py-1.5 text-[13px] ${tab === t ? "bg-hover text-text" : "text-muted hover:text-text"}`}>{t}</button>)}
            </div>
            <div className="max-h-[50vh] overflow-y-auto py-2" data-lenis-prevent>
              {groupsOrder.map(([g, keys]) => {
                const items = list.filter((p) => keys.includes(p.group));
                if (!items.length) return null;
                return (
                  <div key={g}>
                    <p className="px-5 pb-2 pt-3 font-mono text-[11px] tracking-[0.12em] text-muted">{g}</p>
                    {items.map((p) => { idx++; const me = idx; return (
                      <button key={p.title + p.href} onMouseEnter={() => setI(me)} onClick={() => go(p)} className={`mx-2 flex w-[calc(100%-16px)] items-center gap-3 rounded-[8px] px-3 py-2.5 text-left ${i === me ? "bg-hover" : ""}`}>
                        <span className={`shrink-0 rounded-[4px] px-2 py-1 font-mono text-[10px] ${kindC[p.kind]}`}>{p.kind}</span>
                        <span className="min-w-0 flex-1"><span className="block truncate text-[15px] leading-5">{p.title}</span>{p.sub && <span className="block truncate text-[13px] leading-4 text-muted">{p.sub}</span>}</span>
                        {i === me && <span className="text-muted">↵</span>}
                      </button>
                    ); })}
                  </div>
                );
              })}
              {!list.length && <p className="px-5 py-8 text-center text-[14px] text-muted">No matches. Press Tab to ask the handbook.</p>}
            </div>
            <div className="flex gap-5 border-t border-border bg-sidebar px-5 py-3 text-[12px] text-muted"><span>↑↓ navigate</span><span>↵ open</span><span className="hidden sm:inline">⌘↵ open in app</span><span>tab filter</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const answers: [RegExp, string, string][] = [
  [/two|orgs?|multiple/i, "Yes. Install the app on each org; both appear under one Puku workspace.", "CONNECT A PROVIDER §2"],
  [/gitlab|self.?host/i, "Use OAuth on gitlab.com. Self-hosted GitLab needs your instance URL and an application ID (Enterprise).", "CONNECT A PROVIDER §3"],
  [/price|cost|plan|buy|pro\b/i, "Feluda is included with Puku Team and Enterprise. There's no separate subscription.", "PUKU TEAM REQUIREMENTS §1"],
  [/limit|request|quota/i, "Runs draw from your monthly requests and pause safely at 90%. Docs-only changes are free.", "REQUESTS & LIMITS §1"],
  [/install|missing|denied|error/i, "Missing installation means the GitHub App isn't on that org yet. An org owner installs it, then retry.", "TROUBLESHOOTING §1"],
  [/scope|noisy|chatty|comment/i, "Set review.scope to low, medium or high in .feluda.yml or in the dashboard.", "COMMENT SCOPE §1"],
  [/pentest|attack|staging/i, "Point Attack at staging, verify ownership, add never-touch paths, then launch. You see the estimate first.", "RUN A PENTEST §1"],
];

function Rail() {
  const { toc, askRef } = useDocs();
  const [active, setActive] = useState("");
  const [qa, setQa] = useState<{ q: string; a: string; s: string }>({ q: "Can I connect two GitHub orgs?", a: answers[0][1], s: answers[0][2] });
  const [thinking, setThinking] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-30% 0px -60% 0px" });
    toc.forEach((t) => { const el = document.getElementById(t.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [toc]);
  return (
    <aside className="sticky top-[90px] hidden w-[300px] shrink-0 flex-col gap-6 self-start pr-[72px] pt-12 xl:flex">
      <div className="flex flex-col gap-2.5">
        <p className="font-mono text-[11px] leading-[14px] tracking-[0.12em] text-muted">ON THIS PAGE</p>
        {toc.map((t) => (
          <a key={t.id} href={`#${t.id}`} className={`border-l-2 pl-3 text-[14px] leading-[18px] transition-colors ${active === t.id ? "border-accent text-text" : "border-transparent text-muted hover:text-text"}`}>{t.title}</a>
        ))}
      </div>
      <form id="ask" onSubmit={(e) => {
        e.preventDefault();
        const q = askRef.current?.value.trim(); if (!q) return;
        setThinking(true);
        setTimeout(() => {
          const hit = answers.find(([r]) => r.test(q));
          setQa({ q, a: hit ? hit[1] : "I couldn't find that in the handbook yet. Try ⌘K, or ask in #feluda on Puku.", s: hit ? hit[2] : "NO SOURCE" });
          setThinking(false); if (askRef.current) askRef.current.value = "";
        }, 700);
      }} className="flex flex-col gap-3 rounded-[12px] border border-border bg-panel p-4">
        <p className="flex items-center gap-2 text-[13px] leading-4"><span className={`h-1.5 w-1.5 rounded-full bg-accent ${thinking ? "animate-ping" : ""}`} />Ask the handbook</p>
        <AnimatePresence mode="wait">
          <motion.div key={qa.q + thinking} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
            <p className="text-[13px] leading-5 text-muted">&ldquo;{qa.q}&rdquo;</p>
            {thinking ? <p className="caret text-[13px] leading-5 text-muted">Reading the handbook </p> : <>
              <p className="text-[13px] leading-5">{qa.a}</p>
              <p className="font-mono text-[11px] leading-[14px] text-accent">SOURCE · {qa.s}</p>
            </>}
          </motion.div>
        </AnimatePresence>
        <div className="flex h-9 items-center justify-between rounded-[8px] border border-border bg-bg pl-3 pr-1.5 focus-within:border-accent">
          <input ref={askRef} placeholder="Ask anything…" aria-label="Ask the handbook" className="min-w-0 flex-1 bg-transparent text-[13px] leading-4 outline-none placeholder:text-muted" />
          <button className="rounded-[4px] bg-hover px-1.5 py-[3px] font-mono text-[11px] leading-[14px]">↵</button>
        </div>
      </form>
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[11px] leading-[14px] tracking-[0.12em] text-muted">SHORTCUTS</p>
        {[["Search", "⌘K"], ["Next / prev page", "J K"], ["Copy code", "C"]].map(([a, b]) => <p key={a} className="flex justify-between text-[13px] leading-4"><span className="text-muted">{a}</span><span className="font-mono text-[12px]">{b}</span></p>)}
      </div>
    </aside>
  );
}

function Nav({ slug }: { slug: string }) {
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  return (
    <nav aria-label="Docs" className="sticky top-[90px] hidden max-h-[calc(100vh-100px)] w-[280px] shrink-0 flex-col gap-7 self-start overflow-y-auto border-r border-border py-10 pl-[72px] pr-6 lg:flex scrollbar-none" data-lenis-prevent>
      {groups.map((g) => (
        <div key={g} className="flex flex-col gap-1">
          <button onClick={() => setClosed((c) => ({ ...c, [g]: !c[g] }))} className="flex items-center justify-between pb-2 font-mono text-[11px] leading-[14px] tracking-[0.12em] text-muted hover:text-text">
            {g}<span className={`transition-transform ${closed[g] ? "-rotate-90" : ""}`}>▾</span>
          </button>
          <AnimatePresence initial={false}>
            {!closed[g] && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-col gap-1 overflow-hidden">
                {docs.filter((d) => d.group === g).map((d) => (
                  <Link key={d.slug} href={d.slug === "quick-start" ? "/docs" : `/docs/${d.slug}`} className={`relative rounded-[6px] px-2.5 py-[7px] text-[15px] leading-[18px] transition-colors ${slug === d.slug ? "text-text" : "text-muted hover:text-text"}`}>
                    {slug === d.slug && <motion.span layoutId="docnav" className="absolute inset-0 rounded-[6px] bg-hover" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
                    <span className="relative">{d.title}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
}

export default function DocsShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const slug = slugOf(path);
  const router = useRouter();
  const [provider, setProvider] = useState<Provider>("GitHub");
  const [version, setVersion] = useState("v2.4");
  const [palette, setPalette] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);
  const [toc, setToc] = useState<{ id: string; title: string }[]>([]);
  const askRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const on = () => { const h = document.documentElement.scrollHeight - innerHeight; setProgress(h > 0 ? Math.min(1, scrollY / h) : 0); };
    on(); addEventListener("scroll", on, { passive: true }); return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette((p) => !p); return; }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") { e.preventDefault(); askRef.current?.focus(); return; }
      if (t.closest("input,textarea,[contenteditable]") || e.metaKey || e.ctrlKey) return;
      const { prev, next } = neighbors(slug);
      const href = (d?: { slug: string }) => (d ? (d.slug === "quick-start" ? "/docs" : `/docs/${d.slug}`) : null);
      if (e.key === "j" && next) router.push(href(next)!);
      if (e.key === "k" && prev) router.push(href(prev)!);
      if (e.key === "c") { const code = document.querySelector<HTMLElement>("[data-code]"); if (code) { navigator.clipboard?.writeText(code.innerText); code.dispatchEvent(new CustomEvent("copied")); } }
      if (e.key === "/") { e.preventDefault(); setPalette(true); }
    };
    addEventListener("keydown", key); return () => removeEventListener("keydown", key);
  }, [slug, router]);
  useEffect(() => setMobileNav(false), [path]);

  return (
    <Ctx.Provider value={{ provider, setProvider, askRef, toc, setToc }}>
      <div className="sticky top-0 z-30 border-y border-border bg-sidebar/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-5 py-3.5 md:gap-5 md:px-[72px]">
          <Link href="/" aria-label="Feluda home" className="flex shrink-0 items-center gap-2"><Logo size={24} /><span className="hidden text-[18px] font-semibold tracking-[-0.03em] sm:inline">feluda.</span></Link>
          <span className="hidden h-5 w-px bg-border sm:block" />
          <button onClick={() => setMobileNav((m) => !m)} className="font-mono text-[12px] leading-4 tracking-[0.14em] text-accent lg:pointer-events-none">HANDBOOK<span className="lg:hidden"> ▾</span></button>
          <div className="hidden md:block"><Dropdown value={version} options={["v2.4", "v2.3", "v2.2"]} onChange={setVersion} /></div>
          <div className="hidden sm:block"><Dropdown value={provider} options={["GitHub", "GitLab", "GitLab self-hosted"] as Provider[]} onChange={setProvider} hint="provider" /></div>
          <button onClick={() => setPalette(true)} className="flex h-10 min-w-0 flex-1 items-center justify-between rounded-[8px] border border-border bg-bg pl-3.5 pr-2 text-left hover:border-[#4a4c42]">
            <span className="truncate text-[14px] leading-[18px] text-muted">Search pages, settings, error codes…</span>
            <kbd className="rounded-[6px] bg-hover px-2 py-1 font-mono text-[11px] leading-[14px]">⌘K</kbd>
          </button>
          <button onClick={() => { askRef.current?.focus(); askRef.current?.scrollIntoView({ block: "center" }); }} className="hidden items-center gap-2 rounded-[8px] border border-border bg-panel px-4 py-2.5 hover:bg-hover md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /><span className="text-[14px] leading-[18px]">Ask the handbook</span><span className="font-mono text-[11px] text-muted">⌘I</span>
          </button>
        </div>
        <div className="h-0.5 bg-border"><div className="h-0.5 bg-accent transition-[width] duration-150" style={{ width: `${progress * 100}%` }} /></div>
        <AnimatePresence>
          {mobileNav && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-border bg-sidebar lg:hidden">
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 px-5 py-6">
                {groups.map((g) => (
                  <div key={g} className="flex flex-col gap-2">
                    <p className="font-mono text-[11px] tracking-[0.12em] text-muted">{g}</p>
                    {docs.filter((d) => d.group === g).map((d) => <Link key={d.slug} href={d.slug === "quick-start" ? "/docs" : `/docs/${d.slug}`} className={`text-[14px] ${slug === d.slug ? "text-accent" : "text-text"}`}>{d.title}</Link>)}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mx-auto flex max-w-[1440px]">
        <Nav slug={slug} />
        <div className="min-w-0 flex-1">{children}</div>
        <Rail />
      </div>
      <Palette open={palette} onClose={() => setPalette(false)} />
    </Ctx.Provider>
  );
}
