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
  legalName: 'Công ty Dịch vụ Aim Agency',
  tagline: 'Do Right Things',
  domain: 'aimagency.vn',
  url: 'https://aimagency.vn',
  // Thông tin liên hệ thật theo brand book (trang phong bì)
  email: 'aimagency.hcm@gmail.com',
  phone: '(+84) 798 699 039',
  phoneHref: 'tel:+84798699039',
  address: '67 Huỳnh Thiện Lộc, Phường Tân Phú, TP. Hồ Chí Minh',
  taxId: '9999 99 9999',
} as const;

/** Mạng xã hội theo brand book: Facebook · Instagram · Zalo OA (không phải LinkedIn). */
export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com/aimagency.vn', icon: 'facebook' as const },
  { label: 'Instagram', href: 'https://instagram.com/aimagency.vn', icon: 'instagram' as const },
  { label: 'Zalo OA', href: 'https://zalo.me/aimagency', icon: 'zalo' as const },
];
