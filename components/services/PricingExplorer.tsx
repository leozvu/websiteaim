'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import { IconCheck, IconPercent, IconArrowRight } from '../ui/Icons';
import {
  TIERS,
  SERVICE_GROUPS,
  DEFAULT_TIER,
  isTierId,
  formatPrice,
  type TierId,
  type PackageGroup,
  type ItemizedGroup,
} from '@/lib/pricing';

/**
 * Bảng giá tương tác — selector 5 phân khúc + 4 nhóm dịch vụ.
 * Lựa chọn persist trong URL (?tier=) để share link được;
 * đổi tier dùng history.replaceState — không reload, không scroll.
 */

/** Crossfade ngắn khi đổi giá — chỉ opacity + 6px, 180ms, tôn trọng reduced-motion. */
function PriceSwap({
  tier,
  children,
  className,
}: {
  tier: TierId;
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <span className={className}>{children}</span>;
  }
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={tier}
        className={className}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}

/** Giá hiển thị: số → tabular nums; "Liên hệ" → link tới /contact. */
function PriceValue({ price, tier, large }: { price: number | null; tier: TierId; large?: boolean }) {
  if (price === null) {
    return (
      <PriceSwap tier={tier}>
        <Link
          href="/contact"
          className={
            large
              ? 'font-display text-3xl font-semibold text-navy underline decoration-gold/60 decoration-1 underline-offset-8 transition-colors hover:decoration-gold sm:text-4xl'
              : 'text-sm font-medium text-navy/70 underline decoration-gold/50 decoration-1 underline-offset-4 transition-colors hover:text-navy hover:decoration-gold'
          }
        >
          Liên hệ
        </Link>
      </PriceSwap>
    );
  }
  if (large) {
    // Tách "đ" khỏi con số: số serif lớn, đ nhỏ và dịu — nhịp typographic tinh hơn.
    return (
      <PriceSwap
        tier={tier}
        className="font-display text-3xl font-semibold tabular-nums tracking-tight text-navy sm:text-4xl"
      >
        {formatPrice(price).slice(0, -1)}
        <span className="ml-0.5 align-top text-[0.55em] font-medium text-navy/70">đ</span>
      </PriceSwap>
    );
  }
  return (
    <PriceSwap tier={tier} className="text-sm font-semibold tabular-nums text-navy">
      {formatPrice(price)}
    </PriceSwap>
  );
}

/** Khung card chung: lift + gold underline trên title khi hover. */
function GroupCard({
  number,
  title,
  intro,
  children,
}: {
  number: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-navy/10 bg-beige-warm p-7 shadow-[0_2px_8px_-4px_rgba(27,42,74,0.12)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_28px_56px_-28px_rgba(27,42,74,0.35)] sm:p-9">
      <p className="font-display text-4xl font-semibold text-gold" aria-hidden>
        {number}
      </p>
      <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-navy sm:text-[1.75rem]">
        <span className="relative inline-block pb-1">
          {title}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100"
          />
        </span>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-navy/70">{intro}</p>
      {children}
    </article>
  );
}

