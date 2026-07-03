import type { Metadata } from 'next';
import { OmegaMark, Button } from '@/components/brandbook/ds';

export const metadata: Metadata = {
  title: 'Trang không tồn tại',
  robots: { index: false, follow: false },
};

/* 404 — nền navy + Omega, phong cách brand book. */
export default function NotFound() {
  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--navy)',
        color: 'var(--ivory)',
      }}
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
          <OmegaMark size={420} title="" tone="ivory" style={{ opacity: 0.06 }} />
        </div>
        <span style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 42%, rgba(197,173,138,0.1), transparent 60%)' }} />
      </div>

      <div className="aim-container" style={{ position: 'relative', textAlign: 'center', paddingBlock: 128 }}>
        <div className="aim-numeral" style={{ fontSize: 'clamp(5rem,14vw,11rem)' }}>
          404
        </div>
        <h1 className="aim-display" style={{ fontSize: 'var(--text-h2)', margin: '12px auto 0', maxWidth: 620, color: 'var(--ivory)' }}>
          Trang không tồn tại. Nhưng mục tiêu của bạn thì có.
        </h1>
        <p style={{ margin: '18px auto 0', maxWidth: 460, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--text-on-dark-muted)' }}>
          Có thể đường dẫn đã thay đổi. Quay về trang chủ hoặc kể cho chúng tôi nghe điều bạn đang tìm.
        </p>
        <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
          <Button href="/" variant="gold" size="lg">
            Về trang chủ
          </Button>
          <Button href="/contact" variant="outline-light" size="lg" withArrow>
            Liên hệ với Aim
          </Button>
        </div>
      </div>
    </main>
  );
}
