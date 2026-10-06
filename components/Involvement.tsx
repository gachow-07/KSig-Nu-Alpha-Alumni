import { involvement, type InvolvementItem } from "@/content/site";
import { ArrowRightIcon, CalendarIcon, HeartIcon, UsersIcon } from "./Icons";

const ICONS: Record<InvolvementItem["icon"], typeof UsersIcon> = {
  mentor: UsersIcon,
  calendar: CalendarIcon,
  heart: HeartIcon,
};

export default function Involvement() {
  return (
    <section aria-labelledby="involved-heading" className="section-pad bg-surface">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="eyebrow">{involvement.eyebrow}</p>
          <h2 id="involved-heading" className="section-heading mt-4">
            {involvement.heading}
          </h2>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {involvement.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.title} className="card flex flex-col p-7 transition-shadow hover:soft-shadow">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-scarlet-tint text-scarlet">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="heading mt-6 text-xl text-emerald">{item.title}</h3>
                <p className="mt-2 flex-1 text-muted">{item.description}</p>
                <a
                  href={item.link.href}
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 self-start font-semibold text-scarlet underline-offset-4 hover:underline"
                >
                  {item.link.label}
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
