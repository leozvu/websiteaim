import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { ServicesHero } from '@/components/services/ServicesHero';
import { PricingExplorer } from '@/components/services/PricingExplorer';
import { ProcessTimeline } from '@/components/services/ProcessTimeline';
import { Faq } from '@/components/services/Faq';
import { SITE } from '@/lib/nav';
import { SERVICE_GROUPS, SERVICES_FINAL_CTA, FAQ_ITEMS } from '@/lib/pricing';

const DESCRIPTION =
  'Bảng giá minh bạch theo 5 phân khúc: chiến lược thương hiệu, logo & nhận diện cốt lõi, bộ nhận diện văn phòng và ấn phẩm truyền thông. Mỗi con số là cam kết.';

export const metadata: Metadata = {
  title: 'Dịch vụ & Bảng giá',
  description: DESCRIPTION,
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Dịch vụ & Bảng giá · Aim Agency',
    description: DESCRIPTION,
    url: '/services',
  },
};

/** schema.org Service + Offer cho từng nhóm dịch vụ (SEO). */
function buildServicesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Dịch vụ Aim Agency',
    itemListElement: SERVICE_GROUPS.map((group, i) => {
      const priceValues =
        group.kind === 'package'
          ? Object.values(group.price).filter((p): p is number => p !== null)
          : group.items.flatMap((item) =>
              Object.values(item.price).filter((p): p is number => p !== null),
            );
      return {
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: group.title,
          description: group.intro,
          serviceType: 'Branding',
          provider: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
          areaServed: 'VN',
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'VND',
            lowPrice: Math.min(...priceValues),
            highPrice: Math.max(...priceValues),
            offerCount: priceValues.length,
          },
        },
      };
    }),
  };
}

/** schema.org FAQPage cho rich result. */
function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export default function ServicesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServicesSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema()) }}
      />

      {/* 1. Hero — navy */}
      <ServicesHero />

      {/* 2. Phân khúc + bảng giá — beige */}
      <Section tone="beige" id="pricing" ariaLabelledby="pricing-heading">
        <div className="container-aim">
          {/* Block heading nằm sát viewport khi load (LCP candidate) — entrance bằng
              CSS animation, không gate sau JS hydration như Reveal */}
          <div
            className="mx-auto max-w-2xl animate-fade-in-up text-center"
            style={{ animationDelay: '0.3s' }}
          >
            <p className="eyebrow text-gold-deep">Bảng giá theo phân khúc</p>
            <h2
              id="pricing-heading"
              className="mt-4 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl lg:text-5xl"
            >
              Bốn nhóm dịch vụ, một mức giá rõ ràng
            </h2>
            <p className="mt-5 text-base leading-relaxed text-navy/70">
              Cùng một hạng mục, mỗi phân khúc cần độ sâu khác nhau — nên giá cũng khác nhau.
              Chọn đúng quy mô của bạn để xem con số đúng.
            </p>
          </div>
          <div className="mt-12">
            <PricingExplorer />
          </div>
        </div>
      </Section>

      {/* 3. Quy trình — navy */}
      <ProcessTimeline />

      {/* 4. FAQ — beige */}
      <Section tone="beige" id="faq" ariaLabelledby="faq-heading">
        <div className="container-aim">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-gold-deep">Hỏi thẳng, đáp thẳng</p>
              <h2
                id="faq-heading"
                className="mt-4 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl lg:text-5xl"
              >
                Câu hỏi thường gặp
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-navy/70">
                Hợp tác tốt bắt đầu từ kỳ vọng đúng. Điều khoản nào chưa rõ, hỏi chúng tôi trước
                khi ký — câu trả lời luôn thẳng như dưới đây.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Faq />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 5. CTA cuối — navy */}
      <Section tone="navy" ariaLabelledby="services-cta-heading" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(110,140,168,0.10) 0%, rgba(27,42,74,0) 60%)',
          }}
        />
        <div className="container-aim relative z-10 text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2
              id="services-cta-heading"
              className="font-display text-3xl font-semibold leading-tight text-beige sm:text-4xl lg:text-[3.25rem]"
            >
              {SERVICES_FINAL_CTA.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-beige/75">
              {SERVICES_FINAL_CTA.body}
            </p>
            <div className="mt-10">
              <Button href={SERVICES_FINAL_CTA.cta.href} variant="gold" withArrow>
                {SERVICES_FINAL_CTA.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
