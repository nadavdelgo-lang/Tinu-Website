import * as THREE from 'three';
import { T, local, stagger, easeInOut, lerp } from './timeline.js';
import { fadeable } from './materials.js';

// One rack, 1 unit = 1 m. Origin at floor centre, +Z is the front.
export const LAYOUT = {
  W: 0.6, H: 2.2, D: 1.2,
  slots: 27,
  slotPitch: 0.062,
  slot0: 0.30,
  trayW: 0.54, trayH: 0.054, trayD: 1.0,
  manifoldX: 0.2, manifoldZ: -0.54, manifoldH: 1.9, manifoldY0: 0.12,
  qdX: 0.15, qdZ: -0.52,
  plateXs: [-0.18, -0.06, 0.06, 0.18], plateZ: -0.05,
  cduX: 0.92, cduW: 0.5, cduH: 1.2, cduD: 1.1,
  rowPitch: 0.8,
  slotY(i) { return this.slot0 + i * this.slotPitch; },
  trayCenterY(i) { return this.slotY(i) + this.trayH / 2 + 0.004; },
  isSwitch(i) { return i >= 9 && i <= 17; },
};

// Compute trays fill the bottom and top thirds, switch trays the middle.
const COMPUTE_SLOTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23, 24, 25, 26];
const SWITCH_SLOTS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

const _m = new THREE.Matrix4();
const _p = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const Q_ID = new THREE.Quaternion();
const Q_Z = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);

function setInst(mesh, i, x, y, z, sx = 1, sy = 1, sz = 1, q = Q_ID) {
  _p.set(x, y, z);
  _s.set(sx, sy, sz);
  _m.compose(_p, q, _s);
  mesh.setMatrixAt(i, _m);
}

function edges(geo, mat, angle = 20) {
  return new THREE.LineSegments(new THREE.EdgesGeometry(geo, angle), mat);
}

