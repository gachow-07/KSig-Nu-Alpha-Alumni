/** "/KSig-Nu-Alpha-Alumni" on GitHub Pages, "" locally or on a custom domain. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Turns "/images/photo.jpg" into a path that works wherever the site is hosted. */
export function asset(src: string): string {
  return src.startsWith("/") ? `${basePath}${src}` : src;
}
