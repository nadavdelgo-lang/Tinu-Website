# Tinu website

Stealth single-page site for tinu.ai. Static files, no build step.

## Run locally

```
python3 -m http.server 8080
```

Open `http://localhost:8080`. Add `?debug=1` to show progress, stage, frame rate and draw calls. Add `?lite=1` or `?lite=0` to force the lite or full render mode.

## Files

| Path | Purpose |
|---|---|
| `index.html` | Page structure and all copy |
| `styles.css` | Theme, sticky build section, responsive rules |
| `main.js` | Mode detection, scroll progress, caption switching |
| `scene/scene.js` | Renderer, camera path, lights |
| `scene/rack.js` | Procedural rack parts and their animation |
| `scene/tubing.js` | Coolant loops, trunk lines, flow particles |
| `scene/timeline.js` | Stage windows on the 0..1 scroll timeline |
| `scene/materials.js` | Material presets |
| `vendor/three.module.min.js` | Three.js 0.170.0 |

## Edit copy

All text lives in `index.html`. The seven captions of the build section are the `<li class="caption">` items. Contact addresses appear in the nav, the CTA and the footer.

## Change the animation

Stage windows live in `scene/timeline.js` in the `T` table. Each entry is a `[start, end]` pair on the 0..1 scroll range. Captions switch on the `STAGES` table in the same file.

## Render modes

- Full: desktop with WebGL.
- Lite: viewports under 768 px, or devices with 4 cores or less. Fewer particles, fewer clones, lower pixel ratio.
- Static: `prefers-reduced-motion`, no WebGL, or a lost context. One render of the assembled rack, captions shown as a list.

## Deploy

Pushes to `main` run `.github/workflows/pages.yml`, which publishes the repository root to GitHub Pages.

One-time setup:

1. Repository Settings, Pages, Source: GitHub Actions.
2. DNS for `tinu.ai`: A records to the GitHub Pages IPs, or a CNAME for `www` to `nadavdelgo-lang.github.io`. The `CNAME` file in the repo is already set to `tinu.ai`.
3. After DNS resolves, enable Enforce HTTPS in the Pages settings.
