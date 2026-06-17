'use client';

import { Fragment } from 'react';
import { Button } from '../ui/Button';
import { HeroDepthScene } from '../three/HeroDepthScene';
import { HERO } from '@/lib/content';

/**
 * HERO — ảnh navy editorial với depth-parallax theo chuột (WebGL, "style" reference).
 * Ảnh tĩnh làm poster/LCP + mobile/reduced-motion; canvas depth fade đè ở desktop.
 * Scrim navy cho chữ đọc rõ. Accent bạc/kem (no gold).
 */
export function Hero() {
  const heroWords = HERO.title.split(' ');

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      <HeroDepthScene />

      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/25" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/30" />

      <div className="container-aim relative z-10 grid w-full grid-cols-1 items-center gap-y-10 py-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow animate-fade-in-up tracking-[0.32em] text-dove" style={{ animationDelay: '0.05s' }}>
            Branding Studio · TP.HCM
          </p>

          <h1
            id="hero-heading"
            className="mt-7 font-display text-[clamp(3rem,9.5vw,7.25rem)] font-semibold leading-[0.97] tracking-[-0.015em] text-ivory"
          >
            {heroWords.map((w, i) => (
              <Fragment key={`${w}-${i}`}>
                <span aria-hidden className={`word-mask${i < heroWords.length - 1 ? ' mr-[0.22em]' : ''}`}>
                  <span className="word-rise" style={{ animationDelay: `${0.12 + i * 0.09}s` }}>
                    {w}
                  </span>
                </span>
                {i < heroWords.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </h1>

          <span aria-hidden className="mt-9 block h-px w-16 animate-fade-in-up bg-dove/70" style={{ animationDelay: '0.55s' }} />

          <p
            className="mt-9 max-w-xl animate-fade-in-up text-[1.0625rem] leading-[1.75] text-ivory/80 sm:text-lg"
            style={{ animationDelay: '0.62s' }}
          >
            {HERO.subtitle}
          </p>

          <div className="mt-11 flex animate-fade-in-up flex-col gap-4 sm:flex-row" style={{ animationDelay: '0.72s' }}>
            <Button href={HERO.primaryCta.href} variant="gold" className="cta-sweep">
              {HERO.primaryCta.label}
            </Button>
            <Button href={HERO.secondaryCta.href} variant="outline-light" withArrow>
              {HERO.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex lg:left-16 lg:translate-x-0 lg:items-start"
      >
        <span className="h-12 w-px bg-gradient-to-b from-dove/60 to-transparent" />
      </div>
    </section>
  );
}
