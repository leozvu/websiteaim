/* Footer toàn site — phong cách brand book: navy-ink, logo + tagline champagne,
   sitemap, liên hệ thật, social, "DO RIGHT THINGS". */

import Link from 'next/link';
import { Logo, Icon } from '@/components/brandbook/ds';
import { NAV_ITEMS, SITE, SOCIAL_LINKS } from '@/lib/nav';

export function SiteFooter() {
  return (
    <footer style={{ background: 'var(--navy-ink)', color: 'var(--ivory)' }}>
      <div className="aim-container" style={{ paddingBlock: 'clamp(64px, 8vw, 96px)' }}>
        <div style={{ display: 'grid', gap: 48, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {/* Brand */}
          <div style={{ maxWidth: 360 }}>
            <Logo variant="stacked" tone="ivory" markSize={56} />
            <p style={{ marginTop: 22, fontSize: 13.5, lineHeight: 1.7, color: 'var(--text-on-dark-muted)' }}>
              Branding studio cho Startups &amp; SME Việt. Lựa chọn đúng, thực thi chuẩn xác, đồng hành chân thành.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: 'inline-flex',
                    height: 40,
                    width: 40,
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
          </div>

          {/* Sitemap */}
          <nav aria-label="Sơ đồ trang">
            <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)' }}>
              Khám phá
            </div>
            <ul style={{ listStyle: 'none', margin: '22px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="aim-link" style={{ fontSize: 13.5, color: 'var(--text-on-dark-muted)', textDecoration: 'none' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Liên hệ */}
          <div>
            <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)' }}>
              Liên hệ
            </div>
            <ul style={{ listStyle: 'none', margin: '22px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 13, fontSize: 13.5 }}>
              <li style={{ lineHeight: 1.6, color: 'var(--text-on-dark-subtle)' }}>{SITE.address}</li>
              <li>
                <a href={SITE.phoneHref} style={{ color: 'var(--text-on-dark-muted)', textDecoration: 'none' }}>
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} style={{ color: 'var(--text-on-dark-muted)', textDecoration: 'none' }}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`https://${SITE.domain}`} style={{ color: 'var(--text-on-dark-muted)', textDecoration: 'none' }}>
                  {SITE.domain}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="aim-rule aim-rule--dark" style={{ marginTop: 56 }} />
        <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--text-on-dark-subtle)' }}>
            © 2026 {SITE.legalName}. {SITE.tagline}.
          </p>
          <p className="aim-eyebrow" style={{ color: 'var(--text-on-dark-subtle)', letterSpacing: 'var(--tracking-brand)' }}>
            {SITE.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
