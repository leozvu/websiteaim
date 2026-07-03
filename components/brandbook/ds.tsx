'use client';

/* AIM Agency Design System — core + brand components.
   Port y chang từ design bundle (components/core + components/brand + icons).
   Inline-style + CSS-var driven, đúng như prototype. */

import React, { CSSProperties, ReactNode } from 'react';

const ASSET_BASE = '/images/brand';

/* ---------------- Icon ---------------- */
const ICON_PATHS: Record<string, ReactNode> = {
  aim: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  precision: (
    <>
      <path d="M3.5 12.5 9 18 20.5 6" />
      <path d="M3.5 7.5 7 11" opacity="0.5" />
    </>
  ),
  handshake: (
    <>
      <path d="M7 12.5 9.5 15a1.6 1.6 0 0 0 2.3 0l.7-.7.8.8a1.5 1.5 0 0 0 2.1-2.1" />
      <path d="M3 8.5l3-1.5 4 2.5 2-1 4 0 5 2" />
      <path d="M21 8.5l-3-1.5-3 2.5" />
      <path d="M3 8.5v6l2 1" />
      <path d="M21 8.5v6l-2 1" />
    </>
  ),
  strategy: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" opacity="0.6" />
    </>
  ),
  logo: (
    <>
      <circle cx="12" cy="11" r="7" />
      <circle cx="12" cy="11" r="3" />
      <path d="M9.5 17.5 8 22M14.5 17.5 16 22" />
    </>
  ),
  office: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </>
  ),
  publication: (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5z" />
      <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 0 1.5-1.5z" />
    </>
  ),
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="M4 12.5 9 17.5 20 6.5" />,
  facebook: (
    <path d="M14 8.5h2.2V5.6c-.4-.05-1.3-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.3v7h2.9v-7h2.3l.5-3h-2.8V9.6c0-.8.2-1.1 1.1-1.1z" />
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="16.4" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 17v-7" />
    </>
  ),
};

export function Icon({
  name,
  size = 24,
  strokeWidth = 1.5,
  className = '',
  style,
  title,
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={className}
      style={style}
    >
      {ICON_PATHS[name] || null}
    </svg>
  );
}

/* ---------------- Eyebrow ---------------- */
const EYEBROW_TONES: Record<string, string> = {
  gold: 'var(--gold)',
  'gold-bright': 'var(--gold-bright)',
  steel: 'var(--steel)',
  'steel-soft': 'var(--steel-soft)',
  navy: 'var(--navy)',
  beige: 'var(--beige)',
};

