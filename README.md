# Feluda — Landing Page

Premium, dark-mode landing page for Feluda, an AI Codebase Intelligence & Engineering Investigation platform.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **lucide-react**.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Structure

```
app/             — Next.js App Router (layout, page, globals.css)
components/
  layout/        — Navigation, Footer
  primitives/    — Container, SectionLabel, SectionHeader, ProductWindow, RiskBadge, StatusDot, CodeBlock, Button
  product/       — InvestigationTimeline, CodebaseGraph, PRDiffPanel, FindingCard, EvidenceList, Pipeline, WorkflowTabs
  sections/      — 15 sections composing the landing page
lib/
  content.ts     — All section copy (single source of truth)
  types.ts       — Shared TS types
tailwind.config.ts — Design tokens (colors, fonts, radii, keyframes)
```

## Design System

- **Background**: `#0A0A0A` base, with `#111111` / `#151515` / `#1A1A1A` surfaces
- **Borders**: `rgba(255,255,255,0.08)` with subtle/strong variants
- **Text**: `#F5F5F5` / `#A1A1A1` / `#737373`
- **Accent**: Electric lime `#C6F24E` (used sparingly — CTAs, active states, findings)
- **Status**: green / amber / red (color + label, never color-only)
- **Fonts**: Inter (sans) + JetBrains Mono (mono), loaded via `next/font/google`
- **Border radius**: 6–16px range (no oversized SaaS cards)

## Animation

Framer Motion entrance animations (`viewport: { once: true }`) and a sequenced investigation timeline in the hero. `prefers-reduced-motion` is fully respected.