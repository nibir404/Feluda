import { SolutionTemplate } from "@/components/sections/SolutionTemplate";
import { Review } from "@/components/sections/Review";
import { solutionPages, routes } from "@/lib/content";

export const metadata = {
  title: "Review Pull Requests",
  description:
    "Review every pull request with full system context. Feluda gives reviewers the information they need to decide.",
};

export default function ReviewPullRequestsPage() {
  return (
    <>
      <SolutionTemplate content={solutionPages[routes.solutions.reviewPullRequests]} />
      <Review />
    </>
  );
}