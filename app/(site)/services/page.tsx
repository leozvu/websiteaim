import type { Metadata } from 'next';
import { Band, SectionHead, PageHero } from '@/components/site/kit';
import { Reveal } from '@/components/brandbook/primitives';
import { Card, Icon, Badge, Button } from '@/components/brandbook/ds';
import { SERVICES_HERO, SERVICES_DETAIL, TIERS, PRICING_NOTE, FAQS } from '@/lib/pages';
import { PROCESS_STEPS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Dịch vụ & Bảng giá',
  description:
    'Chiến lược thương hiệu, logo & identity, bộ nhận diện văn phòng và ấn phẩm truyền thông — cùng bảng giá minh bạch cho Startups & SME.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow={SERVICES_HERO.eyebrow} title={SERVICES_HERO.title} intro={SERVICES_HERO.intro} />

      {/* Dịch vụ chi tiết */}
      <Band tone="ivory">
        <SectionHead no="01" eyebrow="Dịch vụ" title="Bốn nhóm dịch vụ cốt lõi" />
        <div className="aim-grid-2" style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
          {SERVICES_DETAIL.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} style={{ height: '100%' }}>
              <Card tone="beige" interactive padding="30px" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      height: 48,
                      width: 48,
                      flexShrink: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--navy)',
                      color: 'var(--gold-bright)',
                    }}
                  >
                    <Icon name={s.icon} size={24} />
                  </span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--navy)' }}>{s.title}</div>
                </div>
                <p style={{ margin: '16px 0 18px', fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-on-light-muted)' }}>{s.body}</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {s.items.map((it) => (
                    <li key={it} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--text-on-light)' }}>
                      <span style={{ color: 'var(--gold-deep)', marginTop: 1 }}>
                        <Icon name="check" size={16} />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* Bảng giá */}
      <Band tone="navy">
        <SectionHead no="02" eyebrow="Gói & Báo giá" title="Chọn gói theo giai đoạn của bạn" dark />
        <div className="aim-grid-3" style={{ marginTop: 'clamp(40px,6vw,64px)', alignItems: 'start' }}>
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07} style={{ height: '100%' }}>
              <Card
                tone="navy"
                padding="30px"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: t.featured ? '1px solid var(--border-accent)' : '1px solid var(--border-on-dark)',
                  background: t.featured ? 'rgba(197,173,138,0.08)' : 'rgba(248,242,235,0.05)',
                  boxShadow: t.featured ? 'var(--shadow-md)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--ivory)' }}>{t.name}</div>
                    <div className="aim-eyebrow" style={{ color: 'var(--steel-soft)', marginTop: 2 }}>
                      {t.en}
                    </div>
                  </div>
                  {t.featured && <Badge variant="gold">Phổ biến</Badge>}
                </div>
                <p style={{ margin: '14px 0 18px', fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-on-dark-muted)' }}>{t.desc}</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {t.items.map((it) => (
                    <li key={it} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, color: 'var(--text-on-dark)' }}>
                      <span style={{ color: 'var(--gold-bright)', marginTop: 1 }}>
                        <Icon name="check" size={16} />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 22 }}>
                  <Button href="/contact" variant={t.featured ? 'gold' : 'outline-light'} fullWidth>
                    Liên hệ báo giá
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p style={{ marginTop: 26, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--text-on-dark-subtle)', textAlign: 'center' }}>
            {PRICING_NOTE}
          </p>
        </Reveal>
      </Band>

      {/* Quy trình */}
      <Band tone="ivory-raise">
        <SectionHead no="03" eyebrow="Quy trình" title="Bốn bước, minh bạch từ đầu" />
        <div className="aim-grid-4" style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.number} delay={i * 0.06}>
              <div>
                <div className="aim-numeral" style={{ fontSize: 'clamp(3.5rem,7vw,5rem)', color: 'var(--gold-deep)' }}>
                  {s.number}
                </div>
                <hr className="aim-rule" style={{ margin: '12px 0 16px' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, color: 'var(--navy)' }}>{s.title}</div>
                <div className="aim-eyebrow" style={{ color: 'var(--steel)', margin: '2px 0 12px' }}>
                  {s.en}
                </div>
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: 'var(--text-on-light-muted)' }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* FAQ */}
      <Band tone="ivory">
        <SectionHead no="04" eyebrow="Câu hỏi thường gặp" title="Những điều bạn có thể đang thắc mắc" />
        <div style={{ marginTop: 'clamp(36px,5vw,52px)', maxWidth: 820, display: 'flex', flexDirection: 'column' }}>
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <details style={{ borderTop: '1px solid var(--rule-on-light)', padding: '20px 0' }}>
                <summary
                  style={{
                    cursor: 'pointer',
                    listStyle: 'none',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-h4)',
                    color: 'var(--navy)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 16,
                    alignItems: 'baseline',
                  }}
                >
                  {f.q}
                  <span style={{ color: 'var(--gold-deep)', flexShrink: 0 }}>
                    <Icon name="arrow-right" size={18} />
                  </span>
                </summary>
                <p style={{ margin: '14px 0 0', fontSize: 14.5, lineHeight: 1.75, color: 'var(--text-on-light-muted)', maxWidth: 680 }}>{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* CTA */}
      <Band tone="navy">
        <div style={{ textAlign: 'center', maxWidth: 760, marginInline: 'auto' }}>
          <SectionHead eyebrow="Bắt đầu" title="Nhận tư vấn không ràng buộc" dark align="center" />
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
