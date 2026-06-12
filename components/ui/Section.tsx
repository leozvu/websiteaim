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
  beige: 'bg-beige text-navy',
};

/**
 * Wrapper section: set nền navy/beige + padding dọc nhất quán.
 * Đảm bảo nền tối/sáng luân phiên, không bao giờ trắng tinh.
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
      className={`${toneClass[tone]} ${flush ? '' : 'py-20 sm:py-24 lg:py-28'} ${className}`}
    >
      {children}
    </Tag>
  );
}
