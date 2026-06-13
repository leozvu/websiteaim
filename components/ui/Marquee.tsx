import type { ReactNode } from 'react';

/**
 * Marquee ngang vô tận — nội dung lặp 2 lần, dịch -50% là liền mạch.
 * Pause khi hover. Reduced-motion: CSS @media trong globals tắt animation → đứng yên.
 * Mask gradient hai mép cho mềm.
 */
export function Marquee({
  children,
  durationSec = 32,
  className = '',
}: {
  children: ReactNode;
  durationSec?: number;
  className?: string;
}) {
  return (
    <div
      className={`marquee-pause group relative overflow-hidden ${className}`}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div
        className="animate-marquee flex w-max"
        style={{ ['--marquee-duration' as string]: `${durationSec}s` }}
      >
        <div aria-hidden className="flex shrink-0">
          {children}
        </div>
        <div aria-hidden className="flex shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}
