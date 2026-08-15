import { PageHero } from "@/components/primitives/PageHero";
import { PageCta } from "@/components/sections/PageCta";
import { Container } from "@/components/primitives/Container";
import { ArrowRight } from "lucide-react";
import { companyPageContent, routes } from "@/lib/content";

export const metadata = {
  title: "Careers",
  description:
    "Help us make every codebase answerable. We're hiring engineers, designers, and researchers.",
};

export default function CareersPage() {
  const { careers } = companyPageContent;
  return (
    <>
      <PageHero
        eyebrow={careers.eyebrow}
        headline={careers.headline}
        supporting={careers.supporting}
        primaryCta={{ label: "See open roles", href: "/contact?topic=careers" }}
      />

      <section className="pb-16">
        <Container size="default">
          <p className="text-base text-ink-secondary leading-relaxed mb-10">
            {careers.body}
          </p>
          <div className="rounded-lg bg-bg-surface hairline overflow-hidden">
            {careers.roles.map((role, i) => (
              <a
                key={role}
                href={`/contact?role=${encodeURIComponent(role)}`}
                className={`group flex items-center justify-between gap-4 px-5 py-5 hover:bg-bg-raised transition-colors focus-ring ${
                  i < careers.roles.length - 1 ? "border-b border-border-subtle" : ""
                }`}
              >
                <div>
                  <p className="text-base font-medium text-ink-primary group-hover:text-accent transition-colors">
                    {role}
                  </p>
                  <p className="text-xs text-ink-tertiary font-mono mt-1">
                    Remote · Full-time
                  </p>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-ink-tertiary group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                  strokeWidth={2}
                />
              </a>
            ))}
          </div>
        </Container>
      </section>

      <PageCta
        headline="Don't see your role?"
        subheadline="We're always interested in meeting exceptional people. Reach out."
        primary={{
          label: "Get in touch",
          href: routes.company.contact,
        }}
      />
    </>
  );
}