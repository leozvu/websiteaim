import Link from 'next/link';
import { SITE } from '@/lib/nav';

type OmegaMarkProps = {
  className?: string;
  /** Nhãn cho screen reader. Để rỗng/undefined nếu mark chỉ mang tính trang trí. */
  title?: string;
};

/**
 * Logo Omega (Ω) — trace theo logo CHÍNH THỨC của Aim:
 * vòng Omega dày hở đáy với hai chân đế ngang, bên trong là vòng tròn
 * đồng tâm + tâm điểm đặc. Dùng currentColor để thích ứng nền navy/beige.
 * Hình học này được dùng chung cho bản 3D (OmegaEmblem) — cùng tỉ lệ.
 */
export function OmegaMark({ className, title = 'Aim Agency' }: OmegaMarkProps) {
  const decorative = !title;
  return (
    <svg
      viewBox="0 0 100 100"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Thân Omega: vành dày hở đáy (±30°) + hai chân đế ngang */}
      <path
        d="M65.5 71.85 A31 31 0 1 0 34.5 71.85 L21.5 71.85 L21.5 77.5 L38 77.5 L40.4 61.6 A19.2 19.2 0 1 1 59.6 61.6 L62 77.5 L78.5 77.5 L78.5 71.85 Z"
        fill="currentColor"
      />
      {/* Vòng trong đồng tâm */}
      <circle cx="50" cy="45" r="10.4" stroke="currentColor" strokeWidth="4" />
      {/* Tâm điểm */}
      <circle cx="50" cy="45" r="4.3" fill="currentColor" />
    </svg>
  );
}

type LogoProps = {
  /** 'full' = mark + wordmark, 'mark' = chỉ ký tự Omega, 'stacked' = mark trên, chữ dưới + tagline */
  variant?: 'full' | 'mark' | 'stacked';
  className?: string;
  markClassName?: string;
  withTagline?: boolean;
  href?: string | null;
};

/**
 * Logo lockup hoàn chỉnh: Omega mark + wordmark serif "AIM AGENCY".
 * Mặc định bọc trong Link về trang chủ.
 */
export function Logo({
  variant = 'full',
  className = '',
  markClassName = '',
  withTagline = false,
  href = '/',
}: LogoProps) {
  const content =
    variant === 'mark' ? (
      <OmegaMark className={markClassName || 'h-9 w-9'} />
    ) : variant === 'stacked' ? (
      <span className="flex flex-col items-center gap-2 text-center">
        <OmegaMark className={markClassName || 'h-12 w-12'} />
        <span className="flex flex-col items-center">
          <span className="font-display text-xl font-semibold tracking-wide">AIM AGENCY</span>
          {withTagline && (
            <span className="eyebrow mt-1 tracking-brand opacity-80">Do Right Things</span>
          )}
        </span>
      </span>
    ) : (
      <span className="flex items-center gap-2.5">
        <OmegaMark className={markClassName || 'h-9 w-9'} />
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-wide">AIM AGENCY</span>
          {withTagline && (
            <span className="eyebrow mt-1 text-[0.6rem] tracking-brand opacity-80">
              Do Right Things
            </span>
          )}
        </span>
      </span>
    );

  if (href === null) {
    return <span className={className}>{content}</span>;
  }

  return (
    <Link
      href={href}
      aria-label={`${SITE.name} — ${SITE.tagline}`}
      className={`inline-flex items-center transition-opacity hover:opacity-80 ${className}`}
    >
      {content}
    </Link>
  );
}
