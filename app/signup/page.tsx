import Link from "next/link";
import { Github } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { authPageContent, routes } from "@/lib/content";

export const metadata = {
  title: "Start with Feluda",
  description: "Connect a repository and start building context in minutes.",
};

export default function SignUpPage() {
  const { signup } = authPageContent;
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-24">
      <Container size="narrow">
        <div className="max-w-md mx-auto text-center">
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase mb-4">
            {signup.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary leading-tight">
            {signup.headline}
          </h1>
          <p className="mt-4 text-base text-ink-secondary leading-relaxed">
            {signup.supporting}
          </p>

          <div className="mt-10 rounded-lg bg-bg-surface hairline p-6 text-left">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-md bg-accent text-on-accent hover:bg-accent/90 transition-colors focus-ring font-medium text-sm"
            >
              <Github className="w-4 h-4" strokeWidth={1.75} />
              Continue with GitHub
            </button>
            <button
              type="button"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-md bg-bg-base hairline text-ink-primary hover:bg-bg-raised hover:border-border-strong transition-colors focus-ring font-medium text-sm"
            >
              Continue with GitLab
            </button>
            <button
              type="button"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-md bg-bg-base hairline text-ink-primary hover:bg-bg-raised hover:border-border-strong transition-colors focus-ring font-medium text-sm"
            >
              Continue with Bitbucket
            </button>
            <button
              type="button"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-md bg-bg-base hairline text-ink-primary hover:bg-bg-raised hover:border-border-strong transition-colors focus-ring font-medium text-sm"
            >
              Continue with Email
            </button>
            <p className="mt-5 text-xs text-ink-tertiary text-center">
              By continuing, you agree to Feluda's Terms and Privacy.
            </p>
          </div>

          <p className="mt-8 text-sm text-ink-secondary">
            Already have an account?{" "}
            <Link
              href={routes.auth.signin}
              className="text-accent hover:underline"
            >
              Sign in →
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}