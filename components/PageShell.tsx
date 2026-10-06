import type { ReactNode } from "react";
import { site } from "@/content/site";
import { crestSrc } from "@/lib/crest";
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import Header from "./Header";
import ScrollCrest from "./ScrollCrest";

/** Everything every page shares: background crest, header, footer and back-to-top button. */
export default function PageShell({ children }: { children: ReactNode }) {
  const crest = crestSrc();

  return (
    <>
      {crest && <ScrollCrest src={crest} opacity={site.crest.opacity} />}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
