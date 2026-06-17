'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * Hero depth-parallax bằng WebGL (KHÔNG WebGPU — chạy mọi browser).
 * Một plane full-screen: ảnh navy được dịch UV theo depth-map * con trỏ → cảm giác
 * chiều sâu khi rê chuột. Cover-fit (không méo). Subtle, on-brand, không scan-line/neon.
 */

const IMG_W = 1280;
const IMG_H = 720;

const VERT = `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
`;

const FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uImage;
  uniform sampler2D uDepth;
  uniform vec2 uPointer;     // -1..1, smoothed
  uniform vec2 uRes;         // canvas px
  uniform vec2 uImgRes;      // image px
  uniform float uStrength;

  vec2 coverUv(vec2 uv){
    vec2 s = uRes / uImgRes;
    float scale = max(s.x, s.y);
    vec2 size = uImgRes * scale;
    vec2 offset = (uRes - size) * 0.5;
    return (uv * uRes - offset) / size;
  }

  void main(){
    vec2 uv = coverUv(vUv);
    float depth = texture2D(uDepth, uv).r;      // sáng=gần
    vec2 disp = (depth - 0.5) * uPointer * uStrength;
    vec3 col = texture2D(uImage, uv + disp).rgb;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function DepthPlane({ onReady }: { onReady?: () => void }) {
  const [img, depth] = useTexture(['/images/hero-navy.jpg', '/images/hero-depth.png']);
  const { size, viewport } = useThree();
  const target = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uImage: { value: img },
      uDepth: { value: depth },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uRes: { value: new THREE.Vector2(size.width, size.height) },
      uImgRes: { value: new THREE.Vector2(IMG_W, IMG_H) },
      uStrength: { value: 0.04 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [img, depth],
  );

  useEffect(() => {
    img.colorSpace = THREE.SRGBColorSpace;
    uniforms.uRes.value.set(size.width, size.height);
    onReady?.();
  }, [img, size, uniforms, onReady]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set((e.clientX / window.innerWidth - 0.5) * 2, -(e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame(() => {
    uniforms.uPointer.value.lerp(target.current, 0.045);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial uniforms={uniforms} vertexShader={VERT} fragmentShader={FRAG} />
    </mesh>
  );
}

export function HeroDepth({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
      orthographic
      style={{ width: '100%', height: '100%' }}
    >
      <DepthPlane onReady={onReady} />
    </Canvas>
  );
}
