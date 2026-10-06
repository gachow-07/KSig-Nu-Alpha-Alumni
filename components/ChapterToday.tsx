import Image from "next/image";
import { chapterToday } from "@/content/site";
import { asset } from "@/lib/paths";
import PhotoFrame from "./PhotoFrame";

function initials(name: string) {
  const words = name.replace(/[^\p{L}\s]/gu, "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function ChapterToday() {
  const [featured, ...rest] = chapterToday.cards;

  return (
    <section id="today" aria-labelledby="today-heading" className="section-pad bg-emerald-tint">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="eyebrow">{chapterToday.eyebrow}</p>
          <h2 id="today-heading" className="section-heading mt-4">
            {chapterToday.heading}
          </h2>
          <p className="mt-5 text-lg text-muted">{chapterToday.intro}</p>
        </div>

        {/* Bento grid: the first card is large, the rest fill in beside it. */}
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {featured && (
            <li className="card group overflow-hidden md:col-span-2 lg:col-span-1 lg:row-span-2">
              <div className="flex h-full flex-col">
                <PhotoFrame
                  photo={featured.photo}
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 100vw, 100vw"
                  className="aspect-[4/3] lg:aspect-auto lg:min-h-[260px] lg:flex-1"
                />
                <div className="p-6">
                  <h3 className="heading text-xl text-emerald">{featured.title}</h3>
                  <p className="mt-2 text-muted">{featured.description}</p>
                </div>
              </div>
            </li>
          )}
          {rest.map((card, i) => (
            <li
              key={card.title}
              className={`card overflow-hidden ${i === rest.length - 1 ? "lg:col-span-2" : ""}`}
            >
              <div className={`flex h-full flex-col ${i === rest.length - 1 ? "lg:flex-row" : ""}`}>
                <PhotoFrame
                  photo={card.photo}
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                  className={`aspect-[16/10] ${i === rest.length - 1 ? "lg:aspect-auto lg:min-h-[200px] lg:w-1/2" : ""}`}
                />
                <div className="p-6">
                  <h3 className="heading text-xl text-emerald">{card.title}</h3>
                  <p className="mt-2 text-muted">{card.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <h3 className="heading text-2xl text-emerald">{chapterToday.execHeading}</h3>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {chapterToday.exec.map((officer) => (
              <li key={officer.title} className="card flex flex-col items-center px-4 py-6 text-center">
                {officer.headshot ? (
                  <Image
                    src={asset(officer.headshot)}
                    alt={`Headshot of ${officer.name}`}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full object-cover ring-2 ring-gold/60 ring-offset-2"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="heading flex h-20 w-20 items-center justify-center rounded-full bg-emerald text-2xl text-white ring-2 ring-gold/60 ring-offset-2"
                  >
                    {initials(officer.name)}
                  </span>
                )}
                <p className="mt-4 font-semibold leading-snug text-ink">{officer.name}</p>
                <p className="mt-1 text-sm leading-snug text-muted">{officer.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
