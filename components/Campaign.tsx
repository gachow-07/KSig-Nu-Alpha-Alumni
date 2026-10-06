import { campaign } from "@/content/site";
import { formatDay } from "@/lib/dates";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function Campaign() {
  const percent = campaign.goal > 0 ? Math.min(100, Math.round((campaign.raised / campaign.goal) * 100)) : 0;
  const isExternal = campaign.donateUrl.startsWith("http");

  return (
    <section id="give" aria-labelledby="give-heading" className="on-dark section-pad bg-primary text-white">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow text-on-dark-muted!">{campaign.eyebrow}</p>
          <h2 id="give-heading" className="section-heading mt-4">
            {campaign.name}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/90">{campaign.description}</p>
        </div>

        <div className="card p-7 text-ink md:p-9">
          <p className="display text-[clamp(3rem,6vw,4.5rem)] leading-none text-primary">
            {usd.format(campaign.raised)}
          </p>
          <p className="mt-2 text-muted">
            raised of <strong className="text-ink">{usd.format(campaign.goal)}</strong> goal
          </p>

          <div
            role="progressbar"
            aria-label="Campaign progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-valuetext={`${percent}% of goal`}
            className="mt-6 h-3 overflow-hidden rounded-full bg-surface-alt"
          >
            <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">Funded</dt>
              <dd className="display mt-1 text-3xl">{percent}%</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">Donors</dt>
              <dd className="display mt-1 text-3xl">{campaign.donors}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">Ends</dt>
              <dd className="display mt-1 text-3xl">
                <time dateTime={campaign.endDate}>{formatDay(campaign.endDate, { month: "short", day: "numeric" })}</time>
              </dd>
            </div>
          </dl>

          <a
            href={campaign.donateUrl}
            className="btn btn-primary mt-8 w-full text-lg"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {campaign.donateLabel}
            {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        </div>
      </div>
    </section>
  );
}
