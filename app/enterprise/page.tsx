import { PageHero } from "@/components/primitives/PageHero";
import { PageCta } from "@/components/sections/PageCta";
import { Container } from "@/components/primitives/Container";
import { DataTable } from "@/components/primitives/DataTable";
import {
  Lock,
  KeyRound,
  Server,
  ShieldCheck,
  Eye,
  LifeBuoy,
} from "lucide-react";
import { enterprisePageContent, routes } from "@/lib/content";

export const metadata = {
  title: "Enterprise",
  description:
    "Engineering teams in regulated and high-stakes environments need controls, visibility, and deployment flexibility. Feluda is built accordingly.",
};

const iconMap = [Lock, KeyRound, Server, ShieldCheck, Eye, LifeBuoy];

export default function EnterprisePage() {
  const { hero, capabilities, controls, note } = enterprisePageContent;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        supporting={hero.supporting}
        primaryCta={{ label: hero.primaryCta, href: routes.company.contact }}
        secondaryCta={
          hero.secondaryCta
            ? { label: hero.secondaryCta, href: routes.enterprise.security }
            : undefined
        }
      />

      <section className="pb-12 lg:pb-16">
        <Container size="wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border-subtle rounded-lg overflow-hidden hairline">
            {capabilities.map((cap, i) => {
              const Icon = iconMap[i] ?? Lock;
              return (
                <div
                  key={cap.title}
                  className="bg-bg-surface p-7 hover:bg-bg-raised transition-colors"
                >
                  <Icon
                    className="w-5 h-5 text-accent mb-4"
                    strokeWidth={1.75}
                  />
                  <h3 className="text-base font-semibold text-ink-primary mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-bg-surface/40 border-y border-border-subtle">
        <Container size="wide">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-primary leading-tight">
              Technical controls, plainly stated.
            </h2>
            <p className="mt-3 text-sm text-ink-secondary leading-relaxed">
              {note}
            </p>
          </div>
          <DataTable
            rows={controls}
            rowKey={(r) => r.control}
            columns={[
              { key: "control", header: "Control", cell: (r) => <span className="text-ink-primary font-medium">{r.control}</span> },
              { key: "access", header: "Access", cell: (r) => r.access },
              { key: "visibility", header: "Visibility", cell: (r) => r.visibility },
              { key: "policy", header: "Policy", cell: (r) => r.policy },
            ]}
          />
        </Container>
      </section>

      <PageCta
        headline="Build with the controls you need."
        subheadline="Talk to our enterprise team about deployment, security, and procurement."
        primary={{ label: hero.primaryCta, href: routes.company.contact }}
        secondary={{
          label: "Read security overview",
          href: routes.enterprise.security,
        }}
      />
    </>
  );
}