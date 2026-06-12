import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { ROADMAP } from '@/lib/content';

/**
 * Section 6 — Lộ trình phát triển. Nền beige.
 * Timeline dọc: 2026 → 2036, mốc năm gold, nội dung lệch phải.
 */
export function Roadmap() {
  return (
    <Section tone="beige" id="roadmap" ariaLabelledby="roadmap-heading">
      <div className="container-aim">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold">Tầm nhìn dài hạn</p>
          <h2
            id="roadmap-heading"
            className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
          >
            Lộ trình phát triển của Aim
          </h2>
          <p className="mt-5 text-base leading-relaxed text-navy/75">
            Chúng tôi xây năng lực theo từng giai đoạn, vững phần gốc trước khi mở rộng. Đây là
            chặng đường mười năm chúng tôi cam kết đi cùng khách hàng.
          </p>
        </Reveal>

        <ol className="relative mx-auto mt-16 max-w-3xl">
          {/* Đường timeline dọc */}
          <span
            aria-hidden
            className="absolute left-[7.5rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-navy/15 sm:block"
          />
          <span
            aria-hidden
            className="absolute left-[0.4rem] top-2 h-[calc(100%-1rem)] w-px bg-navy/15 sm:hidden"
          />

          {ROADMAP.map((m, i) => (
            <Reveal
              key={m.year}
              as="li"
              delay={i * 0.08}
              className="relative flex gap-6 pb-12 last:pb-0 sm:gap-10"
            >
              {/* Năm */}
              <span className="hidden w-24 shrink-0 pt-0.5 text-right font-display text-3xl font-semibold text-navy sm:block">
                {m.year}
              </span>
              {/* Marker */}
              <span
                aria-hidden
                className="relative z-10 mt-2 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-gold ring-4 ring-beige sm:mt-3"
              />
              {/* Nội dung */}
              <div className="pt-0.5">
                <span className="font-display text-2xl font-semibold text-navy sm:hidden">
                  {m.year}
                </span>
                <h3 className="font-display text-xl font-semibold text-navy">{m.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-navy/75">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
