# Tinu.ai website

Stealth one-page site for Tinu.ai. Static HTML, no build step.

## Files

- `index.html`: the whole site. CSS and JavaScript are inline.
- `logo.svg`: standalone logo mark and wordmark.
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
- Availability windows: `id="availability"`
- Princeton research link: `id="research"`
- Contact emails and the deployment mail link: `id="contact"`
