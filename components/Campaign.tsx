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
    <section id="give" aria-labelledby="give-heading" className="section-pad bg-surface">
      <div className="container-site">
        <div className="on-dark relative overflow-hidden rounded-[32px] bg-emerald px-6 py-12 text-white sm:px-10 md:px-14 md:py-16">
          {/* Decorative rings in Kappa Sigma gold. */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[28px] border-gold/15" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full border-[20px] border-white/5" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow text-white!">{campaign.eyebrow}</p>
              <h2 id="give-heading" className="heading mt-4 text-[clamp(2rem,4vw,3rem)]">
                {campaign.name}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-white/85">{campaign.description}</p>
            </div>

            <div className="card soft-shadow p-7 text-ink md:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="heading text-[clamp(2.25rem,5vw,3rem)] leading-none text-emerald">
                    {usd.format(campaign.raised)}
                  </p>
                  <p className="mt-2 text-muted">
                    raised of <strong className="font-semibold text-ink">{usd.format(campaign.goal)}</strong>
                  </p>
                </div>
                <p className="rounded-full bg-scarlet-tint px-3 py-1 text-sm font-semibold text-scarlet">{percent}%</p>
              </div>

              <div
                role="progressbar"
                aria-label="Campaign progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                aria-valuetext={`${percent}% of goal`}
                className="mt-6 h-3 overflow-hidden rounded-full bg-emerald-tint"
              >
                <div className="h-full rounded-full bg-scarlet" style={{ width: `${percent}%` }} />
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6">
                <div>
                  <dt className="text-sm text-muted">Donors</dt>
                  <dd className="heading mt-1 text-2xl text-emerald">{campaign.donors}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Ends</dt>
                  <dd className="heading mt-1 text-2xl text-emerald">
                    <time dateTime={campaign.endDate}>
                      {formatDay(campaign.endDate, { month: "short", day: "numeric", year: "numeric" })}
                    </time>
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
        </div>
      </div>
    </section>
  );
}
