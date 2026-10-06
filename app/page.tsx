import BackToTop from "@/components/BackToTop";
import Campaign from "@/components/Campaign";
import ChapterToday from "@/components/ChapterToday";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import SignupSection from "@/components/SignupSection";
import ScrollCrest from "@/components/ScrollCrest";
import StatsBand from "@/components/StatsBand";
import { site } from "@/content/site";
import { crestSrc } from "@/lib/crest";

export default function Home() {
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
      <main id="main">
        <Hero />
        <StatsBand />
        <OurStory />
        <ChapterToday />
        <Events />
        <Campaign />
        <SignupSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
