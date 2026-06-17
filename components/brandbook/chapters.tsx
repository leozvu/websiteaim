'use client';

/* AIM brand book — bảy chương. Port y chang từ design bundle chapters.jsx. */

import React, { CSSProperties, ReactNode, useState } from 'react';
import { Card, Button, Icon, Badge, OmegaMark, Logo } from './ds';
import { ChapterHeader, ImagePlate, Reveal, Tilt3D } from './primitives';
import { CHAPTERS, STRATEGY, LOGO, SYSTEM, STATIONERY, COLLATERAL, PRICING, START } from './data';

type Tone = 'navy' | 'navy-ink' | 'ivory' | 'ivory-raise';

function Band({ id, tone, children, style }: { id: string; tone: Tone; children: ReactNode; style?: CSSProperties }) {
  const grounds: Record<Tone, CSSProperties> = {
    navy: { background: 'var(--navy)', color: 'var(--ivory)' },
    'navy-ink': { background: 'var(--navy-ink)', color: 'var(--ivory)' },
    ivory: { background: 'var(--ivory)', color: 'var(--navy)' },
    'ivory-raise': { background: 'var(--ivory-raise)', color: 'var(--navy)' },
  };
  return (
    <section id={id} style={{ ...grounds[tone], paddingBlock: 'clamp(72px, 10vw, 120px)', ...style }}>
      <div className="aim-container">{children}</div>
    </section>
  );
}

/* 01 — Brand Strategy */
export function ChStrategy() {
  const D = STRATEGY;
  const icons = ['aim', 'precision', 'handshake'];
  return (
    <Band id="strategy" tone="navy">
      <ChapterHeader chapter={CHAPTERS[0]} topics={D.topics} quote={D.quote} dark />
      <div className="aim-ch-body" style={{ marginTop: 'clamp(40px,6vw,72px)', display: 'grid', gap: 28, gridTemplateColumns: 'var(--two, 1fr)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {D.pillars.map((p, i) => (
            <Reveal key={p.vi} delay={i * 0.06}>
              <Card tone="navy" padding="22px" style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <span
                  style={{
                    flexShrink: 0,
                    display: 'inline-flex',
                    height: 44,
                    width: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-accent)',
                    color: 'var(--gold-bright)',
                  }}
                >
                  <Icon name={icons[i]} size={22} />
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ivory)' }}>{p.vi}</div>
                  <div className="aim-eyebrow" style={{ color: 'var(--steel-soft)', margin: '2px 0 8px' }}>
                    {p.en}
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: 'var(--text-on-dark-muted)' }}>{p.body}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        <ImagePlate caption={D.plate} ratio="3 / 4" style={{ minHeight: 320 }} />
      </div>
    </Band>
  );
}

/* 02 — Logo & Identity */
export function ChLogo() {
  const D = LOGO;
  return (
    <Band id="logo" tone="ivory">
      <ChapterHeader chapter={CHAPTERS[1]} topics={D.topics} quote={D.quote} />
      <div className="aim-ch-body" style={{ marginTop: 'clamp(40px,6vw,72px)', display: 'grid', gap: 28, gridTemplateColumns: 'var(--two, 1fr)' }}>
        <Reveal
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            padding: '40px 24px',
            border: '1px solid var(--border-on-light)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--ivory-raise)',
          }}
        >
          <div style={{ color: 'var(--navy)' }}>
            <Logo variant="stacked" withTagline markSize={92} />
          </div>
          <div className="aim-eyebrow" style={{ color: 'var(--steel)' }}>
            Logo chính · Primary lockup
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {D.backgrounds.map((b, i) => (
            <Reveal
              key={b.label}
              delay={i * 0.05}
              style={{
                background: b.bg,
                color: b.fg,
                borderRadius: 'var(--radius-md)',
                minHeight: 132,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                border: '1px solid var(--border-on-light)',
              }}
            >
              <Logo variant="full" markSize={34} tone={b.fg.includes('ivory') ? 'ivory' : 'navy'} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, opacity: 0.75 }}>{b.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal style={{ marginTop: 36 }}>
        <div className="aim-eyebrow" style={{ color: 'var(--gold)', marginBottom: 16 }}>
          Tránh dùng sai · Logo misuses
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
          {D.misuses.map((m, i) => (
            <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ position: 'relative', opacity: 0.5, transform: i === 0 ? 'scaleX(1.5)' : i === 2 ? 'rotate(8deg)' : 'none' }}>
                <OmegaMark size={44} title="" tone="navy" />
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--text-on-light-muted)' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    height: 18,
                    width: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: 'var(--navy)',
                    color: 'var(--ivory)',
                  }}
                >
                  <Icon name="close" size={12} />
                </span>
                {m}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Band>
  );
}

