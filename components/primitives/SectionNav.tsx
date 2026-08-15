"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Container } from "./Container";

interface SectionNavItem {
  label: string;
  href: string;
}

interface SectionNavProps {
  items: SectionNavItem[];
}

export function SectionNav({ items }: SectionNavProps) {
  const pathname = usePathname();
  return (
    <div className="sticky top-16 z-40 bg-bg-base/85 backdrop-blur-md border-b border-border-subtle/40">
      <Container size="wide">
        <div className="flex items-center gap-1 overflow-x-auto -mx-2 px-2">
          {items.map((item) => {
            const isActive =
              item.href === pathname ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors focus-ring rounded-t-md",
                  isActive
                    ? "text-ink-primary"
                    : "text-ink-tertiary hover:text-ink-secondary"
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-accent" />
                )}
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}