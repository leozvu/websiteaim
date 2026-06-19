'use client';

/* Block AIM cho Builder.io — team kéo-thả các block này trong trình soạn trực quan,
   tất cả dùng đúng token & phong cách brand book. */

import { CSSProperties, ReactNode } from 'react';
import { Button as DSButton, Card as DSCard, Icon, OmegaMark } from '@/components/brandbook/ds';

type Tone = 'navy' | 'navy-ink' | 'ivory' | 'ivory-raise';
const GROUNDS: Record<Tone, CSSProperties> = {
  navy: { background: 'var(--navy)', color: 'var(--ivory)' },
  'navy-ink': { background: 'var(--navy-ink)', color: 'var(--ivory)' },
  ivory: { background: 'var(--ivory)', color: 'var(--navy)' },
  'ivory-raise': { background: 'var(--ivory-raise)', color: 'var(--navy)' },
};

/* Khối nền 1 section (navy↔ivory), chứa các block con kéo vào. */
export function AimSection({ tone = 'navy', paddingY = 96, children }: { tone?: Tone; paddingY?: number; children?: ReactNode }) {
  return (
    <section style={{ ...GROUNDS[tone], paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="aim-container">{children}</div>
    </section>
  );
}

/* Tiêu đề section: eyebrow champagne + tiêu đề Garamond + intro. */
export function AimHeading({
  no = '',
  eyebrow = 'Eyebrow',
  title = 'Tiêu đề mục',
  intro = '',
  align = 'left',
  dark = false,
}: {
  no?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}) {
  return (
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
        <p style={{ marginTop: 16, fontSize: 'var(--text-lg)', lineHeight: 1.65, color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-on-light-muted)', maxWidth: 660, marginInline: align === 'center' ? 'auto' : undefined }}>
          {intro}
        </p>
      )}
    </div>
  );
}

/* Nút CTA. */
export function AimButton({
  label = 'Bắt đầu dự án',
  href = '/contact',
  variant = 'gold',
  withArrow = true,
}: {
  label?: string;
  href?: string;
  variant?: 'gold' | 'navy' | 'outline-light' | 'outline-dark';
  withArrow?: boolean;
}) {
  return (
    <DSButton href={href} variant={variant} withArrow={withArrow} size="lg">
      {label}
    </DSButton>
  );
}

/* Thẻ nội dung có icon. */
export function AimCard({
  icon = 'aim',
  title = 'Tiêu đề thẻ',
  body = 'Mô tả ngắn cho thẻ này.',
  dark = false,
}: {
  icon?: string;
  title?: string;
  body?: string;
  dark?: boolean;
}) {
  return (
    <DSCard tone={dark ? 'navy' : 'beige'} interactive padding="30px" style={{ height: '100%' }}>
      <span
        style={{
          display: 'inline-flex',
          height: 52,
          width: 52,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-accent)',
          color: dark ? 'var(--gold-bright)' : 'var(--gold-deep)',
        }}
      >
        <Icon name={icon} size={26} />
      </span>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: dark ? 'var(--ivory)' : 'var(--navy)', marginTop: 20 }}>{title}</div>
      <p style={{ margin: '10px 0 0', fontSize: 14.5, lineHeight: 1.7, color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-on-light-muted)' }}>{body}</p>
    </DSCard>
  );
}

/* Lưới đều — kéo các thẻ con vào. */
export function AimGrid({ columns = '3', children }: { columns?: '2' | '3' | '4'; children?: ReactNode }) {
  return <div className={`aim-grid-${columns}`}>{children}</div>;
}

/* Thẻ dự án (gradient). */
export function AimProjectTile({
  name = 'Tên dự án',
  industry = 'Ngành',
  from = '#081650',
  to = '#6e7c89',
}: {
  name?: string;
  industry?: string;
  from?: string;
  to?: string;
}) {
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-on-dark)',
        boxShadow: '0 22px 48px rgba(4,10,41,0.45)',
        background: `linear-gradient(150deg, ${from} 0%, ${to} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 22,
      }}
    >
      <span aria-hidden style={{ position: 'absolute', top: 18, right: 18, opacity: 0.5 }}>
        <OmegaMark size={30} title="" tone="ivory" />
      </span>
      <div style={{ position: 'relative' }}>
        <span
          className="aim-eyebrow"
          style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-accent)', color: 'var(--gold-bright)', fontSize: 10, marginBottom: 10 }}
        >
          {industry}
        </span>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ivory)' }}>{name}</div>
      </div>
    </div>
  );
}

/* Gói báo giá. */
export function AimPricingTier({
  name = 'Gói',
  en = 'Plan',
  desc = 'Mô tả gói.',
  items,
  featured = false,
  dark = true,
}: {
  name?: string;
  en?: string;
  desc?: string;
  items?: { item?: string }[];
  featured?: boolean;
  dark?: boolean;
}) {
  const list = items?.length ? items : [{ item: 'Hạng mục 1' }, { item: 'Hạng mục 2' }, { item: 'Hạng mục 3' }];
  return (
    <DSCard
      tone={dark ? 'navy' : 'beige'}
      padding="30px"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: featured ? '1px solid var(--border-accent)' : undefined,
        boxShadow: featured ? 'var(--shadow-md)' : 'none',
      }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: dark ? 'var(--ivory)' : 'var(--navy)' }}>{name}</div>
      <div className="aim-eyebrow" style={{ color: 'var(--steel)', marginTop: 2 }}>
        {en}
      </div>
      <p style={{ margin: '14px 0 18px', fontSize: 13.5, lineHeight: 1.6, color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-on-light-muted)' }}>{desc}</p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {list.map((it, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, color: dark ? 'var(--text-on-dark)' : 'var(--text-on-light)' }}>
            <span style={{ color: dark ? 'var(--gold-bright)' : 'var(--gold-deep)', marginTop: 1 }}>
              <Icon name="check" size={16} />
            </span>
            {it.item}
          </li>
        ))}
      </ul>
    </DSCard>
  );
}
