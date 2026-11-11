"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import type { WallColumn, WallMedia } from "@/lib/resolve-assets";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";

/*
 * Media wall, modelled on the vivmgmt.com home gallery:
 *  - 5 columns of 3:4 tiles on a track wider than the screen; on desktop the
 *    track pans left/right following the mouse (lerp 0.05), on phones it is a
 *    native horizontal scroll.
 *  - Scrolling lifts every column, each with its own lag (0.5/0.8/0.2/0.3/0.6s).
 *  - A looping timeline visits one column at a time: the top two tiles dip
 *    70px and fade, the top tile swaps to the next photo/video and tints to its
 *    colour, then they rise back. After the last column it rests for 3s.
 *  - Entrance: the wall starts at 1.3x scale and settles while tiles fade in.
 */

const OFFSETS = [0, 0.516, 0.218, 0.516, 0]; // column start offsets, in tile heights
const LAG = [0.5, 0.8, 0.2, 0.3, 0.6]; // per-column follow duration
const GAP = 10;
const SHIFT = 1.25; // how far (in tile heights) columns travel while scrolling

export default function Gallery({ columns }: { columns: WallColumn[] }) {
  const [open, setOpen] = useState<number | null>(null);

  // flat, de-duplicated list for the viewer
  const all = useMemo(() => {
    const seen = new Set<string>();
    const out: WallMedia[] = [];
    columns.forEach((c) =>
      [...c.stack, ...c.cycle].forEach((m) => {
        if (m.src && !seen.has(m.src)) {
          seen.add(m.src);
          out.push(m);
        }
      }),
    );
    return out;
  }, [columns]);

  const openSrc = useCallback(
    (src: string) => {
      const i = all.findIndex((m) => m.src === src);
      if (i >= 0) setOpen(i);
    },
    [all],
  );

  return (
    <section id="gallery" className="relative overflow-hidden bg-paper pt-24 md:pt-32">
      <Wall columns={columns} onOpen={openSrc} />
      {open !== null && <Viewer items={all} index={open} setIndex={setOpen} />}
    </section>
  );
}

/* ------------------------------------------------------------------ */

