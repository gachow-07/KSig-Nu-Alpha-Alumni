import type { Metadata } from "next";
import ParentsSection from "@/components/ParentsSection";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata(
  "Parents & families",
  "For parents and families of Kappa Sigma Nu Alpha brothers at Cal Poly: academics, safety, costs, FAQs and the parent newsletter.",
);

export default function Page() {
  return (
    <PageShell>
      <ParentsSection standalone />
    </PageShell>
  );
}
