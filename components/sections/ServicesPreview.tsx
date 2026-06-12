import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { SERVICE_ICONS, IconArrowRight } from '../ui/Icons';
import { SERVICE_CARDS, SERVICES_CTA } from '@/lib/content';

/**
 * Section 4 — Dịch vụ preview. Nền beige.
 * 4 nhóm card + CTA xem bảng giá chi tiết.
 */
export function ServicesPreview() {
  return (
    <Section tone="beige" id="services" ariaLabelledby="services-heading">
      <div className="container-aim">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-gold-deep">Dịch vụ</p>
            <h2
              id="services-heading"
              className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
            >
              Từ chiến lược đến ấn phẩm
            </h2>
            <p className="mt-5 text-base leading-relaxed text-navy/75">
              Bốn nhóm dịch vụ cốt lõi, ghép linh hoạt theo nhu cầu và ngân sách thực tế của bạn.
            </p>
          </div>
          <div className="hidden sm:block">
            <Button href={SERVICES_CTA.href} variant="outline-dark" withArrow>
              {SERVICES_CTA.label}
            </Button>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {SERVICE_CARDS.map((card, i) => {
            const Icon = SERVICE_ICONS[card.icon];
            return (
              <Reveal
                key={card.title}
                as="article"
                delay={i * 0.08}
                className="group flex items-start gap-5 rounded-xl border border-steel/30 bg-steel/10 p-7 transition-all hover:border-steel/60 hover:bg-steel/15"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy text-gold-bright">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
                    {card.title}
                    <IconArrowRight className="h-4 w-4 -translate-x-1 text-gold-deep opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy/75">{card.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 sm:hidden">
          <Button href={SERVICES_CTA.href} variant="outline-dark" withArrow className="w-full">
            {SERVICES_CTA.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
