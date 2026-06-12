import Link from 'next/link';

type OmegaMarkProps = {
  className?: string;
  /** Nhãn cho screen reader. Để rỗng/undefined nếu mark chỉ mang tính trang trí. */
  title?: string;
};

/**
 * Logo Omega (Ω) cách điệu — placeholder SVG.
 * Cấu trúc: vòng tròn đồng tâm + tâm điểm + đuôi cong xuống.
 * Dùng currentColor để tự thích ứng nền navy/beige.
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
      {/* Vòng ngoài */}
      <circle cx="50" cy="44" r="34" stroke="currentColor" strokeWidth="3.5" />
      {/* Vòng trong đồng tâm */}
      <circle cx="50" cy="44" r="20" stroke="currentColor" strokeWidth="2.5" opacity="0.8" />
      {/* Tâm điểm */}
      <circle cx="50" cy="44" r="5.5" fill="currentColor" />
      {/* Hai chân Omega — đuôi cong xuống hai bên */}
      <path
        d="M30 70 C 22 78, 18 84, 17 90 L 33 90 C 33 84, 33 79, 36 74"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70 70 C 78 78, 82 84, 83 90 L 67 90 C 67 84, 67 79, 64 74"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
  // Khi có wordmark, mark chỉ là trang trí — text cung cấp accessible name,
  // tránh lệch giữa visible label và aria name (a11y: label-content-name-mismatch).
  const content =
    variant === 'mark' ? (
      <OmegaMark className={markClassName || 'h-9 w-9'} />
    ) : variant === 'stacked' ? (
      <span className="flex flex-col items-center gap-2 text-center">
        <OmegaMark title="" className={markClassName || 'h-12 w-12'} />
        <span className="flex flex-col items-center">
          <span className="font-display text-xl font-semibold tracking-wide">AIM AGENCY</span>
          {withTagline && (
            <span className="eyebrow mt-1 tracking-brand opacity-80">Do Right Things</span>
          )}
        </span>
      </span>
    ) : (
      <span className="flex items-center gap-2.5">
        <OmegaMark title="" className={markClassName || 'h-9 w-9'} />
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
      // variant 'mark' không có text — OmegaMark (role=img) cung cấp accessible name.
      className={`inline-flex items-center transition-opacity hover:opacity-80 ${className}`}
    >
      {content}
    </Link>
  );
}
