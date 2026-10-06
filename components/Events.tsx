import { events, site } from "@/content/site";
import { todayIn, upcomingEvents } from "@/lib/dates";
import EventList from "./EventList";

export default function Events() {
  // Filtered when the site is built; EventList re-checks in the visitor's
  // browser so past events disappear even between rebuilds.
  const buildDay = todayIn(site.timeZone);
  const upcoming = upcomingEvents(events.list, site.timeZone);

  return (
    <section id="events" aria-labelledby="events-heading" className="section-pad bg-surface">
      <div className="container-site">
        <p className="eyebrow">{events.eyebrow}</p>
        <h2 id="events-heading" className="section-heading mt-4">
          {events.heading}
        </h2>

        <EventList events={upcoming} buildDay={buildDay} timeZone={site.timeZone} emptyMessage={events.emptyMessage} />
      </div>
    </section>
  );
}
