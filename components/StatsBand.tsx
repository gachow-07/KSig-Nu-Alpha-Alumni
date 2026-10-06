import { stats } from "@/content/site";

export default function StatsBand() {
  return (
    <section aria-label="Chapter by the numbers" className="bg-surface pb-4 pt-6 md:pt-2">
      <div className="container-site">
        <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-surface-alt md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse gap-1 px-6 py-7 md:px-8 md:py-9 ${
                i % 2 === 1 ? "border-l border-line" : ""
              } ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
            >
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="heading text-[clamp(1.75rem,3.5vw,2.5rem)] text-emerald [overflow-wrap:anywhere]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
