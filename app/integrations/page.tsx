import { PageHero } from "@/components/primitives/PageHero";
import { PageCta } from "@/components/sections/PageCta";
import { Container } from "@/components/primitives/Container";
import {
  ArrowRight,
  Github,
  GitBranch,
  Code2,
  Server,
  Plug,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { integrationsPageContent, routes } from "@/lib/content";

export const metadata = {
  title: "Integrations",
  description:
    "Feluda connects to where your code lives and where your team collaborates—without forcing you to leave your existing tools.",
};

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  gitlab: GitBranch,
  bitbucket: GitBranch,
  slack: MessageSquare,
  api: Code2,
  mcp: Plug,
  server: Server,
};

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "available"
      ? "bg-status-safe/10 border-status-safe/30 text-status-safe"
      : status === "coming-soon"
      ? "bg-status-attention/10 border-status-attention/30 text-status-attention"
      : "bg-bg-overlay border-border text-ink-tertiary";
  const label =
    status === "available"
      ? "Available"
      : status === "coming-soon"
      ? "Coming soon"
      : "Planned";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border ${styles}`}
    >
      {label}
    </span>
  );
}

export default function IntegrationsPage() {
  const { hero, featured } = integrationsPageContent;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        supporting={hero.supporting}
        primaryCta={{ label: hero.primaryCta, href: routes.auth.signup }}
      />

      <section className="pb-24 lg:pb-32">
        <Container size="wide">
          <div className="space-y-12">
            {featured.map((group) => (
              <div key={group.group}>
                <p className="font-mono text-[11px] tracking-[0.18em] text-ink-tertiary uppercase mb-5">
                  {group.group}
                </p>
                <div className="rounded-lg bg-bg-surface hairline overflow-hidden">
                  {group.items.map((item, i) => {
                    const Icon = iconMap[item.name.toLowerCase()] ?? Server;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center gap-5 px-5 sm:px-6 py-5 hover:bg-bg-raised transition-colors focus-ring ${
                          i < group.items.length - 1
                            ? "border-b border-border-subtle"
                            : ""
                        }`}
                      >
                        <span className="flex items-center justify-center w-12 h-12 rounded-md bg-bg-base hairline group-hover:border-border-strong transition-colors flex-shrink-0">
                          <Icon
                            className="w-6 h-6 text-ink-secondary"
                            strokeWidth={1.5}
                          />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-base font-medium text-ink-primary">
                              {item.name}
                            </p>
                            <StatusBadge status={item.status} />
                          </div>
                          <p className="text-sm text-ink-secondary">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight
                          className="w-4 h-4 text-ink-tertiary group-hover:text-accent group-hover:translate-x-0.5 transition-all flex-shrink-0"
                          strokeWidth={2}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <PageCta
        headline="Need an integration we don't have?"
        subheadline="Reach out for custom integration discussions or early access."
        primary={{ label: "Start with Feluda", href: routes.auth.signup }}
        secondary={{
          label: "Talk to sales",
          href: routes.company.contact,
        }}
      />
    </>
  );
}