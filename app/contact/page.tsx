import type { Metadata } from 'next';
import { Band, PageHero } from '@/components/site/kit';
import { Reveal } from '@/components/brandbook/primitives';
import { Icon } from '@/components/brandbook/ds';
import { ContactForm } from '@/components/site/ContactForm';
import { CONTACT_HERO } from '@/lib/pages';
import { SITE, SOCIAL_LINKS } from '@/lib/nav';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Bắt đầu dự án cùng Aim Agency. Buổi trao đổi đầu tiên là để hiểu nhau, không ràng buộc.',
};

const contactRows = [
  { label: 'Địa chỉ', value: SITE.address, href: undefined },
  { label: 'Điện thoại', value: SITE.phone, href: SITE.phoneHref },
  { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { label: 'Website', value: SITE.domain, href: `https://${SITE.domain}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={CONTACT_HERO.eyebrow} title={CONTACT_HERO.title} intro={CONTACT_HERO.intro} />

      <Band tone="navy">
        <div className="aim-ch-body" style={{ display: 'grid', gridTemplateColumns: 'var(--two, 1fr)', gap: 'clamp(36px,6vw,72px)', alignItems: 'start' }}>
          {/* Thông tin liên hệ */}
          <Reveal>
            <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)' }}>
              Thông tin
            </div>
            <h2 className="aim-display" style={{ fontSize: 'var(--text-h3)', color: 'var(--ivory)', margin: '12px 0 28px' }}>
              Cách khác để kết nối với Aim
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {contactRows.map((r, i) => (
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

          {/* Form */}
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Band>
    </>
  );
}
