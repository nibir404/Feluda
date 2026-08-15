import Link from "next/link";
import { Container } from "./Container";
import { PageHero } from "./PageHero";

interface ComingSoonProps {
  eyebrow: string;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
}

export function ComingSoon({
  eyebrow,
  title,
  description,
  backHref = "/",
  backLabel = "Back to home",
}: ComingSoonProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        headline={title}
        supporting={description}
        primaryCta={{ label: backLabel, href: backHref }}
      />
      <Container size="wide" className="pb-32">
        <div className="mt-16 border border-border-subtle/40 rounded-lg p-12 text-center bg-bg-surface/40">
          <p className="font-mono text-[10px] tracking-[0.22em] text-ink-secondary uppercase mb-4">
            Status
          </p>
          <p className="font-serif text-3xl text-ink-primary">
            Coming soon.
          </p>
          <p className="mt-3 text-sm text-ink-secondary max-w-md mx-auto">
            We're building this page. In the meantime, the rest of the Feluda site is fully available.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-sm">
            <Link
              href="/product"
              className="text-ink-secondary hover:text-ink-primary transition-colors"
            >
              Explore the platform →
            </Link>
            <span className="text-ink-tertiary">·</span>
            <Link
              href="/pricing"
              className="text-ink-secondary hover:text-ink-primary transition-colors"
            >
              See pricing →
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
