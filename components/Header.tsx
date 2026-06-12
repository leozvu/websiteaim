'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { IconMenu } from './ui/Icons';
import { Button } from './ui/Button';
import { NAV_ITEMS } from '@/lib/nav';

/**
 * Header sticky toàn site: logo Omega + nav desktop + hamburger mobile.
 * Nền trong suốt khi ở đầu trang, chuyển sang navy đặc khi cuộn.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Đóng menu khi đổi route
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-beige transition-colors duration-300 ${
        scrolled ? 'bg-navy/95 shadow-lg shadow-navy/20 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="container-aim flex h-16 items-center justify-between lg:h-20">
        <Logo markClassName="h-8 w-8 lg:h-9 lg:w-9" />

        {/* Nav desktop */}
        <nav aria-label="Điều hướng chính" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`relative font-body text-sm tracking-wide transition-colors hover:text-gold-bright ${
                    isActive(item.href) ? 'text-gold-bright' : 'text-beige/90'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="gold" className="px-5 py-2.5 text-xs">
            Bắt đầu dự án
          </Button>
        </div>

        {/* Hamburger mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Mở menu điều hướng"
          aria-expanded={menuOpen}
          aria-haspopup="dialog"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-beige transition-colors hover:bg-beige/10 lg:hidden"
        >
          <IconMenu className="h-6 w-6" />
        </button>
      </div>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} isActive={isActive} />
    </header>
  );
}