export function Eyebrow({
  children,
  tone = 'gold',
  brand = false,
  as: Tag = 'p',
  className = '',
  style,
}: {
  children: ReactNode;
  tone?: keyof typeof EYEBROW_TONES;
  brand?: boolean;
  as?: any;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Tag
      className={`aim-eyebrow ${className}`}
      style={{
        color: EYEBROW_TONES[tone] || EYEBROW_TONES.gold,
        letterSpacing: brand ? 'var(--tracking-brand)' : 'var(--tracking-widest)',
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ---------------- Badge ---------------- */
const BADGE_VARIANTS: Record<string, CSSProperties> = {
  'gold-outline': { color: 'var(--gold-bright)', border: '1px solid var(--border-accent)', background: 'transparent' },
  gold: { color: 'var(--navy)', border: '1px solid transparent', background: 'var(--gold)' },
  navy: { color: 'var(--beige)', border: '1px solid transparent', background: 'var(--navy)' },
  steel: { color: 'var(--navy)', border: '1px solid var(--border-steel)', background: 'rgba(110,140,168,0.15)' },
  'navy-outline': { color: 'var(--navy)', border: '1px solid var(--border-on-light)', background: 'transparent' },
};

export function Badge({
  children,
  variant = 'gold-outline',
  className = '',
  style,
}: {
  children: ReactNode;
  variant?: keyof typeof BADGE_VARIANTS;
  className?: string;
  style?: CSSProperties;
}) {
  const v = BADGE_VARIANTS[variant] || BADGE_VARIANTS['gold-outline'];
  return (
    <span
      className={`aim-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '0.3rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 'var(--weight-semibold)' as any,
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-widest)',
        whiteSpace: 'nowrap',
        ...v,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ---------------- Button ---------------- */
const BTN_VARIANTS: Record<string, CSSProperties & Record<string, string>> = {
  gold: { background: 'var(--gold)', color: 'var(--navy)', border: '1px solid transparent', '--hover-bg': 'var(--gold-bright)' } as any,
  navy: { background: 'var(--navy)', color: 'var(--ivory)', border: '1px solid transparent', '--hover-bg': 'var(--navy-ink)' } as any,
  'outline-light': {
    background: 'transparent',
    color: 'var(--ivory)',
    border: '1px solid rgba(248,242,235,0.55)',
    '--hover-bg': 'var(--ivory)',
    '--hover-fg': 'var(--navy)',
  } as any,
  'outline-dark': {
    background: 'transparent',
    color: 'var(--navy)',
    border: '1px solid rgba(8,22,80,0.4)',
    '--hover-bg': 'var(--navy)',
    '--hover-fg': 'var(--ivory)',
  } as any,
};

export function Button({
  children,
  href,
  onClick,
  variant = 'gold',
  withArrow = false,
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'submit',
  className = '',
  style,
  ...rest
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: keyof typeof BTN_VARIANTS;
  withArrow?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  style?: CSSProperties;
}) {
  const v: any = BTN_VARIANTS[variant] || BTN_VARIANTS.gold;
  const pad = size === 'sm' ? '0.625rem 1.25rem' : size === 'lg' ? '1rem 2.25rem' : '0.75rem 1.75rem';
  const fontSize = size === 'sm' ? 'var(--text-xs)' : 'var(--text-sm)';

  const baseStyle: CSSProperties = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 'var(--tap-min)',
    padding: pad,
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-body)',
    fontSize,
    fontWeight: 'var(--weight-semibold)' as any,
    letterSpacing: 'var(--tracking-wide)',
    textDecoration: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition:
      'background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
    background: v.background,
    color: v.color,
    border: v.border,
    ...style,
  };

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    if (v['--hover-bg']) e.currentTarget.style.background = v['--hover-bg'];
    if (v['--hover-fg']) e.currentTarget.style.color = v['--hover-fg'];
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = v.background;
    e.currentTarget.style.color = v.color;
  };

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && <Icon name="arrow-right" size={16} className="aim-btn-arrow" />}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={`aim-button ${className}`} style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`aim-button ${className}`}
      style={baseStyle}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      {...rest}
    >
      {inner}
    </button>
  );
}

/* ---------------- Card ---------------- */
const CARD_TONES: Record<string, { background: string; border: string; hoverBorder: string }> = {
  beige: { background: 'var(--ivory-raise)', border: '1px solid var(--border-on-light)', hoverBorder: 'var(--border-accent)' },
  steel: { background: 'rgba(110,124,137,0.1)', border: '1px solid var(--border-steel)', hoverBorder: 'rgba(110,124,137,0.55)' },
  navy: { background: 'rgba(248,242,235,0.05)', border: '1px solid var(--border-on-dark)', hoverBorder: 'var(--border-accent)' },
  'navy-deep': { background: 'var(--navy-ink)', border: '1px solid var(--border-on-dark)', hoverBorder: 'var(--border-accent)' },
};

export function Card({
  children,
  tone = 'beige',
  interactive = false,
  padding = '2rem',
  as: Tag = 'div',
  className = '',
  style,
  ...rest
}: {
  children: ReactNode;
  tone?: keyof typeof CARD_TONES;
  interactive?: boolean;
  padding?: string;
  as?: any;
  className?: string;
  style?: CSSProperties;
}) {
  const t = CARD_TONES[tone] || CARD_TONES.beige;
  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (interactive) e.currentTarget.style.borderColor = t.hoverBorder;
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (interactive) e.currentTarget.style.border = t.border;
  };
  return (
    <Tag
      className={`aim-card ${className}`}
      onMouseEnter={interactive ? onEnter : undefined}
      onMouseLeave={interactive ? onLeave : undefined}
      style={{
        background: t.background,
        border: t.border,
        borderRadius: 'var(--radius-lg)',
        padding,
        transition: 'border-color var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------------- OmegaMark (real PNG artwork) ---------------- */
export function OmegaMark({
  size = 40,
  tone = 'navy',
  title = 'Aim Agency',
  className = '',
  style,
}: {
  size?: number;
  tone?: 'navy' | 'ivory';
  title?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const decorative = !title;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${ASSET_BASE}/omega-mark-${tone}.png`}
      width={size}
      alt={decorative ? '' : title}
      aria-hidden={decorative ? true : undefined}
      className={className}
      style={{ display: 'block', height: 'auto', ...style }}
    />
  );
}

/* ---------------- Logo (real PNG lockup) ---------------- */
export function Logo({
  variant = 'stacked',
  tone = 'navy',
  withTagline = false,
  markSize,
  className = '',
  style,
}: {
  variant?: 'stacked' | 'full' | 'mark';
  tone?: 'navy' | 'ivory';
  withTagline?: boolean;
  markSize?: number;
  className?: string;
  style?: CSSProperties;
}) {
  if (variant === 'mark') {
    return <OmegaMark size={markSize || 44} tone={tone} className={className} style={style} />;
  }
  const h = markSize || (variant === 'full' ? 46 : 70);
  const lockup = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${ASSET_BASE}/logo-stacked-${tone}.png`} alt="AIM AGENCY" style={{ height: h, width: 'auto', display: 'block' }} />
  );
  if (!withTagline) {
    return (
      <span className={className} style={{ display: 'inline-flex', ...style }}>
        {lockup}
      </span>
    );
  }
  return (
    <span className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10, ...style }}>
      {lockup}
      <span
        className="aim-eyebrow"
        style={{ letterSpacing: 'var(--tracking-brand)', opacity: 0.85, color: tone === 'ivory' ? 'var(--gold-bright)' : 'var(--gold)' }}
      >
        Do Right Things
      </span>
    </span>
  );
}
