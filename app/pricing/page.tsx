import type { Metadata } from "next";
import { Plans, Estimator, RequestMath, FAQ } from "@/components/pricing/PricingParts";
import { faqs } from "@/lib/faqs";
import { wrap } from "@/components/ui";
import CTA from "@/components/CTA";
import HeroReveal from "@/components/HeroReveal";

export const metadata: Metadata = {
  title: "Pricing — included with Puku Team and Enterprise",
  description: "Feluda has no separate subscription. Review and Attack are included in Puku Team and Enterprise, and every run draws from your plan's monthly requests.",
  alternates: { canonical: "/pricing" },
};

const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };

export default function Pricing() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <section>
        <div className={`${wrap} flex flex-col items-center pb-16 pt-36 text-center md:pt-[218px]`}>
          <HeroReveal>
            <p className="font-mono text-[12px] leading-4 tracking-[0.16em] text-accent">EPILOGUE · RETAIN THE DETECTIVE</p>
            <h1 className="mx-auto mt-6 max-w-[1000px] text-[clamp(48px,6.7vw,96px)] font-semibold leading-[0.96] tracking-[-0.055em]">Feluda comes with Puku Team and Enterprise.</h1>
            <p className="mx-auto mt-6 max-w-[640px] text-[18px] leading-[28px] text-[#C9CBBF] md:text-[19px] md:leading-[30px]">No separate subscription. Review and Attack are included in your Puku plan, and every run draws from your plan&apos;s monthly requests.</p>
          </HeroReveal>
        </div>
      </section>
      <Plans />
      <Estimator />
      <RequestMath />
      <FAQ />
      <CTA />
    </>
  );
}
