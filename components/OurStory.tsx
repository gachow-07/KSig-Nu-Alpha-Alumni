import type { CSSProperties } from "react";
import { story } from "@/content/site";
import Reveal from "./motion/Reveal";

export default function OurStory() {
  const lastIndex = story.timeline.length - 1;

  return (
    <section id="story" aria-labelledby="story-heading" className="section-pad bg-surface">
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">{story.eyebrow}</p>
          <h2 id="story-heading" className="section-heading mt-4">
            {story.heading}
          </h2>
          <div className="mt-6 space-y-5 text-muted">
            {story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* timeline-line draws the 2px line over the list's (transparent) left border so it can grow downward. */}
        <Reveal as="ol" direction="none" className="timeline-line relative ml-2 border-l-2 border-transparent lg:mt-4">
          {story.timeline.map((entry, i) => (
            <li
              key={`${entry.year}-${i}`}
              data-anim="fade-up"
              style={{ "--delay": `${150 + i * 120}ms` } as CSSProperties}
              className="relative pb-10 pl-8 last:pb-0"
            >
              <span
                aria-hidden="true"
                data-anim="pop"
                className={`absolute -left-[9px] top-2 h-4 w-4 rounded-full ring-4 ring-surface ${
                  i === lastIndex ? "bg-accent" : "bg-primary"
                }`}
              />
              <p className="display text-4xl leading-none text-primary">{entry.year}</p>
              <h3 className="mt-2 text-lg font-bold">{entry.title}</h3>
              <p className="mt-1 text-muted">{entry.detail}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
