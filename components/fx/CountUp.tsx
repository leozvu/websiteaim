'use client';

/* Số đếm cuộn lên khi vào viewport — "đồng hồ Thụy Sĩ".
   SSR render giá trị cuối (không CLS, SEO đủ); JS đếm 0 → value một lần. */

import { CSSProperties, useEffect, useRef, useState } from 'react';

export function CountUp({
  value,
  pad = 0,
  duration = 800,
  className = '',
  style,
}: {
  value: number;
  pad?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [disp, setDisp] = useState(() => String(value).padStart(pad, '0'));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisp(String(Math.round(eased * value)).padStart(pad, '0'));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }),
      { rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, pad, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {disp}
    </span>
  );
}
