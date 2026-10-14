"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stage from "../Stage";
import Ticket from "../Ticket";

gsap.registerPlugin(ScrollTrigger);
const Dithering = dynamic(() => import("@paper-design/shaders-react").then((m) => m.Dithering), { ssr: false });

const prodLog = `02:14:07.118  GET  /v1/session       200   41ms
02:14:07.121  GET  /v1/session       200   38ms
02:14:07.402  POST /v1/refresh       200  112ms
02:14:07.403  POST /v1/refresh       200  109ms
02:14:07.611  GET  /v1/me            401    6ms   user=7f3a
02:14:07.612  WARN token revoked     sid=c91e   reason=reuse
02:14:08.004  GET  /v1/session       200   44ms
02:14:08.390  GET  /v1/orders        200   73ms
02:14:09.115  POST /v1/refresh       200  104ms
02:14:09.117  POST /v1/refresh       200  118ms
02:14:09.330  GET  /v1/me            401    5ms   user=22bd
02:14:09.331  WARN token revoked     sid=08aa   reason=reuse
02:14:10.020  GET  /v1/session       200   40ms`;
const diff = `session/refresh.ts                          PR #482
39   export async function refresh(session) {
40     const token = await store.get(session.id)
41 +   if (isExpired(token)) {
42 +     const next = await provider.refresh(token)
43 +     await store.set(session.id, next)
44 +   }
45     return store.get(session.id)
46   }

47   // called from middleware on every request
48   app.use(async (req, _, next) => {
49     await refresh(req.session)
50     next()
51   })`;

