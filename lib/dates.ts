import type { AlumniEvent } from "@/content/site";

/** Today's date as "YYYY-MM-DD" in the given time zone. */
export function todayIn(timeZone: string, now: Date = new Date()): string {
  // en-CA formats dates as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Turns "2026-11-07" into a Date at midnight UTC, so formatting never shifts the day. */
function parseDay(day: string): Date {
  return new Date(`${day}T00:00:00Z`);
}

export function formatDay(day: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(parseDay(day));
}

/** Events happening today or later, soonest first. An event hides the day after its date. */
export function upcomingEvents(
  list: AlumniEvent[],
  timeZone: string,
  now: Date = new Date(),
): AlumniEvent[] {
  const today = todayIn(timeZone, now);
  return list
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}
