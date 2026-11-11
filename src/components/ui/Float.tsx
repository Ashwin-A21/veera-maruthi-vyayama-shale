"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  /** px of travel following the mouse (negative = moves against cursor) */
  depth?: number;
  /** degrees of 3D tilt following the mouse */
  tilt?: number;
  /** yPercent travel while the element crosses the viewport */
  parallax?: number;
  /** idle bobbing */
  bob?: boolean;
  style?: React.CSSProperties;
};

/**
 * Wrapper that gives cut-out images real depth: scroll parallax on the outer
 * layer, mouse-follow translate + 3D tilt on the inner layer.
 */
export default function Float({
  children,
  className,
  innerClassName,
  depth = 20,
  tilt = 0,
  parallax = 0,
  bob = false,
  style,
}: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!parallax || prefersReducedMotion()) return;
      gsap.fromTo(
        outer.current,
        { yPercent: -parallax / 2 },
        {
          yPercent: parallax / 2,
          ease: "none",
          scrollTrigger: { trigger: outer.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { dependencies: [parallax] },
  );

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const el = inner.current!;
    if (tilt) gsap.set(el, { transformPerspective: 1200 });
    const qx = gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" });
    const qy = gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" });
    const rx = gsap.quickTo(el, "rotationX", { duration: 1.2, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 1.2, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      qx(nx * depth);
      qy(ny * depth);
      if (tilt) {
        ry(nx * tilt);
        rx(-ny * tilt);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [depth, tilt]);

  return (
    <div ref={outer} className={clsx("will-change-transform", className)} style={style}>
      <div
        ref={inner}
        className={clsx("will-change-transform [transform-style:preserve-3d]", innerClassName)}
      >
        <div className={clsx(bob && "bob")}>{children}</div>
      </div>
    </div>
  );
}
