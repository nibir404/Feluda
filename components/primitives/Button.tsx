"use client";

import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
  href?: string;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-150 ease-out focus-ring group disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent/90 hover:gap-2.5 active:bg-accent/85",
  secondary:
    "bg-bg-surface text-ink-primary hairline hover:bg-bg-base",
  ghost:
    "bg-transparent text-ink-secondary hover:text-ink-primary hover:bg-bg-surface/50",
  outline:
    "bg-transparent text-ink-primary hairline hover:bg-bg-surface/60 hover:border-border",
};

const sizeStyles: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  sm: "h-8 px-3 text-xs",
};

export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}