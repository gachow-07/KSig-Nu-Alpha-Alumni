import Image from "next/image";
import { chapterToday } from "@/content/site";
import { asset } from "@/lib/paths";
import Reveal from "./motion/Reveal";
import PhotoFrame from "./PhotoFrame";

function initials(name: string) {
  const words = name.replace(/[^\p{L}\s]/gu, "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/** Avatar ring that fades in when the officer's row is hovered. */
const AVATAR_RING =
  "ring-2 ring-transparent ring-offset-2 ring-offset-surface transition-shadow duration-300 ease-out group-hover:ring-primary/50";

export default function ChapterToday() {
  return (
    <section id="today" aria-labelledby="today-heading" className="section-pad bg-surface-alt">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="eyebrow">{chapterToday.eyebrow}</p>
          <h2 id="today-heading" className="section-heading mt-4">
            {chapterToday.heading}
          </h2>
          <p className="mt-5 text-muted">{chapterToday.intro}</p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {chapterToday.cards.map((card, i) => (
            <Reveal as="li" key={card.title} delay={i * 100}>
              {/* Hover: lift, deeper shadow, slight image zoom. */}
              <div className="card group h-full overflow-hidden transition-[translate,box-shadow] duration-300 ease-out hover:shadow-[0_18px_40px_-18px_rgba(15,77,58,0.45)] motion-safe:hover:-translate-y-1">
                <PhotoFrame
                  photo={card.photo}
                  sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3]"
                  hoverZoom
                />
                <div className="p-6">
                  <h3 className="display text-3xl font-extrabold leading-none">{card.title}</h3>
                  <p className="mt-3 text-muted">{card.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="card mt-10 p-7 md:p-9">
          <h3 className="display text-3xl font-extrabold">{chapterToday.execHeading}</h3>
          <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {chapterToday.exec.map((officer, i) => (
              <Reveal as="li" key={officer.title} delay={i * 80} className="group flex items-center gap-4">
                {officer.headshot ? (
                  <Image
                    src={asset(officer.headshot)}
                    alt={`Headshot of ${officer.name}`}
                    width={64}
                    height={64}
                    data-anim="pop"
                    className={`h-16 w-16 shrink-0 rounded-full object-cover ${AVATAR_RING}`}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    data-anim="pop"
                    className={`display flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-2xl text-white ${AVATAR_RING}`}
                  >
                    {initials(officer.name)}
                  </span>
                )}
                <div>
                  <p className="text-lg font-bold leading-snug">{officer.name}</p>
                  <p className="text-sm text-muted">{officer.title}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