export function buildRack(mats, opts = {}) {
  const lite = !!opts.lite;
  const L = LAYOUT;

  const root = new THREE.Group();
  const rack = new THREE.Group();
  root.add(rack);

  const state = { flow: 0, power: 0 };

  // ---- 01 frame: outline, posts, plates
  const outlineMat = fadeable(mats.edge);
  const outline = edges(new THREE.BoxGeometry(L.W, L.H, L.D), outlineMat, 1);
  outline.position.y = L.H / 2;
  rack.add(outline);

  const frame = new THREE.Group();
  const postGeo = new THREE.BoxGeometry(0.05, L.H, 0.05);
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    const post = new THREE.Mesh(postGeo, mats.metalDark);
    post.position.set(sx * 0.275, L.H / 2, sz * 0.575);
    frame.add(post);
  }
  const plateGeo = new THREE.BoxGeometry(L.W, 0.03, L.D);
  const bottom = new THREE.Mesh(plateGeo, mats.metalDark);
  bottom.position.y = 0.015;
  const top = new THREE.Mesh(plateGeo, mats.metalDark);
  top.position.y = L.H - 0.015;
  frame.add(bottom, top);
  frame.add(edges(plateGeo, mats.edge).translateY(L.H - 0.015));
  rack.add(frame);

  // ---- rails: one pair per slot plus two for the power shelves
  const railSlots = L.slots + 2;
  const railGeo = new THREE.BoxGeometry(0.02, 0.01, 1.05);
  const rails = new THREE.InstancedMesh(railGeo, mats.metalRail, railSlots * 2);
  rails.frustumCulled = false;
  rack.add(rails);
  const railY = (i) => (i < L.slots ? L.slotY(i) - 0.004 : 0.08 + (i - L.slots) * 0.1);

  // ---- 02 power shelves, busbar, manifolds
  const shelfMat = fadeable(mats.metalDark);
  const shelfEdgeMat = fadeable(mats.edge);
  const shelves = new THREE.Group();
  const shelfGeo = new THREE.BoxGeometry(L.trayW, 0.08, L.trayD);
  for (const y of [0.125, 0.225]) {
    const shelf = new THREE.Mesh(shelfGeo, shelfMat);
    shelf.position.y = y;
    shelves.add(shelf);
    if (!lite) shelves.add(edges(shelfGeo, shelfEdgeMat).translateY(y));
  }
  rack.add(shelves);

  const busMat = fadeable(mats.copper);
  const busDarkMat = fadeable(mats.metalDark);
  const busbar = new THREE.Group();
  const bus = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.95, 0.02), busMat);
  bus.position.set(0, 1.1, -0.565);
  busbar.add(bus);
  for (const x of [-0.06, 0.06]) {
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.95, 0.012), busDarkMat);
    strip.position.set(x, 1.1, -0.565);
    busbar.add(strip);
  }
  rack.add(busbar);

  const manifolds = new THREE.Group();
  const manGeo = new THREE.CylinderGeometry(0.025, 0.025, L.manifoldH, lite ? 10 : 16);
  const supply = new THREE.Mesh(manGeo, mats.tubeCold);
  supply.position.set(-L.manifoldX, L.manifoldY0 + L.manifoldH / 2, L.manifoldZ);
  const ret = new THREE.Mesh(manGeo, mats.tubeWarm);
  ret.position.set(L.manifoldX, L.manifoldY0 + L.manifoldH / 2, L.manifoldZ);
  manifolds.add(supply, ret);
  rack.add(manifolds);

  // ---- 03 / 04 trays and their attached parts (instanced)
  const trayGeo = new THREE.BoxGeometry(L.trayW, L.trayH, L.trayD);
  const compute = new THREE.InstancedMesh(trayGeo, mats.trayFace, COMPUTE_SLOTS.length);
  const switches = new THREE.InstancedMesh(trayGeo, mats.switchFace, SWITCH_SLOTS.length);
  const bezels = new THREE.InstancedMesh(new THREE.BoxGeometry(0.5, 0.036, 0.012), mats.metalDark, L.slots);
  const plates = new THREE.InstancedMesh(new THREE.BoxGeometry(0.08, 0.012, 0.11), mats.copper, COMPUTE_SLOTS.length * 4);
  const qds = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.012, 0.012, 0.045, 10), mats.metalRail, L.slots * 2);
  const leds = new THREE.InstancedMesh(new THREE.SphereGeometry(0.005, 6, 6), mats.led, L.slots * 3);
  for (const m of [compute, switches, bezels, plates, qds, leds]) {
    m.frustumCulled = false;
    rack.add(m);
  }

  // ---- 06 CDU sidecar
  const cduMat = fadeable(mats.metalDark);
  const cduEdgeMat = fadeable(mats.edge);
  const cduGlass = fadeable(mats.glass);
  const cduPumpMat = fadeable(mats.metalRail);
  const cdu = new THREE.Group();
  const cduBody = new THREE.BoxGeometry(L.cduW, L.cduH, L.cduD);
  const body = new THREE.Mesh(cduBody, cduMat);
  body.position.y = L.cduH / 2;
  cdu.add(body, edges(cduBody, cduEdgeMat).translateY(L.cduH / 2));
  const win = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.42, 0.012), cduGlass);
  win.position.set(0, 0.82, L.cduD / 2 + 0.004);
  cdu.add(win);
  const pump = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.26, 16), cduPumpMat);
  pump.rotation.x = Math.PI / 2;
  pump.position.set(0, 0.35, L.cduD / 2 + 0.13);
  cdu.add(pump);
  for (const x of [-0.12, 0.12]) {
    const gauge = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.008, 8, 24), cduPumpMat);
    gauge.position.set(x, 1.08, L.cduD / 2 + 0.008);
    cdu.add(gauge);
  }
  cdu.position.set(L.cduX, 0, 0);
  root.add(cdu);

  // ---- 07 light bar (top front)
  const lightBar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.012, 0.012), mats.lightBar);
  lightBar.position.set(0, L.H - 0.06, 0.585);
  rack.add(lightBar);

  // ---- row clones, created lazily once the rack is fully assembled
  const clones = [];
  const cloneXs = [];
  const perSide = lite ? 2 : 4;
  for (let k = 1; k <= perSide; k++) cloneXs.push(-L.rowPitch * k);
  for (let k = 0; k < perSide; k++) cloneXs.push(L.cduX + L.cduW / 2 + 0.35 + L.rowPitch * k);

  function ensureClones() {
    if (clones.length) return;
    for (const x of cloneXs) {
      const c = rack.clone(true);
      c.position.x = x;
      c.scale.y = 0.001;
      c.visible = false;
      root.add(c);
      clones.push(c);
    }
  }

  // ---- per-frame update: everything is a pure function of p
  function update(p) {
    // 01
    outlineMat.opacity = local(p, T.outline) * 0.4;
    outline.visible = outlineMat.opacity > 0.001;
    const fp = local(p, T.posts);
    frame.scale.y = Math.max(0.001, fp);
    frame.visible = fp > 0;

    let anyRail = false;
    for (let i = 0; i < railSlots; i++) {
      const t = stagger(p, T.rails, i, railSlots, 0.4);
      anyRail = anyRail || t > 0;
      const y = railY(i);
      setInst(rails, i * 2, -0.27, y, 0, 1, 1, Math.max(0.001, t));
      setInst(rails, i * 2 + 1, 0.27, y, 0, 1, 1, Math.max(0.001, t));
    }
    rails.instanceMatrix.needsUpdate = true;
    rails.visible = anyRail;

    // 02
    const sh = local(p, T.shelves);
    shelves.position.z = lerp(0.9, 0, sh);
    shelfMat.opacity = sh;
    shelfEdgeMat.opacity = sh * 0.35;
    shelves.visible = sh > 0;

    const bb = local(p, T.busbar);
    busbar.position.z = lerp(-0.6, 0, bb);
    busMat.opacity = bb;
    busDarkMat.opacity = bb;
    busbar.visible = bb > 0;

    const mf = local(p, T.manifolds);
    manifolds.scale.y = Math.max(0.001, mf);
    manifolds.visible = mf > 0;

    // 03 / 04 / 07 (trays and their attachments)
    const power = local(p, T.leds, easeInOut);
    state.power = power;
    let ci = 0;
    let si = 0;
    let anyTray = false;
    for (let j = 0; j < L.slots; j++) {
      const isSw = L.isSwitch(j);
      const t = isSw
        ? stagger(p, T.switches, SWITCH_SLOTS.indexOf(j), SWITCH_SLOTS.length, 0.4)
        : stagger(p, T.trays, COMPUTE_SLOTS.indexOf(j), COMPUTE_SLOTS.length, 0.3);
      const on = t > 0 ? 1 : 0;
      anyTray = anyTray || on === 1;
      const yc = L.trayCenterY(j);
      const z = lerp(1.9, 0, t);

      if (isSw) setInst(switches, si++, 0, yc, z, on, on, on);
      else setInst(compute, ci++, 0, yc, z, on, on, on);

      setInst(bezels, j, 0, yc, z + L.trayD / 2 + 0.006, on, on, on);

      if (!isSw) {
        const base = COMPUTE_SLOTS.indexOf(j) * 4;
        for (let k = 0; k < 4; k++) {
          setInst(plates, base + k, L.plateXs[k], yc + L.trayH / 2 + 0.006, z + L.plateZ, on, on, on);
        }
      }

      setInst(qds, j * 2, -L.qdX, yc, z - L.trayD / 2 - 0.02, on, on, on, Q_Z);
      setInst(qds, j * 2 + 1, L.qdX, yc, z - L.trayD / 2 - 0.02, on, on, on, Q_Z);

      const lt = stagger(p, T.leds, j, L.slots, 0.35) * on;
      for (let k = 0; k < 3; k++) {
        setInst(leds, j * 3 + k, 0.19 + k * 0.022, yc, z + L.trayD / 2 + 0.014, lt, lt, lt);
      }
    }
    for (const m of [compute, switches, bezels, plates, qds]) {
      m.instanceMatrix.needsUpdate = true;
      m.visible = anyTray;
    }
    leds.instanceMatrix.needsUpdate = true;
    leds.visible = power > 0;

    mats.trayFace.emissiveIntensity = 0.08 + power * 0.8;
    mats.switchFace.emissiveIntensity = 0.08 + power * 0.8;
    lightBar.scale.x = Math.max(0.001, power);
    lightBar.visible = power > 0;

    // 06 CDU + flow
    const cd = local(p, T.cdu);
    cdu.position.x = lerp(L.cduX + 1.6, L.cduX, cd);
    cduMat.opacity = cd;
    cduEdgeMat.opacity = cd * 0.35;
    cduGlass.opacity = cd * 0.35;
    cduPumpMat.opacity = cd;
    cdu.visible = cd > 0;

    const flow = local(p, T.flow, easeInOut);
    state.flow = flow;
    mats.tubeCold.emissiveIntensity = lerp(0.12, 1.0, flow);
    mats.tubeWarm.emissiveIntensity = lerp(0.12, 1.0, flow);

    // 07 row
    if (p >= T.row[0]) {
      ensureClones();
      for (let k = 0; k < clones.length; k++) {
        const t = stagger(p, T.row, k, clones.length, 0.5);
        const c = clones[k];
        c.visible = t > 0;
        c.scale.y = Math.max(0.001, t);
        c.position.y = lerp(-0.25, 0, t);
      }
    } else {
      for (const c of clones) c.visible = false;
    }
  }

  return { root, rack, state, update, COMPUTE_SLOTS, SWITCH_SLOTS };
}