const Wall = memo(function Wall({ columns, onOpen }: { columns: WallColumn[]; onOpen: (src: string) => void }) {
  const wall = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const down = useRef({ x: 0, y: 0 });

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const media = gsap.utils.toArray<HTMLElement>("[data-media]", wall.current);
      const colEls = gsap.utils.toArray<HTMLElement>("[data-col]", wall.current);
      const tileH = () => (colEls[0]?.offsetWidth ?? 300) * (4 / 3);

      if (reduced) {
        gsap.set(media, { opacity: 1 });
        return;
      }

      /* ---- entrance ---- */
      gsap.set(stage.current, { scale: 1.3, y: "5vh", transformOrigin: "center top" });
      gsap.set(media, { opacity: 0 });
      gsap.set("[data-wordmark]", { clipPath: "inset(0 100% 0 0)" });
      gsap.set("[data-tagline]", { opacity: 0 });

      let introDone = false;
      ScrollTrigger.create({
        trigger: wall.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(media, { opacity: 1, duration: 0.8, ease: "power1.out", stagger: 0.04 });
          gsap
            .timeline({ delay: 0.6, onComplete: () => (introDone = true) })
            .to(stage.current, { scale: 1, y: 0, duration: 1.6, ease: "power2.out" }, 0)
            .to("[data-wordmark]", { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "power3.inOut" }, 0)
            .to("[data-tagline]", { opacity: 1, duration: 0.6, ease: "power2.out" }, 1.6);
        },
      });

      /* ---- scroll: columns rise with different lag ---- */
      const movers = colEls.map((c, i) => gsap.quickTo(c, "y", { duration: LAG[i % LAG.length], ease: "power3" }));
      ScrollTrigger.create({
        trigger: wall.current,
        start: "top 75%",
        end: "bottom bottom",
        onUpdate: (self) => movers.forEach((m) => m(-self.progress * tileH() * SHIFT)),
        invalidateOnRefresh: true,
      });

      /* ---- the cycling timeline ---- */
      const states = colEls.map((col, ci) => {
        const wraps = gsap.utils.toArray<HTMLElement>("[data-wrap]", col).slice(0, 2);
        const first = wraps[0];
        const img = first.querySelector<HTMLImageElement>("img")!;
        const vid = first.querySelector<HTMLVideoElement>("video")!;
        const second = wraps[1] ? Array.from(wraps[1].querySelectorAll<HTMLElement>("[data-media]")) : [];
        const cycle = columns[ci].cycle;
        if (cycle[1]?.type === "image" && cycle[1].src) new Image().src = cycle[1].src;
        return { wraps, first, img, vid, second, cycle, index: 0, type: cycle[0].type };
      });

      const current = (s: (typeof states)[number]) => (s.type === "video" ? s.vid : s.img);
      const STEP = 0.12;
      const tl = gsap.timeline({ repeat: -1, paused: true });
      let at = 0;
      states.forEach((s, i) => {
        const n = at;
        tl.to(s.wraps, { y: 70, duration: 1, ease: "power1.inOut" }, n);
        tl.call(() => gsap.to([current(s), ...s.second], { opacity: 0, duration: 0.9, ease: "sine.inOut" }), [], n + 0.1);
        tl.to({}, { duration: STEP }, n + 1);
        tl.call(
          () => {
            if (s.cycle.length < 2) return;
            s.index = (s.index + 1) % s.cycle.length;
            const next = s.cycle[s.index];
            if (next.type === "video") {
              s.vid.src = next.src;
              if (next.poster) s.vid.poster = next.poster;
              gsap.set(s.img, { display: "none" });
              gsap.set(s.vid, { display: "block", opacity: 0 });
              s.vid.play().catch(() => {});
            } else {
              s.img.src = next.src;
              gsap.set(s.vid, { display: "none" });
              s.vid.pause();
              gsap.set(s.img, { display: "block", opacity: 0 });
              const after = s.cycle[(s.index + 1) % s.cycle.length];
              if (after.type === "image" && after.src) new Image().src = after.src;
            }
            s.type = next.type;
            s.first.dataset.src = next.src;
            gsap.to(s.first, { backgroundColor: next.color, duration: 0.5, ease: "sine.inOut" });
          },
          [],
          n + 1 + STEP,
        );
        tl.to(s.wraps, { y: 0, duration: 1, ease: "power1.inOut" }, n + 1 + STEP);
        tl.call(() => gsap.to([current(s), ...s.second], { opacity: 1, duration: 0.85, ease: "sine.inOut" }), [], n + 1 + STEP);
        const p = n + 2.12;
        if (i === states.length - 1) {
          tl.to({}, { duration: 3 }, p);
        } else {
          at = p - 1.5;
        }
      });

      // play only while the wall is on screen (after the entrance)
      const videos = Array.from(wall.current!.querySelectorAll("video"));
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            gsap.delayedCall(introDone ? 0 : 2.4, () => tl.play());
            videos.forEach((v) => v.style.display !== "none" && v.play().catch(() => {}));
          } else {
            tl.pause();
            videos.forEach((v) => v.pause());
          }
        },
        { threshold: 0.15 },
      );
      io.observe(wall.current!);

      return () => {
        io.disconnect();
        tl.kill();
      };
    },
    { scope: wall, dependencies: [columns] },
  );

  /* ---- horizontal pan following the mouse (desktop) ---- */
  useEffect(() => {
    const vp = viewport.current!;
    const track = inner.current!;
    const desktop = window.matchMedia("(min-width: 992px)");
    let current = 0;
    let target = 0;
    let center = 0;
    let raf = 0;
    let alive = true;

    const measure = (reset: boolean) => {
      if (!desktop.matches) {
        track.style.transform = "";
        vp.scrollLeft = (track.scrollWidth - vp.clientWidth) / 2;
        return;
      }
      const max = Math.max(0, track.scrollWidth - vp.clientWidth);
      center = -max / 2;
      if (reset) current = target = center;
      (vp as HTMLDivElement & { _max?: number })._max = max;
    };
    const onMove = (e: PointerEvent) => {
      if (!desktop.matches || e.pointerType !== "mouse") return;
      const r = vp.getBoundingClientRect();
      const nx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      target = -((vp as HTMLDivElement & { _max?: number })._max ?? 0) * nx;
    };
    const onLeave = () => (target = center);
    const loop = () => {
      if (!alive) return;
      if (desktop.matches) {
        current += 0.05 * (target - current);
        track.style.transform = `translate3d(${current}px,0,0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    const onResize = () => measure(true);

    measure(true);
    loop();
    vp.addEventListener("pointermove", onMove, { passive: true });
    vp.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      vp.removeEventListener("pointermove", onMove);
      vp.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onClick = (e: React.MouseEvent) => {
    if (Math.hypot(e.clientX - down.current.x, e.clientY - down.current.y) > 6) return; // was a drag
    const wrap = (e.target as HTMLElement).closest<HTMLElement>("[data-wrap]");
    if (wrap?.dataset.src) onOpen(wrap.dataset.src);
  };

  return (
    <div
      ref={wall}
      className="relative [--colw:58vw] sm:[--colw:42vw] lg:[--colw:32.7vw]"
      style={{ height: `calc(var(--colw) * 4 / 3 * ${(4 + OFFSETS[1] - SHIFT).toFixed(3)} + ${GAP * 3}px)` }}
    >
      <div ref={stage} className="absolute inset-0">
        {/* wordmark sits behind the tiles */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-0 w-max -translate-x-1/2 text-center">
          <p data-wordmark className="font-script text-[clamp(4.2rem,11.5vw,11rem)] leading-[0.9] text-ink">
            Veera Maruthi
          </p>
          <p data-tagline className="mx-auto mt-3 max-w-xs text-sm leading-snug text-muted md:absolute md:-right-4 md:top-2 md:mt-0 md:max-w-[15rem] md:translate-x-full md:text-left">
            Photos &amp; reels from the shale floor.{" "}
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="pointer-events-auto font-semibold text-saffron">
              Instagram ↗
            </a>
          </p>
        </div>

        <div
          ref={viewport}
          onPointerDown={(e) => (down.current = { x: e.clientX, y: e.clientY })}
          onClick={onClick}
          className="absolute inset-0 z-10 overflow-x-auto overflow-y-hidden [scrollbar-width:none] lg:overflow-hidden [&::-webkit-scrollbar]:hidden"
        >
          <div ref={inner} className="flex w-max items-start will-change-transform" style={{ gap: GAP }}>
            {columns.map((col, ci) => (
              <div
                key={ci}
                data-col
                className="group/col w-[var(--colw)] shrink-0"
                style={{ marginTop: `calc(var(--colw) * 4 / 3 * ${OFFSETS[ci % OFFSETS.length]})` }}
              >
                <div className="flex flex-col" style={{ gap: GAP }}>
                  {col.stack.map((m, ti) => (
                    <Tile key={ti} media={m} first={ti === 0} label={ti === 0 ? col.name : ""} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

function Tile({ media, first, label }: { media: WallMedia; first: boolean; label: string }) {
  const isVid = media.type === "video";
  return (
    <div
      data-wrap
      data-src={media.src || undefined}
      className={clsx("relative aspect-[3/4] w-full overflow-hidden", media.src && "cursor-pointer")}
      style={{ backgroundColor: media.color }}
    >
      {/* every tile renders both elements; the first tile switches between them while cycling */}
      {(first || !isVid) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          data-media
          src={!isVid && media.src ? media.src : undefined}
          alt={media.caption}
          loading={first ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ display: isVid || !media.src ? "none" : "block" }}
        />
      )}
      {(first || isVid) && (
        <video
          data-media
          src={isVid ? media.src : undefined}
          poster={isVid ? media.poster : undefined}
          muted
          loop
          playsInline
          autoPlay={isVid}
          preload={isVid ? "metadata" : "none"}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ display: isVid ? "block" : "none" }}
        />
      )}
      {label && (
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink opacity-0 transition-opacity duration-300 group-hover/col:opacity-100">
          {label}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Viewer({ items, index, setIndex }: { items: WallMedia[]; index: number; setIndex: (i: number | null) => void }) {
  const item = items[index];
  const step = useCallback((d: number) => setIndex((index + d + items.length) % items.length), [index, items.length, setIndex]);

  useEffect(() => {
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [setIndex, step]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption || "Gallery"}
      onClick={() => setIndex(null)}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-paper/97 p-4 md:p-12"
    >
      <div className="flex max-h-full w-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        {item.type === "video" ? (
          <video key={item.src} src={item.src} poster={item.poster} controls autoPlay playsInline className="max-h-[78svh] max-w-full" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.src} alt={item.caption} className="max-h-[78svh] max-w-full object-contain" />
        )}
        <div className="mt-4 flex w-full items-center justify-between gap-6 text-sm text-muted">
          <span className="capitalize">{item.caption}</span>
          <span className="tabular-nums">
            {index + 1} / {items.length}
          </span>
        </div>
      </div>
      {(["prev", "next"] as const).map((d) => (
        <button
          key={d}
          onClick={(e) => {
            e.stopPropagation();
            step(d === "next" ? 1 : -1);
          }}
          aria-label={d === "next" ? "Next" : "Previous"}
          className={clsx(
            "absolute top-1/2 -translate-y-1/2 rounded-full bg-paper-2 p-3 text-ink shadow hover:text-saffron",
            d === "next" ? "right-3 md:right-8" : "left-3 md:left-8",
          )}
        >
          <svg viewBox="0 0 24 24" className={clsx("h-5 w-5", d === "prev" && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      ))}
      <button
        onClick={() => setIndex(null)}
        className="absolute right-4 top-4 rounded-full bg-paper-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink shadow hover:text-saffron md:right-8 md:top-8"
      >
        Close
      </button>
    </div>
  );
}
