export type DocPage = {
  slug: string;
  group: string;
  title: string;
  heading: string;
  minutes: number;
  intro: string;
  widget?: string;
  sections: { id: string; title: string; body: string; code?: { file: string; lang: string; lines: string[]; hl?: number } }[];
  tip?: string;
};

export const groups = ["GET STARTED", "REVIEW", "ATTACK", "HELP"] as const;

export const docs: DocPage[] = [
  { slug: "quick-start", group: "GET STARTED", title: "Quick start", heading: "Your first case in five steps.", minutes: 4, intro: "", sections: [] },
  {
    slug: "team-requirements", group: "GET STARTED", title: "Puku Team requirements", heading: "Feluda lives inside Puku Team.", minutes: 2, widget: "plan",
    intro: "Feluda Review and Attack are included in Puku Team and Enterprise. There is no separate subscription or seat to buy.",
    sections: [
      { id: "plans", title: "Which plans include Feluda", body: "Team and Enterprise workspaces get Review on every pull request and Attack for pentests, AI code analysis and attack-surface monitoring. Free and Pro keep Puku's core workspace." },
      { id: "roles", title: "Who can turn it on", body: "Any workspace owner can enable Feluda. Connecting GitHub or GitLab needs an org admin once; after that every member sees reviews on their pull requests." },
    ],
  },
  {
    slug: "connect-provider", group: "GET STARTED", title: "Connect a provider", heading: "Connect GitHub or GitLab.", minutes: 3, widget: "scopes",
    intro: "Install the Feluda GitHub App, or authorize GitLab with OAuth. Access is limited to the repositories you pick.",
    sections: [
      { id: "github", title: "GitHub App", body: "Install the app on your organization, choose all or selected repositories, and you're returned to Puku automatically. You can install it on more than one org; all of them appear under one workspace." },
      { id: "gitlab", title: "GitLab and self-hosted GitLab", body: "Authorize with OAuth on gitlab.com. For self-hosted GitLab (Enterprise), add your instance URL and an application ID in Puku settings.", code: { file: "settings", lang: "yaml", lines: ["gitlab:", "  url: https://git.acme.internal", "  application_id: <from GitLab admin>"] } },
    ],
  },
  {
    slug: "pr-analysis", group: "REVIEW", title: "PR analysis", heading: "What Feluda posts on a pull request.", minutes: 3, widget: "analysis",
    intro: "Every review is one comment with up to four sections. Turn sections on or off and the preview updates.",
    sections: [
      { id: "sections", title: "The four sections", body: "PR Summary explains the change. Sequence Diagrams show how it flows between services. The Issue Table ranks the files that matter. The Confidence Score rates merge safety out of 5, with reasoning." },
      { id: "inline", title: "Inline findings", body: "Each finding is also posted on the exact line, with a suggested fix you can commit in one click." },
    ],
  },
  {
    slug: "comment-scope", group: "REVIEW", title: "Comment scope", heading: "Decide how loud the detective gets.", minutes: 2, widget: "scope",
    intro: "Scope sets the severity a finding must clear before it becomes a comment. Drag the slider to replay the setting on your last 30 pull requests.",
    sections: [
      { id: "levels", title: "Low, medium, high", body: "Low comments only on the most severe findings. Medium is balanced and skips most P2s. High includes everything, including nitpicks.", code: { file: ".feluda.yml", lang: "yaml", lines: ["review:", "  scope: medium   # low | medium | high"], hl: 2 } },
    ],
  },
  {
    slug: "commit-behavior", group: "REVIEW", title: "Commit behavior", heading: "What happens on new commits.", minutes: 2, widget: "commit",
    intro: "Control whether Feluda re-reviews on every push and whether it edits the pull request description.",
    sections: [
      { id: "retrigger", title: "Retrigger on push", body: "When enabled, each push to an open pull request gets a fresh review, and Feluda resolves its own threads that the new commit fixed." },
      { id: "ignore", title: "Ignoring paths", body: "Paths in ignore are never reviewed and never billed. Docs-only and test-only changes are free by default." },
    ],
  },
  {
    slug: "analytics-export", group: "REVIEW", title: "Analytics & export", heading: "Export what the detective found.", minutes: 2, widget: "export",
    intro: "Analytics show reviews, merge time and bugs caught by severity. Export as CSV or JSON, or pull it from the API.",
    sections: [{ id: "api", title: "Analytics API", body: "Use a Puku token with analytics:read. Ranges are 7d, 30d, 90d or all." }],
  },
  {
    slug: "run-pentest", group: "ATTACK", title: "Run a pentest", heading: "Point it at staging. That's the setup.", minutes: 4, widget: "pentest",
    intro: "Pick a target type, confirm the base URL, add code context and the paths agents must never touch. You'll see the request estimate before launch.",
    sections: [
      { id: "targets", title: "Targets", body: "Web apps, APIs, Android apps, MCP servers and AI / LLM features. Ownership is verified through your deployment provider." },
      { id: "safety", title: "Safety rails", body: "Never-touch paths are honored, runs are paced across your 5h and weekly windows, and safe mode pauses automatically on 5xx spikes." },
    ],
  },
  {
    slug: "ai-code-analysis", group: "ATTACK", title: "AI code analysis", heading: "A security audit of the code itself.", minutes: 2, widget: "meter",
    intro: "Select repositories and docs; Feluda shows the exact request cost before you start. Docs context makes audits cheaper.",
    sections: [{ id: "results", title: "Where results land", body: "Findings appear in Pull Requests as draft fixes and in Slack as a digest." }],
  },
  {
    slug: "attack-surface", group: "ATTACK", title: "Attack surface", heading: "Everything you expose to the internet.", minutes: 2, widget: "surface",
    intro: "Daily monitoring for subdomain takeovers, leaked credentials, exposed ports and spoofable mail. Try the sandbox scan below.",
    sections: [{ id: "actions", title: "One action per issue", body: "Every surface finding comes with the single action that fixes it: remove a DNS record, force a reset, close a port, or copy a DNS record." }],
  },
  {
    slug: "reports-compliance", group: "ATTACK", title: "Reports & compliance", heading: "Reports your auditor will accept.", minutes: 2, widget: "compliance",
    intro: "Every assessment produces a white-box report mapped to SOC 2, ISO 27001 and PCI controls.",
    sections: [{ id: "evidence", title: "Evidence", body: "Each control lists what was tested, the requests used, and the open or resolved findings that map to it." }],
  },
  {
    slug: "troubleshooting", group: "HELP", title: "Troubleshooting", heading: "When the detective can't get in.", minutes: 3, widget: "decoder",
    intro: "Pick the error you're seeing to get the exact fix.",
    sections: [
      { id: "install", title: "Missing installation", body: "The GitHub App isn't installed on the org that owns the repository. An org owner installs it, then you retry." },
      { id: "access", title: "Access denied", body: "The app is installed but the repository isn't selected. Add it under the app's repository access." },
      { id: "plan", title: "Paid plan required", body: "The workspace is on Free or Pro. Upgrade to Puku Team to enable Feluda." },
    ],
  },
  {
    slug: "requests-limits", group: "HELP", title: "Requests & limits", heading: "How requests are counted.", minutes: 2, widget: "limits",
    intro: "Every review and assessment draws from your plan's monthly requests. Adjust the sliders to size your month.",
    sections: [{ id: "pause", title: "Pausing at the limit", body: "Runs pause safely at 90% of your monthly requests. Docs-only and test-only changes are never billed." }],
  },
  {
    slug: "faq", group: "HELP", title: "FAQ", heading: "Frequently asked questions.", minutes: 3,
    intro: "Short answers to what teams ask before and after turning Feluda on.",
    sections: [
      { id: "standalone", title: "Can I buy Feluda on its own?", body: "No. Feluda is part of Puku Team and Enterprise." },
      { id: "two-orgs", title: "Can I connect two GitHub orgs?", body: "Yes. Install the app on each org; both appear under one Puku workspace." },
      { id: "training", title: "Is my code used for training?", body: "[To confirm with security] Retention window and model-training policy." },
    ],
  },
];

