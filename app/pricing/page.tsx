import { PageHero } from "@/components/primitives/PageHero";
import { PageCta } from "@/components/sections/PageCta";
import { Faq } from "@/components/sections/Faq";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Check, Minus } from "lucide-react";
import clsx from "clsx";
import { pricingContent, routes } from "@/lib/content";

export const metadata = {
  title: "Pricing",
  description:
    "Feluda scales from a single repository to enterprise-wide deployment. Choose the plan that fits your team.",
};

function CellValue({ value }: { value: string }) {
  if (value === "✓") {
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-accent/10 border border-accent/30">
        <Check className="w-3 h-3 text-accent" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === "—") {
    return (
      <Minus className="w-3.5 h-3.5 text-ink-tertiary mx-auto" strokeWidth={2} />
    );
  }
  return <span className="text-ink-primary">{value}</span>;
}

export default function PricingPage() {
  const { hero, plans, compareRows, faqs } = pricingContent;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        supporting={hero.supporting}
      />

      {/* Plans */}
      <section className="pb-12">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, i) => (
              <div
                key={plan.tier}
                className={clsx(
                  "rounded-lg p-6 sm:p-7 flex flex-col",
                  i === 1
                    ? "bg-bg-surface hairline border-accent/30 ring-1 ring-accent/20"
                    : "bg-bg-surface hairline"
                )}
              >
                <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase mb-3">
                  {plan.tier}
                </p>
                <h3 className="text-xl font-semibold text-ink-primary">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-ink-primary font-mono">
                    {plan.price}
                  </span>
                  <span className="text-xs text-ink-tertiary font-mono">
                    {plan.cadence}
                  </span>
                </div>
                <p className="mt-3 text-sm text-ink-secondary leading-relaxed">
                  {plan.description}
                </p>

                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-ink-tertiary text-xs uppercase tracking-wider font-mono mb-1">
                      Who
                    </dt>
                    <dd className="text-ink-primary">{plan.who}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-tertiary text-xs uppercase tracking-wider font-mono mb-1">
                      What you can do
                    </dt>
                    <dd className="text-ink-primary leading-relaxed">{plan.do}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-tertiary text-xs uppercase tracking-wider font-mono mb-1">
                      Primary limitation
                    </dt>
                    <dd className="text-ink-secondary leading-relaxed">{plan.limit}</dd>
                  </div>
                </dl>

                <div className="mt-7 pt-6 border-t border-border-subtle">
                  <Button
                    href={plan.ctaHref}
                    variant={i === 1 ? "primary" : "secondary"}
                    withArrow={i === 1}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison table */}
      <section className="py-16 lg:py-20 bg-bg-surface/40 border-y border-border-subtle">
        <Container size="wide">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-primary leading-tight mb-10">
            Compare plans
          </h2>
          <div className="rounded-lg hairline overflow-hidden bg-bg-surface">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-raised hairline-b">
                    <th className="text-left px-5 py-4 font-mono text-[10px] tracking-[0.18em] text-ink-tertiary uppercase">
                      Feature
                    </th>
                    {plans.map((p) => (
                      <th
                        key={p.tier}
                        className="text-center px-5 py-4 font-mono text-[10px] tracking-[0.18em] text-ink-tertiary uppercase"
                      >
                        {p.tier}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={clsx(
                        "hover:bg-bg-raised/50 transition-colors",
                        i < compareRows.length - 1 && "hairline-b"
                      )}
                    >
                      <td className="px-5 py-4 text-ink-primary font-medium">
                        {row.feature}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <CellValue value={row.individual} />
                      </td>
                      <td className="px-5 py-4 text-center">
                        <CellValue value={row.team} />
                      </td>
                      <td className="px-5 py-4 text-center">
                        <CellValue value={row.enterprise} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      <Faq items={faqs} />

      <PageCta
        headline="Find the right plan for your team."
        subheadline="Start free, upgrade as you grow, or talk to sales for enterprise needs."
        primary={{ label: "Start with Feluda", href: routes.auth.signup }}
        secondary={{
          label: "Talk to sales",
          href: routes.company.contact,
        }}
      />
    </>
  );
}