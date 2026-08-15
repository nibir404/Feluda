import Link from "next/link";
import { Container } from "../primitives/Container";
import { Logo } from "../primitives/Logo";
import { footerContent, routes } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle/40 bg-bg-base">
      <Container size="wide">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10 lg:gap-12">
            <div className="col-span-2 md:col-span-4 lg:col-span-2 max-w-sm">
              <Link
                href={routes.home}
                className="inline-block mb-5"
                aria-label="Feluda home"
              >
                <Logo height={40} />
              </Link>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {footerContent.tagline}
              </p>
            </div>

            {footerContent.columns.map((col) => (
              <div key={col.title}>
                <h3 className="label-mono text-ink-secondary mb-4">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink-secondary hover:text-ink-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border-subtle/40 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-tertiary font-mono">
            {footerContent.bottom.copyright}
          </p>
          <div className="flex items-center gap-6">
            {footerContent.bottom.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-ink-tertiary hover:text-ink-secondary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}