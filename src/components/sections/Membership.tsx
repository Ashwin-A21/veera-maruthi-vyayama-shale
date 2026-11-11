"use client";

import { useRef } from "react";
import type { AssetMap } from "@/lib/assets";
import { useReveal } from "@/components/ui/useReveal";
import Pic from "@/components/ui/Pic";
import { plans, site } from "@/lib/site";

/** A plain, honest price list with a slowly turning gold mandala behind it. */
export default function Membership({ a }: { a: AssetMap }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const half = Math.ceil(plans.length / 2);
  const cols = [plans.slice(0, half), plans.slice(half)];
  const msg = encodeURIComponent(`Namaskara! I'd like to know about membership at ${site.shortName} Vyayama Shale.`);

  return (
    <section ref={root} id="membership" className="relative overflow-hidden bg-coal py-24 text-[#f3ece2] md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 w-[140vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.13] md:w-[min(70vw,1000px)]"
      >
        <div style={{ animation: "turn 160s linear infinite" }}>
          <Pic asset={a.mandala} sizes="1000px" />
        </div>
      </div>

      <div className="container-x relative">
        <div className="text-center">
          <p data-reveal className="font-script text-[2.4rem] leading-none text-turmeric">Membership</p>
          <h2 data-reveal className="mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] font-light uppercase tracking-[0.06em]">
            Simple plans
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-x-20 md:grid-cols-2">
          {cols.map((col, ci) => (
            <ul key={ci}>
              {col.map((p, i) => (
                <li
                  key={p.name}
                  data-reveal
                  data-delay={i * 0.06}
                  className="flex items-baseline justify-between gap-6 border-b border-turmeric/25 py-5"
                >
                  <span>
                    <span className="block text-[1.05rem] font-medium">{p.name}</span>
                    <span className="mt-0.5 block text-[0.78rem] text-[#f3ece2]/55">{p.note}</span>
                  </span>
                  <span className="shrink-0 text-lg font-bold text-turmeric">₹{p.price}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div data-reveal className="mt-14 flex flex-col items-center gap-5 text-center">
          <p className="text-sm text-[#f3ece2]/60">Prices are per person. Talk to us and we&apos;ll help you pick the right plan.</p>
          <a
            href={`https://wa.me/${site.whatsapp}?text=${msg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-turmeric px-7 py-3.5 text-sm font-semibold text-coffee transition-colors hover:bg-[#e8c98c]"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
