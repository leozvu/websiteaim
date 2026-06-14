import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { TextReveal } from '../ui/TextReveal';
import { PAIN_SOLUTIONS } from '@/lib/content';

/**
 * Section 3 — Vì sao AIM. Nền navy.
 * 4 pain point đối lập cách Aim giải, layout so le 2 cột (alternating).
 */
export function WhyAim() {
  return (
    <Section tone="navy" id="why-aim" ariaLabelledby="why-heading" seam glow={{ x: 26, y: 28 }}>
      <div className="container-aim">
        <Reveal y={0} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-champagne">Vì sao chọn Aim</p>
          <TextReveal
            as="h2"
            id="why-heading"
            text="Chúng tôi hiểu vấn đề thật của bạn"
            className="mt-4 font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl lg:text-5xl"
          />
          <p className="mt-5 text-base leading-relaxed text-beige/70">
            Không vẽ ra nhu cầu mới. Aim bắt đầu từ chính những khó khăn mà Startups và SME Việt
            đang đối mặt mỗi ngày.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-6 lg:gap-8">
          {PAIN_SOLUTIONS.map((item, i) => {
            const solutionFirst = i % 2 === 1; // so le: đảo thứ tự cột
            return (
              <Reveal
                key={item.painTitle}
                as="article"
                delay={i * 0.05}
                className="card-ink grid items-stretch gap-px overflow-hidden rounded-2xl lg:grid-cols-2"
              >
                {/* Pain */}
                <div
                  className={`flex flex-col justify-center p-8 lg:p-10 ${
                    solutionFirst ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <span className="eyebrow text-steel-soft">Vấn đề</span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-beige sm:text-2xl">
                    {item.painTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-beige/65">{item.pain}</p>
                </div>

                {/* Solution */}
                <div
                  className={`flex flex-col justify-center border-t border-hairline bg-ink/40 p-8 lg:border-l lg:border-t-0 lg:p-10 ${
                    solutionFirst ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <span className="eyebrow text-gold-bright">Cách Aim giải</span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-beige sm:text-2xl">
                    {item.solutionTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-beige/80">{item.solution}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
