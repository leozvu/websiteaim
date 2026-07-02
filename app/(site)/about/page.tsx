import type { Metadata } from 'next';
import { Band, SectionHead, PageHero } from '@/components/site/kit';
import { Reveal } from '@/components/brandbook/primitives';
import { Card, Icon, Button } from '@/components/brandbook/ds';
import { ABOUT } from '@/lib/pages';
import { ROADMAP } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description:
    'Câu chuyện, giá trị và cách làm việc của Aim Agency — branding studio cho Startups & SME Việt. Lựa chọn đúng, thực thi chuẩn xác, đồng hành chân thành.',
};

const valueIcons = ['aim', 'precision', 'handshake'] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={ABOUT.hero.eyebrow} title={ABOUT.hero.title} intro={ABOUT.hero.intro} />

      {/* Câu chuyện */}
      <Band tone="ivory">
        <SectionHead no="01" eyebrow="Câu chuyện" title="Vì sao Aim tồn tại" />
        <div style={{ marginTop: 'clamp(32px,5vw,48px)', maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {ABOUT.story.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p style={{ margin: 0, fontSize: 'var(--text-lg)', lineHeight: 1.8, color: 'var(--text-on-light-muted)' }}>{p}</p>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* Giá trị cốt lõi */}
      <Band tone="navy">
        <SectionHead no="02" eyebrow="Giá trị cốt lõi" title="Ba điều Aim luôn giữ" dark />
        <div className="aim-grid-3" style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
          {ABOUT.values.map((v, i) => (
            <Reveal key={v.vi} delay={i * 0.07} style={{ height: '100%' }}>
              <Card tone="navy" padding="30px" style={{ height: '100%' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    height: 52,
                    width: 52,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-accent)',
                    color: 'var(--gold-bright)',
                  }}
                >
                  <Icon name={valueIcons[i]} size={26} />
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 23, color: 'var(--ivory)', marginTop: 22 }}>{v.vi}</div>
                <div className="aim-eyebrow" style={{ color: 'var(--steel-soft)', margin: '4px 0 14px' }}>
                  {v.en}
                </div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-on-dark-muted)' }}>{v.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* Cách làm việc */}
      <Band tone="ivory-raise">
        <SectionHead no="03" eyebrow="Cách làm việc" title="Chúng tôi làm việc thế nào" />
        <div className="aim-grid-3" style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
          {ABOUT.approach.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div>
                <div className="aim-numeral" style={{ fontSize: 'clamp(2.6rem,5vw,3.6rem)', color: 'var(--gold-deep)' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <hr className="aim-rule" style={{ margin: '12px 0 16px' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', color: 'var(--navy)', margin: 0 }}>{a.title}</h3>
                <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-on-light-muted)' }}>{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* Lộ trình */}
      <Band tone="navy">
        <SectionHead no="04" eyebrow="Lộ trình phát triển" title="Aim đi đường dài" dark />
        <div style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
          {ROADMAP.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.05}>
              <div
                className="aim-road-row"
                style={{ display: 'grid', gridTemplateColumns: 'var(--road, 1fr)', gap: 'clamp(8px,3vw,40px)', alignItems: 'baseline', paddingBlock: 'clamp(20px,3vw,30px)' }}
              >
                <div className="aim-numeral" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', color: 'var(--gold-bright)' }}>
                  {m.year}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', color: 'var(--ivory)', margin: 0 }}>{m.title}</h3>
                  <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-on-dark-muted)', maxWidth: 640 }}>{m.body}</p>
                </div>
              </div>
              {i < ROADMAP.length - 1 && <hr className="aim-rule aim-rule--dark" />}
            </Reveal>
          ))}
        </div>
      </Band>

      {/* CTA */}
      <Band tone="ivory">
        <div style={{ textAlign: 'center', maxWidth: 720, marginInline: 'auto' }}>
          <SectionHead eyebrow="Bắt đầu" title="Cùng làm đúng từ đầu" align="center" />
          <Reveal delay={0.1} style={{ marginTop: 28, display: 'inline-flex' }}>
            <Button href="/contact" variant="gold" size="lg" withArrow>
              Bắt đầu dự án
            </Button>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
