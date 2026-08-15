import { SolutionTemplate } from "@/components/sections/SolutionTemplate";
import { solutionPages, routes } from "@/lib/content";

export const metadata = {
  title: "Onboard Engineers",
  description:
    "Help new engineers understand before they change. Feluda makes the codebase itself answerable.",
};

export default function OnboardEngineersPage() {
  return <SolutionTemplate content={solutionPages[routes.solutions.onboardEngineers]} />;
}