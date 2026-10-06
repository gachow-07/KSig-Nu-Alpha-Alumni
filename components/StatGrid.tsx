import type { Stat } from "@/content/site";
import CountUp from "./motion/CountUp";
import Reveal from "./motion/Reveal";

/**
 * The big-number stat row (white text on dark green). Used by the stats band
 * under the hero and by the Parents & Families section.
 */
export default function StatGrid({ stats, className = "" }: { stats: Stat[]; className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 ${className}`}>
      {stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 100} className="flex flex-col-reverse gap-2">
          <dt className="text-sm font-semibold uppercase tracking-[0.1em] text-on-dark-muted">{stat.label}</dt>
          <dd className="display text-[clamp(2.5rem,6vw,4.5rem)] leading-none [overflow-wrap:anywhere]">
            <CountUp value={stat.value} />
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
