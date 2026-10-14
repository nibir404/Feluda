import type { Metadata } from "next";
import QuickStart from "@/components/docs/QuickStart";

export const metadata: Metadata = {
  title: "Docs — Quick start",
  description: "Your first Feluda case in five steps: continue with Puku, connect GitHub or GitLab, pick repositories and open a pull request.",
  alternates: { canonical: "/docs" },
};

export default function Docs() {
  return <QuickStart />;
}
