import Link from 'next/link';
import { Logo } from './Logo';
import { SOCIAL_ICONS } from './ui/Icons';
import { NAV_ITEMS, SITE, SOCIAL_LINKS } from '@/lib/nav';

/**
 * Footer toàn site — editorial: hairline phân tách, contact thật theo brand book
 * (địa chỉ, SĐT, email, Zalo OA), sitemap, bản quyền.
 */
export function Footer() {
  return (
    <footer className="bg-navy-deep text-beige">
      <div className="container-aim py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1.3fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo withTagline markClassName="h-10 w-10" />
            <p className="mt-6 text-sm leading-relaxed text-beige/70">
              Branding studio cho Startups &amp; SME Việt. Lựa chọn đúng, thực thi chuẩn xác,
              đồng hành chân thành.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon }) => {
                const Icon = SOCIAL_ICONS[icon];
                return (
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
                );
              })}
            </div>
          </div>

          {/* Sitemap */}
          <nav aria-label="Sơ đồ trang">
            <h2 className="eyebrow text-gold-bright">Khám phá</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
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

          {/* Liên hệ — thông tin thật theo brand book */}
          <div>
            <h2 className="eyebrow text-gold-bright">Liên hệ</h2>
            <ul className="mt-6 flex flex-col gap-3.5 text-sm text-beige/80">
              <li className="leading-relaxed text-beige/65">{SITE.address}</li>
              <li>
                <a href={SITE.phoneHref} className="transition-colors hover:text-gold-bright">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-gold-bright">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`https://${SITE.domain}`} className="transition-colors hover:text-gold-bright">
                  {SITE.domain}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-beige/15" />
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-beige/60">
            © 2026 {SITE.legalName}. {SITE.tagline}.
          </p>
          <p className="eyebrow text-beige/55">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
