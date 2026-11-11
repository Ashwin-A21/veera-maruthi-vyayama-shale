"use client";

import { useRef } from "react";
import type { AssetMap } from "@/lib/assets";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import Pic from "@/components/ui/Pic";
import Float from "@/components/ui/Float";

/**
 * Hero: Lord Hanuman on the right, a marigold toran across the top and a
 * few objects at the edges of the frame, in soft warm light.
 */
export default function Hero({ a }: { a: AssetMap }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-h-text]", { y: 24, opacity: 0, duration: 1.1, stagger: 0.12 }, 0.15)
        .from("[data-h-idol]", { y: 40, opacity: 0, duration: 1.4 }, 0.1)
        .from("[data-h-toran]", { yPercent: -30, opacity: 0, duration: 1.4 }, 0.3)
        .from("[data-h-prop]", { y: 30, opacity: 0, duration: 1.2, stagger: 0.12 }, 0.45);

      gsap.to("[data-h-idol-wrap]", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative z-10 overflow-x-clip bg-paper">
      {/* marigold toran on the wall behind Hanuman (desktop) */}
      <div data-h-toran className="pointer-events-none absolute right-[6vw] top-[1.5vw] z-0 hidden w-[36vw] max-w-[600px] md:block">
        <Float depth={6}>
          <Pic asset={a.toran} priority sizes="40vw" className="cutout" />
        </Float>
      </div>

      {/* loose petals at the left edge */}
      <div data-h-prop className="pointer-events-none absolute -left-[4vw] top-[58%] z-0 hidden w-[16vw] max-w-[220px] md:block">
        <Float depth={-10}>
          <Pic asset={a.petals} sizes="220px" className="cutout" />
        </Float>
      </div>

      <div className="container-x relative z-10 grid min-h-[100svh] items-center gap-6 pb-16 pt-32 md:grid-cols-[1.05fr_1fr] md:pb-0 md:pt-24">
        {/* copy */}
        <div className="relative z-10 max-w-xl">
          <p data-h-text className="text-[1.05rem] font-medium leading-snug text-ink md:text-[1.35rem]">
            Sri Ayyappa Kripa
            <br />
            Veera Maruthi Vyayama Shale.
          </p>
          <h1 data-h-text className="mt-4 font-script text-[clamp(2.9rem,6.4vw,5.6rem)] leading-[1.05] text-turmeric">
            Strength with devotion, every single day.
          </h1>
          <p data-h-text className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted">
            A modern gym in Hosangadi, Manjeshwar, with brand-new equipment and the spirit of a vyayama shale.
            Come as you are. Leave stronger.
          </p>
          <div data-h-text className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#membership"
              className="rounded-full bg-turmeric px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(211,155,53,0.9)] transition-colors hover:bg-saffron"
            >
              Join the shale
            </a>
            <a href="#contact" className="text-sm font-semibold text-maroon underline decoration-turmeric/60 underline-offset-[6px] hover:text-saffron">
              Visit us
            </a>
          </div>
        </div>

        {/* idol */}
        <div data-h-idol-wrap className="relative mx-auto w-[82%] max-w-[560px] md:mb-[-8vh] md:mt-[14vh] md:w-full md:self-end">
          <div data-h-idol>
            <Float depth={10}>
              <Pic asset={a.hanuman} priority sizes="(min-width:768px) 45vw, 85vw" className="cutout" />
            </Float>
          </div>
          {/* lit diya and a marigold, floating just in front of Hanuman */}
          <div data-h-prop className="absolute -left-[20%] bottom-[20%] w-[30%] md:-left-[26%] md:bottom-[24%]">
            <Float depth={22} bob>
              <Pic asset={a.diya} sizes="220px" className="cutout" />
            </Float>
          </div>
          <div data-h-prop className="absolute -left-[4%] bottom-[12%] z-10 w-[24%] md:-left-[8%] md:bottom-[15%]">
            <Float depth={34}>
              <Pic asset={a.marigold} sizes="180px" className="cutout" />
            </Float>
          </div>
        </div>
      </div>

      {/* dumbbells resting at the right edge, cropped by the frame */}
      <div data-h-prop className="pointer-events-none absolute -right-[5vw] bottom-[-10vh] z-20 w-[34vw] md:w-[15vw] md:max-w-[260px]">
        <Float depth={18}>
          <Pic asset={a.dumbbells} sizes="300px" className="cutout" />
        </Float>
      </div>

      {/* scroll notch */}
      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-0 left-1/2 z-30 flex h-12 w-24 -translate-x-1/2 items-start justify-center rounded-t-full bg-paper-2 pt-2.5"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-turmeric text-white" style={{ animation: "nudge 2s ease-in-out infinite" }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </a>
    </section>
  );
}
