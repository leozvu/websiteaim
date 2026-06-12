'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { IconClose } from './ui/Icons';
import { Button } from './ui/Button';
import { NAV_ITEMS, SITE } from '@/lib/nav';

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
};

/**
 * Drawer điều hướng cho mobile.
 * - Khóa cuộn body khi mở
 * - Đóng bằng Esc
 * - Bẫy focus trong drawer (keyboard accessible)
 */
export function MobileNav({ open, onClose, isActive }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      // visibility đợi transition 300ms khi đóng — drawer trượt ra xong mới ẩn;
      // khi ẩn, link bên trong hết focusable (tránh lỗi aria-hidden-focus).
      className={`transition-[visibility] duration-300 lg:hidden ${
        open ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-navy-deep/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Điều hướng"
        className={`fixed inset-y-0 right-0 z-50 flex w-[84%] max-w-sm flex-col bg-navy text-beige shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-beige/15 px-6 py-5">
          <Logo markClassName="h-8 w-8" />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Đóng menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-beige transition-colors hover:bg-beige/10"
          >
            <IconClose className="h-6 w-6" />
          </button>
        </div>

        <nav aria-label="Điều hướng chính (mobile)" className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`block rounded-md px-3 py-3 font-display text-2xl transition-colors ${
                    isActive(item.href)
                      ? 'text-gold-bright'
                      : 'text-beige hover:text-gold-bright'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-beige/15 px-6 py-6">
          <Button href="/contact" variant="gold" className="w-full" withArrow>
            Bắt đầu dự án
          </Button>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 block text-center text-sm text-beige/70 transition-colors hover:text-gold-bright"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </div>
  );
}
