import { PageHero } from "@/components/primitives/PageHero";
import { SectionNav } from "@/components/primitives/SectionNav";
import { PageCta } from "@/components/sections/PageCta";
import { ColoredCardGrid } from "@/components/sections/ColoredCardGrid";
import { AskMockup, MapMockup, OnboardMockup } from "./mockups";
import { RelatedLinks } from "@/components/primitives/RelatedLinks";
import { codebaseIntelligenceContent, routes } from "@/lib/content";

export const metadata = {
  title: "Codebase Intelligence",
  description:
    "Feluda helps teams navigate and understand complex repositories by connecting files, symbols, dependencies, services, and architecture.",
};

export default function CodebaseIntelligencePage() {
  const { hero, capabilities } = codebaseIntelligenceContent;

  // Split 5 capabilities into 3 cards (2 + 2 + 1, with the singleton padded
  // by a generic check so each card always has a balanced 2-up grid).
  const [ask, deps, flows, patterns, arch] = capabilities;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        supporting={hero.supporting}
        primaryCta={{ label: hero.primaryCta, href: routes.auth.signup }}
        secondaryCta={
          hero.secondaryCta
            ? { label: hero.secondaryCta, href: routes.product.investigations }
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
            id: "ask",
            eyebrow: "01 · Ask",
            heading: ask.title,
            supporting: ask.description,
            checks: [
              { title: deps.title, body: deps.description },
              { title: flows.title, body: flows.description },
            ],
            mockup: <AskMockup />,
          },
          {
            id: "explore",
            eyebrow: "02 · Explore",
            heading: "Explore the system behind any module.",
            supporting:
              "Every Feluda answer points to the exact files, symbols, and edges that explain it.",
            checks: [
              { title: patterns.title, body: patterns.description },
              { title: arch.title, body: arch.description },
            ],
            mockup: <MapMockup />,
          },
          {
            id: "onboard",
            eyebrow: "03 · Onboard",
            heading: "Bring new engineers up to speed.",
            supporting:
              "Replace scattered tribal knowledge with a guided tour built from real code relationships.",
            checks: [
              {
                title: "System maps you can trust",
                body: "Generated from the actual repository, not stale docs.",
              },
              {
                title: "Always current",
                body: "Maps refresh as the codebase evolves—no manual updates.",
              },
            ],
            mockup: <OnboardMockup />,
          },
        ]}
      />

      <RelatedLinks
        title="Continue exploring"
        links={[
          { label: "Investigations", description: "Follow the evidence across your system.", href: routes.product.investigations },
          { label: "Onboard Engineers", description: "Help new engineers understand existing systems.", href: routes.solutions.onboardEngineers },
          { label: "Context Engine", description: "The intelligence layer powering Feluda.", href: routes.product.contextEngine },
        ]}
      />
      <PageCta
        headline={hero.headline}
        subheadline="Ask your codebase anything—grounded in how it actually works."
        primary={{ label: hero.primaryCta, href: routes.auth.signup }}
        secondary={{
          label: "Talk to sales",
          href: routes.company.contact,
        }}
      />
    </>
  );
}