function PackageCard({ group, tier }: { group: PackageGroup; tier: TierId }) {
  return (
    <GroupCard number={group.number} title={group.title} intro={group.intro}>
      <ul className="mt-6 space-y-3 border-t border-navy/10 pt-6">
        {group.includes.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-navy/85">
            <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <p className="eyebrow text-[0.65rem] text-navy/70">Trọn gói</p>
        <p className="mt-2 min-h-[2.75rem]">
          <PriceValue price={group.price[tier]} tier={tier} large />
        </p>
      </div>
    </GroupCard>
  );
}

function ItemizedCard({ group, tier }: { group: ItemizedGroup; tier: TierId }) {
  return (
    <GroupCard number={group.number} title={group.title} intro={group.intro}>
      <ul className="mt-6 border-t border-navy/10">
        {group.items.map((item) => (
          <li key={item.name} className="flex items-baseline gap-3 py-3.5">
            <span className="shrink-0 text-sm leading-relaxed text-navy/85">{item.name}</span>
            {/* Dotted leader — dẫn mắt từ tên đến giá (kiểu mục lục/price list cổ điển) */}
            <span
              aria-hidden
              className="min-w-6 flex-1 self-center border-b border-dotted border-navy/25"
            />
            <span className="shrink-0 text-right">
              <PriceValue price={item.price[tier]} tier={tier} />
            </span>
          </li>
        ))}
      </ul>
      {group.note && (
        <div className="mt-6 flex items-start gap-3 rounded-md border border-gold/40 bg-gold/10 p-4">
          <IconPercent className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
          <p className="text-sm leading-relaxed text-navy">
            <strong className="font-semibold">{group.note.strong}</strong>{' '}
            <span className="text-navy/70">{group.note.detail}</span>
          </p>
        </div>
      )}
      <div className="mt-auto" />
    </GroupCard>
  );
}

export function PricingExplorer() {
  // SSR luôn render tier mặc định để toàn bộ ma trận giá nằm trong HTML tĩnh (SEO).
  // ?tier= trong URL được áp sau khi hydrate — link share vẫn mở đúng phân khúc.
  const [tier, setTier] = useState<TierId>(DEFAULT_TIER);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tablistRef = useRef<HTMLDivElement>(null);
  // Fade hint mép phải khi dải tab còn cuộn được (mobile) — ẩn khi đã ở cuối.
  const [moreRight, setMoreRight] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('tier');
    if (isTierId(param) && param !== DEFAULT_TIER) setTier(param);
  }, []);

  useEffect(() => {
    const el = tablistRef.current;
    if (!el) return;
    const update = () =>
      setMoreRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 8);
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Persist lựa chọn vào URL để share được — replaceState, không reload/scroll.
  const selectTier = useCallback((next: TierId) => {
    setTier(next);
    const url = new URL(window.location.href);
    url.searchParams.set('tier', next);
    window.history.replaceState(window.history.state, '', url);
  }, []);

  // Đồng bộ khi người dùng back/forward.
  useEffect(() => {
    const onPop = () => {
      const param = new URLSearchParams(window.location.search).get('tier');
      setTier(isTierId(param) ? param : DEFAULT_TIER);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Keyboard nav chuẩn tabs: mũi tên trái/phải + Home/End.
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = TIERS.length - 1;
    let next: number | null = null;
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    if (next !== null) {
      event.preventDefault();
      selectTier(TIERS[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  const activeTier = TIERS.find((t) => t.id === tier) ?? TIERS[1];

  return (
    <div>
      {/* Selector phân khúc — sticky dưới header khi cuộn bảng giá */}
      <div className="sticky top-16 z-30 -mx-6 bg-beige/90 px-6 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:top-20 lg:-mx-10 lg:px-10">
        <div className="relative">
          {/* Fade hint: còn tab phía phải chưa thấy (mobile) */}
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-beige to-transparent transition-opacity duration-200 sm:hidden ${
              moreRight ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Chọn phân khúc doanh nghiệp"
            className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto px-1 sm:justify-center"
          >
          {TIERS.map((t, i) => {
            const active = t.id === tier;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tier-tab-${t.id}`}
                aria-selected={active}
                aria-controls="pricing-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => selectTier(t.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative min-h-[2.75rem] shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 sm:px-5 ${
                  active ? 'text-beige' : 'text-navy/70 hover:text-navy'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="tier-indicator"
                    aria-hidden
                    transition={
                      reduce ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 40 }
                    }
                    className="absolute inset-0 rounded-full bg-navy"
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            );
          })}
        </div>
        </div>
      </div>

      {/* Mô tả phân khúc đang chọn — min-h giữ chỗ 2 dòng để cards không nhảy khi đổi tier */}
      <div className="mt-6 min-h-[2.75rem] text-center" aria-live="polite">
        <PriceSwap tier={tier} className="mx-auto block max-w-xl text-sm leading-relaxed text-navy/70">
          {activeTier.description}
        </PriceSwap>
      </div>

      {/* 4 nhóm dịch vụ */}
      <div
        id="pricing-panel"
        role="tabpanel"
        aria-labelledby={`tier-tab-${tier}`}
        className="mt-12 grid gap-6 lg:grid-cols-2"
      >
        {SERVICE_GROUPS.map((group, i) => (
          <Reveal key={group.number} delay={Math.min(i * 0.08, 0.24)} className="h-full">
            {group.kind === 'package' ? (
              <PackageCard group={group} tier={tier} />
            ) : (
              <ItemizedCard group={group} tier={tier} />
            )}
          </Reveal>
        ))}
      </div>

      {/* CTA dưới bảng giá */}
      <Reveal className="mt-12 text-center">
        <p className="text-sm leading-relaxed text-navy/70">
          Chưa chắc mình thuộc phân khúc nào, hoặc cần phạm vi khác?
        </p>
        <Link
          href="/contact"
          className="group mt-3 inline-flex min-h-[2.75rem] items-center gap-2 text-sm font-semibold text-navy underline decoration-gold/60 decoration-1 underline-offset-4 transition-colors hover:decoration-gold"
        >
          Trao đổi trực tiếp với Aim
          <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </div>
  );
}
