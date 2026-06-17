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
  // Primary: nền KEM (ivory) chữ navy — accent sáng theo brand (KHÔNG gold)
  gold:
    'bg-ivory text-ink border border-ivory hover:bg-[#ECE1C8] ' +
    'shadow-[0_1px_0_rgba(255,255,255,0.4)_inset] focus-visible:outline-ivory',
  // Outline trên nền tối — hairline ivory, hover đổ kem mờ + viền sáng
  'outline-light':
    'border border-hairline-strong text-ivory hover:border-[rgba(247,238,219,0.5)] hover:bg-[rgba(247,238,219,0.08)]',
  // Outline trên nền ivory — viền royal, hover fill royal
  'outline-dark': 'border border-[rgba(18,26,68,0.35)] text-royal hover:bg-royal hover:text-ivory',
  // Filled tối trên nền sáng
  navy: 'bg-royal text-ivory hover:bg-midnight',
};

/**
 * Nút CTA dạng Link — AIM Luxury. Mặc định kim loại gold.
 * >=48px chiều cao cho chạm tốt; transition màu/sheen mượt, không bounce.
 */
export function Button({
  href,
  children,
  variant = 'gold',
  withArrow = false,
  className = '',
}: ButtonProps) {
  const isInternal = href.startsWith('/');
  const classes =
    `group inline-flex min-h-[3rem] items-center justify-center gap-2.5 rounded-[3px] px-8 py-3 ` +
    `font-body text-[0.78rem] font-semibold uppercase tracking-[0.16em] ` +
    `transition-[background-position,background-color,border-color,color,transform] duration-450 ease-brand ` +
    `${variantClass[variant]} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <IconArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
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
