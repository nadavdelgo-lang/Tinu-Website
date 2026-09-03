import * as THREE from 'three';

// Shared material presets. Parts that fade in clone what they need so
// opacity changes stay local to that part.
export function createMaterials() {
  const metalDark = new THREE.MeshStandardMaterial({
    color: 0x242b35, metalness: 0.8, roughness: 0.45,
  });
  const metalRail = new THREE.MeshStandardMaterial({
    color: 0x3a434f, metalness: 0.9, roughness: 0.3,
  });
  const trayFace = new THREE.MeshStandardMaterial({
    color: 0x1c242e, metalness: 0.6, roughness: 0.5,
    emissive: 0x0e3a3a, emissiveIntensity: 0.08,
  });
  const switchFace = new THREE.MeshStandardMaterial({
    color: 0x201c30, metalness: 0.6, roughness: 0.5,
    emissive: 0x2a1a5a, emissiveIntensity: 0.08,
  });
  const copper = new THREE.MeshStandardMaterial({
    color: 0x9a6a3a, metalness: 1, roughness: 0.35,
  });
  const tubeCold = new THREE.MeshStandardMaterial({
    color: 0x0d3b4a, metalness: 0.2, roughness: 0.4,
    emissive: 0x1fd6ff, emissiveIntensity: 0.12,
  });
  const tubeWarm = new THREE.MeshStandardMaterial({
    color: 0x0d4a3a, metalness: 0.2, roughness: 0.4,
    emissive: 0x35ff9a, emissiveIntensity: 0.12,
  });
  const glass = new THREE.MeshStandardMaterial({
    color: 0x0f1a22, metalness: 0.1, roughness: 0.1,
    transparent: true, opacity: 0.35, depthWrite: false,
  });
  const edge = new THREE.LineBasicMaterial({
    color: 0x4fd1ff, transparent: true, opacity: 0.35,
  });
  const led = new THREE.MeshBasicMaterial({ color: 0x3cf5c8 });
  const lightBar = new THREE.MeshBasicMaterial({ color: 0x38f0d8 });

  return {
    metalDark, metalRail, trayFace, switchFace, copper,
    tubeCold, tubeWarm, glass, edge, led, lightBar,
  };
}

// Returns a transparent clone so a group can fade independently.
export function fadeable(mat) {
  const m = mat.clone();
  m.transparent = true;
  m.opacity = 0;
  return m;
}
