import clsx from "clsx";
import { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
  index?: string;
}

export function SectionLabel({ children, className, index }: SectionLabelProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-3 text-[10px] font-mono tracking-[0.22em] text-ink-secondary uppercase",
        className
      )}
    >
      {index && (
        <span className="text-ink-tertiary font-medium">{index}</span>
      )}
      <span>{children}</span>
      <span className="h-px flex-1 bg-border-subtle/40 max-w-[120px]" />
    </div>
  );
}
