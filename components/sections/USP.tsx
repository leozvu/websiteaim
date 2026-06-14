import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { TextReveal } from '../ui/TextReveal';
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
        <Reveal y={0} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-deep">Nguyên tắc của chúng tôi</p>
          <TextReveal
            as="h2"
            id="usp-heading"
            text="Ba điều Aim cam kết làm đúng"
            className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
          />
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
                className="group flex flex-col rounded-xl border border-[rgba(18,26,68,0.1)] bg-white/35 p-8 shadow-[0_2px_10px_-6px_rgba(6,8,21,0.25)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-gold-line hover:shadow-[0_24px_44px_-26px_rgba(6,8,21,0.4)]"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-royal text-gold-champagne">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{pillar.vi}</h3>
                <p className="eyebrow mt-1 text-[0.65rem] text-steel">{pillar.en}</p>
                <p className="mt-4 text-sm leading-relaxed text-navy/75">{pillar.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
