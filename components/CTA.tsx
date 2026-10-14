"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const ramp = " .·:-=+*#";

/** ASCII field from the design: chars cycle density in slow drifting waves; the pointer stirs them. */
function Ascii() {
  const ref = useRef<HTMLPreElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const cols = 66, rows = 18;
    let t = 0, raf = 0, vis = false, mx = -99, my = -99;
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting)); io.observe(el);
    const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); mx = ((e.clientX - r.left) / r.width) * cols; my = ((e.clientY - r.top) / r.height) * rows; };
    el.closest("section")!.addEventListener("pointermove", move);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!vis) return;
      if (!reduce) t += 0.012;
      let s = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const grad = Math.pow(x / cols, 1.5);
          const w = Math.sin(x * 0.18 - t * 2 + Math.sin(y * 0.4 + t)) * 0.5 + 0.5;
          const blob = Math.exp(-((x - 50 - Math.sin(t) * 6) ** 2 / 160 + (y - 7 - Math.cos(t * 0.7) * 3) ** 2 / 30));
          const d = Math.hypot((x - mx) * 0.5, y - my);
          const stir = d < 5 ? (5 - d) / 5 : 0;
          const sparse = x < 36 && (x + y * 3) % 9 !== 0 ? 0 : 1;
          const v = Math.min(0.999, (grad * 0.55 + w * 0.25 * grad + blob * 0.55 + stir * 0.6) * (sparse || grad > 0.45 ? 1 : 0));
          s += ramp[Math.floor(v * ramp.length)];
        }
        s += "\n";
      }
      el.textContent = s;
    };
    loop();
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
  return <pre ref={ref} aria-hidden className="select-none font-mono text-[13px] leading-[26px] text-[#5F6188]" />;
}

export default function CTA({ title = "Put Feluda on your next pull request.", eyebrow = "YOUR NEXT CASE" }: { title?: string; eyebrow?: string }) {
  return (
    <section className="relative overflow-hidden border-t border-border md:h-[560px]" aria-labelledby="cta-title">
      <div className="pointer-events-none absolute left-[22%] top-12 opacity-60 md:left-[41.6%] md:opacity-100"><Ascii /></div>
      <div className="relative mx-auto max-w-[1440px] px-5 py-28 md:px-24 md:pt-[136px]">
        <div className="flex max-w-[640px] flex-col gap-8">
          <p className="font-mono text-[12px] leading-4 tracking-[0.14em] text-accent">{eyebrow}</p>
          <h2 id="cta-title" className="text-[clamp(48px,6vw,80px)] font-semibold leading-[0.95] tracking-[-0.05em]">{title}</h2>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
            <Link href="/pricing" className="btn btn-primary">Continue with Puku</Link>
            <span className="text-[16px] leading-5 text-muted">Included in Puku Team &amp; Enterprise</span>
          </div>
        </div>
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
