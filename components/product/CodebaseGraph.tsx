"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface CodebaseGraphProps {
  nodes: string[] | { name: string; letter: string }[];
  highlightIndex?: number;
  variant?: "vertical" | "hub";
  className?: string;
}

export function CodebaseGraph({
  nodes,
  highlightIndex = 0,
  variant = "vertical",
  className,
}: CodebaseGraphProps) {
  if (variant === "hub") {
    return <HubGraph nodes={nodes} className={className} />;
  }
  return <VerticalGraph nodes={nodes as string[]} highlightIndex={highlightIndex} className={className} />;
}

function VerticalGraph({
  nodes,
  highlightIndex,
  className,
}: {
  nodes: string[];
  highlightIndex: number;
  className?: string;
}) {
  return (
    <div className={clsx("relative", className)}>
      <div className="relative space-y-2.5">
        {/* vertical connecting line */}
        <div className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-border-subtle via-border to-border-subtle" />

        {nodes.map((node, i) => {
          const isHighlight = i === highlightIndex;
          return (
            <motion.div
              key={node}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex items-center gap-3"
            >
              <span
                className={clsx(
                  "relative z-10 flex items-center justify-center w-9 h-9 rounded-md border text-[10px] font-mono",
                  isHighlight
                    ? "bg-accent/10 border-accent/40 text-accent"
                    : "bg-bg-surface border-border text-ink-tertiary"
                )}
              >
                {String(i + 1).padStart(2, "0")}
                {isHighlight && (
                  <motion.span
                    className="absolute inset-0 rounded-md border border-accent/40"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </span>
              <span
                className={clsx(
                  "text-sm font-mono",
                  isHighlight ? "text-ink-primary" : "text-ink-secondary"
                )}
              >
                {node}
              </span>
              {isHighlight && (
                <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-accent">
                  Changed
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function HubGraph({
  nodes,
  className,
}: {
  nodes: { name: string; letter: string }[] | string[];
  className?: string;
}) {
  const items = nodes.map((n) =>
    typeof n === "string"
      ? { name: n, letter: n[0] }
      : n
  );

  return (
    <div
      className={clsx(
        "relative aspect-square max-w-[480px] mx-auto",
        className
      )}
    >
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* lines from center to nodes */}
        {items.map((_, i) => {
          const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
          const cx = 200;
          const cy = 200;
          const x = cx + Math.cos(angle) * 150;
          const y = cy + Math.sin(angle) * 150;
          return (
            <motion.line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgb(var(--border) / 0.18)"
              strokeWidth="1"
              strokeDasharray="3 3"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
            />
          );
        })}
      </svg>

      {/* Center hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-bg-surface hairline flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="font-mono text-[10px] tracking-wider text-accent uppercase">
                Feluda
              </div>
              <div className="font-mono text-[9px] tracking-wider text-ink-tertiary uppercase">
                System Context
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Nodes */}
      {items.map((node, i) => {
        const angle = (i / items.length) * 360 - 90;
        const radius = 38; // % of container
        return (
          <motion.div
            key={node.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.3 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute"
            style={{
              top: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
              left: `${50 + radius * Math.cos((angle * Math.PI) / 180)}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-bg-surface hairline">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-bg-base hairline font-mono text-[11px] text-accent">
                {node.letter}
              </span>
              <span className="text-xs font-mono text-ink-secondary whitespace-nowrap">
                {node.name}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}