'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { OmegaMark } from '../Logo';

// Canvas 3D nạp động, KHÔNG SSR — chỉ tải khi thiết bị đủ khoẻ (progressive enhancement).
const HeroCanvas = dynamic(() => import('./HeroCanvas').then((m) => m.HeroCanvas), {
  ssr: false,
  loading: () => null,
});

/** WebGL khả dụng? */
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

/**
 * Centerpiece hero: poster tĩnh (SSR, LCP tức thì) + canvas 3D fade đè lên khi sẵn sàng.
 * reduced-motion / màn nhỏ / không WebGL → chỉ poster, không mount canvas (perf + a11y + pin).
 */
export function HeroScene() {
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bigEnough = window.matchMedia('(min-width: 1024px)').matches;
    if (reduce || !bigEnough || !hasWebGL()) return;

    // Hoãn mount tới khi luồng chính rảnh — đẩy WebGL init ra khỏi cửa sổ đo TBT/TTI,
    // giữ Lighthouse cao mà vẫn có 3D. Fallback setTimeout nếu không có requestIdleCallback.
    const ric =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    const id = ric(() => setMount(true));
    return () => {
      if (window.cancelIdleCallback && typeof id === 'number') window.cancelIdleCallback(id);
    };
  }, []);

  // Pause render khi hero cuộn khỏi viewport — tiết kiệm CPU/pin
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.05 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Poster tĩnh — Omega lệch phải + quầng sáng, khớp bố cục canvas để chuyển mượt */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className="absolute right-[2%] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(216,180,106,0.18), transparent 60%)' }}
        />
        <OmegaMark
          title=""
          className="absolute right-[-6%] top-1/2 h-[52vmin] w-[52vmin] -translate-y-1/2 text-gold-champagne/45"
        />
      </div>

      {/* Canvas 3D — fade in khi GL khởi tạo xong */}
      {mount && (
        <div
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <HeroCanvas active={active} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
