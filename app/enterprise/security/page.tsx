import { PageHero } from "@/components/primitives/PageHero";
import { PageCta } from "@/components/sections/PageCta";
import { Faq } from "@/components/sections/Faq";
import { Container } from "@/components/primitives/Container";
import { securityPageContent, routes } from "@/lib/content";

export const metadata = {
  title: "Security",
  description:
    "Security architecture, access controls, encryption, retention, deployment, and compliance at Feluda.",
};

export default function SecurityPage() {
  const { hero, sections, faqs } = securityPageContent;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        supporting={hero.supporting}
        primaryCta={{ label: hero.primaryCta, href: "/contact?topic=security" }}
        secondaryCta={
          hero.secondaryCta
            ? { label: hero.secondaryCta, href: routes.resources.trust }
            : undefined
        }
      />

      <section className="pb-16 lg:pb-24">
        <Container size="wide">
          <div className="grid sm:grid-cols-2 gap-px bg-border-subtle rounded-lg overflow-hidden hairline">
            {sections.map((s) => (
              <div key={s.title} className="bg-bg-surface p-7">
                <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase mb-3">
                  {s.title}
                </p>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Faq title="Security FAQ" items={faqs} />

      <PageCta
        headline="Have detailed security questions?"
        subheadline="Reach out for a deeper technical review or a procurement-ready security pack."
        primary={{
          label: hero.primaryCta,
          href: "/contact?topic=security",
        }}
        secondary={{
          label: "Visit trust center",
          href: routes.resources.trust,
        }}
      />
    </>
  );
}