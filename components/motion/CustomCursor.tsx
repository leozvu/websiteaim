'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Cursor tùy biến: chấm gold theo chuột tức thì + vòng ngoài trễ (lerp).
 * To ra khi hover phần tử tương tác (a, button, [data-cursor]).
 * CHỈ bật khi (pointer: fine) và không reduced-motion — touch/giảm-chuyển-động
 * giữ cursor gốc. Ẩn cursor gốc chỉ khi cursor tùy biến đang chạy (fallback an toàn).
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add('cursor-none');

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...target };
    let hovering = false;
    let raf = 0;
    let started = false; // chỉ chạy rAF loop sau khi chuột di chuyển lần đầu → 0 cost khi không có chuột (Lighthouse)

    const loop = () => {
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      const interactive = (e.target as HTMLElement)?.closest?.(
        'a, button, [role="tab"], [data-cursor], input, textarea, label',
      );
      const next = !!interactive;
      if (next !== hovering) {
        hovering = next;
        ring.current?.classList.toggle('is-hover', hovering);
      }
      if (!started) {
        started = true;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.classList.remove('cursor-none');
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] hidden lg:block">
      <div
        ref={ring}
        className="cursor-ring fixed left-0 top-0 h-8 w-8 rounded-full border border-gold/60 transition-[width,height,background-color,border-color] duration-200 ease-out"
      />
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold"
      />
    </div>
  );
}
