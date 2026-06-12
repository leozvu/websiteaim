import Link from 'next/link';
import { Logo } from './Logo';
import { IconFacebook, IconInstagram, IconLinkedin } from './ui/Icons';
import { NAV_ITEMS, SITE } from '@/lib/nav';

const SOCIALS = [
  { label: 'Facebook', href: 'https://facebook.com', Icon: IconFacebook },
  { label: 'Instagram', href: 'https://instagram.com', Icon: IconInstagram },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: IconLinkedin },
];

/**
 * Footer toàn site (Section 8): logo Omega, sitemap, liên hệ, social, bản quyền.
 */
export function Footer() {
  return (
    <footer className="bg-navy-deep text-beige">
      <div className="container-aim py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo withTagline markClassName="h-10 w-10" />
            <p className="mt-5 text-sm leading-relaxed text-beige/70">
              Branding studio ứng dụng AI cho Startups & SME Việt. Lựa chọn đúng, thực thi chuẩn
              xác, đồng hành chân thành.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-beige/20 text-beige/80 transition-colors hover:border-gold hover:text-gold-bright"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <nav aria-label="Sơ đồ trang">
            <h2 className="eyebrow text-gold-bright">Khám phá</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-beige/80 transition-colors hover:text-gold-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Liên hệ */}
          <div>
            <h2 className="eyebrow text-gold-bright">Liên hệ</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-beige/80">
              <li>
                <a
                  href={`https://${SITE.domain}`}
                  className="transition-colors hover:text-gold-bright"
                >
                  {SITE.domain}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-gold-bright"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="text-beige/60">TP. Hồ Chí Minh, Việt Nam</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-beige/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-beige/60">
            © 2026 {SITE.legalName}. {SITE.tagline}.
          </p>
          <p className="eyebrow text-beige/60">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
