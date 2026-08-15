"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../primitives/Container";
import { SectionLabel } from "../primitives/SectionLabel";
import { RevealText, Stagger } from "../primitives/RevealText";
import { productOverviewContent } from "@/lib/content";

export function Pillars() {
  return (
    <section className="py-24 lg:py-32">
      <Container size="wide">
        <SectionLabel className="mb-6">The four capabilities</SectionLabel>
        <RevealText
          as="h2"
          className="text-[clamp(1.75rem,4vw,2.75rem)] tracking-[-0.015em] leading-[1.1] text-balance text-ink-primary max-w-3xl font-serif font-normal"
        >
          One platform. Four ways to make your codebase answerable.
        </RevealText>
        <Stagger
          delay={0.25}
          className="mt-5 text-base text-ink-secondary max-w-2xl leading-relaxed"
        >
          {productOverviewContent.contextEngineNote}
        </Stagger>

        <div className="mt-14 grid sm:grid-cols-2 gap-px bg-border-subtle rounded-lg overflow-hidden hairline">
          {productOverviewContent.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={pillar.href}
                className="group block bg-bg-surface hover:bg-bg-base transition-colors p-7 lg:p-8 h-full"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-sm bg-bg-base hairline font-mono text-xs text-ink-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-border-subtle" />
                </div>
                <h3 className="font-serif text-xl text-ink-primary leading-tight">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm text-ink-secondary leading-relaxed">
                  {pillar.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-ink-tertiary group-hover:text-ink-primary transition-colors">
                  Explore
                  <ArrowRight
                    className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
