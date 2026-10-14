"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Dithering } from "../ui";
import ProductDemo from "./ProductDemo";
import styles from "./Hero.module.css";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const demo = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(true);
  const [tour, setTour] = useState(0);
  useEffect(() => {
    const update = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  function explore() {
    setTour(n => n + 1);
    demo.current?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    demo.current?.focus({ preventScroll: true });
  }
  return <section ref={ref} className={styles.hero} aria-labelledby="hero-title">
    <div className={styles.dots} aria-hidden="true" />
    <div className={styles.shader} aria-hidden="true">
      {visible && active && !reduced && <Dithering speed={paused ? 0 : .12} shape="swirl" type="random" size={3} scale={1} colorBack="#00000000" colorFront="#B0B3FC" style={{ width: "100%", height: "100%" }} />}
    </div>
    <div className={styles.glow} aria-hidden="true" />
    <div className={styles.intro}>
      <p className={styles.eyebrow}>AI code review &amp; agentic pentesting</p>
      <h1 id="hero-title">Find the bugs.<br />Ship with confidence.</h1>
      <p className={styles.description}>Reviews every PR. Attacks your app. Hands you the fix.</p>
      <div className={styles.actions}><Link className="btn btn-primary" href="https://puku.sh/login">Continue with Puku →</Link><button onClick={explore}>Try the live demo ↗</button></div>
    </div>
    <div ref={demo} tabIndex={-1} className={styles.demoAnchor}><ProductDemo tour={tour} /></div>
    <div className={styles.caption}><span>Interactive demo · sample data · no account needed</span><button onClick={() => setPaused(p => !p)} aria-pressed={paused}>{paused ? "Resume" : "Pause"} background motion</button></div>
  </section>;
}
