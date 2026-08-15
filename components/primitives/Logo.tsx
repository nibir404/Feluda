"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  /** Pixel height of the rendered logo. */
  height?: number;
  /**
   * Optional CSS width override. Pass a CSS string (e.g. `"clamp(150px, 13vw, 200px)"`)
   * for a responsive logo, or a number for a fixed pixel width.
   *
   * @default `${height * RATIO}px` — preserves the source aspect ratio.
   */
  width?: string | number;
  /** Optional override for "what to show when theme is system / dark" */
  forceTheme?: "light" | "dark";
}

const RATIO = 1319 / 362;

/**
 * Logo — renders the Feluda wordmark + detective illustration from
 * `/public/Logo Dark.png` (white-on-teal wordmark — the *light* variant)
 * and `/public/Logo White.png` (dark-on-teal wordmark — the *dark*
 * variant). Both PNGs share the teal evidence-panel background that
 * anchors the brand mark against any canvas.
 *
 * ⚠️  The filenames on disk are flipped relative to their visual
 * content: `Logo Dark.png` is the file with the *light* wordmark,
 * `Logo White.png` is the file with the *dark* wordmark. This is
 * intentional (the file name refers to the contrast against the panel,
 * not the canvas). The swap logic below keys off the canvas theme:
 *
 *   • Paper / light theme → `Logo White.png` (dark wordmark on teal)
 *   • Charcoal / dark theme → `Logo Dark.png` (white wordmark on teal)
 *
 * Uses CSS `display: none` to switch variants (no FOUC, no flicker).
 */
export function Logo({ className, height = 26, width, forceTheme }: LogoProps) {
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark" | null>(
    null
  );

  useEffect(() => {
    if (forceTheme) {
      setResolvedTheme(forceTheme);
      return;
    }
    const root = document.documentElement;
    const update = () => {
      const t = root.classList.contains("light")
        ? "light"
        : root.classList.contains("dark")
        ? "dark"
        : null;
      setResolvedTheme(t);
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [forceTheme]);

  // The two PNG files are named backwards relative to their visual content:
  //   /Logo Dark.png  → a white/light wordmark on teal (the "light" variant)
  //   /Logo White.png → a dark wordmark on teal (the "dark" variant)
  // We map by which file the *current theme* needs so the wordmark reads
  // correctly on its canvas.
  const isLight = resolvedTheme === "light";

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        height: `${height}px`,
        width:
          typeof width === "number"
            ? `${width}px`
            : width ?? `${height * RATIO}px`,
      }}
    >
      {/* Dark-content logo (Logo White.png) — visible in light mode.
          Paper canvas + dark wordmark reads cleanly. */}
      <Image
        src="/Logo White.png"
        alt="Feluda"
        height={height}
        width={height * RATIO}
        priority
        style={{
          position: "absolute",
          inset: 0,
          height: "100%",
          width: "100%",
          objectFit: "contain",
          objectPosition: "left center",
          display: isLight ? "block" : "none",
        }}
      />
      {/* Light-content logo (Logo Dark.png) — visible in dark mode.
          Charcoal canvas + white wordmark reads cleanly. */}
      <Image
        src="/Logo Dark.png"
        alt="Feluda"
        height={height}
        width={height * RATIO}
        priority
        style={{
          position: "absolute",
          inset: 0,
          height: "100%",
          width: "100%",
          objectFit: "contain",
          objectPosition: "left center",
          display: isLight ? "none" : "block",
        }}
      />
    </span>
  );
}