/* 03 — Color & Typography */
export function ChSystem() {
  const D = SYSTEM;
  return (
    <Band id="system" tone="navy">
      <ChapterHeader chapter={CHAPTERS[2]} topics={D.topics} quote={D.quote} dark />
      <div style={{ marginTop: 'clamp(40px,6vw,72px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
        {D.colors.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.05} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-on-dark)' }}>
            <div style={{ background: c.hex, color: c.fg, minHeight: 120, display: 'flex', alignItems: 'flex-end', padding: 14 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 19 }}>{c.name}</span>
            </div>
            <div style={{ padding: '12px 14px', background: 'rgba(248,242,235,0.04)' }}>
              <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)', fontSize: 10 }}>
                {c.role}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--text-on-dark-muted)', marginTop: 6 }}>{c.hex}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--steel-soft)', marginTop: 2 }}>{c.pantone}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'var(--two, 1fr)', gap: 28 }}>
        <div style={{ padding: 28, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-on-dark)', background: 'rgba(248,242,235,0.04)' }}>
          <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)' }}>
            {D.type.primary.sub}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(40px,6vw,68px)', lineHeight: 1, color: 'var(--ivory)', margin: '14px 0' }}>
            {D.type.primary.sample}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--steel-soft)' }}>Aa Bb Cc · 0123456789</div>
        </div>
        <div style={{ padding: 28, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-on-dark)', background: 'rgba(248,242,235,0.04)' }}>
          <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)' }}>
            {D.type.secondary.sub}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'clamp(26px,4vw,40px)', lineHeight: 1.1, color: 'var(--ivory)', margin: '14px 0' }}>
            {D.type.secondary.sample}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {D.type.weights.map((w, i) => (
              <span key={w} style={{ fontFamily: 'var(--font-body)', fontWeight: [300, 400, 500, 600, 700][i], fontSize: 15, color: 'var(--text-on-dark-muted)' }}>
                {w}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

/* 04 — Stationery & Office */
export function ChStationery() {
  const D = STATIONERY;
  return (
    <Band id="stationery" tone="ivory">
      <ChapterHeader chapter={CHAPTERS[3]} topics={D.topics} quote={D.quote} />
      <div style={{ marginTop: 'clamp(40px,6vw,72px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
        {D.items.map((it) => (
          <div key={it[0]}>
            <ImagePlate caption={null} ratio="4 / 3" dark={false} />
            <div style={{ marginTop: 10 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, color: 'var(--navy)' }}>{it[0]}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 13, color: 'var(--steel)' }}>{it[1]}</div>
            </div>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* 05 — Marketing Collaterals */
export function ChCollateral() {
  const D = COLLATERAL;
  return (
    <Band id="collateral" tone="navy-ink">
      <ChapterHeader chapter={CHAPTERS[4]} topics={D.topics} quote={D.quote} dark />
      <div style={{ marginTop: 'clamp(40px,6vw,72px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        {D.posters.map((p, i) => (
          <Reveal key={i} delay={i * 0.07} depth>
            <Tilt3D
              max={11}
              lift={1.03}
              sheen
              style={{
                aspectRatio: '3 / 4',
                overflow: 'hidden',
                background: 'linear-gradient(160deg, #081650, #122a66)',
                border: '1px solid var(--border-on-dark)',
                boxShadow: '0 26px 56px rgba(4,10,41,0.45)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 26,
              }}
            >
              <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 20%, rgba(197,173,138,0.16), transparent 55%)' }} />
              <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)', position: 'relative' }}>
                {p.kicker}
              </div>
              <div style={{ position: 'relative', fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,38px)', lineHeight: 1.1, color: 'var(--ivory)' }}>
                {p.line}
                <br />
                <em style={{ color: 'var(--gold-bright)' }}>{p.em}</em>
              </div>
              <div style={{ position: 'relative', transform: 'translateZ(30px)' }}>
                <OmegaMark size={30} title="" tone="ivory" style={{ opacity: 0.75 }} />
              </div>
            </Tilt3D>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* 06 — Packages / Pricing */
export function ChPricing({ onNav }: { onNav: (href: string) => void }) {
  const D = PRICING;
  return (
    <Band id="pricing" tone="ivory">
      <ChapterHeader chapter={CHAPTERS[5]} topics={D.topics} quote={D.quote} />
      <div style={{ marginTop: 'clamp(40px,6vw,72px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, alignItems: 'start' }}>
        {D.tiers.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.07} depth style={{ height: '100%' }}>
            <Card
              tone="beige"
              padding="28px"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: t.featured ? '1px solid var(--border-accent)' : '1px solid var(--border-on-light)',
                background: t.featured ? 'var(--ivory-raise)' : 'transparent',
                boxShadow: t.featured ? 'var(--shadow-md)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--navy)' }}>{t.name}</div>
                  <div className="aim-eyebrow" style={{ color: 'var(--steel)', marginTop: 2 }}>
                    {t.en}
                  </div>
                </div>
                {t.featured && <Badge variant="gold">Phổ biến</Badge>}
              </div>
              <p style={{ margin: '14px 0 18px', fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-on-light-muted)' }}>{t.desc}</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                {t.items.map((it) => (
                  <li key={it} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, color: 'var(--text-on-light)' }}>
                    <span style={{ color: 'var(--gold-deep)', marginTop: 1 }}>
                      <Icon name="check" size={16} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 22 }}>
                <Button variant={t.featured ? 'gold' : 'outline-dark'} fullWidth onClick={() => onNav('#start')}>
                  Liên hệ báo giá
                </Button>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p style={{ marginTop: 24, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--text-on-light-muted)', textAlign: 'center' }}>{D.note}</p>
      </Reveal>
    </Band>
  );
}

/* 07 — Start Project (contact) */
export function ChStart() {
  const D = START;
  const [sent, setSent] = useState(false);
  return (
    <Band id="start" tone="navy">
      <div style={{ maxWidth: 600, marginInline: 'auto', textAlign: 'center' }}>
        <Reveal>
          <span aria-hidden style={{ fontFamily: 'var(--font-numeral)', fontSize: 56, color: 'var(--gold)', display: 'inline-block', lineHeight: 0.6 }}>
            &ldquo;
          </span>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.6, color: 'var(--text-on-dark-muted)', margin: '8px 0 0' }}>{D.quote}</p>
        </Reveal>
        <Reveal delay={0.08} style={{ marginTop: 40 }}>
          <div className="aim-numeral" style={{ fontSize: 'var(--numeral)' }}>
            07
          </div>
          <h2 className="aim-display" style={{ fontSize: 'var(--text-display)', color: 'var(--ivory)', margin: '4px 0 0' }}>
            {D.title}
          </h2>
          <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.65, color: 'var(--text-on-dark-muted)' }}>{D.body}</p>
        </Reveal>
        <Reveal delay={0.16} style={{ marginTop: 36 }}>
          {sent ? (
            <div style={{ padding: '36px 24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-accent)', background: 'rgba(248,242,235,0.05)' }}>
              <span
                style={{
                  display: 'inline-flex',
                  height: 52,
                  width: 52,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  color: 'var(--navy)',
                }}
              >
                <Icon name="check" size={26} />
              </span>
              <h3 className="aim-display" style={{ fontSize: 22, color: 'var(--ivory)', marginTop: 18 }}>
                Đã nhận, cảm ơn bạn!
              </h3>
              <p style={{ marginTop: 10, fontSize: 14, color: 'var(--text-on-dark-muted)' }}>Chúng tôi sẽ phản hồi trong vòng 1–2 ngày làm việc.</p>
              <div style={{ marginTop: 20 }}>
                <Button variant="outline-light" type="button" onClick={() => setSent(false)}>
                  Gửi yêu cầu khác
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left' }}
            >
              <input className="aim-input" placeholder="Tên của bạn" required />
              <input className="aim-input" type="email" placeholder="Email" required />
              <input className="aim-input" placeholder="Tên doanh nghiệp" />
              <textarea
                className="aim-input"
                rows={4}
                placeholder="Bạn đang cần gì? Kể ngắn gọn về doanh nghiệp và mục tiêu."
                style={{ resize: 'vertical' }}
              ></textarea>
              <Button variant="gold" withArrow fullWidth>
                Gửi yêu cầu
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </Band>
  );
}
