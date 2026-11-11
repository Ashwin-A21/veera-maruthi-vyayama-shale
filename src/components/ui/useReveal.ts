"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Gentle fade-up for every [data-reveal] inside the section (stagger via data-delay). */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-reveal]", scope.current).forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 1,
          delay: Number(el.dataset.delay ?? 0),
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    },
    { scope },
  );
}
