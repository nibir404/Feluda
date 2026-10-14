import type { Metadata } from "next";
import { ProductHero, ProofStrip, NextChapter } from "@/components/ui";
import { ReportStack, Launch, Finding, CodeAnalysis, Surface } from "@/components/attack/AttackParts";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Attack — agentic penetration testing",
  description: "AI agents map your app, form attack hypotheses, prove what's exploitable on staging, and hand you the fix. Reports are SOC 2 and ISO ready.",
  alternates: { canonical: "/attack" },
};

export default function Attack() {
  return (
    <>
      <ProductHero tone="danger" eyebrow="CHAPTER 02 · ATTACK · CATCH WHAT REVIEW CAN'T SEE" title="Think like the intruder. Fix like the owner."
        sub="AI agents map your app, form attack hypotheses, prove what's exploitable on staging, and hand you the fix. Reports are SOC 2 and ISO ready."
        cta="Get Feluda with Puku Team" secondary="See a sample report" secondaryHref="#finding" halo>
        <ReportStack />
      </ProductHero>
      <ProofStrip items={[["402", "agents per assessment"], ["5", "targets: web, API, Android, MCP, LLM"], ["0", "false positives reported as exploits"], ["Daily", "attack-surface monitoring"]]} />
      <Launch />
      <div id="finding" className="scroll-mt-20"><Finding /></div>
      <CodeAnalysis />
      <Surface />
      <NextChapter tone="accent" href="/how-it-works" label="NEXT · THE METHOD" title="See how the detective works a case, step by step." />
      <CTA />
    </>
  );
}
