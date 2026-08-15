"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "../primitives/Container";
import { ProductWindow } from "../primitives/ProductWindow";
import { SectionLabel } from "../primitives/SectionLabel";
import { SectionHeader } from "../primitives/SectionHeader";
import { StatusDot } from "../primitives/StatusDot";
import { EvidenceList } from "../product/EvidenceList";
import { investigateContent } from "@/lib/content";

export function Investigate() {
  const { incident } = investigateContent;
  return (
    <section
      id="investigate"
      className="py-20 sm:py-24 lg:py-32 hairline-t"
    >
      <Container size="wide">
        <div className="max-w-3xl mb-14">
          <SectionLabel className="mb-6">{investigateContent.label}</SectionLabel>
          <SectionHeader
            headline={investigateContent.headline.join(" ")}
            supporting={investigateContent.supporting}
          />
        </div>

        <ProductWindow
          title="Investigation"
          subtitle={incident.id}
          variant="elevated"
          badge={
            <span className="inline-flex items-center gap-1.5 label-mono text-status-critical">
              <StatusDot color="critical" />
              Active
            </span>
          }
        >
          <div className="space-y-8">
            <div>
              <p className="label-mono text-ink-tertiary mb-2">{incident.id}</p>
              <h3 className="font-serif text-2xl text-ink-primary leading-tight">
                {incident.title}
              </h3>
              <div className="mt-3 flex items-center gap-3 text-xs font-mono text-ink-tertiary">
                <span>payments-platform</span>
                <span>·</span>
                <span>prod · us-east-1</span>
                <span>·</span>
                <span>last 24h</span>
              </div>
            </div>

            <div>
              <p className="label-mono text-ink-tertiary mb-4">Investigation</p>
              <EvidenceList items={incident.timeline} />
            </div>

            <div className="rounded-md bg-bg-base/40 hairline p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="label-mono text-ink-secondary">Root Cause</p>
                <span className="label-mono text-ink-tertiary">Confidence</span>
              </div>
              <p className="font-serif text-base text-ink-primary leading-relaxed mb-4">
                {incident.rootCause}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1 rounded-full bg-bg-surface overflow-hidden">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${incident.confidence}%` }}
                  />
                </div>
                <span className="font-mono text-sm text-ink-primary">
                  {incident.confidence}%
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-px hairline rounded-md overflow-hidden">
              <div className="bg-bg-surface/40 p-5">
                <p className="label-mono text-ink-tertiary mb-2">Risk</p>
                <p className="font-serif text-xl text-status-critical">{incident.risk}</p>
              </div>
              <div className="bg-bg-surface/40 p-5">
                <p className="label-mono text-ink-tertiary mb-2">Affected</p>
                <ul className="space-y-1.5">
                  {incident.affectedServices.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-2 text-sm font-mono text-ink-secondary"
                    >
                      <span className="w-1 h-1 rounded-full bg-status-critical" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-bg-surface/40 p-5">
                <p className="label-mono text-ink-tertiary mb-2">Evidence</p>
                <p className="font-serif text-xl text-ink-primary">
                  {incident.evidenceCount}{" "}
                  <span className="text-sm text-ink-tertiary font-mono">linked findings</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-primary hover:text-ink-secondary transition-colors group focus-ring rounded-md"
            >
              View linked findings
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </ProductWindow>
      </Container>
    </section>
  );
}