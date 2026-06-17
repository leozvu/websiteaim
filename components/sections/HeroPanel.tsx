import { OmegaMark } from '../Logo';

/**
 * Glass control panel cho hero — "hệ thống thương hiệu" dạng bảng điều khiển live.
 * Nội dung AIM THẬT (3 trụ) trình bày như module trạng thái + đường tín hiệu mảnh.
 * Presentational; Hero bọc nó trong lớp parallax.
 */
const MODULES = [
  { k: 'Định vị', v: 'rõ ràng' },
  { k: 'Thực thi', v: 'đúng hẹn' },
  { k: 'Đồng hành', v: 'minh bạch' },
];

export function HeroPanel() {
  return (
    <div className="glass-panel metal-edge w-full max-w-sm rounded-2xl p-6 sm:p-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <OmegaMark title="" className="h-5 w-5 text-ivory/80" />
          <span className="eyebrow text-[0.6rem] text-ivory/70">Hệ thống thương hiệu</span>
        </div>
        <span className="flex items-center gap-1.5">
          <span className="signal-live inline-block h-1.5 w-1.5 rounded-full bg-dove" />
          <span className="eyebrow text-[0.55rem] text-dove">Live</span>
        </span>
      </div>

      {/* Signal line */}
      <div className="mt-5 rounded-lg border border-hairline bg-ink/30 p-3">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-[0.55rem] text-ivory/50">Tín hiệu</span>
          <span className="font-body text-[0.6rem] tabular-nums text-ivory/40">06 · 2026</span>
        </div>
        <svg viewBox="0 0 280 44" className="mt-2 h-10 w-full" fill="none" aria-hidden>
          <path
            d="M0 32 L40 30 L60 18 L88 22 L120 8 L150 24 L184 14 L214 26 L246 12 L280 20"
            stroke="#9DA0A6"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M0 38 L60 36 L120 30 L184 33 L246 28 L280 31"
            stroke="#6E7C89"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.45"
          />
        </svg>
      </div>

      {/* Modules */}
      <ul className="mt-4 divide-y divide-hairline">
        {MODULES.map((m) => (
          <li key={m.k} className="flex items-center justify-between py-2.5">
            <span className="text-sm text-ivory/85">{m.k}</span>
            <span className="flex items-center gap-2">
              <span className="text-xs text-ivory/55">{m.v}</span>
              <span className="inline-block h-1 w-1 rounded-full bg-dove/80" />
            </span>
          </li>
        ))}
      </ul>

      {/* Footer micro-label */}
      <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3">
        <span className="eyebrow text-[0.55rem] text-ivory/40">Do Right Things</span>
        <span className="eyebrow text-[0.55rem] text-ivory/40">aimagency.vn</span>
      </div>
    </div>
  );
}
