import { SolutionTemplate } from "@/components/sections/SolutionTemplate";
import { Investigate } from "@/components/sections/Investigate";
import { solutionPages, routes } from "@/lib/content";

export const metadata = {
  title: "Investigate Bugs & Incidents",
  description:
    "Start with the symptom, follow the evidence. Feluda connects changes, dependencies, and system behavior to investigate incidents.",
};

export default function InvestigateBugsPage() {
  return (
    <>
      <SolutionTemplate content={solutionPages[routes.solutions.investigateBugs]} />
      <Investigate />
    </>
  );
}