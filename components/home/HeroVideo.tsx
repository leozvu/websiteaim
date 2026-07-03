'use client';

/* Nền video hero — thước phim "Inside the Atelier" (fal.ai: foil vàng → máy in →
   danh thiếp → quạt swatch; KHÔNG chữ/logo AI). Video CHÍNH là showcase:
   caption + thanh tiến độ đồng bộ theo cảnh (3s/cảnh).
   - Poster tĩnh (frame foil, 54KB) hiển thị ngay ở MỌI thiết bị — mobile không tải video
   - Video chỉ mount desktop ≥960px, không reduced-motion/Save-Data, sau idle
   - Scrim navy đậm bên trái cho headline, bên phải nhẹ để footage tỏa sáng */

import { useEffect, useRef, useState } from 'react';

const SCENE_S = 3;
const CAPTIONS = ['Ép foil kim loại nóng', 'Giấy qua trục máy in', 'Danh thiếp mạ cạnh vàng', 'Bảng giấy & hệ màu'];

export function HeroVideo() {
  const [ready, setReady] = useState(false); // đủ điều kiện mount <video>
  const [playing, setPlaying] = useState(false); // đã có frame → fade in + captions
  const [scene, setScene] = useState(0);
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
    const onPlaying = () => setPlaying(true);
    const onTime = () => setScene(Math.floor(v.currentTime / SCENE_S) % CAPTIONS.length);
    v.addEventListener('playing', onPlaying, { once: true });
    v.addEventListener('timeupdate', onTime);
    v.play().catch(() => {
      /* autoplay bị chặn → giữ poster tĩnh */
    });
    return () => {
      v.removeEventListener('playing', onPlaying);
      v.removeEventListener('timeupdate', onTime);
    };
  }, [ready]);

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Poster tĩnh — mọi thiết bị thấy ngay, video fade đè lên khi sẵn sàng */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-atelier-poster.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
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
      {/* Scrim: trái đậm cho chữ, phải nhẹ cho footage */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(8,22,80,0.94) 0%, rgba(8,22,80,0.8) 40%, rgba(8,22,80,0.38) 74%, rgba(8,22,80,0.26) 100%)',
        }}
      />
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(8,22,80,0.55) 0%, transparent 32%, transparent 70%, rgba(8,22,80,0.55) 100%)',
        }}
      />

      {/* Caption sản phẩm + tiến độ cảnh — thay vai trò reel cũ */}
      {playing && (
        <div style={{ position: 'absolute', right: 'max(24px, calc((100% - 1200px) / 2 + 40px))', bottom: 38, textAlign: 'right' }}>
          <div className="aim-eyebrow" style={{ color: 'var(--steel-soft)', fontSize: 10, marginBottom: 6 }}>
            Bên trong xưởng · Sản phẩm bàn giao
          </div>
          <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)', fontSize: 12 }}>{CAPTIONS[scene]}</div>
          <div style={{ marginTop: 9, display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
            {CAPTIONS.map((_, i) => (
              <span
                key={i}
                style={{
                  height: 2,
                  width: 30,
                  borderRadius: 2,
                  background: i === scene ? 'var(--gold-bright)' : 'rgba(248,242,235,0.25)',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
