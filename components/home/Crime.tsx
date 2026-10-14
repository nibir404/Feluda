"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const exhibits = [
  ["EXHIBIT A · THE REVIEWER", "400 lines, 10 minutes before standup, and a “LGTM” that means “looks too long to read.”"],
  ["EXHIBIT B · THE BLIND SPOT", "The diff looks fine. The bug lives in the caller three files away, or in production traffic no one connects back."],
  ["EXHIBIT C · THE INTRUDER", "Whatever slips through, someone outside will find. They’re patient, and they test every door."],
];
const headline = "Bugs and breaches don’t break in. They’re let in, one approved pull request at a time.";

/** The crime — scroll-told: the headline lights word by word, exhibits fade in one by one. */
export default function Crime() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-w]", { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: "[data-head]", start: "top 80%", end: "bottom 45%", scrub: 0.5 } });
      gsap.from("[data-ex]", { opacity: 0, y: 30, stagger: 0.15, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "[data-exs]", start: "top 80%" } });
      gsap.from("[data-verdict]", { opacity: 0, y: 24, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "[data-verdict]", start: "top 88%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="border-t border-border" aria-label="Prologue: the crime">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-5 pb-24 pt-24 md:gap-[72px] md:px-12 md:pb-[120px] md:pt-[140px] xl:px-24">
        <div className="flex flex-col gap-5">
          <p className="font-mono text-[12px] leading-4 tracking-[0.16em] text-danger">PROLOGUE · THE CRIME</p>
          <h2 data-head className="max-w-[1100px] text-[clamp(38px,5vw,72px)] font-semibold leading-[1] tracking-[-0.05em]">
            {headline.split(" ").map((w, i) => <span key={i} data-w className="opacity-[0.18]">{w} </span>)}
          </h2>
        </div>
        <div data-exs className="grid border-t border-border md:grid-cols-3">
          {exhibits.map(([k, t], i) => (
            <div key={k} data-ex className={`group flex flex-col gap-3.5 pt-9 max-md:pb-6 md:pr-8 ${i > 0 ? "md:border-l md:border-border md:pl-8" : ""}`}>
              <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-muted transition-colors group-hover:text-danger">{k}</p>
              <p className="text-[20px] leading-[28px] md:text-[22px] md:leading-[30px]">{t}</p>
            </div>
          ))}
        </div>
        <div data-verdict className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-[820px] text-[30px] font-semibold leading-[36px] tracking-[-0.035em] md:text-[40px] md:leading-[46px]">
            You don&apos;t need another linter. You need a detective who reads the whole case, every time.
          </p>
          <a href="#case" className="font-mono text-[12px] leading-4 tracking-[0.12em] text-muted hover:text-accent">ENTER FELUDA ↓</a>
        </div>
      </div>
    </section>
  );
}
