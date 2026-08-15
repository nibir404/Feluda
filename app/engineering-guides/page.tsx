import { ComingSoon } from "@/components/primitives/ComingSoon";

export const metadata = {
  title: "Engineering Guides",
  description:
    "Practical guides for engineering teams—on investigating, reviewing, and understanding complex codebases.",
};

export default function EngineeringGuidesPage() {
  return (
    <ComingSoon
      eyebrow="RESOURCES / ENGINEERING GUIDES"
      title="Engineering guides"
      description="Practical, in-depth guides for engineering teams adopting Feluda or deepening their codebase-intelligence practice."
    />
  );
}