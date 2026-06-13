'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import type { Group } from 'three';

/**
 * Emblem Omega 3D — EXTRUDE TRỰC TIẾP từ path SVG của logo CHÍNH THỨC Aim
 * (cùng đường nét với OmegaMark 2D). Không tự dựng lại bằng primitive —
 * hình 3D = đúng logo. Vàng PBR + môi trường Lightformer → phản chiếu như vàng thật.
 */

const GOLD = '#C9A86A';

// Path thân Omega (vành hở đáy + 2 chân) — y theo hệ SVG (gốc trên-trái).
const OMEGA_BODY =
  'M65.5 71.85 A31 31 0 1 0 34.5 71.85 L21.5 71.85 L21.5 77.5 L38 77.5 L40.4 61.6 A19.2 19.2 0 1 1 59.6 61.6 L62 77.5 L78.5 77.5 L78.5 71.85 Z';

/** Tạo geometry extrude từ path SVG, lật trục Y (SVG y-down → 3D y-up), canh tâm. */
function useOmegaGeometry(depth: number) {
  return useMemo(() => {
    const loader = new SVGLoader();
    const data = loader.parse(`<svg>${`<path d="${OMEGA_BODY}"/>`}</svg>`);
    const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.6,
      bevelSize: 0.5,
      bevelSegments: 4,
      curveSegments: 48,
    });
    // Dịch theo tâm khẩu độ logo (50,45) → vòng trong/tâm điểm về gốc; center Z.
    geo.translate(-50, -45, -depth / 2);
    geo.scale(1, -1, 1); // lật Y: chân Omega xuống đáy
    geo.computeVertexNormals();
    return geo;
  }, [depth]);
}

export function OmegaEmblem() {
  const orbit = useRef<Group>(null);
  const core = useRef<Group>(null);

  // Đơn vị SVG ~100; scale 0.03 → emblem cao ~2.4 đơn vị scene
  const SCALE = 0.03;
  const bodyGeo = useOmegaGeometry(8);

  useFrame((state, delta) => {
    if (orbit.current) orbit.current.rotation.z += delta * 0.16;
    if (core.current) {
      const px = state.pointer.x * 0.18;
      const py = state.pointer.y * 0.18;
      core.current.rotation.y += (px - core.current.rotation.y) * 0.04;
      core.current.rotation.x += (-py - core.current.rotation.x) * 0.04;
    }
  });

  const goldMat = (
    <meshStandardMaterial
      color={GOLD}
      metalness={0.96}
      roughness={0.22}
      envMapIntensity={1.45}
      side={THREE.DoubleSide}
    />
  );

  return (
    <group ref={core} scale={SCALE}>
      {/* Thân Omega — extrude từ logo thật */}
      <mesh geometry={bodyGeo} castShadow>
        {goldMat}
      </mesh>

      {/* Vòng trong đồng tâm (logo: circle r=10.4) — torus tại tâm khẩu độ */}
      <mesh>
        <torusGeometry args={[10.4, 1.9, 24, 96]} />
        <meshStandardMaterial color={GOLD} metalness={0.96} roughness={0.24} envMapIntensity={1.4} />
      </mesh>

      {/* Tâm điểm đặc (logo: circle r=4.3) */}
      <mesh>
        <sphereGeometry args={[4.3, 48, 48]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.18} envMapIntensity={1.5} />
      </mesh>

      {/* Ring quỹ đạo nghiêng — xoay liên tục (echo motif vòng đồng tâm, motion flourish) */}
      <group ref={orbit} rotation={[1.2, 0, 0]}>
        <mesh>
          <torusGeometry args={[52, 0.7, 20, 180]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.15} envMapIntensity={1.6} />
        </mesh>
      </group>
    </group>
  );
}
