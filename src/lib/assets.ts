/**
 * Image registry. Each entry points at a file described in IMAGE_ASSETS.md.
 * If the file is not in /public yet, the site renders an empty slot instead
 * (labelled with the filename in development only).
 *
 * kind "cutout" = photographed object with a transparent background
 * kind "photo"  = normal rectangular photograph
 */

export type AssetKind = "cutout" | "photo";

export type AssetDef = {
  src: string;
  alt: string;
  w: number;
  h: number;
  kind: AssetKind;
};

export const ASSETS = {
  // Hero
  hanuman: {
    src: "/images/hero/hanuman-hero.png",
    alt: "Lord Hanuman holding his golden gada, raising his hand in blessing",
    w: 1086,
    h: 1448,
    kind: "cutout",
  },
  toran: { src: "/images/hero/marigold-toran.webp", alt: "", w: 2400, h: 700, kind: "cutout" },
  dumbbells: { src: "/images/hero/dumbbells.png", alt: "", w: 1400, h: 1000, kind: "cutout" },
  diya: { src: "/images/decor/diya.png", alt: "", w: 1086, h: 1024, kind: "cutout" },
  petals: { src: "/images/decor/marigold-2.png", alt: "", w: 1536, h: 1024, kind: "cutout" },
  marigold: { src: "/images/decor/marigold-1.png", alt: "", w: 1536, h: 1024, kind: "cutout" },

  // About
  ayyappa: {
    src: "/images/about/ayyappa.png",
    alt: "Lord Ayyappa seated in yogapatta posture on a golden pedestal",
    w: 1145,
    h: 1373,
    kind: "cutout",
  },
  about1: { src: "/images/about/about-1.webp", alt: "Members training at dawn", w: 1200, h: 900, kind: "photo" },
  about2: { src: "/images/about/about-2.webp", alt: "Prayer before training", w: 1200, h: 900, kind: "photo" },
  about3: { src: "/images/about/about-3.webp", alt: "Training on a cable machine", w: 1200, h: 900, kind: "photo" },
  about4: { src: "/images/about/about-4.webp", alt: "Coach guiding a member", w: 1200, h: 900, kind: "photo" },

  // Facilities strip
  facFreeWeights: { src: "/images/facilities/free-weights.webp", alt: "Dumbbell rack", w: 1200, h: 1500, kind: "photo" },
  facStrength: { src: "/images/facilities/strength-rigs.webp", alt: "Squat rack with barbell", w: 1200, h: 1500, kind: "photo" },
  facCardio: { src: "/images/facilities/cardio.webp", alt: "Cardio machines by the window", w: 1200, h: 1500, kind: "photo" },
  facMachines: { src: "/images/facilities/machines.webp", alt: "Multi-station gym machines", w: 1200, h: 1500, kind: "photo" },
  facFunctional: { src: "/images/facilities/functional.webp", alt: "Kettlebells and ropes", w: 1200, h: 1500, kind: "photo" },

  // Training board decoration (rests over the board edge)
  kettlebell: { src: "/images/decor/kettlebell.png", alt: "", w: 933, h: 1235, kind: "cutout" },

  // Membership backdrop
  mandala: { src: "/images/membership/mandala.png", alt: "", w: 1254, h: 1254, kind: "cutout" },

  // Contact
  exterior: { src: "/images/contact/exterior.webp", alt: "The shale building", w: 1600, h: 1000, kind: "photo" },
  bell: { src: "/images/decor/bell.png", alt: "", w: 792, h: 1461, kind: "cutout" },

  // Footer
  hanumanRising: { src: "/images/footer/hanuman-rising.png", alt: "", w: 1312, h: 1199, kind: "cutout" },
} satisfies Record<string, AssetDef>;

export type AssetKey = keyof typeof ASSETS;

export type ResolvedAsset = AssetDef & {
  /** true while the real file is missing */
  placeholder: boolean;
  /** where the real file should be saved, for the dev label */
  expected: string;
};

export type AssetMap = Record<AssetKey, ResolvedAsset>;
