/* Render các khối kéo-thả (từ Payload) bằng component thương hiệu AIM.
   Server component — nhận mảng `layout` của trang, switch theo blockType. */

import { CSSProperties, ReactNode } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Band, SectionHead, PageHero as KitPageHero } from '@/components/site/kit';
import { Button, Card, Icon, OmegaMark } from '@/components/brandbook/ds';
import { HeroShowcase } from '@/components/home/HeroShowcase';
import { BookFlip } from '@/components/fx/BookFlip';
import { Usp as UspSection, WhyAim as WhySection, Services as ServicesSection, Process as ProcessSection, Roadmap as RoadmapSection, FinalCta as FinalCtaSection } from '@/components/home/sections';
import { ContactSection } from '@/components/site/ContactSection';
import { ProjectsGridBlock, PostsListBlock } from './dynamic';

type Tone = 'navy' | 'navy-ink' | 'ivory' | 'ivory-raise';
const isDark = (t: Tone) => t === 'navy' || t === 'navy-ink';

/* ── Hero ── */
function HeroBlock(b: any) {
  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--navy)',
        color: 'var(--ivory)',
        overflow: 'hidden',
        paddingTop: 'clamp(140px, 18vw, 200px)',
        paddingBottom: 'clamp(72px, 10vw, 120px)',
      }}
    >
      <div aria-hidden style={{ position: 'absolute', right: '-8%', top: '42%', transform: 'translateY(-50%)' }}>
        <OmegaMark size={520} title="" tone="ivory" style={{ opacity: 0.06 }} />
      </div>
      <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 26% 34%, rgba(197,173,138,0.1), transparent 55%)' }} />
      <div className="aim-container" style={{ position: 'relative', maxWidth: 720 }}>
        {b.eyebrow && (
          <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)', marginBottom: 22 }}>
            {b.eyebrow}
          </div>
        )}
        <h1 className="aim-display" style={{ fontSize: 'var(--text-hero)', lineHeight: 1.02, margin: 0, letterSpacing: '-0.01em' }}>
          {b.title}
        </h1>
        {b.subtitle && (
          <p style={{ marginTop: 24, maxWidth: 560, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--text-on-dark-muted)' }}>{b.subtitle}</p>
        )}
        {(b.primaryLabel || b.secondaryLabel) && (
          <div style={{ marginTop: 34, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            {b.primaryLabel && (
              <Button href={b.primaryHref || '/contact'} variant="gold" size="lg" withArrow>
                {b.primaryLabel}
              </Button>
            )}
            {b.secondaryLabel && (
              <Button href={b.secondaryHref || '#'} variant="outline-light" size="lg">
                {b.secondaryLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Heading ── */
function HeadingBlock(b: any) {
  const tone: Tone = b.tone || 'ivory';
  return (
    <Band tone={tone}>
      <SectionHead no={b.no} eyebrow={b.eyebrow || ''} title={b.title} intro={b.intro} dark={isDark(tone)} align={b.align ? 'center' : 'left'} />
    </Band>
  );
}

/* ── Rich text ── */
function RichTextBlockR(b: any) {
  const tone: Tone = b.tone || 'ivory';
  return (
    <Band tone={tone}>
      <div
        className="aim-richtext"
        style={{ maxWidth: 760, fontSize: 'var(--text-lg)', lineHeight: 1.8, color: isDark(tone) ? 'var(--text-on-dark-muted)' : 'var(--text-on-light-muted)' }}
      >
        {b.content ? <RichText data={b.content} /> : null}
      </div>
    </Band>
  );
}

/* ── Cards ── */
function CardsBlock(b: any) {
  const tone: Tone = b.tone || 'ivory';
  const dark = isDark(tone);
  return (
    <Band tone={tone}>
      <div className={`aim-grid-${b.columns || '3'}`}>
        {(b.items || []).map((it: any, i: number) => (
          <Card key={i} tone={dark ? 'navy' : 'beige'} padding="30px" style={{ height: '100%' }}>
            <span
              style={{
                display: 'inline-flex',
                height: 52,
                width: 52,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-accent)',
                color: dark ? 'var(--gold-bright)' : 'var(--gold-deep)',
              }}
            >
              <Icon name={it.icon || 'aim'} size={26} />
            </span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: dark ? 'var(--ivory)' : 'var(--navy)', marginTop: 20 }}>{it.title}</div>
            {it.body && (
              <p style={{ margin: '10px 0 0', fontSize: 14.5, lineHeight: 1.7, color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-on-light-muted)' }}>
                {it.body}
              </p>
            )}
          </Card>
        ))}
      </div>
    </Band>
  );
}

/* ── Pricing ── */
function PricingBlock(b: any) {
  const tone: Tone = b.tone || 'ivory';
  const dark = isDark(tone);
  return (
    <Band tone={tone}>
      <div className="aim-grid-3" style={{ alignItems: 'start' }}>
        {(b.tiers || []).map((t: any, i: number) => (
          <Card
            key={i}
            tone={dark ? 'navy' : 'beige'}
            padding="30px"
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              border: t.featured ? '1px solid var(--border-accent)' : undefined,
              boxShadow: t.featured ? 'var(--shadow-md)' : 'none',
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: dark ? 'var(--ivory)' : 'var(--navy)' }}>{t.name}</div>
            {t.en && (
              <div className="aim-eyebrow" style={{ color: 'var(--steel)', marginTop: 2 }}>
                {t.en}
              </div>
            )}
            {t.desc && <p style={{ margin: '14px 0 18px', fontSize: 13.5, lineHeight: 1.6, color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-on-light-muted)' }}>{t.desc}</p>}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {(t.items || []).map((it: any, j: number) => (
                <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, color: dark ? 'var(--text-on-dark)' : 'var(--text-on-light)' }}>
                  <span style={{ color: dark ? 'var(--gold-bright)' : 'var(--gold-deep)', marginTop: 1 }}>
                    <Icon name="check" size={16} />
                  </span>
                  {it.item}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 22 }}>
              <Button href="/contact" variant={t.featured ? 'gold' : dark ? 'outline-light' : 'outline-dark'} fullWidth>
                Liên hệ báo giá
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Band>
  );
}

/* ── Projects ── */
function ProjectsBlock(b: any) {
  const tone: Tone = b.tone || 'navy-ink';
  return (
    <Band tone={tone}>
      <div className="aim-grid-3">
        {(b.items || []).map((pr: any, i: number) => (
          <div
            key={i}
            style={{
              position: 'relative',
              aspectRatio: '4 / 3',
              overflow: 'hidden',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-on-dark)',
              boxShadow: '0 22px 48px rgba(4,10,41,0.45)',
              background: `linear-gradient(150deg, ${pr.from || '#081650'} 0%, ${pr.to || '#6e7c89'} 100%)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 22,
            }}
          >
            <span aria-hidden style={{ position: 'absolute', top: 18, right: 18, opacity: 0.5 }}>
              <OmegaMark size={30} title="" tone="ivory" />
            </span>
            <div style={{ position: 'relative' }}>
              {pr.industry && (
                <span
                  className="aim-eyebrow"
                  style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-accent)', color: 'var(--gold-bright)', fontSize: 10, marginBottom: 10 }}
                >
                  {pr.industry}
                </span>
              )}
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ivory)' }}>{pr.name}</div>
            </div>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* ── Image ── */
function ImageBlockR(b: any) {
  const tone: Tone = b.tone || 'ivory';
  const url = b.image?.url;
  return (
    <Band tone={tone}>
      {url && (
        <figure style={{ margin: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={b.image?.alt || ''} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', display: 'block' }} />
          {b.caption && (
            <figcaption style={{ marginTop: 12, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: isDark(tone) ? 'var(--text-on-dark-subtle)' : 'var(--steel)' }}>
              {b.caption}
            </figcaption>
          )}
        </figure>
      )}
    </Band>
  );
}

/* ── CTA ── */
function CTABlock(b: any) {
  const tone: Tone = b.tone || 'navy';
  const dark = isDark(tone);
  return (
    <Band tone={tone}>
      <div style={{ maxWidth: 720, marginInline: 'auto', textAlign: 'center' }}>
        {b.eyebrow && (
          <div className="aim-eyebrow" style={{ color: 'var(--gold-bright)' }}>
            {b.eyebrow}
          </div>
        )}
        <h2 className="aim-display" style={{ fontSize: 'var(--text-display)', color: dark ? 'var(--ivory)' : 'var(--navy)', margin: '16px 0 0' }}>
          {b.title}
        </h2>
        {b.body && <p style={{ marginTop: 18, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-on-light-muted)' }}>{b.body}</p>}
        {b.buttonLabel && (
          <div style={{ marginTop: 34, display: 'inline-flex' }}>
            <Button href={b.buttonHref || '/contact'} variant={b.variant || 'gold'} size="lg" withArrow>
              {b.buttonLabel}
            </Button>
          </div>
        )}
      </div>
    </Band>
  );
}

/* ── Khối generic bổ sung ── */

function PageHeroBlock(b: any) {
  return <KitPageHero eyebrow={b.eyebrow || ''} title={b.title} intro={b.intro} />;
}

function FAQBlock(b: any) {
  const tone: Tone = b.tone || 'ivory';
  const dark = isDark(tone);
  return (
    <Band tone={tone}>
      <SectionHead no={b.no} eyebrow={b.eyebrow || ''} title={b.title || ''} dark={dark} />
      <div style={{ marginTop: 'clamp(36px,5vw,52px)', maxWidth: 820, display: 'flex', flexDirection: 'column' }}>
        {(b.items || []).map((f: any, i: number) => (
          <details key={i} style={{ borderTop: `1px solid ${dark ? 'var(--rule-on-dark)' : 'var(--rule-on-light)'}`, padding: '20px 0' }}>
            <summary
              style={{
                cursor: 'pointer',
                listStyle: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h4)',
                color: dark ? 'var(--ivory)' : 'var(--navy)',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 16,
                alignItems: 'baseline',
              }}
            >
              {f.q}
              <span style={{ color: dark ? 'var(--gold-bright)' : 'var(--gold-deep)', flexShrink: 0 }}>
                <Icon name="arrow-right" size={18} />
              </span>
            </summary>
            <p style={{ margin: '14px 0 0', fontSize: 14.5, lineHeight: 1.75, color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-on-light-muted)', maxWidth: 680 }}>
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Band>
  );
}

function StepsBlock(b: any) {
  return <ProcessSection tone={b.tone || 'navy'} no={b.no} eyebrow={b.eyebrow} title={b.title} steps={b.items || []} />;
}

function TimelineBlock(b: any) {
  return <RoadmapSection tone={b.tone || 'ivory'} no={b.no} eyebrow={b.eyebrow} title={b.title} items={b.items || []} />;
}

function VideoBlockR(b: any) {
  const tone: Tone = b.tone || 'navy';
  const url: string = b.url || b.media?.url || '';
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  const embed = yt ? `https://www.youtube.com/embed/${yt[1]}` : vimeo ? `https://player.vimeo.com/video/${vimeo[1]}` : null;
  return (
    <Band tone={tone}>
      <figure style={{ margin: 0, maxWidth: 960, marginInline: 'auto' }}>
        <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 24px 50px rgba(4,10,41,0.4)' }}>
          {embed ? (
            <iframe
              src={embed}
              title={b.caption || 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            />
          ) : url ? (
            <video src={url} controls playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : null}
        </div>
        {b.caption && (
          <figcaption style={{ marginTop: 12, textAlign: 'center', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: isDark(tone) ? 'var(--text-on-dark-subtle)' : 'var(--steel)' }}>
            {b.caption}
          </figcaption>
        )}
      </figure>
    </Band>
  );
}

function ContactFormBlockR(b: any) {
  return (
    <Band tone="navy">
      <ContactSection heading={b.heading} />
    </Band>
  );
}

function PostsListBlockR(b: any) {
  const tone: Tone = b.tone || 'ivory';
  return (
    <Band tone={tone}>
      <SectionHead no={b.no} eyebrow={b.eyebrow || ''} title={b.title || ''} dark={isDark(tone)} />
      <div style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
        <PostsListBlock {...b} />
      </div>
    </Band>
  );
}

/* ── Khối premium trang chủ ── */

function HomeHeroBlock(b: any) {
  return (
    <HeroShowcase
      eyebrow={b.eyebrow || undefined}
      title={b.title || undefined}
      subtitle={b.subtitle || undefined}
      primaryLabel={b.primaryLabel || undefined}
      primaryHref={b.primaryHref || undefined}
      secondaryLabel={b.secondaryLabel || undefined}
      secondaryHref={b.secondaryHref || undefined}
      promise={b.promise || undefined}
    />
  );
}

const MAP: Record<string, (b: any) => ReactNode> = {
  hero: HeroBlock,
  pageHero: PageHeroBlock,
  heading: HeadingBlock,
  richText: RichTextBlockR,
  cards: CardsBlock,
  pricing: PricingBlock,
  projects: ProjectsBlock,
  image: ImageBlockR,
  faq: FAQBlock,
  steps: StepsBlock,
  timeline: TimelineBlock,
  video: VideoBlockR,
  contactForm: ContactFormBlockR,
  postsList: PostsListBlockR,
  cta: CTABlock,
  // trang chủ
  homeHero: HomeHeroBlock,
  usp: (b) => <UspSection no={b.no} eyebrow={b.eyebrow} title={b.title} pillars={b.pillars || []} />,
  whyAim: (b) => <WhySection no={b.no} eyebrow={b.eyebrow} title={b.title} items={b.items || []} />,
  servicesPreview: (b) => <ServicesSection no={b.no} eyebrow={b.eyebrow} title={b.title} cards={b.cards || []} ctaLabel={b.ctaLabel} ctaHref={b.ctaHref} />,
  bookFlip: (b) => <BookFlip eyebrow={b.eyebrow || undefined} title={b.title || undefined} />,
  projectsGrid: (b) => <ProjectsGridBlock {...b} />,
  finalCta: (b) => <FinalCtaSection eyebrow={b.eyebrow || undefined} title={b.title || undefined} body={b.body || undefined} buttonLabel={b.buttonLabel || undefined} buttonHref={b.buttonHref || undefined} />,
};

export function RenderBlocks({ blocks }: { blocks?: any[]; style?: CSSProperties }) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((b, i) => {
        const R = MAP[b.blockType];
        return R ? <div key={b.id || i}>{R(b)}</div> : null;
      })}
    </>
  );
}
