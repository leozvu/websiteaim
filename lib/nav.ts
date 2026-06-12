export type NavItem = {
  label: string;
  href: string;
};

/** Điều hướng chính — dùng chung cho Header và Footer. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/about' },
  { label: 'Dịch vụ', href: '/services' },
  { label: 'Dự án', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Liên hệ', href: '/contact' },
];

export const SITE = {
  name: 'AIM AGENCY',
  legalName: 'Aim Agency',
  tagline: 'Do Right Things',
  domain: 'aimagency.vn',
  url: 'https://aimagency.vn',
  email: 'hello@aimagency.vn',
} as const;
