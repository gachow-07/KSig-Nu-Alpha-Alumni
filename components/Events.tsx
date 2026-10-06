import { events, site } from "@/content/site";
import { todayIn, upcomingEvents } from "@/lib/dates";
import EventList from "./EventList";

type Props = {
  /** True when this section is shown on its own page: its title becomes the page's main heading (h1). */
  standalone?: boolean;
};

export default function Events({ standalone = false }: Props) {
  const Heading = standalone ? "h1" : "h2";
  // Filtered when the site is built; EventList re-checks in the visitor's
  // browser so past events disappear even between rebuilds.
  const buildDay = todayIn(site.timeZone);
  const upcoming = upcomingEvents(events.list, site.timeZone);

  return (
    <section id="events" aria-labelledby="events-heading" className="section-pad bg-surface">
      <div className="container-site relative z-10">
        <p className="eyebrow">{events.eyebrow}</p>
        <Heading id="events-heading" className="section-heading mt-4">
          {events.heading}
        </Heading>

        <EventList subheading={standalone ? "h2" : "h3"} events={upcoming} buildDay={buildDay} timeZone={site.timeZone} emptyMessage={events.emptyMessage} />
      </div>
    </section>
  );
}
