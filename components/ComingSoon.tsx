import { OmegaMark } from './Logo';
import { Button } from './ui/Button';

type ComingSoonProps = {
  title: string;
  description?: string;
};

/**
 * Trang stub "Đang hoàn thiện" cho các trang chưa build (About/Services/...).
 * Nền navy + Omega, giữ nav không 404 trong phase Home.
 */
export function ComingSoon({ title, description }: ComingSoonProps) {
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
        <p className="eyebrow tracking-brand text-gold-bright">Đang hoàn thiện</p>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-beige/75">
          {description ??
            'Chúng tôi đang hoàn thiện nội dung cho trang này và sẽ ra mắt trong thời gian tới.'}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" variant="outline-light">
            Về trang chủ
          </Button>
          <Button href="/contact" variant="gold" withArrow>
            Bắt đầu dự án
          </Button>
        </div>
      </div>
    </main>
  );
}
