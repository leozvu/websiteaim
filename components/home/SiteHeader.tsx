'use client';

/* Header toàn site — phong cách brand book: navy, logo Omega thật + nav + CTA champagne.
   Trong suốt khi ở đầu trang (đè lên hero navy), đặc navy khi cuộn. */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo, Icon, Button } from '@/components/brandbook/ds';
import { NAV_ITEMS } from '@/lib/nav';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const onHome = pathname === '/';
  const solid = scrolled || open || !onHome;

  return (
    <header
      style={{
        position: 'fixed',
        insetInline: 0,
        top: 0,
        zIndex: 50,
        color: 'var(--ivory)',
        transition: 'background-color var(--dur-base), border-color var(--dur-base)',
        background: solid ? 'rgba(8,22,80,0.96)' : 'transparent',
        backdropFilter: solid ? 'blur(8px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border-on-dark)' : 'transparent'}`,
      }}
    >
      <div className="aim-container" style={{ display: 'flex', height: 68, alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" aria-label="AIM AGENCY — Trang chủ" style={{ display: 'inline-flex', color: 'inherit' }}>
          <Logo variant="full" tone="ivory" markSize={40} />
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Điều hướng chính" className="aim-nav-desktop">
          <ul style={{ display: 'flex', alignItems: 'center', gap: 30, listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-body)',
                    fontSize: 13.5,
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    color: isActive(item.href) ? 'var(--gold-bright)' : 'rgba(248,242,235,0.82)',
                    transition: 'color var(--dur-fast)',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="aim-nav-desktop">
          <Button href="/contact" variant="gold" size="sm">
            Bắt đầu dự án
          </Button>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Mục lục"
          aria-expanded={open}
          className="aim-nav-mobile-trigger"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 9,
            height: 44,
            padding: '0 6px',
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          Menu <Icon name={open ? 'close' : 'menu'} size={20} />
        </button>
      </div>

      {open && (
        <div style={{ background: 'var(--navy-ink)', borderTop: '1px solid var(--border-on-dark)' }}>
          <ul className="aim-container" style={{ listStyle: 'none', margin: 0, padding: '14px 0 24px', display: 'grid', gap: 4 }}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    display: 'block',
                    padding: '12px 4px',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    color: isActive(item.href) ? 'var(--gold-bright)' : 'var(--ivory)',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li style={{ marginTop: 10 }}>
              <Button href="/contact" variant="gold" fullWidth>
                Bắt đầu dự án
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
