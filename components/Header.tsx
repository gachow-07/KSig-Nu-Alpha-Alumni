"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { asset } from "@/lib/paths";
import { KSBadge } from "./KSMark";
import { CloseIcon, MenuIcon } from "./Icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a soft shadow once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow ${
        scrolled || open ? "border-line shadow-[0_8px_24px_-16px_rgba(21,32,26,0.25)]" : "border-transparent"
      }`}
    >
      <div className="container-site flex min-h-[72px] items-center justify-between gap-4">
        <a href="#top" className="flex min-h-[44px] items-center gap-3" onClick={close}>
          {site.crestImage ? (
            <Image src={asset(site.crestImage)} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
          ) : (
            <KSBadge className="h-10 w-10" />
          )}
          <span className="flex flex-col leading-tight">
            <span className="heading text-[17px] text-emerald">{site.shortName}</span>
            <span className="text-xs font-medium text-muted">Kappa Sigma · Cal Poly</span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center rounded-full px-4 text-[15px] font-medium text-ink/80 hover:bg-emerald-tint hover:text-emerald"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="ml-3">
              <a href="#signup" className="btn btn-primary min-h-[44px] px-5 text-[15px]">
                Reconnect
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-emerald hover:bg-emerald-tint lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      <nav id="mobile-menu" aria-label="Main mobile" hidden={!open} className="border-t border-line bg-white lg:hidden">
        <ul className="container-site flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={close}
                className="flex min-h-[48px] items-center rounded-xl px-3 text-lg font-medium text-ink hover:bg-emerald-tint hover:text-emerald"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a href="#signup" onClick={close} className="btn btn-primary w-full">
              Reconnect
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
