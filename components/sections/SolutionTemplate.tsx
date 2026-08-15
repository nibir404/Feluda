"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "../primitives/Container";
import { PageHero } from "../primitives/PageHero";
import { PageCta } from "../sections/PageCta";
import { RelatedLinks } from "../primitives/RelatedLinks";
import { ColoredCardGrid } from "../sections/ColoredCardGrid";
import { CodeMockup } from "../primitives/CodeMockup";
import { RevealText, Stagger } from "../primitives/RevealText";
import type { SolutionPageContent } from "@/lib/content";

interface SolutionTemplateProps {
  content: SolutionPageContent;
}

export function SolutionTemplate({ content }: SolutionTemplateProps) {
  const { cost, currentVsFeluda, productDemoTitle, productDemoBody, outcome } =
    content;
  // Split current (3-4) and feluda (3-4) into pairs for the 2-up checklist.
  const half = Math.ceil(currentVsFeluda.current.length / 2);
  const currentA = currentVsFeluda.current.slice(0, half);
  const currentB = currentVsFeluda.current.slice(half);
  const feludaA = currentVsFeluda.feluda.slice(0, half);
  const feludaB = currentVsFeluda.feluda.slice(half);
  const outcomeA = outcome.items.slice(0, 2);
  const outcomeB = outcome.items.slice(2);

  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        supporting={content.hero.supporting}
        primaryCta={{
          label: content.hero.primaryCta,
          href: "/signup",
        }}
        secondaryCta={
          content.hero.secondaryCta
            ? { label: content.hero.secondaryCta, href: "/how-it-works" }
            : undefined
        }
      />

      <ColoredCardGrid
        eyebrow="THE COST OF THE PROBLEM"
        headline={cost.title}
        supporting={cost.body}
        cards={[
          {
            id: "current",
            eyebrow: "01 · Current",
            heading: currentVsFeluda.title,
            supporting:
              "How teams typically handle this today—and the cost of the workaround.",
            checks: [
              { title: currentA[0] ?? "Manual work", body: currentA[0] ?? "" },
              {
                title: currentA[1] ?? currentB[0] ?? "Tribal knowledge",
                body: currentA[1] ?? currentB[0] ?? "",
              },
            ],
            mockup: (
              <CodeMockup title="Today" subtitle="workflow" variant="code">
                <ul className="space-y-2 font-mono text-[11.5px] text-ink-on-code/85">
                  {currentVsFeluda.current.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-attention mt-1.5 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </CodeMockup>
            ),
          },
          {
            id: "feluda",
            eyebrow: "02 · With Feluda",
            heading: `${productDemoTitle}.`,
            supporting: productDemoBody,
            checks: [
              { title: feludaA[0] ?? "Context-grounded", body: feludaA[0] ?? "" },
              {
                title: feludaA[1] ?? feludaB[0] ?? "Always current",
                body: feludaA[1] ?? feludaB[0] ?? "",
              },
            ],
            mockup: (
              <CodeMockup title="Feluda" subtitle={`solution / ${content.slug}`} variant="code">
                <ul className="space-y-2 font-mono text-[11.5px] text-ink-on-code/85">
                  {currentVsFeluda.feluda.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-safe mt-1.5 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </CodeMockup>
            ),
          },
          {
            id: "outcome",
            eyebrow: "03 · Outcome",
            heading: outcome.title,
            supporting:
              "What teams get once Feluda is wired into this workflow.",
            checks: [
              { title: outcomeA[0] ?? "Faster answers", body: "" },
              {
                title: outcomeA[1] ?? outcomeB[0] ?? "Less context-switching",
                body: "",
              },
            ],
            mockup: (
              <CodeMockup
                title="Outcome"
                subtitle={`${content.slug}`}
                variant="code"
                tabs={["Before", "After"]}
                activeTab={1}
              >
                <ul className="space-y-2.5">
                  {outcome.items.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-center justify-between rounded-md bg-ink-on-code/[0.04] border border-ink-on-code/15 px-3 py-2 font-mono text-[11.5px] text-ink-on-code"
                    >
                      <span>{item}</span>
                      <ArrowRight
                        className="w-3 h-3 text-accent"
                        strokeWidth={2}
                      />
                    </li>
                  ))}
                </ul>
              </CodeMockup>
            ),
          },
        ]}
      />

      <RelatedLinks
        title="Continue exploring"
        links={content.related.map((r) => ({
          label: r.label,
          href: r.href,
        }))}
      />

      <PageCta
        headline={content.cta.headline}
        subheadline={content.cta.subheadline}
        primary={{
          label: content.cta.primary,
          href: "/signup",
        }}
        secondary={
          content.cta.secondary
            ? { label: content.cta.secondary, href: "/contact" }
            : undefined
        }
      />
    </>
  );
}

// Re-export so sub-solution pages can opt to render the
// "Demo placeholder" block instead of the second mockup if they want.
export function DemoPlaceholder({ slug }: { slug: string }) {
  return (
    <section className="py-12">
      <Container size="wide">
        <div className="max-w-3xl">
          <p className="label-mono text-ink-secondary mb-4">
            Demo placeholder
          </p>
          <RevealText
            as="h3"
            className="font-serif font-normal text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.015em] text-balance text-ink-primary leading-[1.1]"
          >
            Live walkthrough
          </RevealText>
          <Stagger className="mt-3 text-sm text-ink-secondary leading-relaxed">
            A tailored walkthrough of Feluda for this scenario. The interactive
            demo below uses the same surface as the homepage.
          </Stagger>
          <p className="mt-3 text-xs font-mono text-ink-tertiary">
            solution / {slug}
          </p>
        </div>
      </Container>
    </section>
  );
}