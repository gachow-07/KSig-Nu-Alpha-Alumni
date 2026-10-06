import type { CSSProperties } from "react";
import { hero } from "@/content/site";
import PhotoFrame from "./PhotoFrame";

/** Delay for the on-load entrance, 100ms apart. */
const enter = (step: number) => ({ "--enter-delay": `${step * 100}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="on-dark bg-primary text-white">
      <div className="container-site pt-14 md:pt-24">
        <p className="eyebrow animate-enter text-on-dark-muted!" style={enter(0)}>
          {hero.eyebrow}
        </p>
        <h1
          id="hero-heading"
          className="display animate-enter mt-5 text-[clamp(4rem,11vw,10rem)] leading-[0.85]"
          style={enter(1)}
        >
          <span className="block">{hero.headlineLine1}</span>
          <span className="block">{hero.headlineLine2}</span>
        </h1>
        <p className="animate-enter mt-7 max-w-2xl text-lg text-white/90 md:text-xl" style={enter(2)}>
          {hero.intro}
        </p>
        <div className="animate-enter mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4" style={enter(3)}>
          <a href={hero.primaryCta.href} className="btn btn-primary">
            {hero.primaryCta.label}
          </a>
          <a href={hero.secondaryCta.href} className="btn btn-outline">
            {hero.secondaryCta.label}
          </a>
        </div>

        <PhotoFrame
          photo={hero.photo}
          sizes="(min-width: 1240px) 1192px, calc(100vw - 48px)"
          priority
          dark
          className="mt-12 aspect-[4/3] rounded-t-xl sm:aspect-[16/9] md:mt-16 lg:aspect-[21/9]"
        />
      </div>
    </section>
  );
}
