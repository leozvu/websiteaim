import type { ReactNode } from 'react';

type Tone = 'navy' | 'beige';

type SectionProps = {
  children: ReactNode;
  /** Nền section — navy hoặc beige (luân phiên, không trắng tinh). */
  tone?: Tone;
  id?: string;
  className?: string;
  /** Bỏ padding dọc mặc định (cho banner fullwidth tự quản padding). */
  flush?: boolean;
  as?: 'section' | 'div';
  ariaLabelledby?: string;
};

const toneClass: Record<Tone, string> = {
  navy: 'bg-navy text-beige',
  // paper-grain: chất liệu giấy rất nhẹ trên nền cream — editorial, không phẳng số
  beige: 'bg-beige text-navy paper-grain',
};

/**
 * Wrapper section: nền navy/beige luân phiên + nhịp dọc editorial rộng.
 * Nền beige có lớp paper-grain mảnh; mọi nội dung nằm trên lớp grain (z-10).
 */
export function Section({
  children,
  tone = 'beige',
  id,
  className = '',
  flush = false,
  as: Tag = 'section',
  ariaLabelledby,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`relative ${toneClass[tone]} ${flush ? '' : 'py-24 sm:py-28 lg:py-36'} ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
