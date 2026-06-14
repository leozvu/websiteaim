'use client';

import { Fragment } from 'react';
import { Button } from '../ui/Button';
import { HERO } from '@/lib/content';

/**
 * HERO — AIM Luxury "Lit Ink & Metal".
 * Nền tối xếp tầng với spotlight ấm lệch phải (nơi đặt emblem). Headline Garamond
 * CHỦ ĐẠO, lệch trái trên lưới 12; emblem 3D HỖ TRỢ (lệch phải, crop ngoài viewport).
 * H1 reveal theo TỪ bằng CSS (LCP an toàn); 3D là progressive enhancement phủ poster.
 */
export function Hero() {
  const heroWords = HERO.title.split(' ');
  return (
    <section
      aria-labelledby="hero-heading"
      style={{ ['--gx' as string]: '36%', ['--gy' as string]: '38%' }}
      className="surface-dark vignette relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="container-aim relative z-10 grid w-full grid-cols-1 items-center gap-y-10 py-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p
            className="eyebrow animate-fade-in-up tracking-[0.32em] text-gold-champagne"
            style={{ animationDelay: '0.05s' }}
          >
            Branding Studio · aimagency.vn
          </p>

          <h1
            id="hero-heading"
            className="mt-7 font-display text-[clamp(3rem,9.5vw,7.25rem)] font-semibold leading-[0.97] tracking-[-0.015em] text-ivory"
          >
            {heroWords.map((w, i) => (
              <Fragment key={`${w}-${i}`}>
                <span className="word-mask">
                  <span className="word-rise" style={{ animationDelay: `${0.12 + i * 0.09}s` }}>
                    {w}
                  </span>
                </span>
                {i < heroWords.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </h1>

          {/* Hairline kim loại ngắn — dấu nhấn editorial */}
          <span
            aria-hidden
            className="mt-9 block h-px w-16 animate-fade-in-up bg-metal-gold"
            style={{ animationDelay: '0.55s' }}
          />

          <p
            className="mt-9 max-w-xl animate-fade-in-up text-[1.0625rem] leading-[1.75] text-muted sm:text-lg"
            style={{ animationDelay: '0.62s' }}
          >
            {HERO.subtitle}
          </p>

          <div
            className="mt-11 flex animate-fade-in-up flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '0.72s' }}
          >
            <Button href={HERO.primaryCta.href} variant="gold">
              {HERO.primaryCta.label}
            </Button>
            <Button href={HERO.secondaryCta.href} variant="outline-light" withArrow>
              {HERO.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Gợi ý cuộn — hairline tick tiết chế, không chữ thừa */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex lg:left-16 lg:translate-x-0 lg:items-start"
      >
        <span className="h-12 w-px bg-gradient-to-b from-gold-champagne/50 to-transparent" />
      </div>
    </section>
  );
}
