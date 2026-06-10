'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SCENES, ARCS } from './scenes';

// Convert lat/lng to a point on a sphere of radius r.
function toVec(lat: number, lng: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const R = 1.6;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.3, 5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return; // no WebGL — the HTML scene legend still renders below
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.cursor = 'grab';

    const root = new THREE.Group();
    root.rotation.y = -2.2; // start on the Americas
    scene.add(root);

    const ACCENT = new THREE.Color('#7c5cff');
    const MINT = new THREE.Color('#19e3b1');

    // --- dotted globe (fibonacci sphere of points) ---
    const N = 2200;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const t = i * 2.399963229728653; // golden angle
      pos[i * 3] = Math.cos(t) * rad * R;
      pos[i * 3 + 1] = y * R;
      pos[i * 3 + 2] = Math.sin(t) * rad * R;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dotMat = new THREE.PointsMaterial({ color: 0x4a4a6a, size: 0.018, sizeAttenuation: true, transparent: true, opacity: 0.55 });
    root.add(new THREE.Points(dotGeo, dotMat));

    // faint inner sphere for depth
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(R * 0.985, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x0c0c18, transparent: true, opacity: 0.9 }),
    );
    root.add(glow);

    // wire halo
    const halo = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(R * 1.001, 2)),
      new THREE.LineBasicMaterial({ color: 0x23233a, transparent: true, opacity: 0.5 }),
    );
    root.add(halo);

    // --- city nodes ---
    const nodeGroup = new THREE.Group();
    root.add(nodeGroup);
    const sceneVec: Record<string, THREE.Vector3> = {};
    for (const s of SCENES) {
      const v = toVec(s.lat, s.lng, R * 1.01);
      sceneVec[s.name] = v;
      const isOrigin = !!s.origin;
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(isOrigin ? 0.045 : 0.03, 16, 16),
        new THREE.MeshBasicMaterial({ color: isOrigin ? MINT : ACCENT }),
      );
      dot.position.copy(v);
      nodeGroup.add(dot);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(isOrigin ? 0.07 : 0.05, isOrigin ? 0.09 : 0.065, 24),
        new THREE.MeshBasicMaterial({ color: isOrigin ? MINT : ACCENT, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
      );
      ring.position.copy(v);
      ring.lookAt(v.clone().multiplyScalar(2));
      nodeGroup.add(ring);
    }

    // --- arcs ---
    const arcMeshes: { line: THREE.Line; len: number }[] = [];
    for (const [a, b] of ARCS) {
      const va = sceneVec[a];
      const vb = sceneVec[b];
      if (!va || !vb) continue;
      const mid = va.clone().add(vb).multiplyScalar(0.5);
      const lift = 1 + va.distanceTo(vb) * 0.34;
      mid.setLength(R * lift);
      const curve = new THREE.QuadraticBezierCurve3(va, mid, vb);
      const pts = curve.getPoints(48);
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const m = new THREE.LineBasicMaterial({ color: MINT, transparent: true, opacity: 0.32 });
      const line = new THREE.Line(g, m);
      nodeGroup.add(line);
      arcMeshes.push({ line, len: pts.length });
    }

    // --- pointer drag (mouse only — never hijack touch scroll) ---
    let dragging = false;
    let px = 0;
    let velocity = 0.0016;
    let lastDrag = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      dragging = true;
      px = e.clientX;
      renderer.domElement.style.cursor = 'grabbing';
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - px;
      px = e.clientX;
      root.rotation.y += dx * 0.005;
      velocity = dx * 0.0008;
      lastDrag = performance.now();
    };
    const onUp = () => {
      dragging = false;
      renderer.domElement.style.cursor = 'grab';
    };
    renderer.domElement.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    // --- resize ---
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight || w;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // --- pause when offscreen ---
    let visible = true;
    const io = new IntersectionObserver((entries) => { visible = entries[0]?.isIntersecting ?? true; }, { threshold: 0.01 });
    io.observe(mount);

    let raf = 0;
    let t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      t += 1;
      if (!dragging) {
        if (performance.now() - lastDrag > 1500) velocity += (0.0016 - velocity) * 0.02;
        root.rotation.y += reduce ? 0 : velocity;
      }
      // pulse the rings
      const s = 1 + Math.sin(t * 0.05) * 0.12;
      nodeGroup.children.forEach((c) => {
        if ((c as THREE.Mesh).geometry instanceof THREE.RingGeometry) c.scale.setScalar(s);
      });
      // animate arc draw
      const draw = (Math.sin(t * 0.012) * 0.5 + 0.5);
      arcMeshes.forEach(({ line, len }, i) => {
        const count = Math.max(2, Math.floor(((draw + i * 0.05) % 1) * len));
        (line.geometry as THREE.BufferGeometry).setDrawRange(0, count);
      });
      renderer.render(scene, camera);
    };
    renderer.render(scene, camera); // paint one frame immediately (survives rAF throttling)
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      renderer.dispose();
      dotGeo.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
