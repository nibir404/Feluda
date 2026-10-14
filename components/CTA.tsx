"use client";
import { useRef } from "react";
import Link from "next/link";
import { Dither } from "./ui";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Minimal close: one line, one button. A hairline glow tracks the pointer across the top edge. */
export default function CTA({ title = "Close your next case.", eyebrow = "CASE Nº 1285 · OPEN" }: { title?: string; eyebrow?: string }) {
  const ref = useRef<HTMLElement>(null);
  const x = useSpring(useMotionValue(50), { stiffness: 120, damping: 24 });
  const line = useMotionTemplate`linear-gradient(90deg, transparent calc(${x}% - 30%), #B0B3FC ${x}%, transparent calc(${x}% + 30%))`;
  const glow = useMotionTemplate`radial-gradient(500px circle at ${x}% 0%, #B0B3FC24, transparent 65%)`;
  const move = (e: React.PointerEvent) => { const r = ref.current!.getBoundingClientRect(); x.set(((e.clientX - r.left) / r.width) * 100); };
  return (
    <section ref={ref} onPointerMove={move} onPointerLeave={() => x.set(50)} className="relative overflow-hidden border-t border-border" aria-labelledby="cta-title">
      <div aria-hidden className="dots pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_40%,#000_20%,transparent_75%)]" />
      <Dither size={[1200, 1200]} className="left-1/2 top-[140px] -translate-x-1/2 opacity-[0.16]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      <motion.div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: line }} />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-9 px-5 pb-28 pt-28 text-center md:px-24 md:pb-32 md:pt-36">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-mono text-[12px] leading-4 tracking-[0.14em] text-muted">{eyebrow}</motion.p>
        <motion.h2 id="cta-title" initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="text-[clamp(44px,6vw,80px)] font-semibold leading-none tracking-[-0.05em]">{title}</motion.h2>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7, ease }} className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <Link href="https://puku.sh/login" className="btn btn-primary group">Continue with Puku <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span></Link>
          <span className="font-mono text-[12px] tracking-[0.06em] text-muted">PUKU TEAM &amp; ENTERPRISE</span>
        </motion.div>
      </div>
    </section>
  );
}

export function NextChapter({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <Link href={href} className="group block border-t border-border transition-colors hover:bg-panel">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-10 md:px-24">
        <span><span className="font-mono text-[12px] tracking-[0.1em] text-accent">{label}</span><span className="mt-2 block text-[clamp(24px,3vw,40px)] font-semibold tracking-[-0.035em]">{title}</span></span>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[8px] border border-border transition-all duration-500 group-hover:translate-x-2 group-hover:border-accent group-hover:text-accent">→</span>
      </div>
    </Link>
  );
}
