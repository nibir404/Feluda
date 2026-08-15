import clsx from "clsx";

interface StatusDotProps {
  color?: "safe" | "attention" | "critical" | "accent";
  pulse?: boolean;
  className?: string;
}

const colorMap = {
  safe: "bg-status-safe",
  attention: "bg-status-attention",
  critical: "bg-status-critical",
  accent: "bg-accent",
};

export function StatusDot({
  color = "safe",
  pulse = true,
  className,
}: StatusDotProps) {
  return (
    <span
      className={clsx("relative inline-flex items-center justify-center", className)}
      aria-hidden="true"
    >
      {pulse && (
        <span
          className={clsx(
            "absolute inset-0 rounded-full opacity-60 animate-ping",
            colorMap[color]
          )}
        />
      )}
      <span className={clsx("relative w-1.5 h-1.5 rounded-full", colorMap[color])} />
    </span>
  );
}