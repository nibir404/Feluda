import { ComingSoon } from "@/components/primitives/ComingSoon";

export const metadata = {
  title: "Blog",
  description:
    "Engineering writing from the Feluda team—on codebase intelligence, AI-native development, and engineering productivity.",
};

export default function BlogPage() {
  return (
    <ComingSoon
      eyebrow="RESOURCES / BLOG"
      title="Feluda blog"
      description="Engineering writing on codebase intelligence, AI-native development, code review, software architecture, and engineering productivity."
    />
  );
}