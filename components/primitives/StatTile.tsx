import clsx from "clsx";

interface StatTileProps {
  label: string;
  value: string | number;
  sublabel?: string;
  className?: string;
}

export function StatTile({ label, value, sublabel, className }: StatTileProps) {
  return (
    <div
      className={clsx(
        "rounded-md bg-bg-base hairline p-5",
        className
      )}
    >
      <p className="font-mono text-[10px] tracking-[0.18em] text-ink-tertiary uppercase">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-ink-primary font-mono leading-none">
        {value}
      </p>
      {sublabel && (
        <p className="mt-2 text-xs text-ink-secondary">{sublabel}</p>
      )}
    </div>
  );
}