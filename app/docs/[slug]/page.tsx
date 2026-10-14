import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bySlug, docs } from "@/lib/docs";
import { DocArticle } from "@/components/docs/Article";

export function generateStaticParams() {
  return docs.filter((d) => d.slug !== "quick-start").map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug);
  return p ? { title: `Docs — ${p.title}`, description: p.intro, alternates: { canonical: `/docs/${p.slug}` } } : {};
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!bySlug(slug) || slug === "quick-start") notFound();
  return <DocArticle slug={slug} />;
}
