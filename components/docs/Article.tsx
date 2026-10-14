"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { bySlug, neighbors, type DocPage } from "@/lib/docs";
import { useDocs } from "./DocsShell";
import { Widget } from "./Widgets";

const href = (d?: DocPage) => (d ? (d.slug === "quick-start" ? "/docs" : `/docs/${d.slug}`) : "#");

export function CodeTabs({ tabs }: { tabs: { name: string; lines: string[]; hl?: number }[] }) {
  const [t, setT] = useState(0);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!; const on = () => { setCopied(true); setTimeout(() => setCopied(false), 1200); };
    el.addEventListener("copied", on); return () => el.removeEventListener("copied", on);
  }, []);
  const copy = () => { navigator.clipboard?.writeText(tabs[t].lines.join("\n")); setCopied(true); setTimeout(() => setCopied(false), 1200); };
  return (
    <div className="overflow-hidden rounded-[12px] border border-border bg-sidebar">
      <div className="flex items-center justify-between border-b border-border px-4">
        <div className="flex gap-5">
          {tabs.map((x, i) => (
            <button key={x.name} onClick={() => setT(i)} className={`relative py-3 font-mono text-[12px] leading-4 ${t === i ? "text-text" : "text-muted hover:text-text"}`}>
              {x.name}{t === i && <motion.span layoutId={"code-tab" + tabs[0].name} className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />}
            </button>
          ))}
        </div>
        <button onClick={copy} className="rounded-[6px] border border-border px-2.5 py-1.5 text-[12px] leading-4 hover:bg-hover">{copied ? "Copied ✓" : "Copy"}</button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={t} ref={ref} data-code initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-x-auto py-3.5 scrollbar-none">
          {tabs[t].lines.map((l, i) => (
            <div key={i} className={`whitespace-pre px-4 font-mono text-[13px] leading-[22px] ${tabs[t].hl === i + 1 ? "border-l-2 border-accent bg-[#B0B3FC14] text-text" : "text-muted"}`}>
              <span className="mr-3 inline-block w-3 text-right text-muted/50 select-none">{i + 1}</span>{l}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Crumbs({ page }: { page: DocPage }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="truncate font-mono text-[12px] leading-4 text-muted">{page.group[0] + page.group.slice(1).toLowerCase()} / {page.title}</p>
      <div className="flex shrink-0 gap-4 text-[13px] leading-4 text-muted">
        <button onClick={() => { navigator.clipboard?.writeText(location.href); setCopied(true); setTimeout(() => setCopied(false), 1200); }} className="hover:text-text">{copied ? "Copied ✓" : "# Copy link"}</button>
        <a href={`https://github.com/puku/feluda-docs/edit/main/${page.slug}.mdx`} className="hidden hover:text-text sm:inline">Edit on GitHub ↗</a>
      </div>
    </div>
  );
}

export function Feedback({ slug }: { slug: string }) {
  const [v, setV] = useState<null | "yes" | "no">(null);
  const { prev, next } = neighbors(slug);
  return (
    <div className="flex flex-col gap-5 border-t border-border pt-3">
      <div className="flex flex-wrap items-center gap-3">
        <AnimatePresence mode="wait">
          {v ? <motion.p key="t" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-[14px] leading-[18px] text-success">{v === "yes" ? "Thanks — case closed. ✓" : "Thanks. We'll ping you when this page improves."}</motion.p> : (
            <motion.div key="q" exit={{ opacity: 0 }} className="flex items-center gap-3">
              <span className="text-[14px] leading-[18px]">{slug === "quick-start" ? "Did this get you to a first review?" : "Was this helpful?"}</span>
              <button onClick={() => setV("yes")} className="rounded-[8px] border border-border px-3.5 py-2 text-[13px] leading-4 hover:border-success hover:text-success">Yes</button>
              <button onClick={() => setV("no")} className="rounded-[8px] border border-border px-3.5 py-2 text-[13px] leading-4 hover:bg-hover">Not yet</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        {prev ? <Link href={href(prev)} className="group flex flex-1 flex-col gap-1 rounded-[12px] border border-border px-5 py-[18px] transition-colors hover:border-[#4a4c42] hover:bg-panel"><span className="text-[12px] leading-4 text-muted">← Previous <span className="ml-1 font-mono opacity-60">K</span></span><span className="text-[16px] leading-5">{prev.title}</span></Link> : <span className="flex-1" />}
        {next && <Link href={href(next)} className="group flex flex-1 flex-col items-end gap-1 rounded-[12px] border border-border px-5 py-[18px] transition-colors hover:border-accent/50 hover:bg-panel"><span className="text-[12px] leading-4 text-muted"><span className="mr-1 font-mono opacity-60">J</span> Next →</span><span className="text-[16px] leading-5 text-accent">{next.title}</span></Link>}
      </div>
    </div>
  );
}

export function DocArticle({ slug }: { slug: string }) {
  const page = bySlug(slug)!;
  const { setToc } = useDocs();
  useEffect(() => { setToc([...(page.widget ? [{ id: "try-it", title: "Try it" }] : []), ...page.sections.map((s) => ({ id: s.id, title: s.title }))]); }, [page, setToc]);
  return (
    <article className="flex flex-col gap-7 px-5 pb-24 pt-10 md:px-16 md:pt-12">
      <Crumbs page={page} />
      <motion.header initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-3">
        <h1 className="text-[clamp(36px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.04em]">{page.heading}</h1>
        <p className="text-[14px] leading-[18px] text-muted">{page.minutes} min · Updated Oct 10, 2026 · Works for GitHub and GitLab</p>
      </motion.header>
      <p className="max-w-[680px] text-[16px] leading-[26px] text-[#C9CBBF]">{page.intro}</p>
      {page.widget && <section id="try-it" className="scroll-mt-40"><Widget id={page.widget} /></section>}
      {page.sections.map((s) => (
        <section key={s.id} id={s.id} className="group flex scroll-mt-40 flex-col gap-3">
          <h2 className="flex items-center gap-2 text-[24px] font-semibold leading-8 tracking-[-0.02em]">
            {s.title}<a href={`#${s.id}`} aria-label="Anchor" className="text-[18px] text-muted opacity-0 transition-opacity group-hover:opacity-100">#</a>
          </h2>
          <p className="max-w-[680px] text-[15px] leading-6 text-[#C9CBBF]">{s.body}</p>
          {s.code && <CodeTabs tabs={[{ name: s.code.file, lines: s.code.lines, hl: s.code.hl }]} />}
        </section>
      ))}
      {page.tip && <div className="flex gap-3.5 rounded-[12px] border border-border bg-panel px-5 py-4"><span className="font-mono text-[12px] text-accent">TIP</span><p className="text-[14px] leading-[22px] text-[#C9CBBF]">{page.tip}</p></div>}
      <Feedback slug={slug} />
    </article>
  );
}
