'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float, Lightformer } from '@react-three/drei';
import { Fog } from 'three';
import { OmegaEmblem } from './OmegaEmblem';

/**
 * Scene 3D hero — AIM Luxury, tiết chế. Omega vàng làm HIỆN VẬT trung tâm, lệch phải
 * và crop ngoài viewport để hỗ trợ headline (không tranh chấp). Chỉ 3 khối trôi rất
 * nhẹ. Fog ink tạo chiều sâu khí quyển. Phản chiếu bằng Lightformer MÀU THƯƠNG HIỆU
 * (royal/champagne/ivory) → vàng bắt màu brand, không phải vàng studio chung chung.
 */

const ANTIQUE = '#A9782A';
const ROYAL = '#121A44';

function Debris({
  position,
  scale,
  geometry,
  color,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  geometry: 'ico' | 'octa';
  color: string;
  speed: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.7} floatingRange={[-0.12, 0.12]}>
      <mesh position={position} scale={scale}>
        {geometry === 'ico' && <icosahedronGeometry args={[1, 0]} />}
        {geometry === 'octa' && <octahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.42} envMapIntensity={0.9} />
      </mesh>
    </Float>
  );
}

export function HeroCanvas({ active = true, onReady }: { active?: boolean; onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.4], fov: 40 }}
      onCreated={({ scene }) => {
        // Fog ink → chiều sâu khí quyển, debris xa mờ dần (DoF "giả" rẻ)
        scene.fog = new Fog('#060815', 5.5, 11);
        onReady?.();
      }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Ánh sáng kịch: key ấm champagne trên-phải + rim royal dưới-trái, ambient thấp */}
      <ambientLight intensity={0.28} />
      <directionalLight position={[5, 5, 3]} intensity={1.5} color="#FFE2B0" />
      <pointLight position={[-5, -3, -2]} intensity={36} color="#2A3570" distance={22} />
      {/* Backlight champagne sau emblem — tách khỏi nền tối */}
      <pointLight position={[3, 1, -3]} intensity={26} color="#D8B46A" distance={16} />

      {/* Emblem lệch PHẢI + hơi xuống, crop ngoài viewport → hỗ trợ headline bên trái */}
      <group position={[2.05, -0.2, 0]} scale={1.05}>
        <OmegaEmblem />
      </group>

      {/* Chỉ 3 khối trôi — navy/antique, rất tiết chế */}
      <Debris position={[-1.4, 1.6, -1.5]} scale={0.3} geometry="ico" color={ROYAL} speed={0.8} />
      <Debris position={[3.4, 1.9, -2]} scale={0.18} geometry="octa" color={ANTIQUE} speed={1.0} />
      <Debris position={[0.4, -1.9, -1]} scale={0.24} geometry="octa" color={ROYAL} speed={0.7} />

      {/* Studio environment — Lightformer MÀU BRAND (vàng bắt màu navy/champagne/ivory) */}
      <Environment resolution={128}>
        <Lightformer intensity={2.6} position={[4, 2, 4]} scale={[7, 7, 1]} color="#F7EEDB" />
        <Lightformer intensity={1.6} position={[-4, 0, 2]} scale={[5, 5, 1]} color="#1A2150" />
        <Lightformer intensity={1.1} position={[0, -3, -4]} scale={[8, 3, 1]} color="#D8B46A" />
      </Environment>
    </Canvas>
  );
}
