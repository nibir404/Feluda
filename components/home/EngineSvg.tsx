"use client";
import { useEffect, useRef, useState } from "react";

const layers = ["01 Observe", "02 Diff reader", "03 Investigate", "04 Codebase graph", "05 PR comment"];

export default function EngineSvg({ svg }: { svg: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const el = ref.current!;
    const groups = layers.flatMap((n) => [...el.querySelectorAll<SVGGElement>(`[layer-name="${n}"]${n.startsWith("05") ? `,[layer-name="05 Analytics"]` : ""}`)].map((g) => [n, g] as const));
    const off = groups.map(([n, g]) => {
      const on = () => setActive(n); const out = () => setActive(null);
      g.addEventListener("mouseenter", on); g.addEventListener("mouseleave", out); g.style.cursor = "pointer";
      return () => { g.removeEventListener("mouseenter", on); g.removeEventListener("mouseleave", out); };
    });
    const io = new IntersectionObserver(([e]) => el.classList.toggle("is-live", e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => { off.forEach((f) => f()); io.disconnect(); };
  }, []);
  useEffect(() => {
    const el = ref.current!;
    el.querySelectorAll("[data-active]").forEach((n) => n.removeAttribute("data-active"));
    if (active) el.querySelectorAll(`[layer-name="${active}"]${active.startsWith("05") ? `,[layer-name="05 Analytics"]` : ""}`).forEach((n) => n.setAttribute("data-active", ""));
    el.dataset.hovering = active ? "1" : "";
  }, [active]);
  return (
    <div className="relative -mx-5 overflow-x-auto scrollbar-none md:mx-0">
      <div ref={ref} className="engine min-w-[760px]" dangerouslySetInnerHTML={{ __html: svg }} />
      <p className="mt-2 px-5 font-mono text-[11px] tracking-[0.1em] text-muted md:px-0">{active ? `LAYER ${active.toUpperCase()}` : "HOVER A LAYER"}</p>
    </div>
  );
}
