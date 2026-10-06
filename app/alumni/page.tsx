import type { Metadata } from "next";
import AlumniSection from "@/components/AlumniSection";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata(
  "Alumni",
  "Kappa Sigma Nu Alpha alumni: spotlights, the mentor network, and the alumni sign-up.",
);

export default function Page() {
  return (
    <PageShell>
      <AlumniSection standalone />
    </PageShell>
  );
}
