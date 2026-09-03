# Tinu.ai website

Stealth one-page site for Tinu.ai. Static HTML, no build step.

## Files

- `index.html`: the whole site. CSS and JavaScript are inline.
- `logo.svg`: logo mark and wordmark, light version for dark backgrounds.
- `logo-black.svg`: the same logo for light backgrounds.
- `.nojekyll`: tells GitHub Pages to serve the files as they are.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Deploy on GitHub Pages

1. Open the repository settings and select Pages.
2. Under Build and deployment, choose Deploy from a branch.
3. Select the `main` branch and the `/ (root)` folder. Save.
4. Add a `CNAME` file with `tinu.ai` when you point the domain here.

## Edit content

All copy lives in `index.html`. Search for these anchors to change them:

- Hero headline and sub-line: `<h1`
- Availability windows: `id="availability"`. Each dated row carries `data-from`, `data-to`, and `data-when`. The Status column and the hero readout line are computed from those dates, so update the dates together with the window text.
- Princeton research link: `id="research"`
- Contact emails: `id="contact"`
- Deployment mail link: search for `mailto:Ken@tinu.ai,Nadav@tinu.ai`. It appears 5 times (header, mobile menu, hero, availability, contact). The printed subject sits after "Subject, pre-filled".
- Site addresses and window dates are also in the hero readout panel: `class="readout"`.
