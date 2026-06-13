'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

/**
 * Emblem Omega 3D — vàng PBR đánh bóng.
 * Cấu trúc echo logo Aim: vòng ngoài + vòng trong đồng tâm + tâm điểm,
 * cùng một ring quỹ đạo nghiêng xoay liên tục (motif vòng đồng tâm của brand).
 * Vật liệu metalness cao + môi trường Lightformer → phản chiếu như vàng thật.
 */

const GOLD = '#C9A86A';

export function OmegaEmblem() {
  const orbit = useRef<Group>(null);
  const core = useRef<Group>(null);

  useFrame((state, delta) => {
    // Ring quỹ đạo xoay chậm, điềm tĩnh
    if (orbit.current) {
      orbit.current.rotation.z += delta * 0.18;
    }
    // Lõi nghiêng nhẹ theo con trỏ (parallax tinh tế)
    if (core.current) {
      const px = state.pointer.x * 0.18;
      const py = state.pointer.y * 0.18;
      core.current.rotation.y += (px - core.current.rotation.y) * 0.04;
      core.current.rotation.x += (-py - core.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={core}>
      {/* Vòng ngoài đồng tâm */}
      <mesh castShadow>
        <torusGeometry args={[1.15, 0.07, 32, 128]} />
        <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.22} envMapIntensity={1.4} />
      </mesh>

      {/* Vòng trong đồng tâm */}
      <mesh>
        <torusGeometry args={[0.66, 0.05, 32, 96]} />
        <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.25} envMapIntensity={1.3} />
      </mesh>

      {/* Tâm điểm — khẩu độ */}
      <mesh>
        <sphereGeometry args={[0.17, 48, 48]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.18} envMapIntensity={1.5} />
      </mesh>

      {/* Hai chân Omega — trụ nghiêng dưới hai bên */}
      <mesh position={[-0.78, -1.0, 0]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.06, 0.5, 8, 16]} />
        <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.25} envMapIntensity={1.3} />
      </mesh>
      <mesh position={[0.78, -1.0, 0]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.06, 0.5, 8, 16]} />
        <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.25} envMapIntensity={1.3} />
      </mesh>

      {/* Ring quỹ đạo nghiêng — xoay liên tục quanh emblem */}
      <group ref={orbit} rotation={[1.15, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.62, 0.022, 24, 160]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.15} envMapIntensity={1.6} />
        </mesh>
      </group>
    </group>
  );
}
