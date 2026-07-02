'use client';

/* Hero motion-design — KHÔNG dùng AI. Một "reel" showcase các sản phẩm bàn giao
   của Aim (logo → danh thiếp → biển hiệu → ấn phẩm → hệ màu), cắt cảnh nhanh,
   dựng hoàn toàn từ asset THẬT (logo Omega PNG + token màu/chữ). Reason-to-buy
   ngay trong 5 giây đầu. Bên trái là headline + CTA. */

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { Button, OmegaMark, Logo } from '@/components/brandbook/ds';
import { Tilt3D } from '@/components/brandbook/primitives';
import { HeroVideo } from './HeroVideo';
import { HERO } from '@/lib/content';

const SCENE_MS = 1300;

/* —— Các "tấm" sản phẩm, dựng bằng div + asset thật —— */

function SceneLogo() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <Logo variant="stacked" tone="ivory" withTagline markSize={104} />
      {/* vệt sáng champagne quét qua */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '38%',
          background: 'linear-gradient(90deg, transparent, rgba(216,195,158,0.22), transparent)',
          animation: 'aim-sweep 2.4s var(--ease-out) infinite',
        }}
      />
    </div>
  );
}

function SceneCard() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* card phía sau */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: '64%',
          aspectRatio: '1.75 / 1',
          borderRadius: 12,
          background: 'var(--navy-soft)',
          border: '1px solid var(--border-on-dark)',
          transform: 'translate(18px, 22px) rotate(-7deg)',
          opacity: 0.5,
        }}
      />
      {/* card trước */}
      <div
        style={{
          position: 'relative',
          width: '64%',
          aspectRatio: '1.75 / 1',
          borderRadius: 12,
          background: 'linear-gradient(150deg, #0b1c5e, #081650)',
          border: '1px solid var(--border-accent)',
          boxShadow: '0 26px 54px rgba(4,10,41,0.5)',
          padding: '7% 8%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: 'rotate(-3deg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <OmegaMark size={26} title="" tone="ivory" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(13px,1.5vw,18px)', letterSpacing: '0.12em', color: 'var(--ivory)' }}>
            AIM AGENCY
          </span>
        </div>
        <div>
          <div style={{ height: 1, background: 'var(--border-accent)', marginBottom: 8 }} />
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(8px,1vw,11px)', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold-bright)' }}>
            Do Right Things
          </div>
          <div style={{ marginTop: 4, fontFamily: 'var(--font-body)', fontSize: 'clamp(8px,1vw,11px)', color: 'var(--text-on-dark-subtle)' }}>
            aimagency.vn · (+84) 799 699 039
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneSign() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #02061c, #081650 70%)',
      }}
    >
      <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 36%, rgba(216,195,158,0.18), transparent 55%)' }} />
      {/* tấm biển */}
      <div
        style={{
          position: 'relative',
          width: '66%',
          padding: '12% 8%',
          borderRadius: 14,
          background: 'linear-gradient(155deg, rgba(27,42,85,0.9), rgba(8,22,80,0.95))',
          border: '1px solid var(--border-accent)',
          boxShadow: '0 0 60px rgba(216,195,158,0.18), inset 0 1px 0 rgba(248,242,235,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <OmegaMark size={48} title="" tone="ivory" />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,2vw,24px)', letterSpacing: '0.16em', color: 'var(--ivory)' }}>AIM AGENCY</span>
      </div>
    </div>
  );
}

