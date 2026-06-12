'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { IconPlus } from '../ui/Icons';
import { FAQ_ITEMS } from '@/lib/pricing';

/**
 * FAQ accordion — expand/collapse mượt (height auto qua Framer Motion),
 * accessible đầy đủ: aria-expanded/aria-controls, mũi tên lên/xuống + Home/End
 * di chuyển giữa các câu hỏi, tôn trọng prefers-reduced-motion.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = FAQ_ITEMS.length - 1;
    let next: number | null = null;
    if (event.key === 'ArrowDown') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowUp') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    if (next !== null) {
      event.preventDefault();
      buttonRefs.current[next]?.focus();
    }
  };

  return (
    <div className="divide-y divide-navy/10 border-y border-navy/10">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <h3>
              <button
                ref={(el) => {
                  buttonRefs.current[i] = el;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="flex min-h-[3rem] w-full cursor-pointer items-center justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-navy sm:py-6"
              >
                <span
                  className={`font-display text-lg font-semibold leading-snug transition-colors duration-200 sm:text-xl ${
                    isOpen ? 'text-navy' : 'text-navy/80'
                  }`}
                >
                  {item.question}
                </span>
                <IconPlus
                  aria-hidden
                  className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ease-out ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.21, 0.5, 0.31, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 text-base leading-relaxed text-navy/75">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
