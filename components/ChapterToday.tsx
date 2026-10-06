import Image from "next/image";
import { chapterToday } from "@/content/site";
import PhotoFrame from "./PhotoFrame";

function initials(name: string) {
  const words = name.replace(/[^\p{L}\s]/gu, "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

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
          {chapterToday.cards.map((card) => (
            <li key={card.title} className="card overflow-hidden">
              <PhotoFrame
                photo={card.photo}
                sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw"
                className="aspect-[4/3]"
              />
              <div className="p-6">
                <h3 className="display text-3xl font-extrabold leading-none">{card.title}</h3>
                <p className="mt-3 text-muted">{card.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="card mt-10 p-7 md:p-9">
          <h3 className="display text-3xl font-extrabold">{chapterToday.execHeading}</h3>
          <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {chapterToday.exec.map((officer) => (
              <li key={officer.title} className="flex items-center gap-4">
                {officer.headshot ? (
                  <Image
                    src={officer.headshot}
                    alt={`Headshot of ${officer.name}`}
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="display flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-2xl text-white"
                  >
                    {initials(officer.name)}
                  </span>
                )}
                <div>
                  <p className="text-lg font-bold leading-snug">{officer.name}</p>
                  <p className="text-sm text-muted">{officer.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
