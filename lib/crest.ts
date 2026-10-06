import fs from "node:fs";
import path from "node:path";
import { site } from "@/content/site";

/** The crest path from content/site.ts if its file was uploaded to public/ (checked at build time). */
export function crestSrc(): string | null {
  const src = site.crest.src;
  if (!src) return null;
  return fs.existsSync(path.join(process.cwd(), "public", src)) ? src : null;
}
