"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Container } from "../primitives/Container";
import { RevealText } from "../primitives/RevealText";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqProps {
  title?: string;
  items: FaqItem[];
}

export function Faq({ title = "Frequently asked questions", items }: FaqProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="py-20 lg:py-28 hairline-t">
      <Container size="default">
        <RevealText
          as="h2"
          className="font-serif font-normal text-[clamp(1.75rem,4vw,2.5rem)] tracking-[-0.015em] text-balance text-ink-primary leading-[1.1] mb-10"
        >
          {title}
        </RevealText>
        <ul className="hairline-y hairline">
          {items.map((item, i) => {
            const open = openIdx === i;
            return (
              <li key={item.q} className="hairline-b last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-6 px-1 py-5 text-left hover:text-ink-primary transition-colors focus-ring"
                >
                  <span className="text-base font-medium text-ink-primary/90 group-hover:text-ink-primary">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={clsx(
                      "w-4 h-4 text-ink-tertiary transition-transform flex-shrink-0",
                      open && "rotate-180 text-ink-secondary"
                    )}
                    strokeWidth={1.5}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-1 pb-5 text-sm text-ink-secondary leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
