import AlumniSection from "@/components/AlumniSection";
import Campaign from "@/components/Campaign";
import ChapterToday from "@/components/ChapterToday";
import Events from "@/components/Events";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import PageShell from "@/components/PageShell";
import ParentsSection from "@/components/ParentsSection";
import StatsBand from "@/components/StatsBand";

/** The landing page: every section in one scroll. Each also has its own page (see app/story etc.). */
export default function Home() {
  return (
    <PageShell>
      <Hero />
      <StatsBand />
      <OurStory />
      <ChapterToday />
      <ParentsSection />
      {/* The alumni sign-up (Reconnect) form is inside the Alumni section. */}
      <AlumniSection />
      <Events />
      <Campaign />
    </PageShell>
  );
}
