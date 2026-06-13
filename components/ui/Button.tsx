import Link from 'next/link';
import type { ReactNode } from 'react';
import { IconArrowRight } from './Icons';

type Variant = 'gold' | 'outline-light' | 'outline-dark' | 'navy';

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
};

const variantClass: Record<Variant, string> = {
  // Gold filled — text navy để đạt contrast AA
  gold: 'bg-gold text-navy hover:bg-gold-bright focus-visible:outline-navy',
  // Outline trên nền tối (navy) — viền/chữ beige
  'outline-light': 'border border-beige/60 text-beige hover:bg-beige hover:text-navy',
  // Outline trên nền sáng (beige) — viền/chữ navy
  'outline-dark': 'border border-navy/40 text-navy hover:bg-navy hover:text-beige',
  // Navy filled trên nền sáng
  navy: 'bg-navy text-beige hover:bg-navy-deep',
};

/**
 * Nút CTA dạng Link. Mặc định gold filled.
 * Đủ lớn để chạm tốt trên mobile (>=44px chiều cao).
 */
export function Button({
  href,
  children,
  variant = 'gold',
  withArrow = false,
  className = '',
}: ButtonProps) {
  const isInternal = href.startsWith('/');
  const classes = `group inline-flex min-h-[3rem] items-center justify-center gap-2.5 rounded-[3px] px-8 py-3 font-body text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${variantClass[variant]} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </>
  );

  if (isInternal) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {inner}
    </a>
  );
}
