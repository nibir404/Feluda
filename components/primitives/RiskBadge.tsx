import clsx from "clsx";

type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

interface RiskBadgeProps {
  level: RiskLevel;
  size?: "sm" | "md";
  className?: string;
}

const styles: Record<RiskLevel, { bg: string; text: string; border: string }> = {
  LOW: {
    bg: "bg-status-safe/10",
    text: "text-status-safe",
    border: "border-status-safe/30",
  },
  MEDIUM: {
    bg: "bg-status-attention/10",
    text: "text-status-attention",
    border: "border-status-attention/30",
  },
  HIGH: {
    bg: "bg-status-critical/10",
    text: "text-status-critical",
    border: "border-status-critical/30",
  },
};

export function RiskBadge({ level, size = "sm", className }: RiskBadgeProps) {
  const s = styles[level];
  return (
    <span
      role="status"
      aria-label={`Risk level: ${level}`}
      className={clsx(
        "inline-flex items-center gap-1.5 font-mono uppercase tracking-wider rounded-md border",
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1",
        s.bg,
        s.text,
        s.border,
        className
      )}
    >
      <span
        className={clsx(
          "w-1.5 h-1.5 rounded-full",
          level === "LOW" && "bg-status-safe",
          level === "MEDIUM" && "bg-status-attention",
          level === "HIGH" && "bg-status-critical"
        )}
        aria-hidden="true"
      />
      {level}
    </span>
  );
}