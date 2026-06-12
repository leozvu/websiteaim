'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { OmegaMark } from '../Logo';
import { Button } from '../ui/Button';
import { HERO } from '@/lib/content';

/**
 * Section 1 — HERO. Nền navy.
 * Logo Omega lớn với glow subtle (pulse chậm), H1 serif rất to,
 * parallax nhẹ khi cuộn. Tôn trọng prefers-reduced-motion.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Parallax biên độ nhỏ — chỉ khi không reduce motion
  const yMark = useTransform(scrollY, [0, 500], [0, reduce ? 0 : 60]);
  const yContent = useTransform(scrollY, [0, 500], [0, reduce ? 0 : 24]);
  const opacity = useTransform(scrollY, [0, 380], [1, reduce ? 1 : 0.15]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy text-beige"
    >
      {/* Lớp nền gradient sâu + vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep via-navy to-navy"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(110,140,168,0.12) 0%, rgba(27,42,74,0) 60%)',
        }}
      />

      {/* Omega lớn mờ phía sau + glow */}
      <motion.div
        aria-hidden
        style={{ y: yMark, opacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div
            className="absolute inset-0 animate-glow-pulse rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(184,153,104,0.25), transparent 65%)' }}
          />
          <OmegaMark className="relative h-[58vmin] w-[58vmin] text-steel/25" title="" />
        </div>
      </motion.div>

      {/* Nội dung */}
      <motion.div style={{ y: yContent }} className="container-aim relative z-10 py-28 text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="eyebrow tracking-brand text-gold-bright"
        >
          Branding Studio · aimagency.vn
        </motion.p>

        <motion.h1
          id="hero-heading"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mx-auto mt-6 max-w-4xl font-display text-[clamp(3rem,11vw,7.5rem)] font-semibold leading-[0.95] tracking-tight"
        >
          {HERO.title}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-beige/85 sm:text-lg"
        >
          {HERO.subtitle}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href={HERO.primaryCta.href} variant="gold">
            {HERO.primaryCta.label}
          </Button>
          <Button href={HERO.secondaryCta.href} variant="outline-light" withArrow>
            {HERO.secondaryCta.label}
          </Button>
        </motion.div>
      </motion.div>

      {/* Gợi ý cuộn */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-beige/50 sm:flex"
      >
        <span className="eyebrow text-[0.65rem]">Cuộn xuống</span>
        <span className="h-10 w-px bg-gradient-to-b from-beige/50 to-transparent" />
      </div>
    </section>
  );
}
