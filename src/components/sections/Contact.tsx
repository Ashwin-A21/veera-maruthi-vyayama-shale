"use client";

import { useRef } from "react";
import type { AssetMap } from "@/lib/assets";
import { useReveal } from "@/components/ui/useReveal";
import Pic from "@/components/ui/Pic";
import { site } from "@/lib/site";

export default function Contact({ a }: { a: AssetMap }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapsQuery)}&z=15&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`;

  return (
    <section ref={root} id="contact" className="bg-sand py-24 md:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div data-reveal className="relative mt-16 lg:mt-0">
          {/* temple bell hanging over the card's top edge, gently swinging */}
          <div className="pointer-events-none absolute -top-[18%] right-[8%] z-10 w-[17%] max-w-[120px]">
            <div className="origin-top" style={{ animation: "swing 4.5s ease-in-out infinite" }}>
              <Pic asset={a.bell} sizes="120px" className="cutout" />
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] bg-paper shadow-[0_20px_50px_-30px_rgba(43,34,29,0.5)]">
            {!a.exterior.placeholder && (
              <div className="relative aspect-[16/9]">
                <Pic asset={a.exterior} fill sizes="(min-width:1024px) 50vw, 100vw" />
              </div>
            )}
            <iframe
              title="Map to Veera Maruthi Vyayama Shale, Hosangadi"
              src={mapSrc}
              className="block aspect-[4/3] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="space-y-10">
          <div data-reveal>
            <h2 className="text-2xl font-semibold text-maroon">Find us</h2>
            <p className="mt-3 leading-relaxed text-ink/80">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
            <a href={mapLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-saffron underline underline-offset-4">
              Get directions
            </a>
          </div>

          <div data-reveal>
            <h2 className="text-2xl font-semibold text-maroon">Call us</h2>
            <p className="mt-3 space-y-1">
              {site.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block text-ink/80 hover:text-saffron">
                  {p}
                </a>
              ))}
            </p>
          </div>

          <div data-reveal>
            <h2 className="text-2xl font-semibold text-maroon">Timings</h2>
            <ul className="mt-3 space-y-1.5 text-ink/80">
              {site.hours.map((h, i) => (
                <li key={i} className="flex max-w-sm justify-between gap-6">
                  <span className="text-muted">{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
