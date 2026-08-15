import { PageHero } from "@/components/primitives/PageHero";
import { PageCta } from "@/components/sections/PageCta";
import { ColoredCardGrid } from "@/components/sections/ColoredCardGrid";
import { PublishMockup, CodeMockupQuery, OptimizeMockup } from "./mockups";
import { howItWorksPageContent, routes } from "@/lib/content";

export const metadata = {
  title: "How it Works",
  description:
    "Feluda connects to your repository, builds a continuous understanding of your codebase, and exposes that understanding as reasoning.",
};

export default function HowItWorksPage() {
  const { hero, pipeline } = howItWorksPageContent;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        supporting={hero.supporting}
        primaryCta={{ label: hero.primaryCta, href: routes.auth.signup }}
        secondaryCta={
          hero.secondaryCta
            ? { label: hero.secondaryCta, href: routes.resources.docs }
            : undefined
        }
      />

      {/* Three-stage pipeline visualized as colored cards with a side rail. */}
      <ColoredCardGrid
        eyebrow="THE PIPELINE"
        headline="Three stages from repository to answers."
        supporting="Feluda continuously maps your repository, exposes that map as queryable APIs, and optimizes query execution as your codebase grows."
        rail={[
          { id: "publish", label: "Publish" },
          { id: "code", label: "Code" },
          { id: "optimize", label: "Optimize" },
        ]}
        cards={[
          {
            id: "publish",
            eyebrow: "01 · Publish",
            heading: "Publish data as APIs and code packages.",
            supporting:
              "Select tables or dbt models from a source and publish query interfaces instantly. No ETL or API development necessary.",
            checks: [
              {
                title: "Configurable runtime interfaces",
                body: "Python, TypeScript, C#, and GraphQL out of the box.",
              },
              {
                title: "Contextual metadata",
                body: "Provides descriptions, ownership, and schema definitions.",
              },
            ],
            mockup: <PublishMockup />,
          },
          {
            id: "code",
            eyebrow: "02 · Code",
            heading: "Query data immediately.",
            supporting:
              "Run OLAP, OLTP, and search queries with a single interface. Data packages are immediately queryable and designed for seamless integration in application code.",
            checks: [
              {
                title: "Federate into a larger GraphQL API",
                body: "Or import as a library into your code.",
              },
              {
                title: "Generated query interface",
                body: "Provides helper functions and autocorrect in your IDE.",
              },
            ],
            mockup: <CodeMockupQuery />,
          },
          {
            id: "optimize",
            eyebrow: "03 · Optimize",
            heading: "Optimize when you're ready.",
            supporting:
              "By default, queries hit your compute engine. When moving into production, upgrade the package for low latency and high availability across all workloads.",
            checks: [
              {
                title: "Accelerate packages",
                body: "Guarantee reliability with one click.",
              },
              {
                title: "Switch a package's source",
                body: "Or other configurations with GUI or code.",
              },
            ],
            mockup: <OptimizeMockup />,
          },
        ]}
      />

      <PageCta
        headline={hero.headline}
        subheadline="See the full pipeline and architecture in detail."
        primary={{ label: hero.primaryCta, href: routes.auth.signup }}
        secondary={{
          label: "Read documentation",
          href: routes.resources.docs,
        }}
      />
    </>
  );
}