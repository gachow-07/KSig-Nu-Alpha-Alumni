import { alumni } from "@/content/site";
import Reveal from "./motion/Reveal";
import PhotoFrame from "./PhotoFrame";
import SignupSection from "./SignupSection";

type Props = {
  /** True when this section is shown on its own page: its title becomes the page's main heading (h1). */
  standalone?: boolean;
};

/** NEW: Alumni. Spotlights, mentor network, and the existing Reconnect form grouped under one heading. */
export default function AlumniSection({ standalone = false }: Props) {
  const Heading = standalone ? "h1" : "h2";
  const SubHeading = standalone ? "h2" : "h3";
  const CardHeading = standalone ? "h3" : "h4";

  return (
    <section id="alumni" aria-labelledby="alumni-heading" className="section-pad bg-surface-alt">
      <div className="container-site relative z-10">
        <div className="max-w-2xl">
          <p className="eyebrow">{alumni.eyebrow}</p>
          <Heading id="alumni-heading" className="section-heading mt-4">
            {alumni.heading}
          </Heading>
          <p className="mt-5 text-lg text-muted">{alumni.intro}</p>
        </div>

        {/* Alumni Spotlight: same card style as "The chapter today". */}
        <div className="mt-12">
          <SubHeading className="display text-3xl font-extrabold">{alumni.spotlightHeading}</SubHeading>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {alumni.spotlights.map((person, i) => (
              <Reveal as="li" key={i} delay={i * 100}>
                <div className="card group h-full overflow-hidden transition-[translate,box-shadow] duration-300 ease-out hover:shadow-[0_18px_40px_-18px_rgba(15,77,58,0.45)] motion-safe:hover:-translate-y-1">
                  <PhotoFrame
                    photo={person.photo}
                    sizes="(min-width: 1024px) 390px, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/3]"
                    hoverZoom
                  />
                  <div className="p-6">
                    <CardHeading className="display text-3xl font-extrabold leading-none">{person.name}</CardHeading>
                    <p className="mt-2 text-sm font-semibold text-primary">
                      {person.pledgeClass} · {person.role}
                    </p>
                    <blockquote className="mt-3 text-muted">“{person.quote}”</blockquote>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Mentor Network */}
        <div className="mt-16">
          <SubHeading className="display text-3xl font-extrabold">{alumni.mentorHeading}</SubHeading>
          <p className="mt-3 max-w-2xl text-muted">{alumni.mentorNote}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {alumni.mentors.map((mentor, i) => (
              <Reveal as="li" key={i} delay={i * 80} className="card p-6">
                <p className="eyebrow">{mentor.industry}</p>
                <p className="mt-2 text-lg font-bold leading-snug">{mentor.name}</p>
                <p className="text-sm text-muted">{mentor.pledgeClass}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* The existing Reconnect form, now grouped under Alumni. */}
        <div className="mt-16">
          <SignupSection embedded={{ headingLevel: SubHeading }} />
        </div>
      </div>
    </section>
  );
}
