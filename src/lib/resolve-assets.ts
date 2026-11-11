import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { ASSETS, type AssetKey, type AssetMap } from "./assets";

const PUBLIC = path.join(process.cwd(), "public");

const EXTS = [".webp", ".png", ".avif", ".jpg", ".jpeg"];

/** Finds the file under any common extension (hanuman-hero.png, .webp, .jpg …). */
function findFile(src: string): string | null {
  const base = src.replace(/\.[a-z0-9]+$/i, "");
  for (const ext of [path.extname(src), ...EXTS]) {
    if (fs.existsSync(path.join(PUBLIC, base + ext))) return base + ext;
  }
  return null;
}

/**
 * Runs at build time (the page is statically rendered). For every asset it
 * looks for the real file in /public (any image format), reads its true size,
 * and — for cut-outs — checks it really has a transparent background. Missing
 * or unusable files render as an empty slot, never as a broken image.
 */
export async function resolveAssets(): Promise<AssetMap> {
  const out = {} as AssetMap;
  for (const key of Object.keys(ASSETS) as AssetKey[]) {
    const def = ASSETS[key];
    const found = findFile(def.src);
    let ok = !!found;
    let w: number = def.w;
    let h: number = def.h;

    if (found) {
      try {
        const file = path.join(PUBLIC, found);
        const meta = await sharp(file).metadata();
        w = meta.width ?? w;
        h = meta.height ?? h;
        if (def.kind === "cutout") {
          const { isOpaque } = await sharp(file).stats();
          if (!meta.hasAlpha || isOpaque) {
            ok = false;
            console.warn(
              `\n[assets] ${found} has no transparent background (a checkerboard may be painted into the image). ` +
                `It is hidden until it is re-exported with real transparency.\n`,
            );
          }
        }
      } catch {
        ok = false;
      }
    }

    out[key] = {
      ...def,
      w,
      h,
      expected: def.src.replace(/^\//, "public/"),
      placeholder: !ok,
      src: ok && found ? found : "",
    };
  }
  return out;
}

/* ------------------------------------------------------------------ */
/*  Gallery media wall                                                 */
/* ------------------------------------------------------------------ */

export type WallMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
  /** dominant colour, shown while loading and tinted during swaps */
  color: string;
  caption: string;
};

export type WallColumn = {
  name: string;
  /** the 4 stacked tiles */
  stack: WallMedia[];
  /** media the top tile rotates through (starts with stack[0]) */
  cycle: WallMedia[];
};

export const WALL_COLUMNS = 5;
const STACK = 4;
const CYCLE = 4;

const IMG = /\.(jpe?g|png|webp|avif)$/i;
const VID = /\.(mp4|webm|mov)$/i;
const FALLBACK_COLORS = ["#d8cdbf", "#c9b8a3", "#e2d6c6", "#bfae99", "#d3c3ae", "#cbbfb0"];

const stem = (f: string) => f.replace(/\.[^.]+$/, "");
const pretty = (s: string) =>
  stem(s)
    .replace(/^\d{4}-\d{2}-\d{2}[-_ ]?/, "")
    .replace(/^\d+[-_. ]+/, "")
    .replace(/[-_]+/g, " ")
    .trim();

