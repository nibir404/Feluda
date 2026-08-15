import clsx from "clsx";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-6 sm:px-10 lg:px-14",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-content",
        size === "wide" && "max-w-[1440px]",
        className
      )}
    >
      {children}
    </div>
  );
}
