import type { Metadata } from "next";
import Events from "@/components/Events";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata(
  "Alumni events",
  "Upcoming Kappa Sigma Nu Alpha alumni events, with dates, locations and RSVP links.",
);

export default function Page() {
  return (
    <PageShell>
      <Events standalone />
    </PageShell>
  );
}
