"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { nav, site } from "@/lib/site";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={clsx("inline-flex flex-col leading-none", className)}>
      <span className="font-script text-[1.9rem] text-saffron">Veera Maruthi</span>
      <span className="-mt-0.5 pl-1 text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-ink/70">
        Vyayama Shale
      </span>
    </span>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,padding] duration-500",
        scrolled || open ? "bg-paper/90 py-2 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "py-5",
      )}
    >
      <div className="container-x flex items-center justify-between">
        <a href="#top" aria-label={site.name} onClick={() => setOpen(false)}>
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative text-[0.8rem] font-semibold text-maroon transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-saffron after:transition-transform after:duration-300 hover:text-saffron hover:after:origin-left hover:after:scale-x-100"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className={clsx("h-[1.5px] w-6 bg-ink transition-transform duration-300", open && "translate-y-[3.75px] rotate-45")} />
          <span className={clsx("h-[1.5px] w-6 bg-ink transition-transform duration-300", open && "-translate-y-[3.75px] -rotate-45")} />
        </button>
      </div>

      <div
        className={clsx(
          "grid overflow-hidden transition-[grid-template-rows] duration-500 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <nav className="min-h-0" aria-label="Mobile">
          <ul className="container-x pb-6 pt-4">
            {nav.map((n) => (
              <li key={n.href} className="border-b border-line">
                <a href={n.href} onClick={() => setOpen(false)} className="block py-3.5 text-lg font-semibold text-maroon">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
