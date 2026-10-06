import type { Metadata } from "next";
import { site } from "@/content/site";

/** Title, description and link-preview tags for one of the separate pages. */
export function pageMetadata(title: string, description: string): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title: fullTitle,
    description,
    // Repeat the shared preview fields: Next.js replaces (doesn't merge) these objects per page.
    openGraph: { type: "website", siteName: site.name, locale: "en_US", title: fullTitle, description },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
