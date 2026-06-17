'use client';

/* Trang chủ AIM — NỘI DUNG THẬT của website (8 section marketing) được khoác
   PHONG CÁCH brand book: nền navy↔ivory luân phiên, Garamond + champagne accent,
   số chương lớn, hairline editorial, Reveal/Tilt3D. Nội dung từ lib/content.ts. */

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { Button, Card, Icon, OmegaMark } from '@/components/brandbook/ds';
import { Reveal, Tilt3D } from '@/components/brandbook/primitives';
import {
  HERO,
  BRAND_PROMISE,
  USP_PILLARS,
  PAIN_SOLUTIONS,
  SERVICE_CARDS,
  SERVICES_CTA,
  PROCESS_STEPS,
  ROADMAP,
  PROJECTS,
  PROJECTS_NDA_NOTE,
  FINAL_CTA,
} from '@/lib/content';

type Tone = 'navy' | 'navy-ink' | 'ivory' | 'ivory-raise';
const GROUNDS: Record<Tone, CSSProperties> = {
  navy: { background: 'var(--navy)', color: 'var(--ivory)' },
  'navy-ink': { background: 'var(--navy-ink)', color: 'var(--ivory)' },
  ivory: { background: 'var(--ivory)', color: 'var(--navy)' },
  'ivory-raise': { background: 'var(--ivory-raise)', color: 'var(--navy)' },
};

function Band({ id, tone, children, style }: { id?: string; tone: Tone; children: ReactNode; style?: CSSProperties }) {
  return (
    <section id={id} style={{ ...GROUNDS[tone], paddingBlock: 'clamp(72px, 10vw, 120px)', ...style }}>
      <div className="aim-container">{children}</div>
    </section>
  );
}

