import type { CSSProperties, ReactNode } from 'react';

type Tone = 'navy' | 'beige';

type SectionProps = {
  children: ReactNode;
  /** 'navy' = bề mặt tối xếp tầng (spotlight); 'beige' = ivory light-relief. */
  tone?: Tone;
  id?: string;
  className?: string;
  /** Bỏ padding dọc mặc định (cho banner fullwidth tự quản padding). */
  flush?: boolean;
  as?: 'section' | 'div';
  ariaLabelledby?: string;
  /** Tâm spotlight (0–100%) — dịch để mỗi section có chiều sâu khác nhau. */
  glow?: { x: number; y: number };
  /** Đường nối glow mảnh ở mép trên (giữa các section tối). */
  seam?: boolean;
};

/**
 * Wrapper section của AIM Luxury Visual System.
 * - tone 'navy'  → .surface-dark (ink/midnight/royal + spotlight ấm + vignette + grain)
 * - tone 'beige' → .surface-ivory (ivory ấm có chiều sâu nhẹ)
 * Mọi nội dung nằm trên lớp nền/vignette (z-10).
 */
export function Section({
  children,
  tone = 'beige',
  id,
  className = '',
  flush = false,
  as: Tag = 'section',
  ariaLabelledby,
  glow,
  seam = false,
}: SectionProps) {
  const dark = tone === 'navy';
  const surface = dark ? 'surface-dark vignette' : 'surface-ivory paper-grain';
  const style = glow
    ? ({ ['--gx' as string]: `${glow.x}%`, ['--gy' as string]: `${glow.y}%` } as CSSProperties)
    : undefined;

  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledby}
      style={style}
      className={`relative overflow-hidden ${surface} ${seam ? 'glow-seam' : ''} ${
        flush ? '' : 'py-24 sm:py-28 lg:py-36'
      } ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
