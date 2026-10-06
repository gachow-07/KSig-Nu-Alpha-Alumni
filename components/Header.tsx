"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { asset } from "@/lib/paths";
import KSMark from "./KSMark";
import { CloseIcon, MenuIcon } from "./Icons";

export default function Header() {
  const [open, setOpen] = useState(false);

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
    <header className="on-dark sticky top-0 z-50 bg-primary text-white shadow-[0_1px_0_rgba(255,255,255,0.08)]">
      <div className="container-site flex min-h-[72px] items-center justify-between gap-4">
        <a href="#top" className="flex min-h-[44px] items-center gap-3" onClick={close}>
          {site.crestImage && (
            <Image src={asset(site.crestImage)} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
          )}
          <KSMark className="h-7 w-auto" />
          <span className="text-base font-bold leading-tight sm:text-lg">{site.name}</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center rounded-md px-3 font-semibold text-white/90 hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
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
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Main mobile"
        hidden={!open}
        className="border-t border-white/10 bg-primary lg:hidden"
      >
        <ul className="container-site flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={close}
                className="flex min-h-[48px] items-center rounded-md px-3 text-lg font-semibold hover:bg-white/10"
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
