# Tinu.ai website

One page. Static HTML, no build step, no network requests.

## Files

- `index.html`: the whole site. CSS, JavaScript, fonts, logo and icons are inline.
- `BRAND.md`: the brand standard. Colours, type, logo, spacing, motion and voice.
  It is the authority. Where it and a file disagree, the file gets fixed.
- `logo.svg`: logo for dark backgrounds.
- `logo-light.svg`: logo for light backgrounds. This is the version the site uses.
- `logo-mark.svg`: the tree mark on its own.
- `.nojekyll`: tells GitHub Pages to serve the files as they are.
- `CNAME`: the custom domain for GitHub Pages.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Deploy on GitHub Pages

1. Open the repository settings and select Pages.
2. Under Build and deployment, choose Deploy from a branch.
3. Select the `main` branch and the `/ (root)` folder. Save.
4. Point the domain at GitHub: `www` as a CNAME to `nadavdelgo-lang.github.io`,
   and four A records at the apex for 185.199.108.153, 185.199.109.153,
   185.199.110.153 and 185.199.111.153.

## Page structure

1. Hero. Vera Rubin NVL72 online December 2026, with the proof of concept button.
2. Proof of concept windows. Two dated cards, GB300 NVL72 and Vera Rubin NVL72.
3. What is coming online. Token Factory Phase 1 and Phase 2.
4. TinuOS runs the racks.
5. Build your compute and inference service on Tinu.
6. Footer.

## The field

The hero sits on a canvas grid of compute cells. A slow wave runs on its own. A
click, a tap or a drag dispatches a kernel and the cells light in the logo
colours, chroma halved so the page stays quiet. Hue comes from a smooth function
of position, so the grid drifts in colour regions rather than speckling.

The field appears behind the hero and nowhere else, and it sleeps once the hero
scrolls out of view. Visitors who set "reduce motion" get one still frame, and
everyone gets a Pause motion control in the footer.

To change how it behaves, edit these values near the top of the script. The same
numbers are recorded in `BRAND.md` section 7, so change both.

- `PAL`: the eight field colours, and `DEEP` for the bright cell centres.
- `PITCH`, `CELL`: grid spacing and cell size.
- `IDLE`: how loud the resting wave is, per screen width.
- `nextAuto`: seconds between the dispatches the page fires by itself.

## Edit content

All copy is in `<main>` and `<footer>`.

- Hero: `.hero h1` and `.hero .sub`.
- Proof of concept windows: the `POCS` list, if you rebuild, or the `.pocs` list
  in the HTML.
- Contact: search for `mailto:`. One address, contact@tinu.ai, serves the header
  link, the proof of concept line and both buttons.
