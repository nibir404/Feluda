import { PageHero } from "@/components/primitives/PageHero";
import { SectionNav } from "@/components/primitives/SectionNav";
import { PageCta } from "@/components/sections/PageCta";
import { ColoredCardGrid } from "@/components/sections/ColoredCardGrid";
import { IncidentTimeline, FindingPanel, ImpactPanel } from "./mockups";
import { RelatedLinks } from "@/components/primitives/RelatedLinks";
import { investigationsContent, routes } from "@/lib/content";

export const metadata = {
  title: "Investigations",
  description:
    "Feluda helps investigate software behavior by connecting changes, dependencies, historical context, and codebase relationships.",
};

export default function InvestigationsPage() {
  const { hero, journey } = investigationsContent;
  // 6 journey steps → 3 cards of 2.
  const [symptom, evidence, deps, change, finding, impact] = journey;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        supporting={hero.supporting}
        primaryCta={{ label: hero.primaryCta, href: routes.auth.signup }}
        secondaryCta={
          hero.secondaryCta
            ? { label: hero.secondaryCta, href: routes.product.changeIntelligence }
            : undefined
        }
      />
      <SectionNav
        items={[
          { label: "Overview", href: routes.product.index },
          { label: "Codebase Intelligence", href: routes.product.codebaseIntelligence },
          { label: "Investigations", href: routes.product.investigations },
          { label: "Change Intelligence", href: routes.product.changeIntelligence },
          { label: "Code Review", href: routes.product.codeReview },
          { label: "Context Engine", href: routes.product.contextEngine },
        ]}
      />

      <ColoredCardGrid
        eyebrow="AN INVESTIGATION, STEP BY STEP"
        headline={hero.headline}
        supporting={hero.supporting}
        cards={[
          {
            id: "symptom",
            eyebrow: "01 · Symptom",
            heading: `${symptom.title} → ${evidence.title}.`,
            supporting:
              "Start with what's wrong—an outage, a regression, an unexpected behavior. Feluda gathers the evidence trail.",
            checks: [
              { title: symptom.title, body: symptom.description },
              { title: evidence.title, body: evidence.description },
            ],
            mockup: <IncidentTimeline />,
          },
          {
            id: "trace",
            eyebrow: "02 · Trace",
            heading: `${deps.title} and ${change.title}.`,
            supporting:
              "Trace downstream systems and surface recent deployments, commits, and configuration changes in scope.",
            checks: [
              { title: deps.title, body: deps.description },
              { title: change.title, body: change.description },
            ],
            mockup: <FindingPanel />,
          },
          {
            id: "impact",
            eyebrow: "03 · Impact",
            heading: `${finding.title} with ${impact.title}.`,
            supporting:
              "Feluda proposes a possible root cause with confidence and linked evidence, then estimates scope.",
            checks: [
              { title: finding.title, body: finding.description },
              { title: impact.title, body: impact.description },
            ],
            mockup: <ImpactPanel />,
          },
        ]}
      />

      <RelatedLinks
        title="Continue exploring"
        links={[
          { label: "Investigate Bugs & Incidents", description: "See how Feluda handles production issues.", href: routes.solutions.investigateBugs },
          { label: "Change Intelligence", description: "Know what a change can affect.", href: routes.product.changeIntelligence },
          { label: "Context Engine", description: "How Feluda builds understanding.", href: routes.product.contextEngine },
        ]}
      />
      <PageCta
        headline={hero.headline}
        subheadline="Start an investigation from any symptom and let Feluda follow the trail."
        primary={{ label: hero.primaryCta, href: routes.auth.signup }}
        secondary={{
          label: "Talk to sales",
          href: routes.company.contact,
        }}
      />
    </>
  );
}