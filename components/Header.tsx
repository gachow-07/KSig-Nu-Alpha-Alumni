"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { asset } from "@/lib/paths";
import KSMark from "./KSMark";

/** How far the page scrolls (px) before the header shrinks. */
const SHRINK_AFTER = 50;
/** How much the bar shrinks: 72px → 64px (min-h-[72px] → min-h-16). */
const COMPACT_DIFF = 8;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Shrink the bar and add a shadow once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHRINK_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep --header-h equal to the bar's compact (scrolled) height, so anchor links
  // stop right below the header as it will be when you arrive.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const update = () => {
      const compact = bar.offsetHeight - (window.scrollY > SHRINK_AFTER ? 0 : COMPACT_DIFF);
      document.documentElement.style.setProperty("--header-h", `${compact}px`);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  // Scroll-spy: highlight the nav link for the section crossing the middle of the screen.
  useEffect(() => {
    const ids = nav.map((item) => item.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape, or when the screen grows to desktop width.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 64rem)");
    const onResize = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      // When the bar shrinks by 8px, an 8px bottom margin appears at the same rate,
      // so the page below never jumps.
      className={`on-dark sticky top-0 z-50 bg-primary text-white transition-[margin,box-shadow] duration-300 ease-out ${
        scrolled
          ? "mb-2 shadow-[0_1px_0_rgba(255,255,255,0.08),0_10px_30px_-12px_rgba(0,0,0,0.45)]"
          : "mb-0 shadow-[0_1px_0_rgba(255,255,255,0.08)]"
      }`}
    >
      <div
        ref={barRef}
        className={`container-site flex items-center justify-between gap-4 transition-[min-height] duration-300 ease-out ${
          scrolled ? "min-h-16" : "min-h-[72px]"
        }`}
      >
        <a href="#top" className="flex min-h-[44px] items-center gap-3" onClick={close}>
          {site.crestImage && (
            <Image src={asset(site.crestImage)} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
          )}
          <KSMark className="h-7 w-auto" />
          <span className="text-base font-bold leading-tight sm:text-lg">{site.name}</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`nav-underline inline-flex min-h-[44px] items-center rounded-md px-3 font-semibold transition-colors duration-200 hover:bg-white/10 hover:text-white ${
                      isActive ? "text-white" : "text-white/90"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li className="ml-3">
              <a href="#signup" className="btn btn-primary">
                Reconnect
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="relative inline-flex h-12 w-12 items-center justify-center rounded-md hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {/* Three bars that morph into an X. */}
          <span aria-hidden="true" className="relative block h-6 w-6">
            <span
              className={`absolute left-1 top-[6px] h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ease-out ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-1 top-[11px] h-0.5 w-4 rounded-full bg-current transition-opacity duration-200 ease-out ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-1 top-[16px] h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ease-out ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {/* Mobile menu: slides open by growing its row from 0 to full height while fading in. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <nav aria-label="Main mobile" className="border-t border-white/10 bg-primary">
            <ul
              className={`container-site flex flex-col gap-1 py-4 transition-transform duration-300 ease-out ${
                open ? "translate-y-0" : "-translate-y-2"
              }`}
            >
              {nav.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={close}
                      aria-current={isActive ? "location" : undefined}
                      className="flex min-h-[48px] items-center rounded-md px-3 text-lg font-semibold hover:bg-white/10"
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li className="mt-2">
                <a href="#signup" onClick={close} className="btn btn-primary w-full">
                  Reconnect
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
