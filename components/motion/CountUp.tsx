"use client";

import { useInView, useCountUp, useIsClient, usePrefersReducedMotion } from "@/lib/motion";

type Parsed = { prefix: string; number: number; decimals: number; grouped: boolean; suffix: string };

/**
 * Splits "$12.5K" into "$", 12.5, "K". Returns null for anything that
 * shouldn't count: placeholders like "[##]", text without a number, or a
 * bare year like "1925" (counting up a year looks odd).
 */
export function parseCount(value: string): Parsed | null {
  if (/[[\]#]/.test(value)) return null;
  const match = value.match(/^(\D*?)(\d{1,3}(?:,\d{3})+|\d+)(\.\d+)?(\D*)$/);
  if (!match) return null;
  const [, prefix, whole, fraction = "", suffix] = match;
  const number = Number(whole.replace(/,/g, "") + fraction);
  if (!prefix && !suffix && /^\d{4}$/.test(whole) && number >= 1800 && number <= 2100) return null;
  return {
    prefix,
    number,
    decimals: fraction ? fraction.length - 1 : 0,
    grouped: whole.includes(",") || number >= 1000,
    suffix,
  };
}

function format(p: Parsed, n: number) {
  const digits = n.toLocaleString("en-US", {
    minimumFractionDigits: p.decimals,
    maximumFractionDigits: p.decimals,
    useGrouping: p.grouped,
  });
  return `${p.prefix}${digits}${p.suffix}`;
}

/**
 * Shows `current` while reserving the space of `final`, so nothing around it
 * shifts as the digits change. Screen readers only hear the final value.
 */
export function CountSlot({ final, current }: { final: string; current: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span aria-hidden="true" className="invisible">
        {final}
      </span>
      <span aria-hidden="true" className="absolute left-0 top-0">
        {current}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}

/**
 * Counts up from 0 to the number inside `value` the first time it scrolls into
 * view, keeping prefixes and suffixes ("$", "K", "+", "%"). Values that aren't
 * numbers (placeholders, years) are shown as-is.
 */
export default function CountUp({ value, duration = 700 }: { value: string; duration?: number }) {
  const parsed = parseCount(value);
  const isClient = useIsClient();
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLSpanElement>();
  const animate = isClient && !reduced && parsed !== null;
  const current = useCountUp(parsed?.number ?? 0, animate && inView, duration);

  return (
    <span ref={ref}>
      {parsed ? <CountSlot final={value} current={animate ? format(parsed, current) : value} /> : value}
    </span>
  );
}
