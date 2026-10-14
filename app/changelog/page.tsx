import type { Metadata } from "next";
import Changelog from "@/components/changelog/Changelog";

export const metadata: Metadata = {
  title: "Changelog — the case log",
  description: "What's new in Feluda: agentic pentests, GitLab support, analytics export and what's coming next.",
  alternates: { canonical: "/changelog", types: { "application/rss+xml": "/changelog/rss.xml" } },
};

export default function Page() {
  return <Changelog />;
}
