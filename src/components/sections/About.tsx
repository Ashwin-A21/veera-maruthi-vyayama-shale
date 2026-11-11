"use client";

import { useRef } from "react";
import type { AssetMap, AssetKey } from "@/lib/assets";
import { useReveal } from "@/components/ui/useReveal";
import Pic from "@/components/ui/Pic";
import Float from "@/components/ui/Float";
import { features } from "@/lib/site";

const COLLAGE: { key: AssetKey; cls: string }[] = [
  { key: "about1", cls: "col-span-7 rounded-[2.2rem_0.6rem_0.6rem_0.6rem]" },
  { key: "about2", cls: "col-span-5 rounded-[0.6rem_2.2rem_0.6rem_0.6rem]" },
  { key: "about3", cls: "col-span-5 rounded-[0.6rem_0.6rem_0.6rem_2.2rem]" },
  { key: "about4", cls: "col-span-7 rounded-[0.6rem_0.6rem_2.2rem_0.6rem]" },
];

export default function About({ a }: { a: AssetMap }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="about" className="relative bg-paper-2 py-24 md:py-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <p data-reveal className="text-xs font-semibold uppercase tracking-[0.28em] text-saffron">About the shale</p>
          <h2 data-reveal className="mt-4 text-[clamp(2rem,3.6vw,2.9rem)] font-light leading-tight text-ink">
            A new home for strength, <strong className="font-bold text-maroon">right here in Hosangadi.</strong>
          </h2>
          <p data-reveal className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted">
            Here, a morning starts with a prayer to Hanuman and ends with a heavy set. The floor is fitted with brand-new
            multi-station machines, racks and free weights, and we look after every member, from the schoolboy lifting
            his first plate to the grandfather keeping himself fit.
          </p>

          <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8">
            {features.map((f, i) => (
              <li key={f.title} data-reveal data-delay={i * 0.08} className="border-t border-line pt-4">
                <span className="font-script text-2xl text-turmeric">0{i + 1}</span>
                <h3 className="mt-1 text-sm font-bold text-maroon">{f.title}</h3>
                <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* photo collage with the Ayyappa frame hanging over its corner */}
        <div data-reveal className="relative mx-auto w-full max-w-[600px] pt-10 lg:pt-0">
          <div className="grid grid-cols-12 gap-3">
            {COLLAGE.map(({ key, cls }) => (
              <div key={key} className={`relative aspect-[4/3.2] overflow-hidden bg-sand ${cls}`}>
                <Pic asset={a[key]} fill sizes="(min-width:1024px) 25vw, 50vw" className="transition-transform duration-700 hover:scale-[1.04]" />
              </div>
            ))}
          </div>

          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-paper-2 px-7 py-2.5 font-script text-[2rem] leading-none text-ink shadow-[0_8px_30px_-12px_rgba(43,34,29,0.35)] md:text-[2.4rem]">
            Faith &amp; Iron
          </span>

          {/* Ayyappa sits on the collage's top-right corner and breaks out of it */}
          <div className="absolute -right-[4%] -top-[16%] w-[44%] md:-right-[10%] md:-top-[18%] md:w-[44%]">
            <Float depth={12} parallax={16}>
              <Pic asset={a.ayyappa} sizes="(min-width:1024px) 300px, 45vw" className="cutout" />
            </Float>
          </div>
        </div>
      </div>
    </section>
  );
}
