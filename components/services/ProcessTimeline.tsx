import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { PROCESS_DETAIL, PROCESS_TOTAL_NOTE } from '@/lib/pricing';

/**
 * Quy trình 4 bước — bản chi tiết cho trang Dịch vụ, kèm thời lượng từng bước.
 * Timeline ngang, số thứ tự gold serif lớn (đồng nhất với trang chủ).
 */
export function ProcessTimeline() {
  return (
    <Section tone="navy" id="process" ariaLabelledby="services-process-heading">
      <div className="container-aim">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-bright">Cách chúng tôi làm việc</p>
          <h2
            id="services-process-heading"
            className="mt-4 font-display text-3xl font-semibold leading-tight text-beige sm:text-4xl lg:text-5xl"
          >
            Bốn bước, đúng hẹn
          </h2>
          <p className="mt-5 text-base leading-relaxed text-beige/70">{PROCESS_TOTAL_NOTE}</p>
        </Reveal>

        <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_DETAIL.map((step, i) => (
            <Reveal key={step.number} as="li" delay={i * 0.1} className="relative">
              {i < PROCESS_DETAIL.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[3.5rem] top-7 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-gold/50 to-transparent lg:block"
                />
              )}
              <span className="font-display text-5xl font-semibold text-gold lg:text-6xl">
                {step.number}
              </span>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl font-semibold text-beige">{step.title}</h3>
                <span className="rounded-full border border-gold/40 px-3 py-1 text-xs font-medium tracking-wide text-gold-bright">
                  {step.duration}
                </span>
              </div>
              <p className="eyebrow mt-2 text-[0.65rem] text-steel-soft">{step.en}</p>
              <p className="mt-3 text-sm leading-relaxed text-beige/70">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
