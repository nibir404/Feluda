import { SolutionTemplate } from "@/components/sections/SolutionTemplate";
import { CodebaseGraph } from "@/components/product/CodebaseGraph";
import { Container } from "@/components/primitives/Container";
import { solutionPages, routes } from "@/lib/content";

export const metadata = {
  title: "Large & Complex Codebases",
  description:
    "Feluda is built to handle large repositories, monorepos, microservices, and legacy codebases—without simplifying the truth about how they work.",
};

export default function LargeCodebasesPage() {
  return (
    <>
      <SolutionTemplate content={solutionPages[routes.solutions.largeCodebases]} />

      {/* Architecture visualization */}
      <section className="py-20 lg:py-28 border-t border-border-subtle">
        <Container size="wide">
          <div className="max-w-2xl mb-12">
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase mb-4">
              Architecture visualization
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-primary leading-tight">
              Make complexity navigable.
            </h2>
            <p className="mt-4 text-base text-ink-secondary leading-relaxed">
              Feluda handles the relationships that make large systems hard—files, services, contracts, and history.
            </p>
          </div>
          <div className="rounded-lg bg-bg-surface hairline p-8 lg:p-12">
            <CodebaseGraph
              variant="hub"
              nodes={[
                { name: "Monorepo", letter: "M" },
                { name: "Microservices", letter: "S" },
                { name: "Legacy Code", letter: "L" },
                { name: "Shared Libraries", letter: "B" },
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  );
}