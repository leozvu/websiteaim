import type { Metadata, Viewport } from 'next';
import { EB_Garamond, Be_Vietnam_Pro } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { CustomCursor } from '@/components/motion/CustomCursor';
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
  variable: '--font-display',
});

// Body = Be Vietnam Pro theo brand book ("Kiểu chữ nội dung"). Subset vietnamese bắt buộc.
const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-body',
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
        url: '/og-image.svg',
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
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#1B2A4A',
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
    <html lang="vi" className={`${garamond.variable} ${beVietnam.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a href="#main-content" className="skip-link">
          Bỏ qua tới nội dung chính
        </a>
        <SmoothScroll />
        <CustomCursor />
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
