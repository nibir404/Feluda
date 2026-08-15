import { PageHero } from "@/components/primitives/PageHero";
import { SectionNav } from "@/components/primitives/SectionNav";
import { PageCta } from "@/components/sections/PageCta";
import { ColoredCardGrid } from "@/components/sections/ColoredCardGrid";
import { ReviewFinding, PatternMockup, FindingsFeed } from "./mockups";
import { RelatedLinks } from "@/components/primitives/RelatedLinks";
import { codeReviewContent, routes } from "@/lib/content";

export const metadata = {
  title: "AI Code Review",
  description:
    "Feluda reviews pull requests using the context of the wider system—not just the diff.",
};

export default function CodeReviewPage() {
  const { hero, capabilities } = codeReviewContent;
  const [ctx, arch, deps, patterns, regressions, evidence, feedback] =
    capabilities;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        supporting={hero.supporting}
        primaryCta={{ label: hero.primaryCta, href: routes.auth.signup }}
        secondaryCta={
          hero.secondaryCta
            ? { label: hero.secondaryCta, href: routes.product.contextEngine }
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
        eyebrow="WHAT FELUDA LOOKS AT"
        headline={hero.headline}
        supporting={hero.supporting}
        cards={[
          {
            id: "context",
            eyebrow: "01 · Context",
            heading: `${ctx.title} with ${arch.title}.`,
            supporting:
              "Every review starts from the diff, then reaches into architecture, dependencies, and the patterns of the codebase.",
            checks: [
              { title: ctx.title, body: ctx.description },
              { title: arch.title, body: arch.description },
            ],
            mockup: <ReviewFinding />,
          },
          {
            id: "patterns",
            eyebrow: "02 · Patterns",
            heading: `${deps.title} and ${patterns.title}.`,
            supporting:
              "Compare against conventions used elsewhere. Surface downstream systems affected by the change.",
            checks: [
              { title: deps.title, body: deps.description },
              { title: patterns.title, body: patterns.description },
            ],
            mockup: <PatternMockup />,
          },
          {
            id: "evidence",
            eyebrow: "03 · Evidence",
            heading: `${regressions.title}, with ${evidence.title}.`,
            supporting:
              "Identify code paths that may break under the new logic—and link every finding to the evidence behind it.",
            checks: [
              { title: regressions.title, body: regressions.description },
              { title: feedback.title, body: feedback.description },
            ],
            mockup: <FindingsFeed />,
          },
        ]}
      />

      <RelatedLinks
        title="Continue exploring"
        links={[
          { label: "Change Intelligence", description: "Analyze what a change affects before merge.", href: routes.product.changeIntelligence },
          { label: "AI-Generated Code", description: "Govern AI-authored PRs.", href: routes.solutions.aiGeneratedCode },
          { label: "Context Engine", description: "What powers Feluda's reasoning.", href: routes.product.contextEngine },
        ]}
      />
      <PageCta
        headline={hero.headline}
        subheadline="Every review grounded in the actual codebase."
        primary={{ label: hero.primaryCta, href: routes.auth.signup }}
        secondary={{
          label: "Talk to sales",
          href: routes.company.contact,
        }}
      />
    </>
  );
}