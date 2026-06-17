import type { Metadata } from 'next';
import { Band, SectionHead, PageHero } from '@/components/site/kit';
import { Reveal } from '@/components/brandbook/primitives';
import { Card, Button } from '@/components/brandbook/ds';
import { BLOG_HERO, POSTS } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Góc nhìn thực chiến về thương hiệu, marketing và xây dựng doanh nghiệp tại Việt Nam — cho Startups & SME.',
};

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow={BLOG_HERO.eyebrow} title={BLOG_HERO.title} intro={BLOG_HERO.intro} />

      <Band tone="ivory">
        <SectionHead no="01" eyebrow="Chủ đề" title="Những bài viết đang trên đường" />
        <div className="aim-grid-3" style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
          {POSTS.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.05} depth style={{ height: '100%' }}>
              <Card tone="beige" interactive padding="28px" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <span className="aim-eyebrow" style={{ color: 'var(--gold-deep)' }}>
                    {post.category}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--steel)',
                      border: '1px solid var(--border-steel)',
                      borderRadius: 'var(--radius-full)',
                      padding: '3px 9px',
                    }}
                  >
                    {post.status}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h4)', lineHeight: 1.3, color: 'var(--navy)', margin: '16px 0 0' }}>
                  {post.title}
                </h3>
                <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, color: 'var(--text-on-light-muted)', flex: 1 }}>{post.excerpt}</p>
                <hr className="aim-rule" style={{ marginTop: 20 }} />
              </Card>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* CTA */}
      <Band tone="navy">
        <div style={{ textAlign: 'center', maxWidth: 720, marginInline: 'auto' }}>
          <SectionHead eyebrow="Trong lúc chờ" title="Có câu hỏi về thương hiệu? Hỏi thẳng Aim" dark align="center" />
          <Reveal delay={0.1} style={{ marginTop: 28, display: 'inline-flex' }}>
            <Button href="/contact" variant="gold" size="lg" withArrow>
              Bắt đầu trò chuyện
            </Button>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
