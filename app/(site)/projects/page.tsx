import type { Metadata } from 'next';
import { Band, SectionHead, PageHero } from '@/components/site/kit';
import { Reveal, Tilt3D } from '@/components/brandbook/primitives';
import { OmegaMark, Button } from '@/components/brandbook/ds';
import { PROJECTS_HERO } from '@/lib/pages';
import { PROJECTS_NDA_NOTE } from '@/lib/content';
import { getProjects } from '@/lib/cms';

export const dynamic = 'force-dynamic'; // dự án mới từ CMS hiện ngay, không cần rebuild

export const metadata: Metadata = {
  title: 'Dự án',
  description: 'Một vài thương hiệu đã chọn làm đúng cùng Aim Agency, trên nhiều ngành nghề từ F&B đến công nghệ.',
};

export default async function ProjectsPage() {
  const { projects } = await getProjects();
  return (
    <>
      <PageHero eyebrow={PROJECTS_HERO.eyebrow} title={PROJECTS_HERO.title} intro={PROJECTS_HERO.intro} />

      <Band tone="navy">
        <SectionHead no="01" eyebrow="Dự án nổi bật" title="Thương hiệu đã tin Aim" dark />
        <div className="aim-grid-3" style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
          {projects.map((pr, i) => (
            <Reveal key={pr.name} delay={i * 0.05} depth>
              <Tilt3D
                max={9}
                lift={1.02}
                sheen
                style={{
                  aspectRatio: '4 / 3',
                  overflow: 'hidden',
                  border: '1px solid var(--border-on-dark)',
                  boxShadow: '0 22px 48px rgba(4,10,41,0.45)',
                  background: `linear-gradient(150deg, ${pr.from} 0%, ${pr.to} 100%)`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 22,
                }}
              >
                <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 75% 18%, rgba(248,242,235,0.14), transparent 55%)' }} />
                <span aria-hidden style={{ position: 'absolute', top: 18, right: 18, opacity: 0.5 }}>
                  <OmegaMark size={30} title="" tone="ivory" />
                </span>
                <div style={{ position: 'relative' }}>
                  <span
                    className="aim-eyebrow"
                    style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-accent)',
                      color: 'var(--gold-bright)',
                      fontSize: 10,
                      marginBottom: 10,
                    }}
                  >
                    {pr.industry}
                  </span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ivory)' }}>{pr.name}</div>
                </div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p style={{ marginTop: 26, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--text-on-dark-subtle)' }}>
            {PROJECTS_NDA_NOTE}
          </p>
        </Reveal>
      </Band>

      {/* CTA */}
      <Band tone="ivory">
        <div style={{ textAlign: 'center', maxWidth: 720, marginInline: 'auto' }}>
          <SectionHead eyebrow="Bắt đầu" title="Dự án tiếp theo có thể là của bạn" align="center" />
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
