import Hero from "@/components/home/Hero";
import Crime from "@/components/home/Crime";
import CaseFile from "@/components/home/CaseFile";
import PRScroll from "@/components/home/PRScroll";
import Engine from "@/components/home/Engine";
import LiveReview from "@/components/home/LiveReview";
import Configure from "@/components/home/Configure";
import AttackTeaser from "@/components/home/AttackTeaser";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Crime />
      <CaseFile />
      <PRScroll />
      <Engine />
      <LiveReview />
      <Configure />
      <AttackTeaser />
      <CTA />
    </>
  );
}
