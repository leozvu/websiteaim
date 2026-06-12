'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Độ trễ (giây) để stagger các phần tử liền kề. */
  delay?: number;
  /** Khoảng cách trượt lên ban đầu (px). */
  y?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
};

/**
 * Bọc nội dung với hiệu ứng fade-in-up khi cuộn tới (once).
 * Tôn trọng prefers-reduced-motion: hiện thẳng, không transform.
 */
export function Reveal({ children, className, delay = 0, y = 24, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: [0.21, 0.5, 0.31, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
