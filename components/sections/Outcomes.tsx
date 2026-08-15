"use client";

import { Check } from "lucide-react";
import { Container } from "../primitives/Container";
import { SectionLabel } from "../primitives/SectionLabel";
import { outcomesContent } from "@/lib/content";

export function Outcomes() {
  return (
    <section className="py-24 lg:py-32 bg-bg-surface/40 hairline-t hairline-b">
      <Container size="wide">
        <SectionLabel className="mb-8">{outcomesContent.label}</SectionLabel>
        <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-5 max-w-4xl">
          {outcomesContent.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-1 flex items-center justify-center w-5 h-5 rounded-sm hairline">
                <Check
                  className="w-3 h-3 text-ink-secondary"
                  strokeWidth={2}
                />
              </span>
              <span className="text-base text-ink-primary leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
