import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "rgb(var(--bg-base) / <alpha-value>)",
          surface: "rgb(var(--bg-surface) / <alpha-value>)",
          elevated: "rgb(var(--bg-elevated) / <alpha-value>)",
          canvas: "rgb(var(--bg-base) / <alpha-value>)",
          // Aliases for "raised"/"overlay" surfaces — used by forms, buttons.
          raised: "rgb(var(--bg-elevated) / <alpha-value>)",
          overlay: "rgb(var(--bg-elevated) / <alpha-value>)",
          "panel-mint": "rgb(var(--panel-mint) / <alpha-value>)",
          "panel-sea": "rgb(var(--panel-sea) / <alpha-value>)",
          "panel-peri": "rgb(var(--panel-peri) / <alpha-value>)",
          // Charcoal intelligence panels
          charcoal: "rgb(var(--charcoal-deep) / <alpha-value>)",
          "charcoal-mid": "rgb(var(--charcoal-mid) / <alpha-value>)",
          "charcoal-raised": "rgb(var(--charcoal-raised) / <alpha-value>)",
          code: "rgb(var(--code-bg) / <alpha-value>)",
          cream: "rgb(var(--cream) / <alpha-value>)",
          pixel: "rgb(var(--pixel-yellow) / <alpha-value>)",
          hatch: "rgb(var(--ink-primary) / <alpha-value>)",
        },
        border: {
          subtle: "rgb(var(--border-subtle) / <alpha-value>)",
          DEFAULT: "rgb(var(--border) / <alpha-value>)",
          strong: "rgb(var(--ink-primary) / <alpha-value>)",
        },
        ink: {
          primary: "rgb(var(--ink-primary) / <alpha-value>)",
          secondary: "rgb(var(--ink-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--ink-tertiary) / <alpha-value>)",
          "on-panel": "rgb(var(--ink-on-panel) / <alpha-value>)",
          "on-code": "rgb(var(--ink-on-code) / <alpha-value>)",
          "on-sea": "rgb(var(--ink-on-sea) / <alpha-value>)",
          "on-charcoal": "rgb(var(--ink-on-charcoal) / <alpha-value>)",
          "on-canvas": "rgb(var(--ink-primary) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
          glow: "rgb(var(--accent-glow) / <alpha-value>)",
        },
        status: {
          safe: "rgb(var(--status-safe) / <alpha-value>)",
          attention: "rgb(var(--status-attention) / <alpha-value>)",
          critical: "rgb(var(--status-critical) / <alpha-value>)",
        },
        "on-accent": "rgb(var(--on-accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        none: "0",
        sm: "0",
        DEFAULT: "2px",
        md: "2px",
        lg: "2px",
        xl: "2px",
        "2xl": "4px",
        full: "9999px",
      },
      maxWidth: {
        content: "1280px",
      },
      ringOffsetColor: {
        canvas: "rgb(var(--bg-base) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;