/* Tiêu đề section — eyebrow champagne + số thứ tự + tiêu đề Garamond. */
function SectionHead({
  no,
  eyebrow,
  title,
  intro,
  dark,
  align = 'left',
}: {
  no?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  align?: 'left' | 'center';
}) {
  return (
    <Reveal>
      <div style={{ textAlign: align, maxWidth: align === 'center' ? 720 : undefined, marginInline: align === 'center' ? 'auto' : undefined }}>
        <div
          className="aim-eyebrow"
          style={{ color: dark ? 'var(--gold-bright)' : 'var(--gold)', display: 'flex', gap: 10, justifyContent: align === 'center' ? 'center' : 'flex-start' }}
        >
          {no && <span className="aim-numeral" style={{ fontSize: 15 }}>{no}</span>}
          {eyebrow}
        </div>
        <h2
          className="aim-display"
          style={{ fontSize: 'var(--text-h2)', margin: '14px 0 0', color: dark ? 'var(--ivory)' : 'var(--navy)' }}
        >
          {title}
        </h2>
        {intro && (
          <p
            style={{
              marginTop: 16,
              fontSize: 'var(--text-lg)',
              lineHeight: 1.65,
              color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-on-light-muted)',
              maxWidth: 640,
              marginInline: align === 'center' ? 'auto' : undefined,
            }}
          >
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/* ───────── 1 · HERO (navy) ───────── */
function Hero() {
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
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        perspective: '1300px',
      }}
    >
      {/* Omega watermark parallax */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-10%',
          top: '50%',
          transformStyle: 'preserve-3d',
          transform: `translate(${p.x * -36}px, calc(-50% + ${p.y * -28}px)) rotateX(${p.y * -8}deg) rotateY(${p.x * 14}deg)`,
          transition: 'transform 0.35s var(--ease-out)',
        }}
      >
        <OmegaMark size={660} title="" tone="ivory" style={{ opacity: 0.06 }} />
      </div>
      <span
        aria-hidden
        style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 28% 30%, rgba(197,173,138,0.1), transparent 55%)' }}
      />

      <div className="aim-container" style={{ position: 'relative', paddingTop: 96, paddingBottom: 48 }}>
        <Reveal>
          <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)', marginBottom: 26 }}>
            Branding Studio · Startups &amp; SME Việt Nam
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1
            className="aim-display"
            style={{ fontSize: 'var(--text-hero)', lineHeight: 1.02, margin: 0, maxWidth: 14 + 'ch', letterSpacing: '-0.01em' }}
          >
            {HERO.title}
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p style={{ marginTop: 28, maxWidth: 560, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--text-on-dark-muted)' }}>
            {HERO.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <div style={{ marginTop: 38, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <Button href={HERO.primaryCta.href} variant="gold" size="lg" withArrow>
              {HERO.primaryCta.label}
            </Button>
            <Button href={HERO.secondaryCta.href} variant="outline-light" size="lg">
              {HERO.secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </div>

      {/* scroll cue */}
      <div className="aim-container" style={{ position: 'relative', paddingBottom: 32 }}>
        <hr className="aim-rule aim-rule--dark" style={{ marginBottom: 16 }} />
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 15, color: 'var(--text-on-dark-subtle)' }}>
          {BRAND_PROMISE}
        </span>
      </div>
    </section>
  );
}

/* ───────── 2 · USP (ivory) ───────── */
function Usp() {
  return (
    <Band id="usp" tone="ivory">
      <SectionHead no="01" eyebrow="Cam kết của chúng tôi" title="Ba điều Aim luôn giữ" />
      <div className="aim-grid-3" style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
        {USP_PILLARS.map((p, i) => (
          <Reveal key={p.vi} delay={i * 0.07} depth style={{ height: '100%' }}>
            <Card tone="beige" interactive padding="30px" style={{ height: '100%' }}>
              <span
                style={{
                  display: 'inline-flex',
                  height: 52,
                  width: 52,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-accent)',
                  color: 'var(--gold-deep)',
                }}
              >
                <Icon name={p.icon} size={26} />
              </span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--navy)', marginTop: 22 }}>{p.vi}</div>
              <div className="aim-eyebrow" style={{ color: 'var(--steel)', margin: '4px 0 14px' }}>
                {p.en}
              </div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-on-light-muted)' }}>{p.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ───────── 3 · Vì sao Aim (navy) ───────── */
function WhyAim() {
  return (
    <Band id="why" tone="navy">
      <SectionHead no="02" eyebrow="Vì sao chọn Aim" title="Vấn đề thật — cách giải thật" dark />
      <div style={{ marginTop: 'clamp(40px,6vw,64px)', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {PAIN_SOLUTIONS.map((it, i) => (
          <Reveal key={it.painTitle} delay={i * 0.05}>
            <div
              className="aim-why-row"
              style={{ display: 'grid', gridTemplateColumns: 'var(--two, 1fr)', gap: 'clamp(20px,4vw,56px)', paddingBlock: 'clamp(28px,4vw,40px)' }}
            >
              {/* Pain */}
              <div>
                <div className="aim-eyebrow" style={{ color: 'var(--steel-soft)', marginBottom: 10 }}>
                  Vấn đề
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', color: 'var(--steel-pale)', margin: 0 }}>
                  {it.painTitle}
                </h3>
                <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-on-dark-subtle)' }}>{it.pain}</p>
              </div>
              {/* Solution */}
              <div>
                <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)', marginBottom: 10 }}>
                  Cách Aim giải
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', color: 'var(--ivory)', margin: 0 }}>
                  {it.solutionTitle}
                </h3>
                <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-on-dark-muted)' }}>{it.solution}</p>
              </div>
            </div>
            {i < PAIN_SOLUTIONS.length - 1 && <hr className="aim-rule aim-rule--dark" />}
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ───────── 4 · Dịch vụ (ivory) ───────── */
function Services() {
  return (
    <Band id="services" tone="ivory-raise">
      <SectionHead no="03" eyebrow="Dịch vụ" title="Những gì Aim làm cùng bạn" />
      <div className="aim-grid-4" style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
        {SERVICE_CARDS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06} depth style={{ height: '100%' }}>
            <Card tone="beige" interactive padding="28px" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span
                style={{
                  display: 'inline-flex',
                  height: 48,
                  width: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--navy)',
                  color: 'var(--gold-bright)',
                }}
              >
                <Icon name={s.icon} size={24} />
              </span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, color: 'var(--navy)' }}>{s.title}</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--text-on-light-muted)' }}>{s.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1} style={{ marginTop: 40 }}>
        <Button href={SERVICES_CTA.href} variant="outline-dark" withArrow>
          {SERVICES_CTA.label}
        </Button>
      </Reveal>
    </Band>
  );
}

/* ───────── 5 · Quy trình (navy) ───────── */
function Process() {
  return (
    <Band id="process" tone="navy">
      <SectionHead no="04" eyebrow="Quy trình" title="Bốn bước, minh bạch từ đầu" dark />
      <div className="aim-grid-4" style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
        {PROCESS_STEPS.map((s, i) => (
          <Reveal key={s.number} delay={i * 0.07}>
            <div>
              <div className="aim-numeral" style={{ fontSize: 'clamp(3.5rem,7vw,5.5rem)' }}>
                {s.number}
              </div>
              <hr className="aim-rule aim-rule--dark" style={{ margin: '14px 0 16px' }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ivory)' }}>{s.title}</div>
              <div className="aim-eyebrow" style={{ color: 'var(--steel-soft)', margin: '2px 0 12px' }}>
                {s.en}
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--text-on-dark-muted)' }}>{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ───────── 6 · Lộ trình (ivory) ───────── */
function Roadmap() {
  return (
    <Band id="roadmap" tone="ivory">
      <SectionHead no="05" eyebrow="Lộ trình phát triển" title="Aim đi đường dài" />
      <div style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
        {ROADMAP.map((m, i) => (
          <Reveal key={m.year} delay={i * 0.05}>
            <div
              className="aim-road-row"
              style={{ display: 'grid', gridTemplateColumns: 'var(--road, 1fr)', gap: 'clamp(8px,3vw,40px)', alignItems: 'baseline', paddingBlock: 'clamp(20px,3vw,30px)' }}
            >
              <div className="aim-numeral" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', color: 'var(--gold-deep)' }}>
                {m.year}
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', color: 'var(--navy)', margin: 0 }}>{m.title}</h3>
                <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-on-light-muted)', maxWidth: 640 }}>{m.body}</p>
              </div>
            </div>
            {i < ROADMAP.length - 1 && <hr className="aim-rule" />}
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ───────── 7 · Dự án (navy-ink) ───────── */
function Projects() {
  return (
    <Band id="projects" tone="navy-ink">
      <SectionHead no="06" eyebrow="Dự án nổi bật" title="Một vài thương hiệu đã tin Aim" dark />
      <div className="aim-grid-3" style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
        {PROJECTS.map((pr, i) => (
          <Reveal key={pr.name} delay={i * 0.05} depth>
            <Tilt3D
              max={9}
              lift={1.02}
              sheen
              style={{
                aspectRatio: '4 / 3',
                overflow: 'hidden',
                border: '1px solid var(--border-on-dark)',
                boxShadow: '0 22px 48px rgba(4,10,41,0.45)',
                background: `linear-gradient(150deg, ${pr.from} 0%, ${pr.to} 100%)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 22,
              }}
            >
              <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 75% 18%, rgba(248,242,235,0.14), transparent 55%)' }} />
              <span
                aria-hidden
                style={{ position: 'absolute', top: 18, right: 18, opacity: 0.5 }}
              >
                <OmegaMark size={30} title="" tone="ivory" />
              </span>
              <div style={{ position: 'relative' }}>
                <span
                  className="aim-eyebrow"
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-accent)',
                    color: 'var(--gold-bright)',
                    fontSize: 10,
                    marginBottom: 10,
                  }}
                >
                  {pr.industry}
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ivory)' }}>{pr.name}</div>
              </div>
            </Tilt3D>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p style={{ marginTop: 26, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--text-on-dark-subtle)' }}>
          {PROJECTS_NDA_NOTE}
        </p>
      </Reveal>
    </Band>
  );
}

/* ───────── 8 · CTA cuối (navy) ───────── */
function FinalCta() {
  return (
    <Band id="cta" tone="navy">
      <div style={{ maxWidth: 880, marginInline: 'auto', textAlign: 'center' }}>
        <Reveal>
          <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)' }}>
            Bắt đầu
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="aim-display" style={{ fontSize: 'var(--text-display)', color: 'var(--ivory)', margin: '16px 0 0' }}>
            {FINAL_CTA.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p style={{ marginTop: 18, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--text-on-dark-muted)' }}>{FINAL_CTA.body}</p>
        </Reveal>
        <Reveal delay={0.18} style={{ marginTop: 34 }}>
          <Button href={FINAL_CTA.cta.href} variant="gold" size="lg" withArrow>
            {FINAL_CTA.cta.label}
          </Button>
        </Reveal>
      </div>
    </Band>
  );
}

export default function HomeSections() {
  return (
    <>
      <Hero />
      <Usp />
      <WhyAim />
      <Services />
      <Process />
      <Roadmap />
      <Projects />
      <FinalCta />
    </>
  );
}
