"use client";

import { motion } from "framer-motion";
import { Container } from "../primitives/Container";
import { SectionLabel } from "../primitives/SectionLabel";
import { SectionHeader } from "../primitives/SectionHeader";
import { thesisContent } from "@/lib/content";

export function Thesis() {
  return (
    <section className="py-24 lg:py-32 bg-bg-surface/40 hairline-t hairline-b">
      <Container size="wide">
        <div className="max-w-3xl mb-14 lg:mb-20">
          <SectionLabel className="mb-6">{thesisContent.label}</SectionLabel>
          <SectionHeader
            headline={thesisContent.headline}
            supporting={thesisContent.supporting}
          />
        </div>

        <div className="relative">
          {/* Horizontal connector line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-6 left-0 right-0 h-px hairline-bright"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {thesisContent.stages.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                {/* Connector dot */}
                <div className="hidden lg:flex items-center justify-center w-3 h-3 rounded-full bg-bg-base hairline mb-6">
                  <span className="w-1 h-1 rounded-full bg-ink-secondary" />
                </div>
                <div className="lg:hidden flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-ink-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-border-subtle" />
                </div>

                <h3 className="font-mono text-xs tracking-[0.18em] text-ink-primary uppercase mb-3">
                  {stage.label}
                </h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
