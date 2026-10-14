"use client";
import { useEffect, useRef, useState } from "react";

/** Renders a fixed-width design canvas (e.g. 1440px) scaled to fit its container, keeping absolute layouts pixel-exact. */
export default function Stage({ width = 1440, height, className = "", children }: { width?: number; height: number; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  useEffect(() => {
    const el = ref.current!;
    const ro = new ResizeObserver(() => setS(Math.min(1, el.clientWidth / width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={ref} className={`relative w-full ${className}`} style={{ height: height * s }}>
      <div className="absolute left-1/2 top-0 origin-top" style={{ width, height, transform: `translateX(-50%) scale(${s})` }}>{children}</div>
    </div>
  );
}
