'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { HERO } from '@/lib/content';

/**
 * HERO — AIM. Nền video navy cinematic (fal image-to-video, loop liền mạch) phủ lên
 * ảnh tĩnh (poster/LCP). Progressive enhancement: ảnh luôn hiện (mobile/reduced-motion),
 * video chỉ mount + fade ở desktop khoẻ. Parallax chuột tinh tế. Accent bạc/kem (no gold).
 */
export function Hero() {
  const heroWords = HERO.title.split(' ');
  const mediaRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 768px)').matches;
    if (!reduce && desktop) setShowVideo(true);

    // Parallax (desktop, fine pointer, không reduced-motion)
    const el = mediaRef.current;
    if (!el || reduce || !window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      el.style.transform = `scale(1.08) translate3d(${cur.x * -14}px, ${cur.y * -10}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      {/* Media: ảnh tĩnh (luôn) + video fade lên trên (desktop) — parallax nhẹ */}
      <div ref={mediaRef} aria-hidden className="absolute inset-0 will-change-transform" style={{ transform: 'scale(1.08)' }}>
        <Image src="/images/hero-navy.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        {showVideo && (
          <video
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            poster="/images/hero-navy.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onPlaying={() => setVideoReady(true)}
          >
            <source src="/videos/hero-navy.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Scrim cho chữ đọc rõ */}
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

          <span
            aria-hidden
            className="mt-9 block h-px w-16 animate-fade-in-up bg-dove/70"
            style={{ animationDelay: '0.55s' }}
          />

          <p
            className="mt-9 max-w-xl animate-fade-in-up text-[1.0625rem] leading-[1.75] text-ivory/80 sm:text-lg"
            style={{ animationDelay: '0.62s' }}
          >
            {HERO.subtitle}
          </p>

          <div className="mt-11 flex animate-fade-in-up flex-col gap-4 sm:flex-row" style={{ animationDelay: '0.72s' }}>
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
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex lg:left-16 lg:translate-x-0 lg:items-start"
      >
        <span className="h-12 w-px bg-gradient-to-b from-dove/60 to-transparent" />
      </div>
    </section>
  );
}
