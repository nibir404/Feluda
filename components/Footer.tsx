"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useInView } from "motion/react";

const Dithering = dynamic(() => import("@paper-design/shaders-react").then((m) => m.Dithering), { ssr: false });

const cols = [
  ["REVIEW", [["Pull requests", "/review#investigations"], ["Analytics", "/review#analytics"], ["Review config", "/review"], ["Memory", "/changelog"]]],
  ["ATTACK", [["Pentests", "/attack"], ["AI code analysis", "/attack#findings"], ["Attack surface", "/attack#coverage"]]],
  ["RESOURCES", [["Docs", "/docs"], ["Changelog", "/changelog"], ["Pricing", "/pricing"], ["Status", "/about#security"]]],
  ["COMPANY", [["About", "/about"], ["Security", "/about#security"], ["Privacy", "/about#privacy"], ["Terms", "/about#terms"]]],
] as const;

export default function Footer() {
  const path = usePathname();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const stamp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--px", `${x * -30}px`); el.style.setProperty("--py", `${y * -16}px`);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, [path]);

  if (path.startsWith("/docs")) return null;
  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-border bg-sidebar md:h-[820px]">
      {/* Dot horizon */}
      <div className="absolute left-[-200px] top-[330px] h-[1100px] w-[1840px] overflow-hidden rounded-full opacity-75 transition-transform duration-[1.2s] ease-out md:left-1/2 md:-ml-[920px]" style={{ transform: "translate3d(var(--px,0),var(--py,0),0)" }}>
        {inView && <Dithering speed={0.16} shape="swirl" type="random" size={3} scale={1} colorBack="#00000000" colorFront="#AFB3FF" style={{ width: 1840, height: 1100, borderRadius: 999 }} />}
      </div>
      <div className="absolute inset-x-0 top-[300px] h-[260px] bg-[linear-gradient(180deg,#10110F_0%,rgba(16,17,15,0)_100%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-24">
        <div className="flex flex-col gap-12 pt-20 lg:flex-row lg:gap-16">
          <div className="flex flex-1 flex-col gap-5">
            <p className="font-mono text-[11px] leading-[14px] tracking-[0.14em] text-accent">THE CASE IS NEVER REALLY CLOSED</p>
            <p className="max-w-[360px] text-[32px] font-semibold leading-9 tracking-[-0.03em]">Get the trace in your inbox, once a month.</p>
            <form onSubmit={(e) => { e.preventDefault(); if (/\S+@\S+\.\S+/.test(email)) setSent(true); }}
              className="flex h-12 w-full max-w-[360px] items-center justify-between rounded-[8px] border border-border bg-[#15161499] pl-4 pr-1.5 focus-within:border-accent">
              <label htmlFor="ft-email" className="sr-only">Email</label>
              <input id="ft-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setSent(false); }} placeholder="you@company.com"
                className="min-w-0 flex-1 bg-transparent text-[15px] leading-[18px] outline-none placeholder:text-muted" />
              <button aria-label="Subscribe" className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] bg-accent text-[15px] text-accent-ink transition-transform hover:translate-x-0.5">{sent ? "✓" : "→"}</button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:flex lg:gap-16">
            {cols.map(([h, links]) => (
              <div key={h} className="flex flex-col gap-3 lg:w-[150px]">
                <p className="font-mono text-[11px] leading-[14px] tracking-[0.12em] text-[#6F7266]">{h}</p>
                {links.map(([l, href]) => (
                  <Link key={l} href={href} className="group w-fit text-[15px] leading-[18px] text-text">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">{l}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-[1] flex flex-col justify-between gap-2 pt-16 font-mono text-[11px] leading-[14px] tracking-[0.1em] text-muted sm:flex-row md:absolute md:inset-x-24 md:top-[300px] md:pt-0">
          <span>© 2026 PUKU · FELUDA.PUKU.SH</span><span>EVERY BUG LEAVES A TRACE.</span>
        </div>
      </div>

      {/* Wordmark carved into the dots — letters rise on enter */}
      <div aria-hidden className="relative mt-10 select-none whitespace-nowrap pl-3 text-[clamp(140px,30.5vw,440px)] font-semibold leading-[1] tracking-[-0.07em] text-[#10110F] [text-shadow:#B0B3FC26_0px_0px_1px] md:absolute md:left-[60px] md:top-[440px] md:mt-0 md:pl-0 md:leading-[440px]">
        {"feluda.".split("").map((c, i) => (
          <motion.span key={i} className="inline-block" initial={{ y: "40%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}>{c}</motion.span>
        ))}
      </div>

      <motion.div ref={stamp} initial={{ scale: 1.8, opacity: 0, rotate: -40 }} whileInView={{ scale: 1, opacity: 0.85, rotate: -14 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.5 }}
        whileHover={{ rotate: -4, scale: 1.05 }}
        className="absolute right-6 top-[46%] hidden h-[190px] w-[190px] flex-col items-center justify-center gap-0.5 rounded-full border-2 border-danger bg-[#10110FB3] text-danger md:flex lg:left-[1130px] lg:right-auto lg:top-[400px]" data-cursor>
        <span className="font-mono text-[10px] leading-3 tracking-[0.16em]">FILE 0482</span>
        <span className="text-[20px] font-semibold leading-6 tracking-[-0.01em]">CASE CLOSED</span>
        <span className="font-mono text-[10px] leading-3 tracking-[0.16em]">02:16 · PUKU</span>
      </motion.div>
    </footer>
  );
}
