import { PageHero } from "@/components/primitives/PageHero";
import { SectionNav } from "@/components/primitives/SectionNav";
import { PageCta } from "@/components/sections/PageCta";
import { ColoredCardGrid } from "@/components/sections/ColoredCardGrid";
import { InputsMockup, EngineMockup, OutputsMockup } from "./mockups";
import { RelatedLinks } from "@/components/primitives/RelatedLinks";
import { contextEngineContent, routes } from "@/lib/content";

export const metadata = {
  title: "Context Engine",
  description:
    "The intelligence layer behind every Feluda finding—continuously building a deep understanding of your codebase.",
};

export default function ContextEnginePage() {
  const { hero, sections } = contextEngineContent;
  const [code, relations, retrieval, change, continuous, relevance] = sections;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        supporting={hero.supporting}
        primaryCta={{ label: hero.primaryCta, href: routes.product.codebaseIntelligence }}
        secondaryCta={
          hero.secondaryCta
            ? { label: hero.secondaryCta, href: routes.resources.docs }
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
        eyebrow="ARCHITECTURE"
        headline={hero.headline}
        supporting={hero.supporting}
        cards={[
          {
            id: "ingest",
            eyebrow: "01 · Ingest",
            heading: `${code.title} and ${relations.title}.`,
            supporting:
              "The Context Engine ingests code, structure, and history into a continuously updated model.",
            checks: [
              { title: code.title, body: code.description },
              { title: relations.title, body: relations.description },
            ],
            mockup: <InputsMockup />,
          },
          {
            id: "engine",
            eyebrow: "02 · Engine",
            heading: `${retrieval.title} with ${change.title}.`,
            supporting:
              "Surface the relevant subset of context for any task, backed by full change history.",
            checks: [
              { title: retrieval.title, body: retrieval.description },
              { title: change.title, body: change.description },
            ],
            mockup: <EngineMockup />,
          },
          {
            id: "serve",
            eyebrow: "03 · Serve",
            heading: `${continuous.title} and ${relevance.title}.`,
            supporting:
              "Every Feluda experience draws on the same continuously-updated context.",
            checks: [
              { title: continuous.title, body: continuous.description },
              { title: relevance.title, body: relevance.description },
            ],
            mockup: <OutputsMockup />,
          },
        ]}
      />

      <RelatedLinks
        title="Continue exploring"
        links={[
          { label: "Codebase Intelligence", description: "How engineers use the Context Engine.", href: routes.product.codebaseIntelligence },
          { label: "Investigations", description: "Symptom → evidence → finding.", href: routes.product.investigations },
          { label: "Documentation", description: "Deeper technical detail.", href: routes.resources.docs },
        ]}
      />
      <PageCta
        headline={hero.headline}
        subheadline="See how the Context Engine powers every Feluda experience."
        primary={{ label: hero.primaryCta, href: routes.product.codebaseIntelligence }}
        secondary={{
          label: "Talk to engineering",
          href: routes.company.contact,
        }}
      />
    </>
  );
}