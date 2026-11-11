# Sri Ayyappa Kripa Veera Maruthi Vyayama Shale

Website for a modern gym in Hosangadi, Manjeshwar (Kasaragod, Kerala).

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, **GSAP** and **Lenis**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Requires Node.js 20 or newer.

## Editing the site

| What | Where |
|---|---|
| Name, address, phone, WhatsApp, Instagram, timings | `src/lib/site.ts` |
| Programmes and membership prices | `src/lib/site.ts` |
| Which image goes where | `src/lib/assets.ts` |
| Image list and AI prompts | `IMAGE_ASSETS.md` |
| Gallery photos and reels | `public/media/` (see `public/media/README.md`) |

Values marked `TODO(confirm)` in `src/lib/site.ts` are placeholders and must be
replaced with the gym's real details before going live.

## Images

- Save images under `public/images/…` with the names listed in `IMAGE_ASSETS.md`.
  Any format works (`.png`, `.jpg`, `.webp`, `.avif`).
- Missing images leave an empty space on the live site (a dashed outline with
  the filename appears only in development).
- Background-free images must have real transparency. Images with a painted-in
  checkerboard are detected and hidden, with a warning in the terminal.

## Gallery

The gallery at the end of the page is a moving wall of 5 columns built from
`public/media/`. Each folder there becomes a column (e.g. `1-kabaddi/`,
`2-festivals/`); loose files are spread across the remaining columns.
