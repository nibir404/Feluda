"use client";

import clsx from "clsx";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface EvidenceListProps {
  items: string[];
  className?: string;
}

export function EvidenceList({ items, className }: EvidenceListProps) {
  return (
    <ul className={clsx("space-y-3", className)}>
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: i * 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex items-start gap-3"
        >
          <span className="flex-shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-md bg-accent/10 border border-accent/30 text-accent">
            <Check className="w-3 h-3" strokeWidth={2.5} />
          </span>
          <span className="text-[13px] text-ink-primary font-mono leading-snug">
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}