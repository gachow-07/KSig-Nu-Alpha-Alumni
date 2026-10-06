"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/paths";

type Props = { src: string; opacity: number };

/**
 * The crest as a page-wide background. It sits behind all content and moves
 * more slowly than the page: at the top of the page you see the top of the
 * crest, and when you reach the bottom of the page you reach the bottom of
 * the crest. With reduced motion turned on it stays still, centered.
 *
 * Size: as tall as fits while staying fully on screen sideways (never cropped
 * left/right), up to 1.6x the screen height. Change CREST_HEIGHT to adjust.
 */
const CREST_HEIGHT = "min(160vh, calc(92vw * 412 / 241))"; // 241×412 = the crest file's shape

export default function ScrollCrest({ src, opacity }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const place = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const crestHeight = img.getBoundingClientRect().height;
      const scrollable = document.documentElement.scrollHeight - viewport;
      // 0 at the top of the page, 1 at the bottom.
      const progress = reduced.matches ? 0.5 : scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      // Top of crest at top of screen → bottom of crest at bottom of screen.
      const y = (viewport - crestHeight) * progress;
      img.style.transform = `translate3d(-50%, ${y}px, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };

    place();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    img.addEventListener("load", schedule);
    // Page height changes (fonts, images, the mobile menu) shift the scroll range.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      img.removeEventListener("load", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    // z-[1]: above section backgrounds, below section content (containers use z-10).
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" style={{ opacity }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative, served as uploaded */}
      <img
        ref={imgRef}
        src={asset(src)}
        alt=""
        className="absolute left-1/2 top-0 w-auto max-w-none select-none will-change-transform"
        style={{ height: CREST_HEIGHT, transform: "translate3d(-50%, 0, 0)" }}
      />
    </div>
  );
}
