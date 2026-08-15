"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { ArrowDown } from "lucide-react";

interface PipelineStep {
  n: string;
  title: string;
  description: string;
}

interface PipelineProps {
  steps: PipelineStep[];
  className?: string;
}

export function Pipeline({ steps, className }: PipelineProps) {
  return (
    <div className={clsx("relative", className)}>
      {/* Vertical connecting line */}
      <div className="absolute left-6 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-border to-transparent" aria-hidden="true" />

      <ol className="space-y-6">
        {steps.map((step, i) => (
          <motion.li
            key={step.n}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex items-start gap-5"
          >
            <span className="relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-md bg-bg-surface hairline">
              <span className="font-mono text-sm text-accent">{step.n}</span>
            </span>
            <div className="pt-1.5 flex-1">
              <h3 className="font-mono text-xs tracking-[0.18em] text-ink-primary uppercase mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed max-w-md">
                {step.description}
              </p>
            </div>
            {i < steps.length - 1 && (
              <ArrowDown
                className="absolute left-6 -translate-x-1/2 mt-12 text-ink-tertiary w-3 h-3"
                style={{ top: `${i * 100 / steps.length}%` }}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}