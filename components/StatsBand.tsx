import { stats } from "@/content/site";
import CountUp from "./motion/CountUp";
import Reveal from "./motion/Reveal";

export default function StatsBand() {
  return (
    <section aria-label="Chapter by the numbers" className="bg-footer text-white">
      <dl className="container-site relative z-10 grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4 md:py-16">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 100} className="flex flex-col-reverse gap-2">
            <dt className="text-sm font-semibold uppercase tracking-[0.1em] text-on-dark-muted">
              {stat.label}
            </dt>
            <dd className="display text-[clamp(2.5rem,6vw,4.5rem)] leading-none [overflow-wrap:anywhere]">
              <CountUp value={stat.value} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
