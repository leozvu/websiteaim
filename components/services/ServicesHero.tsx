'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { OmegaMark } from '../Logo';
import { SERVICES_HERO } from '@/lib/pricing';

/**
 * Hero trang Dịch vụ — nền navy, editorial left-aligned.
 * Entrance dùng CSS animation (không chờ JS hydrate — giữ LCP nhanh);
 * chỉ parallax mới cần Framer Motion. prefers-reduced-motion đã được
 * globals.css xử lý cho mọi CSS animation.
 */
export function ServicesHero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yMark = useTransform(scrollY, [0, 400], [0, reduce ? 0 : 48]);

  return (
    <section
      aria-labelledby="services-hero-heading"
      className="relative overflow-hidden bg-navy text-beige"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep via-navy to-navy"
      />
      {/* Omega mờ lệch phải — chiều sâu, không tranh chấp với chữ */}
      <motion.div
        aria-hidden
        style={{ y: yMark }}
        className="pointer-events-none absolute -right-[12vmin] top-1/2 -translate-y-1/2"
      >
        <OmegaMark className="h-[64vmin] w-[64vmin] text-steel/15" title="" />
      </motion.div>

      <div className="container-aim relative z-10 pb-24 pt-36 sm:pb-28 sm:pt-44 lg:pb-32 lg:pt-52">
        <p
          className="eyebrow animate-fade-in-up tracking-brand text-gold-bright"
          style={{ animationDelay: '0.08s' }}
        >
          {SERVICES_HERO.eyebrow}
        </p>
        <h1
          id="services-hero-heading"
          className="mt-6 max-w-4xl animate-fade-in-up font-display text-[clamp(2.75rem,8.5vw,6.5rem)] font-semibold leading-[1.02] tracking-tight"
          style={{ animationDelay: '0.16s' }}
        >
          {SERVICES_HERO.title}
        </h1>
        <p
          className="mt-7 max-w-2xl animate-fade-in-up text-base leading-relaxed text-beige/85 sm:text-lg"
          style={{ animationDelay: '0.26s' }}
        >
          {SERVICES_HERO.subtitle}
        </p>

        {/* Anchor of trust — meta niêm yết, hairline phía trên */}
        <ul
          className="mt-12 flex max-w-2xl animate-fade-in-up flex-wrap gap-x-8 gap-y-2 border-t border-beige/15 pt-5"
          style={{ animationDelay: '0.38s' }}
        >
          {SERVICES_HERO.meta.map((item) => (
            <li key={item} className="eyebrow text-[0.65rem] text-beige/60">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
