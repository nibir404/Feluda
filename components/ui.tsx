"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";

export const Dithering = dynamic(() => import("@paper-design/shaders-react").then((m) => m.Dithering), { ssr: false });

/** Lazily mounts the Paper dither shader only when on screen. */
export function Dither({ size, className = "", style }: { size: [number, number]; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  return (
    <div ref={ref} className={`pointer-events-none absolute overflow-hidden rounded-full ${className}`} style={{ width: size[0], height: size[1], ...style }}>
      {inView && <Dithering speed={0.16} shape="swirl" type="random" size={3} scale={1} colorBack="#00000000" colorFront="#AFB3FF" style={{ width: size[0], height: size[1], borderRadius: 999 }} />}
    </div>
  );
}

export const wrap = "mx-auto w-full max-w-[1440px] px-5 md:px-12 xl:px-24";
export const eyebrowCls = "font-mono text-[12px] leading-4 tracking-[0.1em]";
export const h2Cls = "text-[clamp(36px,4.5vw,56px)] font-semibold leading-[1.04] tracking-[-0.04em]";

export function SecHead({ eyebrow, title, tone = "accent", titleW = 640, children }: { eyebrow: string; title: string; side?: string; tone?: "accent" | "danger"; titleW?: number; sideW?: number; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div className="flex flex-col gap-4">
        <p className={`${eyebrowCls} ${tone === "danger" ? "text-danger" : "text-accent"}`}>{eyebrow}</p>
        <h2 className={h2Cls} style={{ maxWidth: titleW }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

/** Product page hero (Review / Attack): dither globe on the right, copy left, a floating card. */
export function ProductHero({ eyebrow, title, sub, cta, ctaHref = "/pricing", secondary, secondaryHref = "/docs", tone = "accent", halo, children }: {
  eyebrow: string; title: string; sub: string; cta: string; ctaHref?: string; secondary: string; secondaryHref?: string; tone?: "accent" | "danger"; halo?: boolean; children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border lg:h-[760px]">
      {halo ? (
        <>
          <div className="absolute left-[40%] top-[80px] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(255,145,152,.18)_0%,rgba(255,145,152,0)_65%)] lg:left-[57%]" />
          <Dither size={[860, 860]} className="left-[35%] top-[60px] opacity-35 lg:left-[54%]" />
        </>
      ) : (
        <>
          <Dither size={[900, 900]} className="left-[30%] top-[300px] opacity-45 lg:left-[52.8%] lg:top-[60px]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#151614_40%,rgba(21,22,20,.2)_100%)]" />
        </>
      )}
      <div className={`${wrap} relative flex flex-col gap-14 pb-20 pt-36 lg:flex-row lg:items-center lg:justify-between lg:!px-[72px] lg:pb-0 lg:pt-[194px]`}>
        <div className="flex max-w-[620px] flex-col gap-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`font-mono text-[12px] leading-4 tracking-[0.16em] ${tone === "danger" ? "text-danger" : "text-accent"}`}>{eyebrow}</motion.p>
          <h1 className="text-[clamp(48px,6.2vw,88px)] font-semibold leading-[0.955] tracking-[-0.05em]">
            <motion.span className="block" initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>{title}</motion.span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-[520px] text-[18px] leading-[28px] text-[#C9CBBF] md:text-[19px] md:leading-[30px]">{sub}</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link href={ctaHref} className="btn btn-primary">{cta}</Link>
            <Link href={secondaryHref} className="btn btn-secondary ">{secondary}</Link>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: halo ? 0 : -2 }} whileHover={halo ? undefined : { rotate: 0, y: -6 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className={`w-full shrink-0 ${halo ? "lg:w-[460px]" : "lg:w-[500px]"}`}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const m = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const [txt, setTxt] = useState(m ? m[1] + "0" + m[3] : value);
  useEffect(() => {
    if (!inView || !m) return;
    const n = parseFloat(m[2].replace(/,/g, ""));
    const dec = m[2].includes(".") ? 1 : 0;
    const c = animate(0, n, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setTxt(m[1] + (dec ? v.toFixed(1) : Math.round(v).toLocaleString()) + m[3]) });
    return () => c.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={ref}>{txt}</span>;
}

export function ProofStrip({ items }: { items: [string, string][] }) {
  return (
    <section className="border-b border-border">
      <div className={`${wrap} grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:flex md:justify-between`}>
        {items.map(([v, l]) => (
          <div key={l} className="group flex flex-col gap-1.5">
            <p className="text-[34px] font-semibold leading-[44px] tracking-[-0.04em] transition-colors group-hover:text-accent md:text-[44px] md:leading-[54px]"><CountUp value={v} /></p>
            <p className="text-[14px] leading-[18px] text-muted">{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function NextChapter({ href, label, title, tone = "danger" }: { href: string; label: string; title: string; tone?: "accent" | "danger" }) {
  return (
    <Link href={href} className="group relative block overflow-hidden border-t border-border bg-sidebar">
      <div className="dots absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-60" />
      <div className={`${wrap} relative flex items-center justify-between gap-6 py-14`}>
        <span className="flex flex-col gap-2.5">
          <span className={`font-mono text-[12px] leading-4 tracking-[0.14em] ${tone === "danger" ? "text-danger" : "text-accent"}`}>{label}</span>
          <span className="text-[clamp(28px,3.2vw,44px)] font-semibold leading-[1.2] tracking-[-0.04em]">{title}</span>
        </span>
        <span className="text-[40px] leading-[48px] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3">→</span>
      </div>
    </Link>
  );
}

export function Toggle({ on, onChange, label, size = "md" }: { on: boolean; onChange: () => void; label?: string; size?: "sm" | "md" }) {
  const s = size === "sm" ? "h-5 w-9 p-[3px]" : "h-[22px] w-[38px] p-[3px]";
  const k = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <button role="switch" aria-checked={on} aria-label={label} onClick={onChange} className={`flex shrink-0 items-center rounded-full transition-colors duration-300 ${s} ${on ? "justify-end bg-accent" : "justify-start bg-border"}`}>
      <motion.span layout transition={{ type: "spring", stiffness: 700, damping: 34 }} className={`rounded-full ${k} ${on ? "bg-accent-ink" : "bg-muted"}`} />
    </button>
  );
}
