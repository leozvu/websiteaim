import type { Metadata } from 'next';
import { OmegaMark } from '@/components/Logo';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Trang không tồn tại',
  robots: { index: false, follow: false },
};

/**
 * 404 custom — nền navy + Omega.
 * Copy theo brand: "Trang không tồn tại. Nhưng mục tiêu của bạn thì có."
 */
export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy text-beige">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <OmegaMark
          className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 text-steel/15"
          title=""
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle, rgba(184,153,104,0.1), transparent 60%)',
          }}
        />
      </div>

      <div className="container-aim relative z-10 py-32 text-center">
        <p className="font-display text-7xl font-semibold text-gold sm:text-8xl">404</p>
        <h1 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
          Trang không tồn tại.
          <br />
          Nhưng mục tiêu của bạn thì có.
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-beige/75">
          Có thể đường dẫn đã thay đổi. Quay về trang chủ hoặc kể cho chúng tôi nghe điều bạn đang
          tìm.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" variant="gold">
            Về trang chủ
          </Button>
          <Button href="/contact" variant="outline-light" withArrow>
            Liên hệ với Aim
          </Button>
        </div>
      </div>
    </main>
  );
}
