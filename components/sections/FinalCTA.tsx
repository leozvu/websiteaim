import { Reveal } from '../ui/Reveal';
import { TextReveal } from '../ui/TextReveal';
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
      style={{ ['--gx' as string]: '32%', ['--gy' as string]: '50%' }}
      className="surface-dark vignette glow-seam relative overflow-hidden"
    >
      {/* Omega trang trí mờ */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <OmegaMark
          className="absolute -right-16 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 text-gold-champagne/10"
          title=""
        />
      </div>

      <div className="container-aim relative z-10 py-24 lg:py-32">
        <Reveal y={0} className="max-w-2xl">
          <p className="eyebrow tracking-brand text-gold-champagne">Do Right Things</p>
          <TextReveal
            as="h2"
            id="final-cta-heading"
            text={FINAL_CTA.title}
            className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-ivory sm:text-5xl lg:text-6xl"
          />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
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
