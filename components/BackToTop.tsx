"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { ArrowUpIcon } from "./Icons";

/** Round button that fades in once you scroll past the hero (or down a screen on other pages) and smooth-scrolls back to the top. */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (hero) {
      // Landing page: show once the hero has scrolled out of view.
      const observer = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0));
      observer.observe(hero);
      return () => observer.disconnect();
    }
    // Other pages (no hero): show after scrolling down about one screen.
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    // Move keyboard focus back to the start of the page without jumping.
    document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      inert={!show}
      aria-label="Back to top"
      className={`btn-primary fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)] transition-[opacity,translate,background-color] duration-300 ease-out md:bottom-8 md:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  );
}