const paths = [
  { d: "M44,119 C42,94 130,88 200,88 C280,88 356,94 356,117 C356,142 280,149 200,149 C120,149 46,145 46,121 C46,104 90,95 140,92", w: 2, t: "translate(-10 0)" },
  { d: "M356,120 C392,138 380,170 352,186", w: 2 },
  { d: "M56,200 C160,197 330,202 436,198", w: 2.4 },
  { d: "M436,198 C560,196 640,152 744,157", w: 2 },
  { d: "M748,158 C746,138 860,134 920,134 C1000,134 1078,138 1078,157 C1078,177 1000,183 912,182 C840,181 750,179 750,160", w: 2.6 },
  { d: "M752,163 C748,144 840,139 960,139", w: 1.2, o: 0.6 },
  { d: "M900,183 C930,250 820,300 800,352", w: 2, dash: "2 7" },
  { d: "M790,382 C840,379 900,384 958,380", w: 2.2 },
  { d: "M1088,128 L1104,144 M1104,128 L1088,144", w: 2.4 },
];
const notes = [
  { x: 372, y: 86, t: "×2 · 1 ms apart" },
  { x: 456, y: 208, t: "same refresh token, used twice" },
  { x: 1116, y: 128, t: "no lock → race" },
  { x: 974, y: 372, t: "runs on every request" },
];
export default function CaseFile() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const ps = gsap.utils.toArray<SVGPathElement>("[data-trace]");
      ps.forEach((p) => { const l = p.getTotalLength(); gsap.set(p, { strokeDasharray: p.dataset.dash || `${l} ${l}`, strokeDashoffset: p.dataset.dash ? 0 : l, opacity: p.dataset.dash ? 0 : undefined }); });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 60%", onEnter: () => setShown(true) } });
      ps.forEach((p, i) => tl.to(p, p.dataset.dash ? { opacity: 1, duration: 0.3 } : { strokeDashoffset: 0, duration: 2.4 / ps.length + 0.1, ease: "power1.inOut" }, i === 0 ? 0 : ">-0.05"));
      tl.from("[data-note]", { opacity: 0, y: 6, stagger: 0.2, duration: 0.4 }, 0.6)
        .from("[data-hl]", { opacity: 0, stagger: 0.15, duration: 0.5 }, 0.2);
    }, root);
    return () => ctx.revert();
  }, []);

  const title = (
    <div className="flex flex-col gap-7">
      <p className="font-mono text-[12px] leading-4 tracking-[0.14em] text-muted">EXHIBIT D · CASE 0482 · HOW FELUDA WORKED IT</p>
      <h2 className="text-[clamp(52px,7vw,92px)] font-semibold leading-[0.935] tracking-[-0.055em]">Case 0482. Closed in two minutes.</h2>
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
        <Link href="/how-it-works" className="btn btn-primary shrink-0">Watch the full trace</Link>
        <p className="max-w-[440px] text-[17px] leading-[26px] text-muted">Feluda read 3 files and 1,204 log lines and found the cause in 2 minutes. It reviews every pull request like this one.</p>
      </div>
    </div>
  );

  return (
    <section ref={root} id="case" className="relative scroll-mt-20 overflow-hidden bg-bg">
      {/* Desktop: pixel-exact evidence board */}
      <Stage height={860} className="hidden lg:block">
        <pre className="absolute left-14 top-10 font-mono text-[13px] leading-[26px] text-[#4D5047]">{prodLog}</pre>
        <pre className="absolute left-[760px] top-10 font-mono text-[13px] leading-[26px] text-[#4D5047]">{diff}</pre>
        <pre data-hl className="absolute left-14 top-[92px] font-mono text-[13px] leading-[26px] text-text">{"02:14:07.402  POST /v1/refresh       200  112ms\n02:14:07.403  POST /v1/refresh       200  109ms"}</pre>
        <pre data-hl className="absolute left-14 top-[170px] font-mono text-[13px] leading-[26px] text-danger">{"02:14:07.612  WARN token revoked     sid=c91e   reason=reuse"}</pre>
        <pre data-hl className="absolute left-[760px] top-[144px] font-mono text-[13px] leading-[26px] text-text">{"42 +     const next = await provider.refresh(token)"}</pre>
        <pre data-hl className="absolute left-[760px] top-[352px] font-mono text-[13px] leading-[26px] text-text">{"49     await refresh(req.session)"}</pre>
        <svg width="1440" height="460" viewBox="0 0 1440 460" className="absolute left-0 top-0" aria-hidden>
          {paths.map((p, i) => (
            <path key={i} data-trace data-dash={p.dash} d={p.d} transform={p.t} fill="none" stroke="#B0B3FC" strokeWidth={p.w} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: p.o }} />
          ))}
        </svg>
        {notes.map((n) => <span key={n.t} data-note className="absolute font-mono text-[12px] leading-4 tracking-[0.06em] text-accent" style={{ left: n.x, top: n.y }}>{n.t}</span>)}
        <div className="absolute left-[940px] top-[380px] h-[620px] w-[620px] overflow-hidden rounded-full opacity-90">
          {shown && <Dithering speed={0.16} shape="swirl" type="random" size={3} scale={1} colorBack="#00000000" colorFront="#AFB3FF" style={{ width: 620, height: 620, borderRadius: 999 }} />}
        </div>
        <div className="absolute left-[1060px] top-[470px] origin-top-left rotate-[10deg]"><Ticket color="#B5263E" no="FELUDA / 02" title={<>Feluda follows<br />the trace.</>} img="/stamp-trace.webp" foot="02 / INVESTIGATE · 2¢" /></div>
        <div className="absolute left-14 top-[452px] w-[900px]">{title}</div>
      </Stage>

      {/* Mobile: stacked */}
      <div className="px-5 py-20 md:px-12 md:py-28 lg:hidden">
        <pre className="overflow-hidden font-mono text-[11px] leading-5 text-[#4D5047]">
          {prodLog.split("\n").slice(2, 6).map((l, i) => <span key={i} className={`block ${l.includes("WARN") ? "text-danger" : i < 2 ? "text-text" : ""}`}>{l}</span>)}
        </pre>
        <p className="mt-2 font-mono text-[11px] text-accent">×2 · 1 ms apart → no lock → race</p>
        <div className="mt-10">{title}</div>
        <div className="mt-12 flex justify-center"><div className="rotate-[6deg]"><Ticket color="#B5263E" no="FELUDA / 02" title={<>Feluda follows<br />the trace.</>} img="/stamp-trace.webp" foot="02 / INVESTIGATE · 2¢" /></div></div>
      </div>
    </section>
  );
}
