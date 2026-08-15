"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import clsx from "clsx";
import { useTheme, type ThemeMode } from "./ThemeProvider";

const options: { mode: ThemeMode; label: string; Icon: typeof Sun }[] = [
  { mode: "light", label: "Light", Icon: Sun },
  { mode: "system", label: "System", Icon: Monitor },
  { mode: "dark", label: "Dark", Icon: Moon },
];

interface ThemeToggleProps {
  variant?: "compact" | "labeled";
  className?: string;
}

export function ThemeToggle({ variant = "compact", className }: ThemeToggleProps) {
  const { mode, setMode } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={clsx(
        "inline-flex items-center rounded-md border p-0.5",
        "bg-bg-base/40 border-border",
        className
      )}
    >
      {options.map(({ mode: optMode, label, Icon }) => {
        const active = optMode === mode;
        return (
          <button
            key={optMode}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setMode(optMode)}
            className={clsx(
              "relative inline-flex items-center justify-center gap-1.5 rounded-sm transition-all duration-150 focus-ring",
              variant === "compact" ? "w-7 h-7" : "h-8 px-2.5 text-xs",
              active
                ? "bg-bg-surface text-ink-primary"
                : "text-ink-tertiary hover:text-ink-secondary"
            )}
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
            {variant === "labeled" && (
              <span className="font-mono uppercase tracking-wider">
                {label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}