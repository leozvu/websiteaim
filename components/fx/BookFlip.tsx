'use client';

/* Brand book 3D lật trang theo scroll — sản phẩm bán chạy nhất của AIM, cho khách "cầm" nó.
   Section cao 260vh, sách sticky giữa màn; tiến độ scroll lật lần lượt 4 lá
   (bìa → chiến lược → logo → màu & chữ) lộ ra bìa sau "DO RIGHT THINGS." + CTA.
   Thuần CSS 3D (preserve-3d + backface-hidden) — không WebGL, asset logo thật.
   Reduced-motion: đứng yên ở bìa, không sticky. */

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { Logo, OmegaMark, Button } from '@/components/brandbook/ds';

const CAPTIONS = [
  'Bìa — Brand Guidelines',
  '01 · Chiến lược thương hiệu',
  '02 · Logo & Nhận diện',
  '03 · Màu sắc & Kiểu chữ',
  'Bìa sau — Do Right Things',
];

/* ── Nội dung từng trang (asset + token thật) ── */

function PageCover() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(150deg, #0b1c5e, #081650 60%, #040a29)',
        border: '1px solid var(--border-accent)',
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
        padding: '12%',
      }}
    >
      <Logo variant="stacked" tone="ivory" markSize={64} />
      <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)', letterSpacing: 'var(--tracking-brand)' }}>
        Brand Guidelines
      </div>
      <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 20%, rgba(197,173,138,0.14), transparent 55%)', borderRadius: 6 }} />
    </div>
  );
}

function PageStrategy() {
  const rows = [
    ['Lựa chọn đúng', 'Do Right Things'],
    ['Thực thi chuẩn xác', 'Deliver Value Precisely'],
    ['Đồng hành chân thành', 'Honest Companionship'],
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--ivory)', borderRadius: 6, padding: '10% 11%', color: 'var(--navy)', boxShadow: 'inset -10px 0 16px rgba(8,22,80,0.06)' }}>
      <div className="aim-numeral" style={{ fontSize: 'clamp(2.6rem,6vw,3.6rem)' }}>01</div>
      <div className="aim-display" style={{ fontSize: 'clamp(16px,2.2vw,22px)', marginTop: 6 }}>Chiến lược thương hiệu</div>
      <hr className="aim-rule" style={{ margin: '12px 0 14px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map(([vi, en]) => (
          <div key={vi}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'clamp(11px,1.4vw,13.5px)' }}>{vi}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(10px,1.3vw,12.5px)', color: 'var(--steel)' }}>{en}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageLogo() {
  const grounds = [
    { bg: 'var(--ivory-raise)', tone: 'navy' as const },
    { bg: 'var(--navy)', tone: 'ivory' as const },
    { bg: 'var(--steel-pale)', tone: 'navy' as const },
    { bg: 'var(--steel)', tone: 'ivory' as const },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--ivory-raise)', borderRadius: 6, padding: '10% 11%', color: 'var(--navy)', boxShadow: 'inset -10px 0 16px rgba(8,22,80,0.06)' }}>
      <div className="aim-numeral" style={{ fontSize: 'clamp(2.6rem,6vw,3.6rem)' }}>02</div>
      <div className="aim-display" style={{ fontSize: 'clamp(16px,2.2vw,22px)', marginTop: 6 }}>Logo &amp; Nhận diện</div>
      <hr className="aim-rule" style={{ margin: '12px 0 16px' }} />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <Logo variant="stacked" tone="navy" markSize={46} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {grounds.map((g, i) => (
          <div key={i} style={{ background: g.bg, borderRadius: 4, border: '1px solid var(--border-on-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}>
            <OmegaMark size={20} title="" tone={g.tone} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PageSystem() {
  const chips = ['#081650', '#F8F2EB', '#C5AD8A', '#6E7C89'];
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--ivory)', borderRadius: 6, padding: '10% 11%', color: 'var(--navy)', boxShadow: 'inset -10px 0 16px rgba(8,22,80,0.06)' }}>
      <div className="aim-numeral" style={{ fontSize: 'clamp(2.6rem,6vw,3.6rem)' }}>03</div>
      <div className="aim-display" style={{ fontSize: 'clamp(16px,2.2vw,22px)', marginTop: 6 }}>Màu sắc &amp; Kiểu chữ</div>
      <hr className="aim-rule" style={{ margin: '12px 0 18px' }} />
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,5vw,46px)', lineHeight: 1 }}>
        Aa <span style={{ color: 'var(--gold-deep)' }}>Ωa</span>
      </div>
      <div style={{ marginTop: 8, fontFamily: 'var(--font-body)', fontSize: 'clamp(10px,1.3vw,12px)', color: 'var(--steel)' }}>
        Garamond · Be Vietnam Pro
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
        {chips.map((c) => (
          <span key={c} style={{ height: 28, width: 28, borderRadius: '50%', background: c, border: '1px solid var(--border-on-light)' }} />
        ))}
      </div>
    </div>
  );
}

function PageBack() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, #081650, #040a29)',
        border: '1px solid var(--border-on-dark)',
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: '12%',
        textAlign: 'center',
      }}
    >
      <OmegaMark size={40} title="" tone="ivory" style={{ opacity: 0.8 }} />
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.2em', fontSize: 'clamp(13px,1.8vw,17px)', color: 'var(--ivory)' }}>
        DO RIGHT THINGS.
      </p>
      <Button href="/services" variant="gold" size="sm" withArrow>
        Xem gói dịch vụ
      </Button>
    </div>
  );
}

