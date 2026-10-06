import { stats } from "@/content/site";
import StatGrid from "./StatGrid";

export default function StatsBand() {
  return (
    <section aria-label="Chapter by the numbers" className="bg-footer text-white">
      <StatGrid stats={stats} className="container-site relative z-10 py-12 md:py-16" />
    </section>
  );
}
