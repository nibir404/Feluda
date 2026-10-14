import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { docs } from "@/lib/docs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/review", "/attack", "/how-it-works", "/pricing", "/docs", "/changelog", "/roadmap", "/about"];
  return [
    ...pages.map((p) => ({ url: site.url + p, lastModified: new Date("2026-10-10"), priority: p === "" ? 1 : 0.8 })),
    ...docs.filter((d) => d.slug !== "quick-start").map((d) => ({ url: `${site.url}/docs/${d.slug}`, lastModified: new Date("2026-10-10"), priority: 0.6 })),
  ];
}
