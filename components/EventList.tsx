"use client";

import { useSyncExternalStore } from "react";
import type { AlumniEvent } from "@/content/site";
import { formatDay, todayIn } from "@/lib/dates";
import { ArrowRightIcon, ClockIcon, PinIcon } from "./Icons";

type Props = {
  events: AlumniEvent[];
  /** Today's date when the site was built, used for the first render. */
  buildDay: string;
  timeZone: string;
  emptyMessage: string;
};

const noSubscribe = () => () => {};

export default function EventList({ events, buildDay, timeZone, emptyMessage }: Props) {
  // Static HTML uses the build date; in the browser, switch to the real date.
  const today = useSyncExternalStore(noSubscribe, () => todayIn(timeZone), () => buildDay);
  const upcoming = events.filter((e) => e.date >= today);

  if (upcoming.length === 0) {
    return <p className="card mt-10 p-8 text-lg text-muted">{emptyMessage}</p>;
  }

  return (
    <ul className="mt-10 flex flex-col gap-4">
      {upcoming.map((event) => {
        const external = event.rsvpUrl.startsWith("http");
        return (
          <li
            key={`${event.date}-${event.title}`}
            className="card flex flex-col gap-5 p-5 transition-shadow hover:soft-shadow sm:flex-row sm:items-center sm:gap-7 sm:p-6"
          >
            <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-scarlet-tint text-scarlet">
              <span className="text-xs font-bold uppercase tracking-[0.14em]">
                {formatDay(event.date, { month: "short" })}
              </span>
              <span className="heading text-3xl leading-none">{formatDay(event.date, { day: "numeric" })}</span>
            </div>

            <div className="flex-1">
              <h3 className="heading text-xl text-emerald">{event.title}</h3>
              <p className="mt-1 text-muted">{event.description}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <ClockIcon className="h-4 w-4 text-gold" />
                  <time dateTime={event.date}>
                    {formatDay(event.date, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                  </time>
                  · {event.time}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <PinIcon className="h-4 w-4 text-gold" />
                  {event.location}
                </span>
              </div>
            </div>

            <a
              href={event.rsvpUrl}
              className="btn btn-secondary self-start sm:self-center"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              RSVP<span className="sr-only"> for {event.title}</span>
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
