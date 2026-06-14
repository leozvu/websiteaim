'use client';

import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

type TextRevealProps = {
  /** Nội dung chữ (string) — sẽ tách theo TỪ để stagger. */
  text: string;
  as?: Tag;
  className?: string;
  /** Trễ khởi đầu (giây). */
  delay?: number;
  id?: string;
};

const EASE = [0.55, 0.085, 0, 0.99] as const; // ease-brand (chữ ký motion)

/**
 * Mask reveal theo TỪ: mỗi từ trượt lên từ dưới một dải che, stagger 60ms.
 * Padding+margin âm để KHÔNG clip dấu tiếng Việt (ậ/ạ) và descender (g/y).
 * whileInView once. Reduced-motion → chữ thường. SR đọc nguyên câu (aria-label).
 */
export function TextReveal({ text, as = 'h2', className = '', delay = 0, id }: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) {
    const Tag = as;
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  const MotionTag = motion[as] as typeof motion.h2;

  // Không set aria-label — text các từ tự là accessible name (đọc 1 lần, đúng thứ tự).
  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span
            className="inline-block overflow-hidden"
            // padding cho dấu/descender thở; margin âm giữ layout khít
            style={{ padding: '0.18em 0.04em', margin: '-0.18em -0.04em' }}
          >
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: '112%' }, show: { y: '0%' } }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </MotionTag>
  );
}
