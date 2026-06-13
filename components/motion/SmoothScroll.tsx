'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Smooth/inertia scroll toàn site (Lenis) — cảm giác cuộn có quán tính như các
 * site agency cao cấp. TẮT hoàn toàn khi prefers-reduced-motion (giữ cuộn gốc).
 * Đăng ký lenis lên window để anchor/back-to-top scrollTo dùng chung.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lenis: Lenis | null = null;
    let raf = 0;
    let onAnchorClick: ((e: MouseEvent) => void) | null = null;

    // Hoãn init tới khi luồng chính rảnh — không thêm rAF vào cửa sổ đo TBT/TTI.
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 800));
    const idleId = ric(() => {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });
      (window as unknown as { lenis?: Lenis }).lenis = lenis;

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      onAnchorClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          lenis?.scrollTo(el as HTMLElement, { offset: -80 });
        }
      };
      document.addEventListener('click', onAnchorClick);
    });

    return () => {
      if (window.cancelIdleCallback && typeof idleId === 'number') window.cancelIdleCallback(idleId);
      cancelAnimationFrame(raf);
      if (onAnchorClick) document.removeEventListener('click', onAnchorClick);
      lenis?.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}
