import type { Metadata } from "next";
import { ProductHero, ProofStrip, NextChapter } from "@/components/ui";
import { HeroCard, PRInbox, Analytics, Rules, MemoryIntegrations } from "@/components/review/ReviewParts";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Review — AI pull request review on GitHub and GitLab",
  description: "Every pull request gets a summary, ranked findings, a confidence score and a fix you can commit. On GitHub and GitLab, in under a minute.",
  alternates: { canonical: "/review" },
};

export default function Review() {
  return (
    <>
      <ProductHero eyebrow="CHAPTER 01 · REVIEW · CATCH IT BEFORE MERGE" title="A second pair of eyes that never blinks."
        sub="Every pull request gets a summary, ranked findings, a confidence score and a fix you can commit. On GitHub and GitLab, in under a minute."
        cta="Get Feluda with Puku Team" secondary="Read the docs">
        <HeroCard />
      </ProductHero>
      <ProofStrip items={[["< 60s", "from push to first comment"], ["5 / 5", "confidence score, with reasoning"], ["2", "providers: GitHub and GitLab"], ["4", "configurable review steps"]]} />
      <div id="investigations" className="scroll-mt-24"><PRInbox /></div>
      <Analytics />
      <Rules />
      <MemoryIntegrations />
      <NextChapter href="/attack" label="NEXT · CHAPTER 02" title="Review catches what's in the diff. Attack finds what isn't." />
      <CTA />
    </>
  );
}
