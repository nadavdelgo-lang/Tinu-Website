import * as THREE from 'three';
import { createMaterials } from './materials.js';
import { buildRack } from './rack.js';
import { buildTubing } from './tubing.js';
import { remap, easeInOut, lerp } from './timeline.js';

const BG = 0x05070a;

export function createScene(canvas, opts = {}) {
  const lite = !!opts.lite;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !lite,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2));
  renderer.setClearColor(BG, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BG);
  scene.fog = new THREE.FogExp2(BG, lite ? 0.075 : 0.06);

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);

  // Lights
  scene.add(new THREE.HemisphereLight(0x3a4658, 0x05070a, 1.0));
  const rim = new THREE.DirectionalLight(0x7fd7ff, 2.2);
  rim.position.set(-3, 3, -4);
  scene.add(rim);
  const key = new THREE.DirectionalLight(0xfff4e0, 1.5);
  key.position.set(4, 2.5, 3);
  scene.add(key);
  const cduLight = new THREE.PointLight(0x38f0d8, 0, 6, 2);
  cduLight.position.set(0.9, 1.4, 0.6);
  scene.add(cduLight);
  const rackLight = new THREE.PointLight(0x38f0d8, 0, 8, 2);
  rackLight.position.set(0, 1.8, 1.2);
  scene.add(rackLight);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.MeshStandardMaterial({ color: 0x07090d, roughness: 1, metalness: 0 }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  const grid = new THREE.GridHelper(60, 60, 0x1a2430, 0x0f151d);
  grid.position.y = 0.001;
  grid.material.transparent = true;
  grid.material.opacity = 0.35;
  scene.add(grid);

  // Rack + tubing
  const mats = createMaterials();
  const rack = buildRack(mats, { lite });
  const tubing = buildTubing(mats, { lite });
  rack.rack.add(tubing.group);
  rack.root.add(tubing.trunkGroup);
  scene.add(rack.root);

  // Camera path
  let width = 1;
  let height = 1;
  let portrait = false;
  const parallax = { x: 0, y: 0, tx: 0, ty: 0 };

  function setCamera(p) {
    const a = easeInOut(remap(p, 0, 0.88));
    let yaw = lerp(-0.7, 0.5, a);
    let r = lerp(5.7, 5.1, a);
    let h = lerp(1.9, 1.55, a);
    let tx = 0;
    let ty = 1.1;
    const b = easeInOut(remap(p, 0.88, 1));
    yaw = lerp(yaw, 0.28, b);
    r = lerp(r, portrait ? 12.5 : 14.5, b);
    h = lerp(h, 4.0, b);
    tx = lerp(tx, portrait ? 0.4 : 0.9, b);
    ty = lerp(ty, 1.2, b);
    if (portrait) r *= 1.2;

    yaw += parallax.x * 0.05;
    h += parallax.y * 0.12;

    camera.position.set(tx + r * Math.sin(yaw), h, r * Math.cos(yaw));
    camera.lookAt(tx, ty, 0);
  }

  function resize() {
    width = canvas.clientWidth || 1;
    height = canvas.clientHeight || 1;
    portrait = width < 768;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = portrait ? 46 : 35;
    // Shift the subject right of the captions on desktop, up on mobile.
    if (portrait) camera.setViewOffset(width, height, 0, height * 0.12, width, height);
    else camera.setViewOffset(width, height, -width * 0.16, 0, width, height);
    camera.updateProjectionMatrix();
  }

  function update(p, time) {
    parallax.x += (parallax.tx - parallax.x) * 0.05;
    parallax.y += (parallax.ty - parallax.y) * 0.05;
    rack.update(p);
    tubing.update(p, time, rack.state.flow);
    cduLight.intensity = rack.state.flow * 5;
    rackLight.intensity = rack.state.power * 4;
    setCamera(p);
    renderer.render(scene, camera);
  }

  function setPointer(nx, ny) {
    parallax.tx = nx;
    parallax.ty = ny;
  }

  function continuous() {
    return rack.state.flow > 0
      || Math.abs(parallax.tx - parallax.x) > 0.002
      || Math.abs(parallax.ty - parallax.y) > 0.002;
  }

  function dispose() {
    renderer.dispose();
  }

  resize();
  return { update, resize, setPointer, continuous, dispose, renderer };
}
