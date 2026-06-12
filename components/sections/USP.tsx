import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { USP_ICONS } from '../ui/Icons';
import { USP_PILLARS, BRAND_PROMISE } from '@/lib/content';

/**
 * Section 2 — USP 3 cột. Nền beige.
 * 3 trụ: Lựa chọn đúng / Thực thi chuẩn xác / Đồng hành chân thành.
 */
export function USP() {
  return (
    <Section tone="beige" id="usp" ariaLabelledby="usp-heading">
      <div className="container-aim">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-deep">Nguyên tắc của chúng tôi</p>
          <h2
            id="usp-heading"
            className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
          >
            Ba điều Aim cam kết làm đúng
          </h2>
          <p className="mt-5 text-base leading-relaxed text-navy/75">{BRAND_PROMISE}</p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {USP_PILLARS.map((pillar, i) => {
            const Icon = USP_ICONS[pillar.icon];
            return (
              <Reveal
                key={pillar.vi}
                as="article"
                delay={i * 0.1}
                className="group flex flex-col rounded-xl border border-navy/10 bg-beige-warm/50 p-8 transition-colors hover:border-gold/50"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold-bright">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{pillar.vi}</h3>
                <p className="eyebrow mt-1 text-[0.65rem] text-navy/70">{pillar.en}</p>
                <p className="mt-4 text-sm leading-relaxed text-navy/75">{pillar.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
