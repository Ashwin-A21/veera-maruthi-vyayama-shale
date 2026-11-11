"use client";

import { useRef } from "react";
import type { AssetMap } from "@/lib/assets";
import { useReveal } from "@/components/ui/useReveal";
import Pic from "@/components/ui/Pic";
import Float from "@/components/ui/Float";
import { programmes, site } from "@/lib/site";

/** Programmes laid out like a hand-kept menu board. */
export default function Training({ a }: { a: AssetMap }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="training" className="relative bg-coffee py-24 text-[#f3ece2] md:py-32">
      {/* kettlebell resting over the board's top edge */}
      <div className="pointer-events-none absolute -top-[12vw] right-[6%] z-10 w-[28vw] sm:w-[20vw] md:-top-[5vw] md:right-[40%] md:w-[10vw] md:max-w-[170px]">
        <Float depth={12} parallax={24}>
          <Pic asset={a.kettlebell} sizes="240px" className="cutout" />
        </Float>
      </div>

      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p data-reveal className="font-script text-[2.4rem] leading-none text-turmeric">Training &amp; Fitness</p>
            <h2 data-reveal className="mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] font-light uppercase tracking-[0.06em]">
              Find your path
            </h2>
          </div>
          <p data-reveal className="rounded-full bg-turmeric px-5 py-2 text-center text-[0.72rem] font-semibold leading-tight text-coffee">
            Morning &amp; evening batches
            <br />
            <span className="font-bold">{site.hours[0].time.split(" – ")[0]} &amp; {site.hours[1].time.split(" – ")[0]}</span>
          </p>
        </div>

        <div className="mt-14 grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p, i) => (
            <div key={p.title} data-reveal data-delay={(i % 3) * 0.08}>
              <div className="leader flex items-center justify-between gap-4 pb-2.5 text-[#f3ece2]/40">
                <h3 className="text-[1.05rem] font-medium text-[#f3ece2]">{p.title}</h3>
                <span className="shrink-0 rounded-full bg-turmeric px-3 py-0.5 text-[0.7rem] font-bold text-coffee">{p.tag}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {p.items.map((it) => (
                  <li key={it} className="flex items-center gap-2.5 text-[0.85rem] text-[#e8c98c]">
                    <span className="h-1 w-1 rounded-full bg-[#e8c98c]" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
