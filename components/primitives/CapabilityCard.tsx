import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import clsx from "clsx";

interface CapabilityCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export function CapabilityCard({
  icon: Icon,
  title,
  description,
  href,
  className,
}: CapabilityCardProps) {
  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : {};
  return (
    <Wrapper
      {...(wrapperProps as { href: string })}
      className={clsx(
        "group rounded-lg bg-bg-surface hairline p-6 transition-colors",
        href && "hover:bg-bg-base",
        className
      )}
    >
      {Icon && (
        <span className="flex items-center justify-center w-10 h-10 rounded-sm bg-bg-base hairline mb-4">
          <Icon className="w-5 h-5 text-ink-secondary" strokeWidth={1.75} />
        </span>
      )}
      <h3 className="font-serif text-base font-normal text-ink-primary leading-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm text-ink-secondary leading-relaxed">
        {description}
      </p>
      {href && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink-tertiary group-hover:text-ink-primary transition-colors">
          Learn more
          <ArrowRight
            className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </span>
      )}
    </Wrapper>
  );
}
