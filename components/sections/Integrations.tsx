"use client";

import { ArrowRight, Github, GitBranch, Code2, Server, Plug, type LucideIcon } from "lucide-react";
import { Container } from "../primitives/Container";
import { SectionLabel } from "../primitives/SectionLabel";
import { SectionHeader } from "../primitives/SectionHeader";
import { integrationsContent } from "@/lib/content";
import type { Integration } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  gitlab: GitBranch,
  bitbucket: GitBranch,
  api: Code2,
  mcp: Plug,
};

export function Integrations() {
  return (
    <section id="integrations" className="py-20 sm:py-24 lg:py-32 hairline-t">
      <Container size="wide">
        <div className="max-w-3xl mb-14">
          <SectionLabel className="mb-6">{integrationsContent.label}</SectionLabel>
          <SectionHeader
            headline={integrationsContent.headline}
          />
        </div>

        <div className="hairline">
          {integrationsContent.items.map((item, i) => (
            <IntegrationRow
              key={item.name}
              integration={item}
              isLast={i === integrationsContent.items.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function IntegrationRow({
  integration,
  isLast,
}: {
  integration: Integration;
  isLast: boolean;
}) {
  const Icon = iconMap[integration.icon] ?? Server;
  return (
    <a
      href="#"
      className={`group flex items-start sm:items-center gap-4 sm:gap-6 px-2 sm:px-4 py-5 hover:bg-bg-surface/40 transition-colors focus-ring ${
        !isLast ? "hairline-b" : ""
      }`}
    >
      <span className="flex items-center justify-center w-10 h-10 rounded-sm bg-bg-base/40 hairline group-hover:border-border-subtle transition-colors flex-shrink-0">
        <Icon className="w-4 h-4 text-ink-secondary" strokeWidth={1.5} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-base font-medium text-ink-primary">
          {integration.name}
        </p>
        <p className="text-sm text-ink-secondary mt-0.5">
          {integration.description}
        </p>
      </div>
      <span className="label-mono text-ink-tertiary hidden sm:inline">
        Available
      </span>
      <ArrowRight
        className="w-4 h-4 text-ink-tertiary group-hover:translate-x-0.5 transition-all flex-shrink-0 self-center"
        strokeWidth={1.5}
      />
    </a>
  );
}
