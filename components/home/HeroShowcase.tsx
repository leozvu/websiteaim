'use client';

/* Hero — thước phim atelier full-bleed LÀM showcase (không còn khung reel DOM
   đè lên video như trước — 2 lớp che nhau). Chữ + CTA bên trái trên scrim đậm;
   footage tỏa sáng bên phải với caption + tiến độ cảnh (trong HeroVideo). */

import { CSSProperties } from 'react';
import { Button } from '@/components/brandbook/ds';
import { HeroVideo } from './HeroVideo';
import { HERO, BRAND_PROMISE } from '@/lib/content';

export function HeroShowcase({
  eyebrow = 'Branding Studio · Startups & SME Việt Nam',
  title = HERO.title,
  subtitle = HERO.subtitle,
  primaryLabel = HERO.primaryCta.label,
  primaryHref = HERO.primaryCta.href,
  secondaryLabel = HERO.secondaryCta.label,
  secondaryHref = HERO.secondaryCta.href,
  promise = BRAND_PROMISE,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  promise?: string;
} = {}) {
  const enter = (delay: number): CSSProperties => ({
    animation: `aim-fade-in-up 0.8s var(--ease-brand) ${delay}s both`,
  });

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: 'var(--navy)',
        color: 'var(--ivory)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Lớp 0: video atelier (fal.ai) + poster + scrim + caption cảnh */}
      <HeroVideo />

      <div className="aim-container" style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 110, paddingBottom: 56 }}>
        <div style={{ maxWidth: 640 }}>
          <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)', marginBottom: 24, ...enter(0) }}>
            {eyebrow}
          </div>
          <h1 className="aim-display" style={{ fontSize: 'var(--text-hero)', lineHeight: 1.02, margin: 0, letterSpacing: '-0.01em' }}>
            {(title || '').split(' ').map((w, i, arr) => (
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
          <p style={{ marginTop: 26, maxWidth: 520, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--text-on-dark-muted)', ...enter(0.16) }}>
            {subtitle}
          </p>
          <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 14, ...enter(0.24) }}>
            <Button href={primaryHref || '/services'} variant="gold" size="lg" withArrow>
              {primaryLabel}
            </Button>
            <Button href={secondaryHref || '/contact'} variant="outline-light" size="lg">
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </div>

      {/* Chân hero: lời hứa thương hiệu trên hairline */}
      <div className="aim-container" style={{ position: 'relative', paddingBottom: 30, ...enter(0.34) }}>
        <hr className="aim-rule aim-rule--dark" style={{ marginBottom: 14 }} />
        <span style={{ display: 'block', maxWidth: 640, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-on-dark-subtle)' }}>
          {promise}
        </span>
      </div>
    </section>
  );
}
