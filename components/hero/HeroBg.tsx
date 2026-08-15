"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface HeroBgProps {
  /** Image to show in dark mode. */
  darkSrc?: string;
  /** Image to show in light mode. */
  lightSrc?: string;
  /** Opacity of the figure outside the spotlight (0-1). Default 0.10. */
  baseOpacity?: number;
  /** Opacity of the figure inside the spotlight (0-1). Default 0.55. */
  spotlightOpacity?: number;
  /** Spotlight radius in px. Default 220. */
  spotlightSize?: number;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * HeroBg — centered, theme-aware backdrop with a cursor-driven reveal.
 *
 * The figure is rendered in two layers:
 *
 *   1. **Base layer** — placed at very low opacity across the center of
 *      the hero. Barely visible, ambient texture.
 *   2. **Spotlight layer** — the same image, sitting on top, masked by
 *      a radial gradient that follows the cursor. Inside the spotlight
 *      the figure pops to full opacity; outside, the mask hides it.
 *
 * The spotlight position is driven by CSS custom properties (--mx, --my)
 * on the wrap. JavaScript just updates those numbers; the mask-image
 * string references them, so the spotlight tracks the cursor 1:1 with
 * no animation tween.
 *
 * Theme-aware: dark vs light figure via the `light` class on `<html>`.
 * Honors `prefers-reduced-motion` (spotlight is large enough that the
 * figure is fully revealed without cursor input).
 */
export function HeroBg({
  darkSrc = "/Dark BG.png",
  lightSrc = "/Light BG.png",
  baseOpacity = 0.10,
  spotlightOpacity = 0.55,
  spotlightSize = 220,
  className,
}: HeroBgProps) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [src, setSrc] = useState(darkSrc);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Theme-aware source + opacity calibration.
  //   Paper mode (html.light)  → Dark BG.png  (white line on teal-567
  //                              evidence panel, pinned on paper wall).
  //   Dark mode  (html.dark)   → Light BG.png (darker line art, reads
  //                              on the charcoal workspace).
  //
  // The "Light BG.png" asset is dark line art on a teal panel — on the
  // near-black dark canvas it disappears at the paper-mode opacities.
  // We self-lift both opacities in dark mode so the figure actually
  // reads; the props remain the authoritative values for light mode.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const apply = () => {
      const isLight = document.documentElement.classList.contains("light");
      setSrc(isLight ? darkSrc : lightSrc);
      setIsDarkTheme(!isLight);
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, [darkSrc, lightSrc]);

  // Opacity lifts applied only in dark mode.
  //   base:       2.4× — figure needs much higher base to read on near-black.
  //   spotlight:  1.2× — already at high intensity; smaller lift, clamped to 1.
  const effectiveBase = isDarkTheme
    ? Math.min(1, baseOpacity * 2.4)
    : baseOpacity;
  const effectiveSpotlight = isDarkTheme
    ? Math.min(1, spotlightOpacity * 1.2)
    : spotlightOpacity;

  // Track cursor → update CSS variables on the wrap. Light RAF smoothing
  // stops the spotlight from jittering on quick moves.
  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let tx = -9999;
    let ty = -9999;
    let cx = -9999;
    let cy = -9999;
    let raf = 0;
    let mounted = true;

    function onMove(e: PointerEvent) {
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
    }

    function onLeave() {
      tx = -9999;
      ty = -9999;
    }

    function tick() {
      if (!mounted || !wrap) return;
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      wrap.style.setProperty("--mx", `${cx.toFixed(1)}px`);
      wrap.style.setProperty("--my", `${cy.toFixed(1)}px`);
      raf = requestAnimationFrame(tick);
    }

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  // Two layers: the spotlight mask uses CSS variables --mx / --my so
  // JS only updates numbers, not the mask-image string.
  const spotlightMask = `radial-gradient(${spotlightSize}px ${spotlightSize}px at var(--mx, -9999px) var(--my, -9999px), rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0) 100%)`;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={className}
      style={
        {
          // Default position so the gradient renders before the first
          // pointermove (avoids a flash of unmasked image).
          "--mx": "-9999px",
          "--my": "-9999px",
        } as React.CSSProperties
      }
    >
      {/* Layer 1: base figure at low opacity, ambient. */}
      <motion.img
        src={src}
        alt=""
        draggable={false}
        loading="eager"
        decoding="async"
        initial={{ opacity: 0 }}
        animate={{ opacity: effectiveBase }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0 m-auto h-full w-auto max-w-none select-none pointer-events-none"
      />

      {/* Layer 2: full-opacity figure, masked by the cursor spotlight. */}
      <motion.img
        src={src}
        alt=""
        draggable={false}
        decoding="async"
        initial={{ opacity: 0 }}
        animate={{ opacity: effectiveSpotlight }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0 m-auto h-full w-auto max-w-none select-none pointer-events-none"
        style={{
          maskImage: spotlightMask,
          WebkitMaskImage: spotlightMask,
        }}
      />
    </div>
  );
}