import { PageHero } from "@/components/primitives/PageHero";
import { PageCta } from "@/components/sections/PageCta";
import { Container } from "@/components/primitives/Container";
import { companyPageContent, routes } from "@/lib/content";

export const metadata = {
  title: "About",
  description:
    "Feluda is built by engineers who got tired of searching, asking, and tracing just to understand the systems they worked on.",
};

export default function AboutPage() {
  const { about } = companyPageContent;
  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        headline={about.headline}
        supporting={about.supporting}
      />
      <section className="py-16 lg:py-24">
        <Container size="default">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-ink-secondary leading-relaxed">
              {about.body}
            </p>
          </div>
        </Container>
      </section>
      <PageCta
        headline="Join us."
        subheadline="We're building the intelligence layer for engineering teams."
        primary={{ label: "See open roles", href: routes.company.careers }}
        secondary={{
          label: "Talk to sales",
          href: routes.company.contact,
        }}
      />
    </>
  );
}