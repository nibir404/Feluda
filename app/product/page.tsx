import { PageHero } from "@/components/primitives/PageHero";
import { SectionNav } from "@/components/primitives/SectionNav";
import { Pillars } from "@/components/sections/Pillars";
import { PageCta } from "@/components/sections/PageCta";
import { Workflows } from "@/components/sections/Workflows";
import { Integrations } from "@/components/sections/Integrations";
import { RelatedLinks } from "@/components/primitives/RelatedLinks";
import { productOverviewContent, routes } from "@/lib/content";

export const metadata = {
  title: "Product",
  description:
    "Feluda combines codebase intelligence, investigations, change analysis, and code review into one system that understands how your software works.",
};

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow={productOverviewContent.hero.eyebrow}
        headline={productOverviewContent.hero.headline}
        supporting={productOverviewContent.hero.supporting}
        primaryCta={{
          label: productOverviewContent.hero.primaryCta,
          href: routes.auth.signup,
        }}
        secondaryCta={{
          label: productOverviewContent.hero.secondaryCta,
          href: routes.howItWorks,
        }}
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
      <Pillars />
      <Workflows />
      <Integrations />
      <RelatedLinks
        title="Continue exploring"
        links={[
          {
            label: "How Feluda works",
            description: "See the pipeline from repository to intelligence.",
            href: routes.howItWorks,
          },
          {
            label: "Enterprise",
            description: "Security, deployment, and access controls.",
            href: routes.enterprise.index,
          },
          {
            label: "Pricing",
            description: "Plans for individuals, teams, and enterprises.",
            href: routes.pricing,
          },
          {
            label: "Investigations",
            description: "Trace problems and follow the evidence.",
            href: routes.product.investigations,
          },
          {
            label: "Solutions",
            description: "Built around engineering jobs-to-be-done.",
            href: routes.solutions.index,
          },
          {
            label: "Sign in",
            description: "Continue to your Feluda workspace.",
            href: routes.auth.signin,
          },
        ]}
      />
      <PageCta
        headline={productOverviewContent.hero.headline}
        subheadline="See the four capabilities of the Feluda platform in action."
        primary={{ label: "Start with Feluda", href: routes.auth.signup }}
        secondary={{
          label: "Talk to sales",
          href: routes.company.contact,
        }}
      />
    </>
  );
}