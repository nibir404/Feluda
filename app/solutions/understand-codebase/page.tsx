import { SolutionTemplate } from "@/components/sections/SolutionTemplate";
import { solutionPages, routes } from "@/lib/content";

export const metadata = {
  title: "Understand a Codebase",
  description:
    "Get answers without searching through the entire system. Feluda helps engineers navigate unfamiliar codebases.",
};

export default function UnderstandCodebasePage() {
  return <SolutionTemplate content={solutionPages[routes.solutions.understandCodebase]} />;
}