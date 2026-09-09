# Feluda

A Next.js marketing website for Feluda, a codebase intelligence and investigation platform.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Production build

```sh
npm run build
npm run start
```

Next.js bundles Google Fonts at build time; the first build needs network access to Google Fonts.

## September 2026 redesign

The homepage uses Greptile's oversized typography, technical grid, angular buttons, and alternating light/dark layout as a visual reference. All product messaging, examples, logo, and illustration are Feluda's. ASCII Magic's dot and character rendering are the interaction reference.

- Existing `public/Logo White.png`, `Logo Dark.png`, and `Light BG.png` assets are preserved.
- `components/redesign/AsciiScene.tsx` samples the existing illustration into local point geometry and projects it with a perspective camera. Pointer movement controls the view; a scan highlights connected points. Dot and ASCII modes, pause, reset, reduced-motion handling, resize handling, offscreen suspension, and cleanup are included.
- `components/redesign/FeludaHome.tsx` contains the homepage: method tabs, expandable demonstration cases, selectable codebase map, integrations, security, FAQ, and calls to action.
- `app/redesign.css` supplies responsive styling and overrides the earlier palette.
- Navigation and footer retain the original product and company routes.
- `/signup` now provides a validated walkthrough-request form that prepares a draft in the visitor's email application. It does not send email automatically or authenticate repository accounts.

The investigation cases and architecture map are explicitly labeled demonstrations. Existing content pages remain; documentation and some resources still use the original coming-soon pages. A live product backend, OAuth, and actual repository analysis are outside this marketing website.

Validation details are in `design-qa.md`.
