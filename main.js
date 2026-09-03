import { stageAt, clamp01 } from './scene/timeline.js';

const body = document.body;
const canvas = document.getElementById('scene');
const section = document.getElementById('build');
const captions = Array.from(document.querySelectorAll('.caption'));
const bar = document.querySelector('.build__progress i');
const debug = new URLSearchParams(location.search).has('debug');


// ---- mode detection
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasWebGL = (() => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) {
    return false;
  }
})();
const params = new URLSearchParams(location.search);
const liteOverride = params.get('lite');
const lite = liteOverride !== null
  ? liteOverride === '1'
  : (window.innerWidth < 768
    || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
    || (navigator.deviceMemory && navigator.deviceMemory <= 4));
const staticMode = reduced || !hasWebGL;

if (lite) body.classList.add('mode-lite');
if (staticMode) body.classList.add('mode-static');
if (!hasWebGL) body.classList.add('no-webgl');

let api = null;
let debugEl = null;

if (debug) {
  debugEl = document.createElement('div');
  debugEl.className = 'debug';
  body.appendChild(debugEl);
}

function setStage(p) {
  const s = stageAt(p);
  for (const el of captions) {
    el.classList.toggle('is-active', Number(el.dataset.stage) === s);
  }
  if (bar) bar.style.transform = `scaleY(${p.toFixed(4)})`;
}

function enterStaticFallback() {
  body.classList.add('mode-static', 'no-webgl');
  setStage(1);
  for (const el of captions) el.classList.add('is-active');
}

async function boot() {
  if (!hasWebGL) {
    enterStaticFallback();
    return;
  }

  try {
    const { createScene } = await import('./scene/scene.js');
    api = createScene(canvas, { lite });
  } catch (err) {
    console.error('Scene failed to start, using static fallback.', err);
    enterStaticFallback();
    return;
  }

  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    enterStaticFallback();
  });

  if (staticMode) {
    // Single render of the assembled rack. Captions are shown as a list by CSS.
    const renderStatic = () => {
      api.resize();
      api.update(0.895, 0);
    };
    renderStatic();
    new ResizeObserver(renderStatic).observe(canvas);
    for (const el of captions) el.classList.add('is-active');
    return;
  }

  // ---- scroll-driven mode
  let targetP = 0;
  let p = 0;
  let inView = true;
  let running = false;
  let last = performance.now();
  let time = 0;
  let frames = 0;
  let fpsStamp = last;
  let fps = 0;

  function readScroll() {
    const rect = section.getBoundingClientRect();
    const span = rect.height - window.innerHeight;
    targetP = span > 0 ? clamp01(-rect.top / span) : 1;
    if (!running) start();
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    time += dt;

    p += (targetP - p) * (1 - Math.exp(-dt * 7));
    if (Math.abs(targetP - p) < 0.0005) p = targetP;

    api.update(p, time);
    setStage(p);

    if (debugEl) {
      frames++;
      if (now - fpsStamp > 500) {
        fps = Math.round((frames * 1000) / (now - fpsStamp));
        frames = 0;
        fpsStamp = now;
      }
      const info = api.renderer.info.render;
      debugEl.textContent = `p ${p.toFixed(3)}  stage ${stageAt(p) + 1}\nfps ${fps}  calls ${info.calls}  tris ${info.triangles}\nmode ${lite ? 'lite' : 'full'}`;
    }

    const idle = p === targetP && !api.continuous();
    if (inView && !idle && !document.hidden) {
      requestAnimationFrame(frame);
    } else {
      running = false;
    }
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(frame);
  }

  window.addEventListener('scroll', readScroll, { passive: true });
  window.addEventListener('resize', () => {
    api.resize();
    readScroll();
    start();
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) start();
  });

  new IntersectionObserver((entries) => {
    inView = entries[0].isIntersecting;
    if (inView) start();
  }, { threshold: 0 }).observe(section);

  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (e) => {
      api.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
      start();
    }, { passive: true });
  }

  api.resize();
  readScroll();
  p = targetP;
  start();
}

boot();
