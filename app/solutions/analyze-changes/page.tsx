import { SolutionTemplate } from "@/components/sections/SolutionTemplate";
import { Analyze } from "@/components/sections/Analyze";
import { solutionPages, routes } from "@/lib/content";

export const metadata = {
  title: "Analyze Change Impact",
  description:
    "See what a change can affect before it ships. Feluda analyzes PRs in the context of the wider system.",
};

export default function AnalyzeChangesPage() {
  return (
    <>
      <SolutionTemplate content={solutionPages[routes.solutions.analyzeChanges]} />
      <Analyze />
    </>
  );
}