import fs from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import { hero } from "@/content/site";
import { asset } from "@/lib/paths";
import PhotoFrame from "./PhotoFrame";

/** The crest path if its file was uploaded to public/ (checked when the site is built). */
function crestSrc(): string | null {
  const src = hero.crest.src;
  if (!src) return null;
  return fs.existsSync(path.join(process.cwd(), "public", src)) ? src : null;
}

/** Delay for the on-load entrance, 100ms apart. */
const enter = (step: number) => ({ "--enter-delay": `${step * 100}ms` }) as CSSProperties;

export default function Hero() {
  const crest = crestSrc();

  return (
    // isolate + overflow-hidden keep the crest inside the hero and behind its content.
    <section id="top" aria-labelledby="hero-heading" className="on-dark relative isolate overflow-hidden bg-primary text-white">
      <div className="container-site relative pt-14 md:pt-24">
        {crest && (
          // Approved crest, faded in the background beside the headline (hero only).
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-6 -z-10 select-none md:top-12 lg:right-10 lg:top-16"
            style={{ opacity: hero.crest.opacity }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative, served as uploaded */}
            <img
              src={asset(crest)}
              alt=""
              className="animate-enter h-[220px] w-auto sm:h-[300px] md:h-[380px] lg:h-[440px]"
              style={enter(3)}
            />
          </div>
        )}
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