async function colorOf(file: string): Promise<string | null> {
  try {
    const { dominant } = await sharp(file).stats();
    const hex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`;
  } catch {
    return null;
  }
}

/** Reads one folder of media files (photos + videos, video covers paired by name). */
async function readFolder(dir: string, urlBase: string, captions: Record<string, string>, newestFirst: boolean) {
  const files = fs.readdirSync(dir).filter((f) => IMG.test(f) || VID.test(f));
  const videoStems = new Set(files.filter((f) => VID.test(f)).map(stem));
  const list = files
    .filter((f) => !(IMG.test(f) && videoStems.has(stem(f)))) // poster images
    .sort((a, b) => (newestFirst ? b.localeCompare(a) : a.localeCompare(b)));

  const out: WallMedia[] = [];
  for (const f of list) {
    const isVid = VID.test(f);
    const posterFile = isVid ? files.find((p) => IMG.test(p) && stem(p) === stem(f)) : undefined;
    const colorSource = isVid ? (posterFile ? path.join(dir, posterFile) : null) : path.join(dir, f);
    const color = (colorSource && (await colorOf(colorSource))) || FALLBACK_COLORS[out.length % FALLBACK_COLORS.length];
    out.push({
      type: isVid ? "video" : "image",
      src: `${urlBase}/${encodeURIComponent(f)}`,
      poster: posterFile ? `${urlBase}/${encodeURIComponent(posterFile)}` : undefined,
      color,
      caption: captions[f] ?? pretty(f),
    });
  }
  return out;
}

/**
 * Builds the 5 gallery columns from /public/media.
 *
 *  public/media/1-dawn-batch/*.jpg|mp4   → a column labelled "dawn batch"
 *  public/media/*.jpg|mp4                → loose posts, newest filename first,
 *                                          spread over the remaining columns
 *
 * Each column shows 4 stacked tiles; any extra files in a folder rotate into
 * the top tile. Folders with fewer files borrow from the other posts.
 */
export async function resolveGallery(fallback: AssetMap): Promise<WallColumn[]> {
  const root = path.join(PUBLIC, "media");
  let captions: Record<string, string> = {};
  const albums: { name: string; media: WallMedia[] }[] = [];
  let loose: WallMedia[] = [];

  if (fs.existsSync(root)) {
    const capFile = path.join(root, "captions.json");
    if (fs.existsSync(capFile)) {
      try {
        captions = JSON.parse(fs.readFileSync(capFile, "utf8"));
      } catch {
        captions = {};
      }
    }
    const dirs = fs
      .readdirSync(root, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort();
    for (const d of dirs) {
      const media = await readFolder(path.join(root, d), `/media/${encodeURIComponent(d)}`, captions, false);
      if (media.length) albums.push({ name: pretty(d), media });
    }
    loose = await readFolder(root, "/media", captions, true);
  }

  // nothing posted yet → use the site's own photos (if generated), else colour tiles
  if (!albums.length && !loose.length) {
    const keys: AssetKey[] = ["about1", "facMachines", "about3", "facStrength", "about2", "facFreeWeights", "about4", "facFunctional", "facCardio"];
    for (const k of keys) {
      const a = fallback[k];
      if (!a.placeholder) {
        const color = (await colorOf(path.join(PUBLIC, a.src))) || FALLBACK_COLORS[0];
        loose.push({ type: "image", src: a.src, color, caption: a.alt });
      }
    }
  }

  const columns: { name: string; media: WallMedia[] }[] = albums.slice(0, WALL_COLUMNS).map((a) => ({ ...a }));
  const free = WALL_COLUMNS - columns.length;
  if (free > 0) {
    const buckets: WallMedia[][] = Array.from({ length: free }, () => []);
    loose.forEach((m, i) => buckets[i % free].push(m));
    buckets.forEach((b) => columns.push({ name: "", media: b }));
  }

  const pool = [...albums.flatMap((a) => a.media), ...loose];

  return columns.map((col, ci) => {
    const own = col.media;
    const borrowed = pool.filter((m) => !own.includes(m));
    // rotate the borrow pool per column so neighbours don't repeat the same images
    const rotated = borrowed.length ? [...borrowed.slice((ci * 3) % borrowed.length), ...borrowed.slice(0, (ci * 3) % borrowed.length)] : [];
    const filled = [...own, ...rotated];

    const stack: WallMedia[] = [];
    for (let i = 0; i < STACK; i++) {
      stack.push(
        filled[i] ?? {
          type: "image",
          src: "",
          color: FALLBACK_COLORS[(ci + i) % FALLBACK_COLORS.length],
          caption: "",
        },
      );
    }
    const extras = filled.slice(STACK, STACK + CYCLE - 1);
    const cycle = stack[0].src ? [stack[0], ...extras] : [stack[0]];
    return { name: col.name, stack, cycle };
  });
}
