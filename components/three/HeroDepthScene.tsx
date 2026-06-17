'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const HeroDepth = dynamic(() => import('./HeroDepth').then((m) => m.HeroDepth), {
  ssr: false,
  loading: () => null,
});

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

/**
 * Centerpiece media hero: ảnh tĩnh (poster/LCP, mobile, reduced-motion) + canvas
 * depth-parallax WebGL fade đè khi sẵn sàng (desktop ≥768, có WebGL, không reduced-motion).
 * Mount hoãn tới idle → không chặn LCP/TBT.
 */
export function HeroDepthScene() {
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 768px)').matches;
    if (reduce || !desktop || !hasWebGL()) return;
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 800));
    const id = ric(() => setMount(true));
    return () => {
      if (window.cancelIdleCallback && typeof id === 'number') window.cancelIdleCallback(id);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0">
      <Image src="/images/hero-navy.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      {mount && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <HeroDepth onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
