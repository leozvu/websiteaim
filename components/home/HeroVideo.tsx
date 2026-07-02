'use client';

/* Nền video hero — thước phim "Inside the Atelier" (4 cảnh xưởng branding, gen bằng
   fal.ai: foil vàng → máy in → danh thiếp → quạt swatch; KHÔNG chữ/logo AI — logo
   thật vẫn là DOM đè lên). Kỷ luật hiệu năng:
   - Chỉ mount khi: desktop ≥960px, không reduced-motion, không Save-Data
   - Mount sau requestIdleCallback → không đụng LCP/TBT
   - preload=none + fade-in khi đủ dữ liệu; nền navy hiển thị trước nên không flash
   - Scrim navy đậm bên trái để headline giữ contrast AA */

import { useEffect, useRef, useState } from 'react';

export function HeroVideo() {
  const [ready, setReady] = useState(false); // đủ điều kiện mount <video>
  const [playing, setPlaying] = useState(false); // đã có frame → fade in
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 960) return;
    const conn = (navigator as any).connection;
    if (conn?.saveData) return;

    const idle = (cb: () => void) =>
      'requestIdleCallback' in window ? (window as any).requestIdleCallback(cb, { timeout: 2500 }) : setTimeout(cb, 1200);
    const id = idle(() => setReady(true));
    return () => {
      if ('cancelIdleCallback' in window) (window as any).cancelIdleCallback(id);
      else clearTimeout(id as any);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const v = videoRef.current;
    if (!v) return;
    const on = () => setPlaying(true);
    v.addEventListener('playing', on, { once: true });
    v.play().catch(() => {
      /* autoplay bị chặn → giữ nền tĩnh, không sao */
    });
    return () => v.removeEventListener('playing', on);
  }, [ready]);

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {ready && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          src="/videos/hero-atelier.mp4"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: playing ? 1 : 0,
            transition: 'opacity 1.2s var(--ease-brand)',
          }}
        />
      )}
      {/* Scrim: trái đậm cho chữ, phủ navy toàn khung để video chìm xuống làm nền */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(8,22,80,0.94) 0%, rgba(8,22,80,0.82) 42%, rgba(8,22,80,0.55) 72%, rgba(8,22,80,0.45) 100%)',
        }}
      />
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(8,22,80,0.55) 0%, transparent 30%, transparent 70%, rgba(8,22,80,0.6) 100%)',
        }}
      />
    </div>
  );
}
