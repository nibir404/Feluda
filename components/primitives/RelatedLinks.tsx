import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "./Container";

interface RelatedLinksProps {
  title?: string;
  links: { label: string; href: string; description?: string }[];
}

export function RelatedLinks({
  title = "Continue exploring",
  links,
}: RelatedLinksProps) {
  return (
    <section className="border-t border-border-subtle/40">
      <Container size="wide">
        <div className="py-16 lg:py-20">
          <p className="font-mono text-[10px] tracking-[0.22em] text-ink-secondary uppercase mb-8">
            {title}
          </p>
          <ul className="divide-y divide-border-subtle/40 border-y border-border-subtle/40">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between gap-4 py-5 hover:bg-bg-surface/40 transition-colors -mx-4 px-4 rounded-sm focus-visible:outline-none focus-visible:bg-bg-surface/60"
                >
                  <div className="min-w-0">
                    <p className="text-base font-medium text-ink-primary group-hover:text-accent transition-colors">
                      {link.label}
                    </p>
                    {link.description && (
                      <p className="mt-1 text-sm text-ink-tertiary line-clamp-2">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <ArrowRight
                    className="w-4 h-4 text-ink-tertiary group-hover:text-accent group-hover:translate-x-0.5 transition-all flex-shrink-0"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
