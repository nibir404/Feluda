import { PageHero } from "@/components/primitives/PageHero";
import { Container } from "@/components/primitives/Container";
import { Mail } from "lucide-react";
import { companyPageContent } from "@/lib/content";

export const metadata = {
  title: "Contact",
  description: "Talk to the Feluda team.",
};

export default function ContactPage() {
  const { contact } = companyPageContent;
  return (
    <>
      <PageHero
        eyebrow={contact.eyebrow}
        headline={contact.headline}
        supporting={contact.supporting}
      />
      <section className="pb-32">
        <Container size="default">
          <div className="rounded-lg bg-bg-surface hairline overflow-hidden">
            {contact.channels.map((ch, i) => (
              <a
                key={ch.label}
                href={`mailto:${ch.value}`}
                className={`group flex items-center gap-4 px-5 py-5 hover:bg-bg-raised transition-colors focus-ring ${
                  i < contact.channels.length - 1
                    ? "border-b border-border-subtle"
                    : ""
                }`}
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-md bg-bg-base hairline flex-shrink-0 group-hover:border-border-strong transition-colors">
                  <Mail
                    className="w-4 h-4 text-ink-secondary"
                    strokeWidth={1.75}
                  />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-0.5">
                    {ch.label}
                  </p>
                  <p className="text-base text-ink-primary font-mono">
                    {ch.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}