export const bySlug = (s: string) => docs.find((d) => d.slug === s);
export const neighbors = (s: string) => {
  const i = docs.findIndex((d) => d.slug === s);
  return { prev: docs[i - 1], next: docs[i + 1] };
};

export type PaletteItem = { kind: "ERR" | "DOC" | "WIDGET" | "RUN" | "ASK"; title: string; sub: string; href: string; group: "Errors" | "Pages" | "Settings" | "Actions" };
export const paletteItems: PaletteItem[] = [
  { kind: "ERR", title: "Missing installation", sub: "Troubleshooting › GitHub App not installed on this org", href: "/docs/troubleshooting#install", group: "Errors" },
  { kind: "ERR", title: "Access denied", sub: "Troubleshooting › Repository not selected", href: "/docs/troubleshooting#access", group: "Errors" },
  { kind: "ERR", title: "Paid plan required", sub: "Troubleshooting › Workspace is on Free or Pro", href: "/docs/troubleshooting#plan", group: "Errors" },
  ...docs.map((d) => ({ kind: "DOC" as const, title: d.title, sub: `${d.group[0] + d.group.slice(1).toLowerCase()} › ${d.heading}`, href: d.slug === "quick-start" ? "/docs" : `/docs/${d.slug}`, group: "Pages" as const })),
  { kind: "WIDGET", title: "Error decoder", sub: "Troubleshooting › interactive", href: "/docs/troubleshooting", group: "Pages" },
  { kind: "WIDGET", title: "Request estimator", sub: "Requests & limits › interactive", href: "/docs/requests-limits", group: "Pages" },
  { kind: "WIDGET", title: "Comment scope slider", sub: "Comment scope › interactive", href: "/docs/comment-scope", group: "Settings" },
  { kind: "WIDGET", title: ".feluda.yml validator", sub: "Commit behavior › interactive", href: "/docs/commit-behavior", group: "Settings" },
  { kind: "RUN", title: "Open GitHub App installer", sub: "Jumps straight to step 3 in the app", href: "/docs#step-3", group: "Actions" },
  { kind: "RUN", title: "Start a pentest", sub: "Opens Attack › Launch in the app", href: "/attack#finding", group: "Actions" },
];
