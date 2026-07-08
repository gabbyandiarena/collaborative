# The Collaborative — website

A self-contained, mobile-first marketing site for The Collaborative dance
training (Highland, UT). Dark, moody, editorial. **No build step** — plain
HTML/CSS/JS. Open `index.html` in a browser and it works.

## Pages
| File | What it is |
|------|------------|
| `index.html`  | Home — banner video hero, the "LA of Utah" vision, classes, CTA |
| `about.html`  | Erica Cox (founder) feature + instructor bio grid |
| `events.html` | Upcoming classes/trainings, each with a Mindbody "Reserve" button |
| `videos.html` | Members-only weekly video library behind an access-code gate |

## The 5-minute setup (the only links you must change)
Open **`js/main.js`** → the `CONTACT` block at the top and set:
- `mindbody` → your real Mindbody booking URL (powers every "Book / Reserve" button)
- `email`, `instagram` are already filled in — confirm they're right.

## Add your media
Everything image/video lives in **`assets/`** (see `assets/README.txt`).
- **Banner (wall of reels):** the hero is up to **3 reels side-by-side**, cropped to
  fill, with a dark overlay and the logo on top. Drop `assets/reel-1.mp4`,
  `reel-2.mp4`, `reel-3.mp4` (download your own reels from Instagram). Until then,
  styled placeholders show. Delete the "Add reel" tags in `index.html` once they're in.
- **Logo:** swap the inline SVG in the hero (and `BRAND_MARK` in `js/main.js`) for
  your real file — e.g. `<img class="hero__logo" src="assets/logo.svg" alt="...">`.
- **Photos:** every dashed box on the site marks where an image goes. Replace the
  placeholder `<div>` with `<img src="assets/your-photo.jpg" alt="..." />`.

## Edit the content
- **Erica's bio / instructors:** `about.html` — fill the `[bracketed]` text and
  duplicate a `.member` block per instructor.
- **Events:** `events.html` — duplicate an `.event` block; set date, title, type
  tag, and the booking link.
- **Videos:** `js/videos.js` —
  1. `ACCESS_CODES` — the code(s) you hand members. Rotate anytime.
  2. `VIDEOS` — add one entry per week (paste the Vimeo/YouTube **embed** URL).

## About the video paywall (please read)
The gate is **client-side**: it keeps casual visitors out and is easy to manage,
but the access code lives in the page and a determined person could read it.
**Real protection comes from how you host the videos:**
- Use **Vimeo** → each video's Privacy → "Hide from Vimeo" + **Domain-level
  privacy** (only your site can embed it). Then the embed URL is useless off-site.
- Lighter option: **unlisted YouTube**.

When you outgrow this, swap to a real login (Mindbody API, Memberstack, or a
Squarespace/Wix Member Area). The code is structured so only `videos.js` changes.

## Putting it on Squarespace/Wix
Squarespace/Wix can't run this as-is (they don't host arbitrary multi-page sites).
Options, easiest first:
1. **Host the folder as its own site** (Netlify/Cloudflare Pages/GitHub Pages —
   all free) and point a subdomain like `train.thecollaborative...` at it. Link to
   it from your Squarespace nav. *(Recommended — keeps every feature working.)*
2. **Embed pieces** into Squarespace/Wix via Code blocks (works for sections, but
   the multi-page nav + video gate are happiest as a standalone site).

Want me to wire up option 1? Just say the word.
