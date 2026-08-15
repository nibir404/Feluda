import { PageHero } from "@/components/primitives/PageHero";
import { SectionNav } from "@/components/primitives/SectionNav";
import { PageCta } from "@/components/sections/PageCta";
import { ColoredCardGrid } from "@/components/sections/ColoredCardGrid";
import { PRDiffMockup, RiskMockup, ImpactMockup } from "./mockups";
import { RelatedLinks } from "@/components/primitives/RelatedLinks";
import { changeIntelligenceContent, routes } from "@/lib/content";

export const metadata = {
  title: "Change Intelligence",
  description:
    "Feluda analyzes proposed changes in the context of the wider system—so teams understand risk before merge.",
};

export default function ChangeIntelligencePage() {
  const { hero, capabilities } = changeIntelligenceContent;
  const [analyze, related, trace, regressions, downstream] = capabilities;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        supporting={hero.supporting}
        primaryCta={{ label: hero.primaryCta, href: routes.auth.signup }}
        secondaryCta={
          hero.secondaryCta
            ? { label: hero.secondaryCta, href: routes.product.codeReview }
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
        eyebrow="WHAT YOU CAN DO"
        headline={hero.headline}
        supporting={hero.supporting}
        cards={[
          {
            id: "analyze",
            eyebrow: "01 · Analyze",
            heading: analyze.title,
            supporting: analyze.description,
            checks: [
              { title: related.title, body: related.description },
              { title: trace.title, body: trace.description },
            ],
            mockup: <PRDiffMockup />,
          },
          {
            id: "risk",
            eyebrow: "02 · Risk",
            heading: "Classify risk before merge.",
            supporting:
              "Feluda scores every change against the actual codebase—flagging code paths that could break.",
            checks: [
              { title: regressions.title, body: regressions.description },
              { title: downstream.title, body: downstream.description },
            ],
            mockup: <RiskMockup />,
          },
          {
            id: "ship",
            eyebrow: "03 · Ship",
            heading: "Decide with full context.",
            supporting:
              "See exactly which services, users, and workflows a change can affect before it ships.",
            checks: [
              {
                title: "Per-PR confidence",
                body: "Every change comes with a risk score and the evidence behind it.",
              },
              {
                title: "Inline in your review tool",
                body: "Feluda findings surface next to the diff, not in a separate dashboard.",
              },
            ],
            mockup: <ImpactMockup />,
          },
        ]}
      />

      <RelatedLinks
        title="Continue exploring"
        links={[
          { label: "AI Code Review", description: "Review every change with system context.", href: routes.product.codeReview },
          { label: "Analyze Change Impact", description: "A solution view of this capability.", href: routes.solutions.analyzeChanges },
          { label: "Context Engine", description: "How Feluda reasons about changes.", href: routes.product.contextEngine },
        ]}
      />
      <PageCta
        headline={hero.headline}
        subheadline="See what a change can affect before it ships."
        primary={{ label: hero.primaryCta, href: routes.auth.signup }}
        secondary={{
          label: "Talk to sales",
          href: routes.company.contact,
        }}
      />
    </>
  );
}