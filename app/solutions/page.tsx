import { PageHero } from "@/components/primitives/PageHero";
import { PageCta } from "@/components/sections/PageCta";
import { Container } from "@/components/primitives/Container";
import { CapabilityCard } from "@/components/primitives/CapabilityCard";
import {
  Compass,
  Search,
  GitPullRequest,
  ClipboardCheck,
  Users,
  Sparkles,
  Network,
  type LucideIcon,
} from "lucide-react";
import { solutionsIndexContent, routes } from "@/lib/content";

export const metadata = {
  title: "Solutions",
  description:
    "Feluda is shaped around the jobs engineering teams actually do—understanding, investigating, analyzing, and reviewing code in context.",
};

const iconMap: Record<string, LucideIcon> = {
  Compass,
  Search,
  GitPullRequest,
  ClipboardCheck,
  Users,
  Sparkles,
  Network,
};

export default function SolutionsIndexPage() {
  const { hero, cards } = solutionsIndexContent;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        supporting={hero.supporting}
      />
      <section className="pb-24 lg:pb-32">
        <Container size="wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => {
              const Icon = iconMap[card.icon] ?? Search;
              return (
                <CapabilityCard
                  key={card.href}
                  icon={Icon}
                  title={card.title}
                  description={card.description}
                  href={card.href}
                />
              );
            })}
          </div>
        </Container>
      </section>
      <PageCta
        headline="See how Feluda handles your scenario."
        subheadline="Every solution page walks through the cost of the problem and how Feluda addresses it."
        primary={{ label: "Start with Feluda", href: routes.auth.signup }}
        secondary={{ label: "Talk to sales", href: routes.company.contact }}
      />
    </>
  );
}