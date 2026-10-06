"use client";

import { useState, useSyncExternalStore, type CSSProperties } from "react";
import type { AlumniEvent, Audience } from "@/content/site";
import { formatDay, todayIn } from "@/lib/dates";
import { ArrowRightIcon, CalendarIcon, PinIcon } from "./Icons";
import Reveal from "./motion/Reveal";

type Props = {
  events: AlumniEvent[];
  /** Today's date when the site was built, used for the first render. */
  buildDay: string;
  timeZone: string;
  emptyMessage: string;
  /** Heading level for each event title: h3 on the landing page, h2 on the events page. */
  subheading?: "h2" | "h3";
  /** NEW: filter buttons shown above the list, e.g. ["All", "Alumni", "Families"]. */
  filters?: readonly string[];
};

/** NEW: tag colors per audience (existing palette only). */
const TAG_STYLE: Record<Audience, string> = {
  Alumni: "bg-primary/10 text-primary",
  Families: "bg-accent/10 text-accent",
  Everyone: "bg-surface-alt text-muted",
};

/** "Everyone" events show under every filter. */
const matches = (filter: string, audience: Audience) =>
  filter === "All" || audience === filter || audience === "Everyone";

const noSubscribe = () => () => {};

export default function EventList({
  events,
  buildDay,
  timeZone,
  emptyMessage,
  subheading: SubHeading = "h3",
  filters = [],
}: Props) {
  // Static HTML uses the build date; in the browser, switch to the real date.
  const today = useSyncExternalStore(noSubscribe, () => todayIn(timeZone), () => buildDay);
  const [filter, setFilter] = useState("All");
  const upcoming = events.filter((e) => e.date >= today && matches(filter, e.audience));

  return (
    <>
      {/* NEW: filter buttons */}
      {filters.length > 0 && (
        <div role="group" aria-label="Filter events" className="mt-8 flex flex-wrap gap-3">
          {filters.map((f) => (
            <button key={f} type="button" className="pill-toggle" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {`Showing ${upcoming.length} ${upcoming.length === 1 ? "event" : "events"}${filter === "All" ? "" : ` for ${filter.toLowerCase()}`}`}
      </p>

      {upcoming.length === 0 ? (
        <p className="card mt-10 p-8 text-lg text-muted">{emptyMessage}</p>
      ) : (
        <ul className={`${filters.length > 0 ? "mt-8" : "mt-12"} grid gap-6 md:grid-cols-2 lg:grid-cols-3`}>
          {upcoming.map((event, i) => (
            <Reveal as="li" key={`${event.date}-${event.title}`} delay={i * 100} className="card flex flex-col p-7 md:p-8">
              <div className="flex items-start gap-4">
                <div
                  data-anim="pop"
                  style={{ "--delay": "150ms" } as CSSProperties}
                  className="flex w-16 shrink-0 flex-col items-center rounded-md bg-primary py-2 text-white"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.12em]">
                    {formatDay(event.date, { month: "short" })}
                  </span>
                  <span className="display text-4xl leading-none">
                    {formatDay(event.date, { day: "numeric" })}
                  </span>
                </div>
                <div className="text-sm text-muted">
                  <p className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 shrink-0" />
                    <time dateTime={event.date}>
                      {formatDay(event.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                    </time>
                  </p>
                  <p className="mt-1 pl-6">{event.time}</p>
                  <p className="mt-1 flex items-center gap-2">
                    <PinIcon className="h-4 w-4 shrink-0" />
                    {event.location}
                  </p>
                </div>
              </div>

              {/* NEW: who it's for */}
              <p className={`mt-6 self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${TAG_STYLE[event.audience]}`}>
                <span className="sr-only">For: </span>
                {event.audience}
              </p>
              <SubHeading className="display mt-3 text-3xl font-extrabold leading-none">{event.title}</SubHeading>
              <p className="mt-3 flex-1 text-muted">{event.description}</p>

              {/* Hover: a soft fill sweeps in from the left and the arrow nudges right.
                  -mx-3 px-3 widens the hover area without moving the text. */}
              <a
                href={event.rsvpUrl}
                className="group relative isolate -mx-3 mt-6 inline-flex min-h-[44px] items-center gap-2 self-start rounded-md px-3 font-bold text-accent"
                {...(event.rsvpUrl.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-left scale-x-0 rounded-md bg-accent/10 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                RSVP<span className="sr-only"> for {event.title}</span>
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1" />
              </a>
            </Reveal>
          ))}
        </ul>
      )}
    </>
  );
}
