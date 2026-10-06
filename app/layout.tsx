import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Source_Sans_3 } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// "Big Shoulders" is the current Google Fonts name for Big Shoulders Display.
// The opsz axis switches to the display cut automatically at large sizes.
const display = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  axes: ["opsz"],
  // next/font has no metrics for this font yet, so use a plain fallback stack.
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

const body = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

function siteOrigin() {
  // Just the domain, e.g. "https://gachow-07.github.io". Next.js adds the
  // base path itself. Set automatically by the GitHub Pages deploy workflow.
  return process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: site.seo.title,
  description: site.seo.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f4d3a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the script below adds a class to <html> before React loads.
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks the page as JS-enabled so scroll animations may start hidden.
            Without JavaScript, nothing is ever hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
