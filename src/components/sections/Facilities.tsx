"use client";

import { useRef } from "react";
import type { AssetMap } from "@/lib/assets";
import { useReveal } from "@/components/ui/useReveal";
import Pic from "@/components/ui/Pic";
import { facilities } from "@/lib/site";

/** Edge-to-edge strip of photo tiles with outlined labels, scalloped top edge. */
export default function Facilities({ a }: { a: AssetMap }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="facilities" className="relative bg-paper-2 pb-6">
      <div className="container-x flex flex-col justify-between gap-4 pb-10 md:flex-row md:items-end">
        <div>
          <p data-reveal className="text-xs font-semibold uppercase tracking-[0.28em] text-saffron">Facilities</p>
          <h2 data-reveal className="mt-4 text-[clamp(1.8rem,3.2vw,2.6rem)] font-light leading-tight text-ink">
            All new equipment, <strong className="font-bold text-maroon">under one roof.</strong>
          </h2>
        </div>
        <p data-reveal className="max-w-xs text-sm leading-relaxed text-muted">
          Multi-station machines, power racks, free weights and cardio — everything you need to train well.
        </p>
      </div>

      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-2 [scrollbar-width:none] md:grid md:grid-cols-5 md:overflow-visible">
        {facilities.map((f, i) => (
          <figure
            key={f.key}
            className="group relative aspect-[4/5] w-[72vw] shrink-0 snap-start overflow-hidden rounded-md bg-sand sm:w-[44vw] md:w-auto"
          >
            <Pic
              asset={a[f.key]}
              fill
              sizes="(min-width:768px) 20vw, 72vw"
              className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-4 bottom-4 flex items-baseline gap-3 text-white">
              <span className="text-[0.7rem] font-semibold text-[#e8c98c]">0{i + 1}</span>
              <span className="text-base font-semibold transition-transform duration-500 group-hover:translate-x-1">{f.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
