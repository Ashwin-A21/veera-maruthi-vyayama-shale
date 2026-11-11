"use client";

import { useRef } from "react";
import type { AssetMap } from "@/lib/assets";
import { useReveal } from "@/components/ui/useReveal";
import Pic from "@/components/ui/Pic";
import Float from "@/components/ui/Float";
import { features } from "@/lib/site";

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

        {/* Ayyappa in a warm arch, rising out of its top edge */}
        <figure data-reveal className="relative mx-auto w-full max-w-[460px] pt-[18%]">
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-[2rem] shadow-[0_30px_60px_-35px_rgba(91,31,27,0.55)]"
            style={{
              background:
                "radial-gradient(60% 45% at 50% 38%, rgba(211,155,53,0.45), transparent 70%), linear-gradient(180deg, #efe2cc 0%, #e4d2b6 100%)",
            }}
          >
            {/* faint concentric rings, like a temple prabhavali */}
            <div className="absolute left-1/2 top-[36%] aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-turmeric/30" />
            <div className="absolute left-1/2 top-[36%] aspect-square w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-turmeric/30" />
            <div className="absolute inset-3 rounded-t-full rounded-b-[1.6rem] border border-paper/60" />
          </div>

          <div className="absolute -inset-x-[10%] bottom-[8%]">
            <Float depth={12} parallax={14}>
              <Pic asset={a.ayyappa} sizes="(min-width:1024px) 440px, 90vw" className="cutout" />
            </Float>
          </div>

          <figcaption className="mt-6 text-center">
            <span className="block font-kn text-xl text-maroon md:text-2xl">ಸ್ವಾಮಿಯೇ ಶರಣಂ ಅಯ್ಯಪ್ಪ</span>
            <span className="mt-1 block text-xs uppercase tracking-[0.24em] text-muted">
              The blessing our shale is named for
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
