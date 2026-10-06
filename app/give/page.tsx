import type { Metadata } from "next";
import Campaign from "@/components/Campaign";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata(
  "Give",
  "Support Kappa Sigma Nu Alpha through the current alumni campaign.",
);

export default function Page() {
  return (
    <PageShell>
      <Campaign standalone />
    </PageShell>
  );
}
