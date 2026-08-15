"use client";

import { motion } from "framer-motion";
import { Container } from "../primitives/Container";
import { RevealText, Stagger } from "../primitives/RevealText";

export interface Capability {
  title: string;
  description: string;
}

interface CapabilitiesProps {
  label?: string;
  title?: string;
  capabilities: Capability[];
}

export function Capabilities({
  label,
  title,
  capabilities,
}: CapabilitiesProps) {
  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        {label && (
          <p className="label-mono text-ink-secondary mb-5">{label}</p>
        )}
        {title && (
          <RevealText
            as="h2"
            className="font-serif font-normal text-[clamp(1.75rem,4vw,2.75rem)] tracking-[-0.015em] text-balance text-ink-primary leading-[1.1] max-w-2xl mb-12"
          >
            {title}
          </RevealText>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border-subtle rounded-lg overflow-hidden hairline">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-bg-surface p-6 lg:p-7"
            >
              <span className="font-mono text-[10px] tracking-wider text-ink-tertiary uppercase mb-4 block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-base font-normal text-ink-primary mb-2 leading-snug">
                {cap.title}
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
