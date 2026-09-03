import * as THREE from 'three';
import { T, stagger } from './timeline.js';
import { LAYOUT as L } from './rack.js';

const SAMPLES = 64;

function v(x, y, z) { return new THREE.Vector3(x, y, z); }

// Loop for one tray: supply manifold -> QD -> across the cold plates -> QD -> return manifold.
function loopCurve(j) {
  const yc = L.trayCenterY(j);
  const yt = yc + L.trayH / 2 + 0.05;
  const pts = [
    v(-L.manifoldX, yc, L.manifoldZ),
    v(-L.qdX, yc, L.qdZ),
  ];
  if (L.isSwitch(j)) {
    pts.push(v(-0.12, yt, -0.25), v(0.12, yt, -0.25));
  } else {
    pts.push(
      v(-0.18, yt, -0.28), v(-0.18, yt, 0.0),
      v(-0.06, yt, -0.16), v(-0.06, yt, 0.0),
      v(0.06, yt, -0.16), v(0.06, yt, 0.0),
      v(0.18, yt, -0.16), v(0.18, yt, -0.28),
    );
  }
  pts.push(v(L.qdX, yc, L.qdZ), v(L.manifoldX, yc, L.manifoldZ));
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.4);
}

function trunkCurves() {
  const top = L.manifoldY0 + L.manifoldH;
  const cx = L.cduX;
  const supply = new THREE.CatmullRomCurve3([
    v(cx - 0.12, L.cduH, -0.25),
    v(cx - 0.12, L.cduH + 0.35, -0.35),
    v(0.35, top + 0.12, L.manifoldZ),
    v(-L.manifoldX, top + 0.02, L.manifoldZ),
  ], false, 'catmullrom', 0.3);
  const ret = new THREE.CatmullRomCurve3([
    v(L.manifoldX, top, L.manifoldZ),
    v(0.45, top - 0.2, L.manifoldZ + 0.15),
    v(cx + 0.12, L.cduH + 0.25, -0.05),
    v(cx + 0.12, L.cduH, -0.05),
  ], false, 'catmullrom', 0.3);
  return [supply, ret];
}

function spriteTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(120,240,255,0.8)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 32);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function buildTubing(mats, opts = {}) {
  const lite = !!opts.lite;
  const group = new THREE.Group();

  // Tray loops, in the rack's local space.
  const loops = [];
  const tubular = lite ? 24 : 40;
  const radial = lite ? 5 : 7;
  for (let j = 0; j < L.slots; j++) {
    const curve = loopCurve(j);
    const geo = new THREE.TubeGeometry(curve, tubular, 0.006, radial, false);
    const mesh = new THREE.Mesh(geo, mats.tubeCold);
    mesh.frustumCulled = false;
    mesh.visible = false;
    group.add(mesh);
    loops.push({ mesh, geo, curve, indexCount: geo.index.count });
  }

  // Trunk lines from the CDU to the manifold tops. These live outside the
  // rack group because the CDU is not part of the row clones.
  const trunkGroup = new THREE.Group();
  const trunks = [];
  const [ts, tr] = trunkCurves();
  for (const [curve, mat] of [[ts, mats.tubeCold], [tr, mats.tubeWarm]]) {
    const geo = new THREE.TubeGeometry(curve, lite ? 30 : 48, 0.02, lite ? 6 : 10, false);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    mesh.visible = false;
    trunkGroup.add(mesh);
    trunks.push({ mesh, geo, curve, indexCount: geo.index.count });
  }

  // Coolant particles: sampled curve points, advanced by time.
  const perLoop = lite ? 4 : 8;
  const perTrunk = lite ? 16 : 28;
  const tracks = [];
  for (const l of loops) tracks.push({ pts: l.curve.getSpacedPoints(SAMPLES), n: perLoop, speed: 0.22 });
  for (const t of trunks) tracks.push({ pts: t.curve.getSpacedPoints(SAMPLES), n: perTrunk, speed: 0.12 });

  const total = tracks.reduce((a, t) => a + t.n, 0);
  const positions = new Float32Array(total * 3);
  const meta = new Float32Array(total * 2); // [trackIndex, baseOffset]
  let k = 0;
  tracks.forEach((t, ti) => {
    for (let i = 0; i < t.n; i++) {
      meta[k * 2] = ti;
      meta[k * 2 + 1] = i / t.n;
      k++;
    }
  });
  const pgeo = new THREE.BufferGeometry();
  pgeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pmat = new THREE.PointsMaterial({
    size: lite ? 0.03 : 0.036,
    map: spriteTexture(),
    color: 0x9af4ff,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(pgeo, pmat);
  points.frustumCulled = false;
  points.visible = false;
  // Trunk tracks are in root space, loop tracks in rack space. The rack sits
  // at the root origin, so a single Points object in root space works.
  trunkGroup.add(points);

  const tmpA = new THREE.Vector3();
  let lastTime = -1;

  function setDraw(item, t) {
    const c = Math.floor((item.indexCount * t) / 3) * 3;
    item.geo.setDrawRange(0, c);
    item.mesh.visible = c > 0;
  }

  function update(p, time, flow) {
    for (let j = 0; j < loops.length; j++) {
      setDraw(loops[j], stagger(p, T.loops, j, loops.length, 0.35));
    }
    for (let i = 0; i < trunks.length; i++) {
      setDraw(trunks[i], stagger(p, T.trunks, i, trunks.length, 0.7));
    }

    if (flow <= 0) {
      points.visible = false;
      return;
    }
    points.visible = true;
    pmat.opacity = flow;
    if (time === lastTime) return;
    lastTime = time;
    const pos = pgeo.attributes.position.array;
    for (let i = 0; i < total; i++) {
      const tr = tracks[meta[i * 2]];
      const u = (meta[i * 2 + 1] + time * tr.speed) % 1;
      const f = u * SAMPLES;
      const a = Math.floor(f);
      const b = Math.min(SAMPLES, a + 1);
      tmpA.lerpVectors(tr.pts[a], tr.pts[b], f - a);
      pos[i * 3] = tmpA.x;
      pos[i * 3 + 1] = tmpA.y;
      pos[i * 3 + 2] = tmpA.z;
    }
    pgeo.attributes.position.needsUpdate = true;
  }

  return { group, trunkGroup, update };
}

