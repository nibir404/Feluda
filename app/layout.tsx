import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Feluda — Codebase Intelligence for Engineering Teams",
    template: "%s · Feluda",
  },
  description:
    "Feluda understands your entire codebase, investigates how and why things happen, and analyzes changes in the context of the whole system.",
  icons: {
    icon: [
      { url: "/Favicon.png", type: "image/png", sizes: "any" },
    ],
    apple: [{ url: "/Favicon.png", type: "image/png", sizes: "any" }],
    shortcut: ["/Favicon.png"],
  },
  openGraph: {
    title: "Feluda — Codebase Intelligence for Engineering Teams",
    description:
      "Feluda understands your entire codebase, investigates how and why things happen, and analyzes changes in the context of the whole system.",
    type: "website",
    images: [{ url: "/Favicon.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feluda — Codebase Intelligence",
    description:
      "Feluda understands your entire codebase, investigates how and why things happen, and analyzes changes in the context of the whole system.",
    images: ["/Favicon.png"],
  },
};

// Anti-FOUC script: runs synchronously before React hydration.
// Paper is the default canvas; only opt out to charcoal workspace
// when the OS explicitly prefers light (paper) OR the user has
// explicitly chosen dark mode.
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('feluda-theme');
    var mode = stored || 'system';
    var resolved = mode;
    if (mode === 'system') {
      // Paper is the default. Honor an explicit OS *light* preference
      // (paper); otherwise resolve to charcoal workspace.
      resolved = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    root.dataset.themeMode = mode;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg-base text-ink-primary antialiased font-sans relative">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-on-accent focus:font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-base focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Navigation />
          <main id="main" tabIndex={-1} className="outline-none relative">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}