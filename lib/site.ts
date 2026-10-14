export const site = {
  name: "Feluda",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tem43n.funchole.dev",
  tagline: "The detective in your pull requests.",
  description:
    "Feluda is Puku's AI code reviewer and agentic pentester. It investigates every pull request on GitHub and GitLab, follows the trace to root cause, and attacks your running app before anyone else does. Included with Puku Team and Enterprise.",
};

export const nav = [
  {
    label: "Review",
    href: "/review",
    chapter: "Ch. 01",
    items: [
      { label: "PR investigations", href: "/review#investigations", note: "Root cause, not lint" },
      { label: "Confidence scoring", href: "/review#confidence", note: "Only what matters" },
      { label: "Team analytics", href: "/review#analytics", note: "Where bugs come from" },
    ],
  },
  {
    label: "Attack",
    href: "/attack",
    chapter: "Ch. 02",
    items: [
      { label: "Agentic pentests", href: "/attack#wizard", note: "Scope, launch, report" },
      { label: "Findings & fixes", href: "/attack#findings", note: "Exploit-verified" },
      { label: "Coverage", href: "/attack#coverage", note: "OWASP mapped" },
    ],
  },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
] as const;

export const footerCols = [
  { title: "Product", links: [["Review", "/review"], ["Attack", "/attack"], ["How it works", "/how-it-works"], ["Pricing", "/pricing"]] },
  { title: "Developers", links: [["Docs", "/docs"], ["Changelog", "/changelog"], ["Status", "/about#security"], ["llms.txt", "/llms.txt"]] },
  { title: "Company", links: [["About", "/about"], ["Security", "/about#security"], ["Puku", "https://puku.sh"]] },
] as const;
