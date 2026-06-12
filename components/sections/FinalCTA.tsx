import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { OmegaMark } from '../Logo';
import { FINAL_CTA } from '@/lib/content';

/**
 * Section 8 — CTA cuối. Banner navy fullwidth.
 */
export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden border-t border-beige/10 bg-navy text-beige"
    >
      {/* Omega trang trí mờ */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <OmegaMark
          className="absolute -right-16 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 text-steel/10"
          title=""
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 30% 50%, rgba(184,153,104,0.12), transparent 55%)',
          }}
        />
      </div>

      <div className="container-aim relative z-10 py-24 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow tracking-brand text-gold-bright">Do Right Things</p>
          <h2
            id="final-cta-heading"
            className="mt-5 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            {FINAL_CTA.title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-beige/80 sm:text-lg">
            {FINAL_CTA.body}
          </p>
          <div className="mt-10">
            <Button href={FINAL_CTA.cta.href} variant="gold" withArrow>
              {FINAL_CTA.cta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
