import type { SVGProps } from 'react';

/**
 * Bộ icon line tối giản, stroke = currentColor.
 * Style điềm tĩnh, đồng nhất nét — không trang trí thừa.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
});

/* ---- USP pillars ---- */

export function IconAim(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPrecision(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 12.5 9 18 20.5 6" />
      <path d="M3.5 7.5 7 11" opacity="0.5" />
    </svg>
  );
}

export function IconHandshake(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 12.5 9.5 15a1.6 1.6 0 0 0 2.3 0l.7-.7.8.8a1.5 1.5 0 0 0 2.1-2.1" />
      <path d="M3 8.5l3-1.5 4 2.5 2-1 4 0 5 2" />
      <path d="M21 8.5l-3-1.5-3 2.5" />
      <path d="M3 8.5v6l2 1" />
      <path d="M21 8.5v6l-2 1" />
    </svg>
  );
}

/* ---- Service cards ---- */

export function IconStrategy(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" opacity="0.6" />
    </svg>
  );
}

export function IconLogo(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="11" r="7" />
      <circle cx="12" cy="11" r="3" />
      <path d="M9.5 17.5 8 22M14.5 17.5 16 22" />
    </svg>
  );
}

export function IconOffice(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </svg>
  );
}

export function IconPublication(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5z" />
      <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 0 1.5-1.5z" />
    </svg>
  );
}

/* ---- UI / utility ---- */

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/* ---- Social (footer) ---- */

export function IconFacebook(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 8.5h2.2V5.6c-.4-.05-1.3-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.3v7h2.9v-7h2.3l.5-3h-2.8V9.6c0-.8.2-1.1 1.1-1.1z" />
    </svg>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="16.4" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconLinkedin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 17v-7" />
    </svg>
  );
}

/* ---- Maps cho lookup theo tên ---- */

export const USP_ICONS = {
  aim: IconAim,
  precision: IconPrecision,
  handshake: IconHandshake,
} as const;

export const SERVICE_ICONS = {
  strategy: IconStrategy,
  logo: IconLogo,
  office: IconOffice,
  publication: IconPublication,
} as const;
