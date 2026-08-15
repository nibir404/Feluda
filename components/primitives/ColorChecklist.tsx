"use client";

import { Check } from "lucide-react";

export interface CheckItem {
  title: string;
  body: string;
}

interface ColorChecklistProps {
  items: CheckItem[];
  className?: string;
}

/**
 * ColorChecklist — the 2-up feature checklist inside a ColorCard.
 * Each item shows a small hairline checkmark + title + body. Text
 * uses `text-ink-on-panel` so it reads on mint / periwinkle cards
 * (dark) and `text-ink-on-sea` for sea-green cards (light).
 */
export function ColorChecklist({ items, className }: ColorChecklistProps) {
  return (
    <ul
      className={
        className ??
        "mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
      }
    >
      {items.map((item) => (
        <li key={item.title}>
          <Check
            className="w-4 h-4 text-ink-on-panel mb-2"
            strokeWidth={2}
          />
          <p className="text-sm font-medium text-ink-on-panel leading-snug">
            {item.title}
          </p>
          <p className="mt-1 text-[13px] text-ink-on-panel/75 leading-relaxed">
            {item.body}
          </p>
        </li>
      ))}
    </ul>
  );
}