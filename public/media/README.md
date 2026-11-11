# Gallery media — drop your posts here

Everything in this folder appears in the **Gallery** wall at the end of the site
after the next build (or a restart of `npm run dev`).

- Photos: `.jpg` `.jpeg` `.png` `.webp` `.avif`
- Videos / reels: `.mp4` `.webm` (prefer MP4, H.264, under ~8 MB, 720×1280)

## How the wall is filled

The wall has **5 columns**. Each column shows 4 tiles, and its top tile keeps
rotating to new photos/videos.

**Option A — folders (recommended).** Make up to 5 folders. Each folder becomes a
column, its name is shown as the label when hovering:

```
public/media/1-dawn-batch/      → "dawn batch"
public/media/2-competitions/    → "competitions"
public/media/3-festivals/       → "festivals"
...
```

Inside a folder, files are used in name order. The first 4 make the column;
any extra files rotate into the top tile.

**Option B — loose files.** Files placed directly in `public/media/` are spread
across the remaining columns, newest filename first, so name them with the
date: `2026-11-10-dawn-batch.jpg`, `2026-11-12-deadlift-pr.mp4`.

## Captions and video covers

- Captions come from the filename, or set them in `public/media/captions.json`:
  `{ "2026-11-12-deadlift-pr.mp4": "Ravi pulls 220 kg — new shale record" }`
- Video cover: add an image with the same name, e.g. `clip.mp4` + `clip.jpg`.

Each tile shows the photo's own main colour while it loads, so keep at least
some photos in every column.
