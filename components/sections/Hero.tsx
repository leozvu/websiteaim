'use client';

import { Button } from '../ui/Button';
import { HeroScene } from '../three/HeroScene';
import { HERO } from '@/lib/content';

/**
 * HERO — nền Deep Royal Navy. Centerpiece 3D (Omega vàng) lệch phải làm chiều sâu,
 * nội dung editorial lệch trái trên lưới 12. Entrance bằng CSS animation (LCP nhanh);
 * 3D là progressive enhancement phủ lên poster tĩnh.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy text-beige"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep via-navy to-navy"
      />

      {/* Centerpiece 3D (hoặc poster tĩnh khi reduced-motion/mobile) */}
      <HeroScene />

      <div className="container-aim relative z-10 grid w-full grid-cols-1 items-center gap-y-10 py-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p
            className="eyebrow animate-fade-in-up tracking-[0.3em] text-gold-bright"
            style={{ animationDelay: '0.05s' }}
          >
            Branding Studio · aimagency.vn
          </p>

          <h1
            id="hero-heading"
            className="mt-7 animate-fade-in-up font-display text-[clamp(3.25rem,11vw,8rem)] font-semibold leading-[0.98] tracking-[-0.01em]"
            style={{ animationDelay: '0.13s' }}
          >
            {HERO.title}
          </h1>

          <span
            aria-hidden
            className="mt-9 block h-px w-16 animate-fade-in-up bg-gold"
            style={{ animationDelay: '0.22s' }}
          />

          <p
            className="mt-9 max-w-xl animate-fade-in-up text-base leading-relaxed text-beige/85 sm:text-lg"
            style={{ animationDelay: '0.28s' }}
          >
            {HERO.subtitle}
          </p>

          <div
            className="mt-11 flex animate-fade-in-up flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '0.4s' }}
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

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-beige/45 sm:flex lg:left-16 lg:translate-x-0 lg:items-start"
      >
        <span className="eyebrow text-[0.6rem]">Cuộn xuống</span>
        <span className="h-10 w-px bg-gradient-to-b from-beige/45 to-transparent" />
      </div>
    </section>
  );
}
