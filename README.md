# Tinu.ai website

One page. Static HTML, no build step, no network requests.

## Files

- `index.html`: the whole site. CSS, JavaScript, fonts, and logo are inline.
- `logo.svg`: logo for dark backgrounds.
- `logo-light.svg`: logo for light backgrounds.
- `logo-mark.svg`: the tree mark on its own.
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

## The field

The background is a canvas grid of compute cells. Work flows through it on its
own. A click, a tap, or a drag dispatches a kernel and the cells light up in the
logo colours. Visitors who set "reduce motion" get one still frame, and everyone
gets a Pause motion control in the footer.

To change how it behaves, edit these values near the top of the script:

- `PAL`: the eight logo colours the cells use.
- `PITCH`, `CELL`: grid spacing and cell size.
- `nextAuto`: seconds between the dispatches the page fires by itself.

## Edit content

All copy is in the `<main>` block of `index.html`.

- Headline and sub-line: `<h1>` and `.sub`
- The three services: `.svcs`
- Contact: search for `mailto:`. One address list serves all three links, on
  the logo, the main button, and the footer button. It opens an email to
  Ken and Nadav with the subject filled in. No address is printed on the page.
