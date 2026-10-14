import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { RoomsSvg, Intake, InvestigateResolve, DataHandling } from "@/components/how/HowParts";
import { NextChapter, wrap } from "@/components/ui";
import CTA from "@/components/CTA";
import Reveal from "@/components/HeroReveal";

export const metadata: Metadata = {
  title: "How it works — from a push to a verdict",
  description: "Feluda reads the whole case file — your diff, your codebase and your production evidence — forms hypotheses, proves them, and only sends you the conclusion.",
  alternates: { canonical: "/how-it-works" },
};

export default function How() {
  const svg = fs.readFileSync(path.join(process.cwd(), "lib/rooms.svg"), "utf8").replace(' width="1248" height="560"', ' role="img" aria-label="Three isometric rooms: observe, investigate, resolve"');
  return (
    <>
      <section className="overflow-hidden">
        <div className={`${wrap} flex flex-col items-center gap-6 pt-36 text-center md:pt-[202px]`}>
          <Reveal>
            <p className="font-mono text-[12px] leading-4 tracking-[0.16em] text-accent">THE METHOD · HOW FELUDA WORKS A CASE</p>
            <h1 className="mx-auto mt-6 max-w-[1000px] text-[clamp(48px,6.7vw,96px)] font-semibold leading-[0.96] tracking-[-0.055em]">From a push to a verdict, in five layers.</h1>
            <p className="mx-auto mt-6 max-w-[620px] text-[18px] leading-[28px] text-[#C9CBBF] md:text-[19px] md:leading-[30px]">Feluda doesn&apos;t lint lines. It reads the whole case file: your diff, your codebase and your production evidence.</p>
          </Reveal>
        </div>
        <div className={`${wrap} pb-16 pt-8 md:pt-16`}><RoomsSvg svg={svg} /></div>
      </section>
      <div className="border-t border-border"><Intake /></div>
      <InvestigateResolve />
      <DataHandling />
      <NextChapter tone="accent" href="/pricing" label="NEXT · EPILOGUE" title="Retain the detective with Puku Team." />
      <CTA />
    </>
  );
}
