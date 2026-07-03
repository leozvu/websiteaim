'use client';

/* Khối liên hệ 2 cột: thông tin thật (lib/nav) + form — dùng bởi khối CMS
   "contactForm" và bất kỳ trang nào cần. */

import { Icon } from '@/components/brandbook/ds';
import { Reveal } from '@/components/brandbook/primitives';
import { ContactForm } from '@/components/site/ContactForm';
import { SITE, SOCIAL_LINKS } from '@/lib/nav';

export function ContactSection({ heading = 'Cách khác để kết nối với Aim' }: { heading?: string } = {}) {
  const rows = [
    { label: 'Địa chỉ', value: SITE.address, href: undefined as string | undefined },
    { label: 'Điện thoại', value: SITE.phone, href: SITE.phoneHref },
    { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { label: 'Website', value: SITE.domain, href: `https://${SITE.domain}` },
  ];
  return (
    <div className="aim-ch-body" style={{ display: 'grid', gridTemplateColumns: 'var(--two, 1fr)', gap: 'clamp(36px,6vw,72px)', alignItems: 'start' }}>
      <Reveal>
        <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)' }}>
          Thông tin
        </div>
        <h2 className="aim-display" style={{ fontSize: 'var(--text-h3)', color: 'var(--ivory)', margin: '12px 0 28px' }}>
          {heading}
        </h2>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {rows.map((r, i) => (
            <li key={r.label} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border-on-dark)', padding: '16px 0' }}>
              <div className="aim-eyebrow" style={{ color: 'var(--steel-soft)', fontSize: 10, marginBottom: 6 }}>
                {r.label}
              </div>
              {r.href ? (
                <a href={r.href} style={{ fontSize: 'var(--text-lg)', color: 'var(--ivory)', textDecoration: 'none' }}>
                  {r.value}
                </a>
              ) : (
                <span style={{ fontSize: 'var(--text-lg)', lineHeight: 1.6, color: 'var(--text-on-dark-muted)' }}>{r.value}</span>
              )}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                display: 'inline-flex',
                height: 42,
                width: 42,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-on-dark)',
                color: 'var(--text-on-dark-muted)',
                textDecoration: 'none',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {icon === 'zalo' ? 'Zalo' : <Icon name={icon} size={18} />}
            </a>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <ContactForm />
      </Reveal>
    </div>
  );
}
