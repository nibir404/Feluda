import type { Metadata } from "next";
import { AboutHero, Principles, Security, Contact } from "@/components/about/AboutParts";

export const metadata: Metadata = {
  title: "About & Security",
  description: "Why Feluda is named after Satyajit Ray's detective, how it handles your code and access, and how to bring it to your enterprise.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <AboutHero />
      <Principles />
      <Security />
      <Contact />
    </>
  );
}
