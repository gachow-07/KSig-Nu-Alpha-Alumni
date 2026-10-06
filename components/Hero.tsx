import { hero, site, stats } from "@/content/site";
import { asset } from "@/lib/paths";
import KSMark from "./KSMark";
import PhotoFrame from "./PhotoFrame";
import { ArrowRightIcon } from "./Icons";

export default function Hero() {
  const featured = stats[2];

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden bg-surface">
      {/* Decorative background: a soft emerald wash plus a large, faded crest.
          Uses the approved crest image from content/site.ts (site.crestImage);
          until one is added, the ΚΣ letters stand in. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-b from-emerald-tint/70 to-surface">
        {site.crestImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- decorative backdrop, served as-is
          <img
            src={asset(site.crestImage)}
            alt=""
            className="absolute left-1/2 top-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.08] lg:left-[58%]"
          />
        ) : (
          <KSMark className="absolute left-1/2 top-1/2 h-auto w-[min(820px,130vw)] -translate-x-1/2 -translate-y-1/2 text-emerald opacity-[0.045] lg:left-[58%]" />
        )}
      </div>

      <div className="container-site relative grid items-center gap-12 pb-16 pt-12 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-heading" className="heading mt-5 text-[clamp(2.75rem,6.5vw,5rem)] text-emerald">
            {hero.headline} <span className="text-scarlet">{hero.headlineAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">{hero.intro}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-secondary">
              {hero.secondaryCta.label}
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative">
          <PhotoFrame
            photo={hero.photo}
            sizes="(min-width: 1024px) 560px, calc(100vw - 40px)"
            priority
            className="soft-shadow aspect-[4/3] rounded-[28px]"
          />
          {featured && (
            <div className="soft-shadow absolute -bottom-6 left-4 flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4 sm:-left-6">
              <span aria-hidden="true" className="h-10 w-1.5 rounded-full bg-scarlet" />
              <div>
                <p className="heading text-2xl text-emerald">{featured.value}</p>
                <p className="text-sm text-muted">{featured.label}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
