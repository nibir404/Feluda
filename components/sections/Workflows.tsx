"use client";

import { Container } from "../primitives/Container";
import { SectionLabel } from "../primitives/SectionLabel";
import { SectionHeader } from "../primitives/SectionHeader";
import { WorkflowTabs } from "../product/WorkflowTabs";
import { workflowsContent } from "@/lib/content";

export function Workflows() {
  return (
    <section id="workflows" className="py-20 sm:py-24 lg:py-32 hairline-t">
      <Container size="wide">
        <div className="max-w-3xl mb-14">
          <SectionLabel className="mb-6">Workflows</SectionLabel>
          <SectionHeader headline={workflowsContent.headline} />
        </div>
        <WorkflowTabs tabs={workflowsContent.tabs} />
      </Container>
    </section>
  );
}
