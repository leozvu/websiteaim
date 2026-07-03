'use client';

/* Cursor tùy biến — chấm ivory + vòng champagne trễ (lerp 0.16).
   Chỉ chạy trên pointer:fine, khởi động sau pointermove đầu tiên (0 chi phí lúc load),
   tôn trọng prefers-reduced-motion. Vòng phình khi hover phần tử tương tác. */

import { useEffect, useRef, useState } from 'react';

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let x = 0, y = 0, rx = 0, ry = 0;
    let started = false;

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!started) {
        started = true;
        rx = x;
        ry = y;
        setOn(true);
        document.documentElement.classList.add('aim-cursor-on');
        loop();
      }
      const t = e.target as HTMLElement | null;
      const hover = !!t?.closest?.('a, button, [role="button"], input, textarea, select, summary, [data-cursor]');
      ring.current?.classList.toggle('is-hover', hover);
    };

    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('aim-cursor-on');
    };
  }, []);

  return (
    <>
      <div ref={dot} className="aim-cursor-dot" aria-hidden style={{ opacity: on ? 1 : 0 }}>
        <span />
      </div>
      <div ref={ring} className="aim-cursor-ring" aria-hidden style={{ opacity: on ? 1 : 0 }}>
        <span />
      </div>
    </>
  );
}
