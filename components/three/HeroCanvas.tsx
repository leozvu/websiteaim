'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float, Lightformer } from '@react-three/drei';
import { OmegaEmblem } from './OmegaEmblem';

/**
 * Scene 3D hero — centerpiece tiết chế.
 * Omega vàng + ring quỹ đạo, vài khối trôi rất nhẹ, nền trong suốt (navy section
 * phía sau hiện qua). Phản chiếu bằng Lightformer studio (không tải HDRI ngoài →
 * tin cậy + nhẹ). Camera lệch phải để emblem nằm bên phải, chừa chỗ cho chữ.
 */

const GOLD = '#C9A86A';
const NAVY = '#1A2150';
const STEEL = '#6E7C89';

/** Một khối kim loại trôi nổi — bob/xoay nhẹ qua <Float>. */
function Debris({
  position,
  scale,
  geometry,
  color,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  geometry: 'ico' | 'sphere' | 'octa';
  color: string;
  speed: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.9} floatingRange={[-0.15, 0.15]}>
      <mesh position={position} scale={scale}>
        {geometry === 'ico' && <icosahedronGeometry args={[1, 0]} />}
        {geometry === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
        {geometry === 'octa' && <octahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={geometry === 'sphere' ? 0.2 : 0.35}
          envMapIntensity={1.1}
        />
      </mesh>
    </Float>
  );
}

export function HeroCanvas({ active = true, onReady }: { active?: boolean; onReady?: () => void }) {
  return (
    <Canvas
      // dpr cap 1.5 + tắt antialias (dpr lo liệu khử răng cưa) → nhẹ main thread.
      // frameloop ngừng hẳn khi hero ngoài màn (active=false) — không đốt CPU/pin.
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      onCreated={() => onReady?.()}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Ánh sáng — key ấm + rim lạnh, ambient thấp giữ chiều sâu */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} color="#FFE6BE" />
      <pointLight position={[-5, -2, -3]} intensity={40} color={STEEL} distance={20} />

      {/* Emblem lệch phải, chừa cột trái cho chữ (desktop) */}
      <group position={[1.15, 0.1, 0]} scale={1.05}>
        <OmegaEmblem />
      </group>

      {/* Khối trôi nổi — tiết chế: 5 khối, navy/gold/steel */}
      <Debris position={[-1.9, 1.3, -1]} scale={0.34} geometry="ico" color={NAVY} speed={1.1} />
      <Debris position={[2.7, 1.6, -1.5]} scale={0.22} geometry="sphere" color={GOLD} speed={1.4} />
      <Debris position={[-2.4, -1.2, -0.5]} scale={0.28} geometry="octa" color={STEEL} speed={0.9} />
      <Debris position={[2.2, -1.5, -0.8]} scale={0.2} geometry="ico" color={GOLD} speed={1.2} />
      <Debris position={[0.2, 2.1, -2]} scale={0.16} geometry="sphere" color={STEEL} speed={1.6} />

      {/* Studio environment qua Lightformer — phản chiếu vàng, không asset ngoài */}
      <Environment resolution={128}>
        <Lightformer intensity={2.4} position={[3, 2, 4]} scale={[6, 6, 1]} color="#FFEAC2" />
        <Lightformer intensity={1.2} position={[-4, -1, 2]} scale={[5, 5, 1]} color={STEEL} />
        <Lightformer intensity={0.8} position={[0, 3, -4]} scale={[8, 3, 1]} color={GOLD} />
      </Environment>
    </Canvas>
  );
}
