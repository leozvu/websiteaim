'use client';

/* Bộ dựng trang dùng chung cho các trang con — cùng phong cách brand book.
   Band (nền navy↔ivory), SectionHead (eyebrow champagne + tiêu đề Garamond),
   PageHero (hero gọn cho trang con). */

import { CSSProperties, ReactNode } from 'react';
import { OmegaMark } from '@/components/brandbook/ds';
import { Reveal } from '@/components/brandbook/primitives';

export type Tone = 'navy' | 'navy-ink' | 'ivory' | 'ivory-raise';
const GROUNDS: Record<Tone, CSSProperties> = {
  navy: { background: 'var(--navy)', color: 'var(--ivory)' },
  'navy-ink': { background: 'var(--navy-ink)', color: 'var(--ivory)' },
  ivory: { background: 'var(--ivory)', color: 'var(--navy)' },
  'ivory-raise': { background: 'var(--ivory-raise)', color: 'var(--navy)' },
};

export function Band({ id, tone, children, style }: { id?: string; tone: Tone; children: ReactNode; style?: CSSProperties }) {
  return (
    <section id={id} style={{ ...GROUNDS[tone], paddingBlock: 'clamp(72px, 10vw, 120px)', ...style }}>
      <div className="aim-container">{children}</div>
    </section>
  );
}

export function SectionHead({
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
          {no && (
            <span className="aim-numeral" style={{ fontSize: 15 }}>
              {no}
            </span>
          )}
          {eyebrow}
        </div>
        <h2 className="aim-display" style={{ fontSize: 'var(--text-h2)', margin: '14px 0 0', color: dark ? 'var(--ivory)' : 'var(--navy)' }}>
          {title}
        </h2>
        {intro && (
          <p
            style={{
              marginTop: 16,
              fontSize: 'var(--text-lg)',
              lineHeight: 1.65,
              color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-on-light-muted)',
              maxWidth: 660,
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

/* Hero gọn cho trang con — navy, eyebrow + tiêu đề lớn + intro, watermark Omega. */
export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--navy)',
        color: 'var(--ivory)',
        overflow: 'hidden',
        paddingTop: 'clamp(140px, 18vw, 200px)',
        paddingBottom: 'clamp(64px, 9vw, 110px)',
      }}
    >
      <div
        aria-hidden
        style={{ position: 'absolute', right: '-8%', top: '40%', transform: 'translateY(-50%)' }}
      >
        <OmegaMark size={520} title="" tone="ivory" style={{ opacity: 0.06 }} />
      </div>
      <span
        aria-hidden
        style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 26% 36%, rgba(197,173,138,0.1), transparent 55%)' }}
      />
      <div className="aim-container" style={{ position: 'relative' }}>
        <Reveal>
          <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)', marginBottom: 22 }}>
            {eyebrow}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="aim-display" style={{ fontSize: 'var(--text-display)', lineHeight: 1.05, margin: 0, maxWidth: 18 + 'ch' }}>
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.16}>
            <p style={{ marginTop: 24, maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--text-on-dark-muted)' }}>{intro}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
