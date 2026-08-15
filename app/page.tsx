import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Understand } from "@/components/sections/Understand";
import { Investigate } from "@/components/sections/Investigate";
import { Analyze } from "@/components/sections/Analyze";
import { Review } from "@/components/sections/Review";
import { Workflows } from "@/components/sections/Workflows";
import { Integrations } from "@/components/sections/Integrations";
import { Enterprise } from "@/components/sections/Enterprise";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Understand />
      <Investigate />
      <Analyze />
      <Review />
      <Workflows />
      <Integrations />
      <Enterprise />
      <FinalCTA />
    </>
  );
}