import type { Metadata } from "next";
import OurStory from "@/components/OurStory";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata(
  "Our story",
  "How the Nu Alpha chapter of Kappa Sigma at Cal Poly began and grew, one class at a time.",
);

export default function Page() {
  return (
    <PageShell>
      <OurStory standalone />
    </PageShell>
  );
}
