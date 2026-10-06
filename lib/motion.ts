"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Shared motion helpers. The CSS side lives at the bottom of app/globals.css.

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** True when the visitor's device asks for reduced motion. Always false during static rendering. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_QUERY).matches;
}

const noSubscribe = () => () => {};

/** False in the static HTML and during hydration, true once running in the browser. */
export function useIsClient(): boolean {
  return useSyncExternalStore(noSubscribe, () => true, () => false);
}

type InViewOptions = {
  /** How much of the element must be visible, 0–1. */
  threshold?: number;
  rootMargin?: string;
};

/**
 * Becomes true the first time the element scrolls into view, then stops watching.
 * Elements the visitor has already scrolled past (e.g. after jumping to a link)
 * count as seen, so they never pop in from above.
 */
export function useInView<T extends Element = HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px",
}: InViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    if (!("IntersectionObserver" in window)) {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const seen = entries.some((entry) => {
          if (entry.boundingClientRect.bottom < 0) return true; // already scrolled past
          if (!entry.isIntersecting) return false;
          // Tall elements may never reach the threshold ratio; a quarter of the screen is enough.
          const viewport = entry.rootBounds?.height ?? window.innerHeight;
          return entry.intersectionRatio >= threshold || entry.intersectionRect.height >= viewport * 0.25;
        });
        if (seen) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: [0, threshold, 0.25, 0.5], rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, threshold, rootMargin]);

  return [ref, inView] as const;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Animates a number from 0 to `target` once `active` turns true. */
export function useCountUp(target: number, active: boolean, duration = 700): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(target * easeOutCubic(t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}
