'use client';

/* AIM Agency — interactive brand book (App). Port y chang từ design bundle
   ui_kits/website/index.html: TopBar + SideRail + main(Cover + 7 chương) + BackCover.
   IntersectionObserver theo dõi chương đang xem để highlight SideRail. */

import { useEffect, useState } from 'react';
import { TopBar, SideRail, Cover, BackCover } from './primitives';
import { ChStrategy, ChLogo, ChSystem, ChStationery, ChCollateral, ChPricing, ChStart } from './chapters';
import { CHAPTERS } from './data';

export default function BrandBook() {
  const [active, setActive] = useState('cover');

  useEffect(() => {
    const ids = CHAPTERS.map((c) => c.id);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const onNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 50, behavior: 'smooth' });
  };

  return (
    <>
      <TopBar onNav={onNav} />
      <SideRail active={active} onNav={onNav} />
      <main>
        <Cover onNav={onNav} />
        <ChStrategy />
        <ChLogo />
        <ChSystem />
        <ChStationery />
        <ChCollateral />
        <ChPricing onNav={onNav} />
        <ChStart />
      </main>
      <BackCover />
    </>
  );
}
