import Campaign from "@/components/Campaign";
import ChapterToday from "@/components/ChapterToday";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Involvement from "@/components/Involvement";
import OurStory from "@/components/OurStory";
import SignupSection from "@/components/SignupSection";
import StatsBand from "@/components/StatsBand";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-ink focus:shadow-lg"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <StatsBand />
        <OurStory />
        <ChapterToday />
        <Involvement />
        <Events />
        <Campaign />
        <SignupSection />
      </main>
      <Footer />
    </>
  );
}
