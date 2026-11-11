# Image Plan — Veera Maruthi Vyayama Shale

Save each image at the path shown, then restart `npm run dev` (or rebuild).
**Any format works** — `.png`, `.jpg`, `.webp` or `.avif` with the same name.
The site reads the real size of each file and converts it to fast WebP/AVIF
automatically when it is served, so large PNGs are fine.

Background-free ("cut-out") images must have **real transparency**. If an AI tool
paints a grey-and-white checkerboard into the picture, the site detects it and
hides the image (you'll see a warning in the terminal). Fix it with remove.bg,
Photoshop *Remove Background*, or ChatGPT: *"remove the background, export as PNG
with a transparent background"*.

---

## Status

| Slot | File | Transparent | Status |
|---|---|---|---|
| Hero — Hanuman | `public/images/hero/hanuman-hero.png` | ✓ | ✅ added |
| About — Ayyappa | `public/images/about/ayyappa.png` | ✓ | ✅ added |
| Training — kettlebell | `public/images/decor/kettlebell.png` | ✓ | ✅ added (background cleaned) |
| Footer — Hanuman namaskar | `public/images/footer/hanuman-rising.png` | ✓ | ✅ added (background cleaned) |
| Hero — brass diya | `public/images/decor/diya.png` | ✓ | ✅ added (background cleaned) |
| Hero — marigold flower | `public/images/decor/marigold-1.png` | ✓ | ✅ added |
| Hero — marigold petals | `public/images/decor/marigold-2.png` | ✓ | ✅ added |
| Contact — temple bell | `public/images/decor/bell.png` | ✓ | ✅ added (background cleaned) |
| Membership — mandala | `public/images/membership/mandala.png` | ✓ | ✅ added (background cleaned) |
| Hero — marigold toran | `public/images/hero/marigold-toran.png` | ✓ | ☐ |
| Hero — dumbbells | `public/images/hero/dumbbells.png` | ✓ | ☐ |
| About collage ×4 | `public/images/about/about-1…4.jpg` | — | ☐ |
| Facilities ×5 | `public/images/facilities/*.jpg` | — | ☐ |
| Contact — building | `public/images/contact/exterior.jpg` | — | ☐ optional (real photo best) |
| Social share card | `public/og-image.jpg` | — | ☐ |

The **gallery** uses your own posts from `public/media/` — see section 6.

---

## Style notes (keep everything consistent)

Your Hanuman and Ayyappa images set the look: warm, golden, softly lit,
richly detailed. Match the remaining pieces to them:

**Cut-outs** — add to the end of each prompt:
> Warm golden studio lighting from the upper left, soft natural shadows, rich
> detail, realistic materials, colours of saffron, marigold orange, burnished gold
> and warm ivory, isolated object, PNG with a fully transparent background,
> no text, no watermark.

**Photos** — add to the end of each prompt:
> Natural documentary photograph, soft daylight from windows, warm and honest
> colours (terracotta, ochre, teak brown, off-white), real people from coastal
> Karnataka–Kerala, slight film grain, no text, no logos, no watermark.

---

## 1. Hero

**1.1 Marigold toran** → `public/images/hero/marigold-toran.png` · 2400 × 700 · transparent
> A traditional Indian marigold toran: several strings of bright orange and yellow
> marigold flowers with green mango leaves, hanging in gentle curves from a
> horizontal line, front view, wide format.

**1.2 Dumbbells** → `public/images/hero/dumbbells.png` · 1400 × 1000 · transparent
> A pair of brand-new black rubber hex dumbbells with knurled chrome handles,
> resting on the floor side by side, slight three-quarter view.

**1.3 Brass diya** → `public/images/hero/brass-diya.png` · 900 × 900 · transparent
> A traditional South Indian brass oil lamp (diya) with one bright flame, polished
> brass with engraved petal rim, three-quarter view from slightly above.

**1.4 Marigold petals** → `public/images/hero/marigold-petals.png` · 900 × 900 · transparent
> A loose scatter of fresh orange and yellow marigold petals and two whole
> marigold flowers, top view, natural arrangement.

## 2. About

**2.1 Photo collage (4 photos)** → `public/images/about/about-1.jpg … about-4.jpg` · 1200 × 900 · 4:3
1. *Morning batch:* a group of local men and women warming up together on rubber flooring in a bright, modern gym at sunrise.
2. *Prayer:* members with folded hands before a small framed Hanuman picture with a lit diya and marigold garland on the wall of a modern gym.
3. *Machines:* a man in his thirties training on a new cable crossover machine in a clean, modern gym.
4. *Coaching:* an older coach correcting a teenage boy's squat with a hand on his back, barbell rack behind.

> Best of all, replace these with real photos of your members (with their consent).

## 3. Facilities strip

Five photos · 1200 × 1500 · 4:5 portrait
| File | Prompt |
|---|---|
| `facilities/free-weights.jpg` | A rack of new black rubber hex dumbbells and stacked bumper plates in a bright modern gym, daylight from a side window. |
| `facilities/strength-rigs.jpg` | A new power rack with a loaded barbell, rubber flooring, clean modern gym, daylight. |
| `facilities/cardio.jpg` | A row of new treadmills and exercise bikes facing a large window with coconut palms outside, morning light. |
| `facilities/machines.jpg` | A row of brand-new multi-station gym machines (chest press, lat pulldown, leg press) in black and silver on rubber flooring, daylight. |
| `facilities/functional.jpg` | Kettlebells, battle ropes and a plyo box on rubber flooring in a simple gym, natural light. |

## 3b. Training section

**Kettlebell** → `public/images/training/kettlebell.png` · 1000 × 1000 · transparent
> A new cast-iron kettlebell with a matte black finish and a saffron-orange
> weight band, three-quarter view, resting on the ground.

## 4. Footer

**4.1 Hanuman in namaskar** → `public/images/footer/hanuman-rising.png` · ~1300 × 1200 · transparent
Your current file has the checkerboard painted in. Ask ChatGPT:
> Remove the background from this image and give it back as a PNG with a truly
> transparent background.

## 5. Social share card

`public/og-image.jpg` · 1200 × 630 — your hero Hanuman on the off-white
background (#F7F3EC) with "Veera Maruthi Vyayama Shale" written beside him.

## 6. Gallery — your own posts

The gallery at the end of the page is built from **`public/media/`**. Photos
(`.jpg .png .webp`) and videos (`.mp4 .webm`) both work. See
`public/media/README.md` for folders, captions and video covers.
