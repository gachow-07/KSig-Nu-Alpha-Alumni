import { chapterToday } from "@/content/site";
import Avatar from "./Avatar";
import Reveal from "./motion/Reveal";
import PhotoFrame from "./PhotoFrame";

type Props = {
  /** True when this section is shown on its own page: its title becomes the page's main heading (h1). */
  standalone?: boolean;
};

export default function ChapterToday({ standalone = false }: Props) {
  const Heading = standalone ? "h1" : "h2";
  const SubHeading = standalone ? "h2" : "h3";
  return (
    <section id="today" aria-labelledby="today-heading" className="section-pad bg-surface-alt">
      <div className="container-site relative z-10">
        <div className="max-w-2xl">
          <p className="eyebrow">{chapterToday.eyebrow}</p>
          <Heading id="today-heading" className="section-heading mt-4">
            {chapterToday.heading}
          </Heading>
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
                  <SubHeading className="display text-3xl font-extrabold leading-none">{card.title}</SubHeading>
                  <p className="mt-3 text-muted">{card.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="card mt-10 p-7 md:p-9">
          <SubHeading className="display text-3xl font-extrabold">{chapterToday.execHeading}</SubHeading>
          <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {chapterToday.exec.map((officer, i) => (
              <Reveal as="li" key={officer.title} delay={i * 80} className="group flex items-center gap-4">
                <Avatar name={officer.name} headshot={officer.headshot} />
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
