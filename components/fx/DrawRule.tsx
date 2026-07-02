'use client';

/* Hairline editorial vẽ dài từ trái → phải khi section vào màn — "thước kẻ trên bàn thợ". */

import { CSSProperties, useEffect, useRef, useState } from 'react';

export function DrawRule({ dark = false, style }: { dark?: boolean; style?: CSSProperties }) {
  const ref = useRef<HTMLHRElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }),
      { rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <hr
      ref={ref}
      className={`aim-rule ${dark ? 'aim-rule--dark' : ''}`}
      style={{
        transform: inView ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.9s var(--ease-brand)',
        ...style,
      }}
    />
  );
}
