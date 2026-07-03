'use client';

/* AIM brand book — editorial primitives + chrome.
   Port y chang từ design bundle book.jsx. */

import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { Logo, OmegaMark, Icon } from './ds';
import { CHAPTERS, SITE, Chapter } from './data';

/* Scroll reveal — slow editorial fade-up. Respects reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  depth = false,
  as: Tag = 'div',
  className = '',
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  depth?: boolean;
  as?: any;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }),
      { rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const hidden = depth
    ? `perspective(1200px) translateY(${y}px) rotateX(7deg) scale(0.96)`
    : `translateY(${y}px)`;
  const visible = depth ? 'perspective(1200px) translateY(0) rotateX(0) scale(1)' : 'translateY(0)';
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? visible : hidden,
        transformOrigin: 'center bottom',
        transition: `opacity 0.9s var(--ease-brand) ${delay}s, transform 0.9s var(--ease-brand) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* Tilt3D — pointer-driven 3D tilt with optional glossy sheen. */
export function Tilt3D({
  children,
  max = 9,
  lift = 1.0,
  sheen = false,
  radius = 'var(--radius-md)',
  className = '',
  style,
}: {
  children: ReactNode;
  max?: number;
  lift?: number;
  sheen?: boolean;
  radius?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, on: false });
  const reduce = useRef(false);
  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce.current || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * max, ry: px * max, mx: (px + 0.5) * 100, on: true });
  };
  const leave = () => setT({ rx: 0, ry: 0, mx: 50, on: false });
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={className}
      style={{
        position: 'relative',
        borderRadius: radius,
        transformStyle: 'preserve-3d',
        transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(0) scale(${t.on ? lift : 1})`,
        transition: `transform ${t.on ? 0.12 : 0.55}s var(--ease-out)`,
        ...style,
      }}
    >
      {children}
      {sheen && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            mixBlendMode: 'screen',
            background: `linear-gradient(${110 + t.ry * 3}deg, rgba(248,242,235,0) ${t.mx - 22}%, rgba(248,242,235,${
              t.on ? 0.22 : 0
            }) ${t.mx}%, rgba(248,242,235,0) ${t.mx + 22}%)`,
            transition: 'background 0.15s linear',
          }}
        />
      )}
    </div>
  );
}

/* Bilingual sub-label — bold VN over italic EN. */
export function SubLabel({ vi, en, dark }: { vi: string; en: string; dark?: boolean }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: dark ? 'var(--ivory)' : 'var(--navy)' }}>{vi}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 13.5, color: dark ? 'var(--steel-soft)' : 'var(--steel)' }}>
        {en}
      </div>
    </div>
  );
}

/* Pull-quote with champagne quote glyph. */
export function PullQuote({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <figure style={{ margin: 0, display: 'flex', gap: 16, maxWidth: 460 }}>
      <span aria-hidden style={{ fontFamily: 'var(--font-numeral)', fontSize: 64, lineHeight: 0.7, color: 'var(--gold)', flexShrink: 0 }}>
        &ldquo;
      </span>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 16.5,
          lineHeight: 1.6,
          color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-on-light-muted)',
        }}
      >
        {children}
      </p>
    </figure>
  );
}

/* Designed photo placeholder — deep navy plate, faint Omega watermark, caption. */
export function ImagePlate({
  caption,
  ratio = '4 / 3',
  dark = true,
  className = '',
  style,
}: {
  caption?: string | null;
  ratio?: string;
  dark?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Reveal depth className={className} style={{ ...style }}>
      <Tilt3D max={7} lift={1.015} sheen>
        <div
          style={{
            position: 'relative',
            aspectRatio: ratio,
            overflow: 'hidden',
            borderRadius: 'var(--radius-md)',
            boxShadow: dark ? '0 24px 50px rgba(4,10,41,0.4)' : '0 18px 40px rgba(8,22,80,0.18)',
            background: dark
              ? 'linear-gradient(135deg, #040a29 0%, #081650 55%, #122a66 100%)'
              : 'linear-gradient(135deg, #aebccb 0%, #6e7c89 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <OmegaMark size={150} title="" tone={dark ? 'ivory' : 'navy'} style={{ opacity: dark ? 0.12 : 0.16, transform: 'translateZ(40px)' }} />
          <span
            aria-hidden
            style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 25%, rgba(197,173,138,0.16), transparent 55%)' }}
          />
          {caption && (
            <span
              style={{
                position: 'absolute',
                left: 16,
                bottom: 14,
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 13,
                color: dark ? 'rgba(248,242,235,0.55)' : 'rgba(8,22,80,0.6)',
              }}
            >
              {caption}
            </span>
          )}
        </div>
      </Tilt3D>
    </Reveal>
  );
}

/* Chapter header — oversized gold numeral, serif title, bilingual topic columns, rule, quote. */
export function ChapterHeader({
  chapter,
  topics,
  quote,
  dark,
}: {
  chapter: Chapter;
  topics?: [string, string][];
  quote?: string;
  dark?: boolean;
}) {
  return (
    <div
      className="aim-ch-header"
      style={{ display: 'grid', gap: 'clamp(28px, 5vw, 64px)', gridTemplateColumns: 'var(--ch-cols, 1fr)', alignItems: 'start' }}
    >
      <Reveal depth>
        <div className="aim-eyebrow" style={{ color: dark ? 'var(--gold-bright)' : 'var(--gold)', marginBottom: 18 }}>
          Chương {chapter.no} <span style={{ opacity: 0.5 }}>/ 07</span>
        </div>
        <div className="aim-numeral" style={{ fontSize: 'var(--numeral)' }}>
          {chapter.no}
        </div>
        <h2 className="aim-display" style={{ fontSize: 'var(--text-h2)', margin: '8px 0 0', color: dark ? 'var(--ivory)' : 'var(--navy)' }}>
          {chapter.vi}
        </h2>
        <div className="aim-eyebrow" style={{ color: 'var(--steel)', marginTop: 8 }}>
          {chapter.en}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        {topics && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 28px', marginBottom: 28 }}>
            {topics.map((t) => (
              <SubLabel key={t[0]} vi={t[0]} en={t[1]} dark={dark} />
            ))}
          </div>
        )}
        <hr className={`aim-rule ${dark ? 'aim-rule--dark' : ''}`} style={{ marginBottom: 24 }} />
        {quote && <PullQuote dark={dark}>{quote}</PullQuote>}
      </Reveal>
    </div>
  );
}

/* Fixed side rail — chapter nav (desktop). */
export function SideRail({ active, onNav }: { active: string; onNav: (href: string) => void }) {
  return (
    <nav
      className="aim-rail"
      aria-label="Chương"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: 60,
        zIndex: 40,
        display: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
        mixBlendMode: 'difference',
      }}
    >
      {CHAPTERS.map((c) => (
        <button
          key={c.id}
          onClick={() => onNav('#' + c.id)}
          title={c.vi}
          aria-label={c.vi}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-numeral)',
            fontSize: 16,
            lineHeight: 1,
            padding: 4,
            color: active === c.id ? '#C5AD8A' : '#F8F2EB',
            opacity: active === c.id ? 1 : 0.55,
            transition: 'opacity var(--dur-fast), color var(--dur-fast)',
          }}
        >
          {c.no}
        </button>
      ))}
    </nav>
  );
}

/* Top bar — logo + chapter menu. Transparent over cover, navy once scrolled. */
export function TopBar({ onNav }: { onNav: (href: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  const go = (h: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    onNav(h);
  };
  return (
    <header
      style={{
        position: 'fixed',
        insetInline: 0,
        top: 0,
        zIndex: 50,
        color: scrolled ? 'var(--ivory)' : 'var(--navy)',
        transition: 'background-color var(--dur-base), color var(--dur-base)',
        background: scrolled ? 'rgba(8,22,80,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      <div className="aim-container" style={{ display: 'flex', height: 66, alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#cover" onClick={go('#cover')} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Logo variant="full" tone={scrolled ? 'ivory' : 'navy'} markSize={40} />
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Mục lục"
          aria-expanded={open}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            height: 44,
            padding: '0 6px',
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          Mục lục <Icon name={open ? 'close' : 'menu'} size={20} />
        </button>
      </div>
      {open && (
        <div style={{ background: 'var(--navy-ink)', borderTop: '1px solid var(--border-on-dark)' }}>
          <ol className="aim-container" style={{ listStyle: 'none', margin: 0, padding: '12px 0 22px', display: 'grid', gap: 2 }}>
            {CHAPTERS.map((c) => (
              <li key={c.id}>
                <a
                  href={'#' + c.id}
                  onClick={go('#' + c.id)}
                  style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '10px 4px', textDecoration: 'none', color: 'var(--ivory)' }}
                >
                  <span className="aim-numeral" style={{ fontSize: 22 }}>
                    {c.no}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 20 }}>{c.vi}</span>
                  <span className="aim-eyebrow" style={{ color: 'var(--steel-soft)', marginLeft: 'auto', alignSelf: 'center' }}>
                    {c.en}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </header>
  );
}

/* Cover — ivory, centered stacked logo, tagline, chapter index, pointer parallax. */
export function Cover({ onNav }: { onNav: (href: string) => void }) {
  const [p, setP] = useState({ x: 0, y: 0 });
  const reduceC = useRef(false);
  useEffect(() => {
    reduceC.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  const move = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceC.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    setP({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };
  return (
    <section
      id="cover"
      onMouseMove={move}
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: 'var(--ivory)',
        color: 'var(--navy)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        perspective: '1300px',
      }}
    >
      <div
        aria-hidden
        className="aim-float"
        style={{
          position: 'absolute',
          right: '-12%',
          top: '50%',
          transformStyle: 'preserve-3d',
          transform: `translate(${p.x * -38}px, calc(-50% + ${p.y * -30}px)) rotateX(${p.y * -10}deg) rotateY(${p.x * 16}deg)`,
          transition: 'transform 0.35s var(--ease-out)',
        }}
      >
        <OmegaMark size={680} title="" tone="navy" style={{ opacity: 0.07 }} />
      </div>
      <div
        className="aim-container"
        style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          paddingBlock: 100,
          transformStyle: 'preserve-3d',
        }}
      >
        <Reveal>
          <div className="aim-eyebrow" style={{ color: 'var(--gold)', marginBottom: 30 }}>
            Brand Guidelines · 2026
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ transform: `translate3d(${p.x * 14}px, ${p.y * 10}px, 70px) rotateY(${p.x * 6}deg)`, transition: 'transform 0.3s var(--ease-out)' }}>
            <Logo variant="stacked" withTagline markSize={84} />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ marginTop: 36, maxWidth: 440, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.6, color: 'var(--text-on-light-muted)' }}>
            Cẩm nang thương hiệu cho một studio xây dựng thương hiệu ứng dụng AI tại Việt Nam.
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.3} className="aim-container" style={{ position: 'relative', paddingBottom: 36 }}>
        <hr className="aim-rule" style={{ marginBottom: 18 }} />
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '8px 26px' }}>
          {CHAPTERS.map((c) => (
            <li key={c.id}>
              <a
                href={'#' + c.id}
                onClick={(e) => {
                  e.preventDefault();
                  onNav('#' + c.id);
                }}
                style={{ display: 'inline-flex', gap: 8, alignItems: 'baseline', textDecoration: 'none', color: 'var(--navy)' }}
              >
                <span className="aim-numeral" style={{ fontSize: 18 }}>
                  {c.no}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-on-light-muted)' }}>{c.vi}</span>
              </a>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

/* Back cover — silver, centered tagline, contact block. */
export function BackCover() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '70svh',
        background: 'linear-gradient(160deg, #e9e9ec 0%, #f4f2f0 50%, #dcdce0 100%)',
        color: 'var(--navy)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="aim-container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Reveal style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(22px,4vw,34px)', letterSpacing: '0.18em', fontWeight: 600, color: 'var(--navy)', margin: 0 }}>
            DO RIGHT THINGS.
          </p>
        </Reveal>
      </div>
      <div className="aim-container" style={{ paddingBottom: 40 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-on-light-muted)' }}>
          <div>
            <strong style={{ color: 'var(--navy)' }}>CÔNG TY DỊCH VỤ AIM AGENCY</strong>
            <br />
            {SITE.address}
          </div>
          <div style={{ textAlign: 'right' }}>
            {SITE.phone}
            <br />
            {SITE.email}
            <br />
            {SITE.domain}
          </div>
        </div>
      </div>
    </section>
  );
}
