import type { Metadata, Viewport } from 'next';
import { EB_Garamond, Be_Vietnam_Pro, Cormorant_Garamond } from 'next/font/google';
import { SiteHeader } from '@/components/home/SiteHeader';
import { SiteFooter } from '@/components/home/SiteFooter';
import { SITE } from '@/lib/nav';
import './globals.css';

// Display serif = GARAMOND theo brand book ("Kiểu chữ thương hiệu").
// EB Garamond — bản số hoá trung thành của Garamond cổ điển, có subset 'vietnamese'.
// Chỉ load weight dùng thật: 500 (heading), 600 (display nhấn) + italic 500 (trích dẫn).
const garamond = EB_Garamond({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display-fs',
});

// Body = Be Vietnam Pro theo brand book ("Kiểu chữ nội dung"). Subset vietnamese bắt buộc.
const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body-fs',
});

// Numeral/display cao tương phản = Cormorant Garamond (số chương lớn, hero) theo brand book.
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-numeral-fs',
});

const DESCRIPTION =
  'Aim Agency — branding studio ứng dụng AI cho Startups & SME Việt. Lựa chọn đúng, thực thi chuẩn xác, đồng hành chân thành. Do Right Things.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Aim Agency — Do Right Things',
    template: '%s · Aim Agency',
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    'branding agency Việt Nam',
    'thiết kế thương hiệu',
    'logo & identity',
    'branding cho SME',
    'branding cho startup',
    'Aim Agency',
  ],
  authors: [{ name: SITE.legalName }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Aim Agency — Do Right Things',
    description: DESCRIPTION,
    images: [
      {
        url: '/images/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aim Agency — Do Right Things',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aim Agency — Do Right Things',
    description: DESCRIPTION,
    images: ['/images/brand/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: '/images/brand/favicon.png', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#081650',
  colorScheme: 'light',
};

// schema.org Organization JSON-LD
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  slogan: SITE.tagline,
  description: DESCRIPTION,
  logo: `${SITE.url}/favicon.svg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '67 Huỳnh Thiện Lộc, Phường Tân Phú',
    addressLocality: 'TP. Hồ Chí Minh',
    addressCountry: 'VN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${garamond.variable} ${beVietnam.variable} ${cormorant.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a href="#main-content" className="skip-link">
          Bỏ qua tới nội dung chính
        </a>
        {/* Header + Footer toàn site (phong cách brand book). Lenis đã GỠ — scroll gốc. */}
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
