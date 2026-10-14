import { entries } from "@/lib/changelog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const items = entries.filter((e) => e.cat !== "ROADMAP").map((e) => `<item><title>${e.title}</title><link>${site.url}/changelog</link><pubDate>${new Date(e.iso).toUTCString()}</pubDate><description>${e.body}</description></item>`).join("");
  return new Response(`<?xml version="1.0"?><rss version="2.0"><channel><title>Feluda changelog</title><link>${site.url}/changelog</link><description>${site.description}</description>${items}</channel></rss>`, { headers: { "Content-Type": "application/rss+xml" } });
}
