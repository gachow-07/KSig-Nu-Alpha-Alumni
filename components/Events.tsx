import { events, site } from "@/content/site";
import { formatDay, upcomingEvents } from "@/lib/dates";
import { ArrowRightIcon, CalendarIcon, PinIcon } from "./Icons";

export default function Events() {
  const upcoming = upcomingEvents(events.list, site.timeZone);

  return (
    <section id="events" aria-labelledby="events-heading" className="section-pad bg-surface">
      <div className="container-site">
        <p className="eyebrow">{events.eyebrow}</p>
        <h2 id="events-heading" className="section-heading mt-4">
          {events.heading}
        </h2>

        {upcoming.length === 0 ? (
          <p className="card mt-10 p-8 text-lg text-muted">{events.emptyMessage}</p>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <li key={`${event.date}-${event.title}`} className="card flex flex-col p-7 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex w-16 shrink-0 flex-col items-center rounded-md bg-primary py-2 text-white">
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

                <h3 className="display mt-6 text-3xl font-extrabold leading-none">{event.title}</h3>
                <p className="mt-3 flex-1 text-muted">{event.description}</p>

                <a
                  href={event.rsvpUrl}
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 self-start font-bold text-accent underline-offset-4 hover:underline"
                  {...(event.rsvpUrl.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  RSVP<span className="sr-only"> for {event.title}</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
