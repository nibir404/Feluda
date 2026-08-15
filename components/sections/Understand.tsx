"use client";

import { ArrowRight, FileCode } from "lucide-react";
import { Container } from "../primitives/Container";
import { ProductWindow } from "../primitives/ProductWindow";
import { SectionLabel } from "../primitives/SectionLabel";
import { SectionHeader } from "../primitives/SectionHeader";
import { understandContent, thesisContent } from "@/lib/content";

export function Understand() {
  return (
    <section id="understand" className="py-20 sm:py-24 lg:py-32">
      <Container size="wide">
        <div className="grid lg:grid-cols-1 items-end gap-8 mb-14">
          <div className="max-w-3xl">
            <SectionLabel className="mb-6">{understandContent.label}</SectionLabel>
            <SectionHeader
              headline={understandContent.headline}
              supporting={understandContent.supporting}
            />
          </div>
        </div>

        {/* Thesis: numbered stages */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px hairline rounded-lg overflow-hidden mb-16">
          {thesisContent.stages.map((stage, i) => (
            <div
              key={stage.label}
              className="bg-bg-surface/40 p-6 lg:p-7 flex flex-col"
            >
              <p className="label-mono text-ink-tertiary mb-5">
                <span className="text-ink-tertiary">{String(i + 1).padStart(2, "0")}</span>
                <span className="mx-2 text-ink-tertiary/50">/</span>
                <span>{stage.label}</span>
              </p>
              <p className="font-serif text-xl text-ink-primary leading-snug">
                {stage.description}
              </p>
            </div>
          ))}
        </div>

        <ProductWindow title="Feluda · Ask" subtitle="payments-platform / main">
          <div className="grid lg:grid-cols-[1fr_280px] gap-6 lg:gap-8">
            <div>
              <div className="mb-6 pb-5 hairline-b">
                <p className="label-mono text-ink-tertiary mb-2">Question</p>
                <p className="font-serif text-lg text-ink-primary leading-relaxed italic">
                  {understandContent.question}
                </p>
              </div>

              <p className="label-mono text-ink-secondary mb-4">Response</p>
              <ol className="space-y-2">
                {understandContent.flow.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 text-sm text-ink-secondary"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-sm bg-bg-base hairline text-[10px] font-mono text-ink-tertiary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono">{step}</span>
                    {i < understandContent.flow.length - 1 && (
                      <ArrowRight
                        className="w-3 h-3 text-ink-tertiary ml-auto"
                        strokeWidth={1.5}
                      />
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <aside className="order-first lg:order-none rounded-md bg-bg-base/40 hairline p-5 space-y-5 lg:sticky lg:top-24 h-fit">
              <div>
                <p className="label-mono text-ink-tertiary mb-3">
                  Related Context
                </p>
                <dl className="grid grid-cols-2 gap-3">
                  <Stat
                    label="Files"
                    value={understandContent.relatedContext.files}
                  />
                  <Stat
                    label="Services"
                    value={understandContent.relatedContext.services}
                  />
                  <Stat
                    label="Dependencies"
                    value={understandContent.relatedContext.dependencies}
                  />
                  <Stat
                    label="Commits"
                    value={understandContent.relatedContext.commits}
                  />
                </dl>
              </div>

              <div className="pt-5 hairline-t">
                <p className="label-mono text-ink-tertiary mb-3">
                  Files Touched
                </p>
                <ul className="space-y-2">
                  {understandContent.files.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-[12px] font-mono text-ink-secondary"
                    >
                      <FileCode
                        className="w-3.5 h-3.5 text-ink-tertiary"
                        strokeWidth={1.5}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </ProductWindow>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="label-mono text-ink-tertiary">{label}</dt>
      <dd className="text-xl font-semibold text-ink-primary font-mono mt-1">
        {value}
      </dd>
    </div>
  );
}