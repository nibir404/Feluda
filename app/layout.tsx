import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-tx", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — AI code review & agentic pentests`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ["AI code review", "pull request review", "agentic pentest", "GitHub code review", "GitLab merge request review", "root cause analysis", "Puku"],
  openGraph: { type: "website", url: site.url, siteName: site.name, title: site.name, description: site.description },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#151614", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${site.url}#org`, name: "Puku", url: "https://puku.sh" },
    {
      "@type": "SoftwareApplication",
      name: site.name,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      description: site.description,
      publisher: { "@id": `${site.url}#org` },
      offers: { "@type": "Offer", category: "Included with Puku Team and Enterprise plans" },
      featureList: [
        "AI pull request review on GitHub and GitLab",
        "Root-cause investigation with confidence scoring",
        "Agentic penetration testing with exploit-verified findings",
        "Team analytics",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] btn btn-primary">Skip to content</a>
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
