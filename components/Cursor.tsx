"use client";
import { useEffect, useRef } from "react";

/** Detective lens cursor: a soft ring that trails the pointer and grows over interactive things. */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ring.current!;
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, s = 1, ts = 1, raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      const t = e.target as HTMLElement;
      ts = t.closest("a,button,[data-cursor],input,select,textarea,[role=tab]") ? 2.2 : 1;
      el.style.opacity = "1";
    };
    const leave = () => (el.style.opacity = "0");
    const loop = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2; s += (ts - s) * 0.15;
      el.style.transform = `translate3d(${x - 10}px,${y - 10}px,0) scale(${s})`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); };
  }, []);
  return (
    <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[150] hidden h-5 w-5 rounded-full border border-accent/70 opacity-0 mix-blend-difference transition-opacity duration-300 [@media(pointer:fine)]:block" />
  );
}
