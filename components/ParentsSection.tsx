import { parents } from "@/content/site";
import Avatar from "./Avatar";
import { ChevronDownIcon, MailIcon } from "./Icons";
import Reveal from "./motion/Reveal";
import ParentForm from "./ParentForm";
import StatGrid from "./StatGrid";

type Props = {
  /** True when this section is shown on its own page: its title becomes the page's main heading (h1). */
  standalone?: boolean;
};

/** NEW: Parents & Families. Built only from existing pieces (stat row, cards, exec-style contact, form). */
export default function ParentsSection({ standalone = false }: Props) {
  const Heading = standalone ? "h1" : "h2";
  const SubHeading = standalone ? "h2" : "h3";
  const { contact } = parents;
  const emailIsReal = !contact.email.includes("[");

  return (
    <section id="parents" aria-labelledby="parents-heading" className="section-pad bg-surface">
      <div className="container-site relative z-10">
        <div className="max-w-2xl">
          <p className="eyebrow">{parents.eyebrow}</p>
          <Heading id="parents-heading" className="section-heading mt-4">
            {parents.heading}
          </Heading>
          <p className="mt-5 text-lg text-muted">{parents.intro}</p>
        </div>

        {/* Same stat row as the band under the hero. */}
        <div className="on-dark mt-12 rounded-xl bg-footer text-white">
          <StatGrid stats={parents.stats} className="px-7 py-10 md:px-10 md:py-12" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="card p-7 md:p-9">
            <SubHeading className="display text-3xl font-extrabold">{parents.safety.heading}</SubHeading>
            <p className="mt-3 text-muted">{parents.safety.intro}</p>
            <ul className="mt-6 space-y-5">
              {parents.safety.points.map((point) => (
                <li key={point.title} className="border-l-2 border-primary pl-4">
                  <p className="font-bold">{point.title}</p>
                  <p className="mt-1 text-muted">{point.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Styled like the executive committee card. */}
          <Reveal delay={100} className="card p-7 md:p-9">
            <SubHeading className="display text-3xl font-extrabold">{contact.heading}</SubHeading>
            <div className="group mt-7 flex items-center gap-4">
              <Avatar name={contact.name} headshot={contact.headshot} />
              <div>
                <p className="text-lg font-bold leading-snug">{contact.name}</p>
                <p className="text-sm text-muted">{contact.title}</p>
              </div>
            </div>
            {emailIsReal ? (
              <a
                href={`mailto:${contact.email}`}
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-bold text-accent underline-offset-4 hover:underline"
              >
                <MailIcon className="h-5 w-5" /> {contact.email}
              </a>
            ) : (
              <p className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-bold text-accent">
                <MailIcon className="h-5 w-5" /> {contact.email}
              </p>
            )}
          </Reveal>
        </div>

        {/* FAQ: native <details>/<summary>, so it works with a keyboard and screen readers out of the box. */}
        <div className="mt-16">
          <SubHeading className="display text-3xl font-extrabold">{parents.faqHeading}</SubHeading>
          <Reveal className="mt-6 flex flex-col gap-3">
            {parents.faq.map((item) => (
              <details key={item.question} className="card faq group">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-6 py-4 text-lg font-bold">
                  <span>{item.question}</span>
                  <ChevronDownIcon className="faq-chevron h-5 w-5 shrink-0 text-primary" />
                </summary>
                <div className="px-6 pb-6 text-muted">{item.answer}</div>
              </details>
            ))}
          </Reveal>
        </div>

        {/* Parent newsletter: same layout as the alumni sign-up. */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SubHeading className="display text-3xl font-extrabold">{parents.newsletter.heading}</SubHeading>
            <p className="mt-4 text-lg text-muted">{parents.newsletter.intro}</p>
          </div>
          <ParentForm successHeading={standalone ? "h3" : "h4"} />
        </div>
      </div>
    </section>
  );
}
