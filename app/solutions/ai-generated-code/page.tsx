import { SolutionTemplate } from "@/components/sections/SolutionTemplate";
import { solutionPages, routes } from "@/lib/content";

export const metadata = {
  title: "AI-Generated Code",
  description:
    "As AI coding increases, review volume rises and context becomes more important. Feluda helps teams govern AI-authored changes.",
};

export default function AiGeneratedCodePage() {
  return <SolutionTemplate content={solutionPages[routes.solutions.aiGeneratedCode]} />;
}