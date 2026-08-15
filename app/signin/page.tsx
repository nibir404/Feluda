import Link from "next/link";
import { Github } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { authPageContent, routes } from "@/lib/content";

export const metadata = {
  title: "Sign in",
  description: "Sign in to Feluda.",
};

export default function SignInPage() {
  const { signin } = authPageContent;
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-24">
      <Container size="narrow">
        <div className="max-w-md mx-auto text-center">
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase mb-4">
            {signin.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary leading-tight">
            {signin.headline}
          </h1>
          <p className="mt-4 text-base text-ink-secondary leading-relaxed">
            {signin.supporting}
          </p>

          <div className="mt-10 rounded-lg bg-bg-surface hairline p-6 text-left">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-md bg-bg-base hairline text-ink-primary hover:bg-bg-raised hover:border-border-strong transition-colors focus-ring font-medium text-sm"
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
              SSO &amp; SAML available on enterprise plans.
            </p>
          </div>

          <p className="mt-8 text-sm text-ink-secondary">
            New to Feluda?{" "}
            <Link
              href={routes.auth.signup}
              className="text-accent hover:underline"
            >
              Start with Feluda →
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}