function SceneStationery() {
  const bar = (w: string, c = 'var(--steel)') => (
    <div style={{ height: 6, width: w, borderRadius: 3, background: c, opacity: 0.7 }} />
  );
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* phong bì / folder phía sau */}
      <div aria-hidden style={{ position: 'absolute', width: '58%', aspectRatio: '1 / 1.35', borderRadius: 8, background: 'var(--ivory-deep)', transform: 'translate(26px, 26px) rotate(6deg)', opacity: 0.6 }} />
      {/* tờ tiêu đề giấy */}
      <div
        style={{
          position: 'relative',
          width: '58%',
          aspectRatio: '1 / 1.35',
          borderRadius: 8,
          background: 'var(--ivory)',
          boxShadow: '0 24px 50px rgba(4,10,41,0.45)',
          padding: '12% 11%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          transform: 'rotate(-2deg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <OmegaMark size={24} title="" tone="navy" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.1em', color: 'var(--navy)' }}>AIM AGENCY</span>
        </div>
        {bar('86%')}
        {bar('92%')}
        {bar('70%')}
        <div style={{ height: 1, background: 'var(--gold-deep)', width: '30%', margin: '4px 0' }} />
        {bar('80%')}
        {bar('60%')}
      </div>
    </div>
  );
}

function SceneSystem() {
  const swatches = [
    { c: '#081650', t: 'Navy' },
    { c: '#f8f2eb', t: 'Ivory' },
    { c: '#c5ad8a', t: 'Champagne' },
    { c: '#6e7c89', t: 'Steel' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '8%' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,7vw,72px)', lineHeight: 0.9, color: 'var(--ivory)' }}>
        Aa <span style={{ color: 'var(--gold-bright)' }}>Ωa</span>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {swatches.map((s) => (
          <div key={s.t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span style={{ height: 40, width: 40, borderRadius: '50%', background: s.c, border: '1px solid var(--border-on-dark)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-on-dark-subtle)' }}>{s.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SCENES: { node: ReactNode; caption: string }[] = [
  { node: <SceneLogo />, caption: 'Logo & nhận diện' },
  { node: <SceneCard />, caption: 'Danh thiếp' },
  { node: <SceneSign />, caption: 'Biển hiệu' },
  { node: <SceneStationery />, caption: 'Ấn phẩm văn phòng' },
  { node: <SceneSystem />, caption: 'Hệ màu & kiểu chữ' },
];

function Stage() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    timer.current = setInterval(() => setActive((a) => (a + 1) % SCENES.length), SCENE_MS);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <div
      aria-label="Sản phẩm Aim đã bàn giao: logo, danh thiếp, biển hiệu, ấn phẩm, hệ màu"
      role="img"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 3',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'linear-gradient(150deg, #040a29, #081650 60%, #0b1c5e)',
        border: '1px solid var(--border-on-dark)',
        boxShadow: '0 30px 70px rgba(4,10,41,0.5)',
      }}
    >
      {SCENES.map((s, i) => {
        const on = reduced ? i === 0 : i === active;
        return (
          <div
            key={i}
            aria-hidden={!on}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: on ? 1 : 0,
              transform: on ? 'scale(1)' : 'scale(1.04)',
              transition: 'opacity 0.5s var(--ease-brand), transform 0.7s var(--ease-brand)',
              pointerEvents: 'none',
            }}
          >
            {s.node}
          </div>
        );
      })}

      {/* caption sản phẩm + ticks tiến trình */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '18px 20px', background: 'linear-gradient(0deg, rgba(4,10,41,0.85), transparent)' }}>
        <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)', fontSize: 11 }}>
          {reduced ? SCENES[0].caption : SCENES[active].caption}
        </div>
        {!reduced && (
          <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
            {SCENES.map((_, i) => (
              <span key={i} style={{ position: 'relative', height: 2, flex: 1, background: 'rgba(248,242,235,0.18)', overflow: 'hidden', borderRadius: 2 }}>
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--gold-bright)',
                    transformOrigin: 'left',
                    transform: i < active ? 'scaleX(1)' : 'scaleX(0)',
                    animation: i === active ? `aim-tick-fill ${SCENE_MS}ms linear forwards` : 'none',
                  }}
                />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function HeroShowcase() {
  const [p, setP] = useState({ x: 0, y: 0 });
  const reduce = useRef(false);
  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  const move = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    setP({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  const enter = (delay: number): CSSProperties => ({
    animation: `aim-fade-in-up 0.8s var(--ease-brand) ${delay}s both`,
  });

  return (
    <section
      id="hero"
      onMouseMove={move}
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: 'var(--navy)',
        color: 'var(--ivory)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Lớp 0: video atelier (fal.ai) + scrim navy — dưới cùng */}
      <HeroVideo />
      <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 22% 30%, rgba(197,173,138,0.1), transparent 55%)' }} />
      <div
        aria-hidden
        style={{ position: 'absolute', right: '-14%', top: '50%', transform: `translate(${p.x * -30}px, calc(-50% + ${p.y * -22}px))`, transition: 'transform 0.4s var(--ease-out)' }}
      >
        <OmegaMark size={620} title="" tone="ivory" style={{ opacity: 0.05 }} />
      </div>

      <div
        className="aim-container aim-hero-grid"
        style={{ position: 'relative', paddingTop: 110, paddingBottom: 64, display: 'grid', gap: 'clamp(40px,5vw,72px)', alignItems: 'center' }}
      >
        {/* Cột chữ */}
        <div>
          <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)', marginBottom: 24, ...enter(0) }}>
            Branding Studio · Startups &amp; SME Việt Nam
          </div>
          <h1 className="aim-display" style={{ fontSize: 'var(--text-hero)', lineHeight: 1.02, margin: 0, letterSpacing: '-0.01em' }}>
            {HERO.title.split(' ').map((w, i, arr) => (
              <span key={i}>
                <span className="aim-word-mask">
                  <span className="aim-word" style={{ animationDelay: `${0.1 + i * 0.09}s` }}>
                    {w}
                  </span>
                </span>
                {i < arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>
          <p style={{ marginTop: 26, maxWidth: 480, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--text-on-dark-muted)', ...enter(0.16) }}>
            {HERO.subtitle}
          </p>
          <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 14, ...enter(0.24) }}>
            <Button href={HERO.primaryCta.href} variant="gold" size="lg" withArrow>
              {HERO.primaryCta.label}
            </Button>
            <Button href={HERO.secondaryCta.href} variant="outline-light" size="lg">
              {HERO.secondaryCta.label}
            </Button>
          </div>
        </div>

        {/* Cột reel showcase — nghiêng theo con trỏ như vật thể trên bàn */}
        <div style={{ ...enter(0.3) }}>
          <Tilt3D max={5} lift={1.008} radius="var(--radius-lg)">
            <Stage />
          </Tilt3D>
        </div>
      </div>
    </section>
  );
}
