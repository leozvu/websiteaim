'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Bộ primitive cho ngôn ngữ "Editorial Atelier" — lấy thẳng từ brand book:
 * số chương serif gold lớn, hairline tự vẽ, heading serif lệch trái trên lưới.
 */

const EASE = [0.22, 0.6, 0.3, 1] as const;

/** Hairline 1px tự vẽ trái→phải khi cuộn tới. onDark = nền navy (vạch sáng). */
export function Hairline({
  className = '',
  onDark = false,
  delay = 0,
}: {
  className?: string;
  onDark?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const color = onDark ? 'bg-beige/20' : 'bg-navy/20';
  if (reduce) {
    return <span aria-hidden className={`block h-px w-full ${color} ${className}`} />;
  }
  return (
    <motion.span
      aria-hidden
      className={`block h-px w-full origin-left ${color} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    />
  );
}

/** Số chương serif gold cực lớn — neo từng phần như chương sách. */
export function SectionNumber({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      aria-hidden
      className={`block font-display text-[clamp(2.75rem,6vw,4.25rem)] font-semibold leading-none text-gold ${className}`}
    >
      {children}
    </span>
  );
}

/** Tiêu đề hé lộ: mask reveal — chữ trượt lên từ dưới một dải che, settle nhẹ. */
export function MaskReveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'span';
}) {
  const reduce = useReducedMotion();
  const Tag = as;
  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <MotionTag
        className={className}
        initial={{ y: '105%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        transition={{ duration: 0.85, ease: EASE, delay }}
      >
        {children}
      </MotionTag>
    </span>
  );
}

type SectionHeaderProps = {
  /** Số chương, ví dụ "01". */
  number: string;
  /** Nhãn marginalia (uppercase). */
  label: string;
  /** Tiêu đề serif. */
  title: ReactNode;
  /** Đoạn dẫn (tùy chọn). */
  intro?: ReactNode;
  /** Nền navy? đổi màu chữ. */
  onDark?: boolean;
  /** Căn giữa thay vì lệch trái (dùng hạn chế). */
  align?: 'start' | 'center';
  className?: string;
};

/**
 * Khối heading editorial: [số chương + nhãn] (cột trái, marginalia)
 * | [tiêu đề serif + dẫn + hairline] (cột phải). Asymmetric trên lưới 12.
 */
export function SectionHeader({
  number,
  label,
  title,
  intro,
  onDark = false,
  align = 'start',
  className = '',
}: SectionHeaderProps) {
  const labelColor = onDark ? 'text-gold-bright' : 'text-gold-deep';
  const titleColor = onDark ? 'text-beige' : 'text-navy';
  const introColor = onDark ? 'text-beige/70' : 'text-navy/70';

  if (align === 'center') {
    return (
      <div className={`mx-auto max-w-2xl text-center ${className}`}>
        <SectionNumber className="mx-auto">{number}</SectionNumber>
        <p className={`eyebrow mt-4 ${labelColor}`}>{label}</p>
        <MaskReveal
          as="h2"
          className={`mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight ${titleColor}`}
        >
          {title}
        </MaskReveal>
        {intro && <p className={`mt-5 text-base leading-relaxed ${introColor}`}>{intro}</p>}
      </div>
    );
  }

  return (
    <div className={`grid gap-x-8 gap-y-6 lg:grid-cols-12 ${className}`}>
      <div className="lg:col-span-3">
        <SectionNumber>{number}</SectionNumber>
        <p className={`eyebrow mt-4 ${labelColor}`}>{label}</p>
      </div>
      <div className="lg:col-span-8 lg:col-start-5">
        <MaskReveal
          as="h2"
          className={`font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight ${titleColor}`}
        >
          {title}
        </MaskReveal>
        {intro && <p className={`mt-5 max-w-2xl text-base leading-relaxed ${introColor}`}>{intro}</p>}
        <Hairline onDark={onDark} className="mt-8" delay={0.15} />
      </div>
    </div>
  );
}
