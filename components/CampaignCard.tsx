"use client";

import { useId, useState } from "react";
import type { Fund } from "@/content/site";
import { formatDay } from "@/lib/dates";
import { useCountUp, useIsClient, usePrefersReducedMotion } from "@/lib/motion";
import { CountSlot } from "./motion/CountUp";
import Reveal from "./motion/Reveal";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** How long the bar fill and the two count-ups take (they run together). */
const FILL_MS = 700;

type Props = {
  raised: number;
  goal: number;
  donors: number;
  endDate: string;
  donateUrl: string;
  donateLabel: string;
  /** NEW: funds to choose from, shown above the Donate button. */
  funds?: Fund[];
  fundsLegend?: string;
};

export default function CampaignCard({ raised, goal, donors, endDate, donateUrl, donateLabel, funds = [], fundsLegend }: Props) {
  const percent = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
  const isClient = useIsClient();
  const reduced = usePrefersReducedMotion();
  const animate = isClient && !reduced;

  return (
    <Reveal className="card p-7 text-ink md:p-9">
      {(inView) => (
        <CardBody
          {...{ raised, goal, donors, endDate, donateUrl, donateLabel, percent, funds, fundsLegend }}
          animate={animate}
          active={animate && inView}
        />
      )}
    </Reveal>
  );
}

function CardBody({
  raised,
  goal,
  donors,
  endDate,
  donateUrl,
  donateLabel,
  percent,
  animate,
  active,
  funds = [],
  fundsLegend,
}: Props & { percent: number; animate: boolean; active: boolean }) {
  // NEW: the chosen fund can send the Donate button to its own link.
  const [fundId, setFundId] = useState(funds[0]?.id ?? "");
  const groupName = useId();
  const fund = funds.find((f) => f.id === fundId);
  const href = fund?.donateUrl || donateUrl;
  const isExternal = href.startsWith("http");
  // Same trigger and duration for the bar and both numbers, so they stay in sync.
  const amount = useCountUp(raised, active, FILL_MS);
  const pct = useCountUp(percent, active, FILL_MS);
  const amountText = animate ? usd.format(Math.round(amount)) : usd.format(raised);
  const pctText = animate ? `${Math.round(pct)}%` : `${percent}%`;
  const barWidth = !animate || active ? percent : 0;

  return (
    <>
      <p className="display text-[clamp(3rem,6vw,4.5rem)] leading-none text-primary">
        <CountSlot final={usd.format(raised)} current={amountText} />
      </p>
      <p className="mt-2 text-muted">
        raised of <strong className="text-ink">{usd.format(goal)}</strong> goal
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
        <div
          className="h-full rounded-full bg-accent transition-[width] ease-[cubic-bezier(0.33,1,0.68,1)]"
          style={{ width: `${barWidth}%`, transitionDuration: `${FILL_MS}ms` }}
        />
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
        <div>
          <dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">Funded</dt>
          <dd className="display mt-1 text-3xl">
            <CountSlot final={`${percent}%`} current={pctText} />
          </dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">Donors</dt>
          <dd className="display mt-1 text-3xl">{donors}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">Ends</dt>
          <dd className="display mt-1 text-3xl">
            <time dateTime={endDate}>{formatDay(endDate, { month: "short", day: "numeric" })}</time>
          </dd>
        </div>
      </dl>

      {/* NEW: fund picker */}
      {funds.length > 0 && (
        <fieldset className="mt-6 border-t border-border pt-6">
          <legend className="sr-only">{fundsLegend}</legend>
          <p aria-hidden="true" className="text-xs font-bold uppercase tracking-[0.1em] text-muted">
            {fundsLegend}
          </p>
          <div className="mt-3 grid gap-3">
            {funds.map((f) => (
              <label
                key={f.id}
                className="flex cursor-pointer items-start gap-3 rounded-md border-2 border-border p-4 transition-colors duration-150 hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-surface-alt"
              >
                <input
                  type="radio"
                  name={groupName}
                  value={f.id}
                  checked={fundId === f.id}
                  onChange={() => setFundId(f.id)}
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-primary"
                />
                <span>
                  <span className="block font-bold">{f.label}</span>
                  <span className="mt-0.5 block text-sm text-muted">{f.description}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <a
        href={href}
        className="btn btn-primary mt-8 w-full text-lg"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {donateLabel}
        {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    </>
  );
}
