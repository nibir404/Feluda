import type { Metadata } from "next";
import Roadmap from "@/components/roadmap/Roadmap";

export const metadata: Metadata = {
  title: "Roadmap — the case board",
  description: "What Feluda does today and what's next: PR review, agentic pentests, attack surface, and upcoming secrets, dependency and IaC scanning.",
  alternates: { canonical: "/roadmap" },
};

export default function Page() {
  return <Roadmap />;
}