const LEAVES: ReactNode[] = [<PageCover key="c" />, <PageStrategy key="1" />, <PageLogo key="2" />, <PageSystem key="3" />];

export function BookFlip({
  eyebrow = 'Sản phẩm bàn giao · Brand book',
  title = 'Cuốn cẩm nang bạn sẽ cầm trên tay',
}: { eyebrow?: string; title?: string } = {}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrap.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        setP(Math.min(Math.max(-r.top / (total || 1), 0), 1));
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, []);

  const n = LEAVES.length;
  const local = (i: number) => Math.min(Math.max(p * n - i, 0), 1);
  const flipped = Math.min(Math.round(p * n), n);

  const leafBase: CSSProperties = {
    position: 'absolute',
    inset: 0,
    transformOrigin: 'left center',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: 6,
    boxShadow: '0 18px 44px rgba(4,10,41,0.4)',
  };

  return (
    <section style={{ background: 'var(--navy-ink)', color: 'var(--ivory)' }}>
      <div ref={wrap} style={{ position: 'relative', height: reduced ? 'auto' : '260vh' }}>
        <div
          style={{
            position: reduced ? 'relative' : 'sticky',
            top: 0,
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 26,
            paddingBlock: 72,
            overflow: 'hidden',
          }}
        >
          <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(197,173,138,0.08), transparent 55%)' }} />
          <div className="aim-container" style={{ position: 'relative', textAlign: 'center' }}>
            <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)' }}>
              {eyebrow}
            </div>
            <h2 className="aim-display" style={{ fontSize: 'var(--text-h2)', margin: '12px 0 0', color: 'var(--ivory)' }}>
              {title}
            </h2>
          </div>

          {/* Cuốn sách 3D */}
          <div style={{ position: 'relative', perspective: 1600 }}>
            <div style={{ position: 'relative', width: 'min(380px, 76vw)', aspectRatio: '3 / 4', transformStyle: 'preserve-3d', transform: 'rotateX(6deg)' }}>
              {/* Bìa sau — lộ ra cuối cùng */}
              <div style={{ ...leafBase, transform: 'none', zIndex: 1, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                <PageBack />
              </div>
              {/* 4 lá lật */}
              {LEAVES.map((leaf, i) => {
                const l = reduced ? 0 : local(i);
                const shade = l * (1 - l) * 1.1; /* tối nhất giữa cú lật */
                return (
                  <div
                    key={i}
                    aria-hidden={l >= 0.5}
                    style={{
                      ...leafBase,
                      zIndex: 2 + (n - i),
                      transform: `rotateY(${-l * 178}deg)`,
                      boxShadow: l > 0 && l < 1 ? '0 30px 50px rgba(0,0,0,0.45)' : leafBase.boxShadow,
                    }}
                  >
                    {leaf}
                    <span aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: 6, background: `rgba(4,10,41,${Math.min(shade, 0.35)})`, pointerEvents: 'none' }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Caption + tiến độ */}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div className="aim-eyebrow" style={{ color: 'var(--steel-soft)', fontSize: 11 }}>
              {CAPTIONS[reduced ? 0 : flipped]}
            </div>
            {!reduced && (
              <div style={{ marginTop: 10, display: 'flex', gap: 6, justifyContent: 'center' }}>
                {CAPTIONS.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      height: 2,
                      width: 26,
                      borderRadius: 2,
                      background: i <= flipped ? 'var(--gold-bright)' : 'rgba(248,242,235,0.18)',
                      transition: 'background 0.3s',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
