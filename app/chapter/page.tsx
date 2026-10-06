import type { Metadata } from "next";
import ChapterToday from "@/components/ChapterToday";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata(
  "The chapter today",
  "Nu Alpha today: brotherhood, philanthropy, intramurals, new members and the executive committee.",
);

export default function Page() {
  return (
    <PageShell>
      <ChapterToday standalone />
    </PageShell>
  );
}
