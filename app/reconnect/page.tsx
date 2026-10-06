import type { Metadata } from "next";
import SignupSection from "@/components/SignupSection";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata(
  "Reconnect",
  "Join the Kappa Sigma Nu Alpha alumni list: tell us where you landed.",
);

export default function Page() {
  return (
    <PageShell>
      <SignupSection standalone />
    </PageShell>
  );
}
