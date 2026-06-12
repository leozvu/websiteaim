import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { PROCESS_STEPS } from '@/lib/content';

/**
 * Section 5 — Quy trình 4 bước. Nền navy.
 * Timeline ngang, số thứ tự gold serif lớn.
 */
export function Process() {
  return (
    <Section tone="navy" id="process" ariaLabelledby="process-heading">
      <div className="container-aim">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-bright">Cách chúng tôi làm việc</p>
          <h2
            id="process-heading"
            className="mt-4 font-display text-3xl font-semibold leading-tight text-beige sm:text-4xl lg:text-5xl"
          >
            Quy trình bốn bước rõ ràng
          </h2>
          <p className="mt-5 text-base leading-relaxed text-beige/70">
            Minh bạch ở từng giai đoạn. Bạn luôn biết đang ở đâu và bước tiếp theo là gì.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.number} as="li" delay={i * 0.1} className="relative">
              {/* Đường nối ngang giữa các bước (desktop) */}
              {i < PROCESS_STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[3.5rem] top-7 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-gold/50 to-transparent lg:block"
                />
              )}
              <span className="font-display text-5xl font-semibold text-gold lg:text-6xl">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-beige">
                {step.title}
              </h3>
              <p className="eyebrow mt-1 text-[0.65rem] text-steel-soft">{step.en}</p>
              <p className="mt-3 text-sm leading-relaxed text-beige/70">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
