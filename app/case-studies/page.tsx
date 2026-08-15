import { ComingSoon } from "@/components/primitives/ComingSoon";

export const metadata = {
  title: "Case Studies",
  description: "How engineering teams use Feluda in production.",
};

export default function CaseStudiesPage() {
  return (
    <ComingSoon
      eyebrow="RESOURCES / CASE STUDIES"
      title="Feluda case studies"
      description="Detailed case studies of engineering teams using Feluda to investigate faster, review with context, and ship with confidence."
    />
  );
}