/* Seed các TRANG KHỐI từ nội dung code sẵn (lib/content + lib/pages) — chạy trong
   db-init (Vercel build) và dev-seed (local). Idempotent theo slug: trang đã tồn
   tại thì bỏ qua (không ghi đè chỉnh sửa của team). */

import type { Payload } from 'payload';
import { HERO, BRAND_PROMISE, USP_PILLARS, PAIN_SOLUTIONS, SERVICE_CARDS, SERVICES_CTA, PROCESS_STEPS, ROADMAP, PROJECTS_NDA_NOTE, FINAL_CTA } from '../lib/content';
import { ABOUT, SERVICES_HERO, SERVICES_DETAIL, TIERS, FAQS, PROJECTS_HERO, CONTACT_HERO, BLOG_HERO } from '../lib/pages';

/* richText lexical tối giản từ mảng đoạn văn */
const lex = (paras: string[]) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paras.map((t) => ({
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      textFormat: 0,
      children: [{ type: 'text', text: t, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
    })),
  },
});

const PAGES: { slug: string; title: string; metaTitle?: string; metaDescription?: string; layout: any[] }[] = [
  {
    slug: 'home',
    title: 'Trang chủ',
    metaTitle: 'Aim Agency — Do Right Things',
    metaDescription: 'Branding studio cho Startups & SME Việt. Lựa chọn đúng. Thực thi chuẩn xác. Đồng hành chân thành.',
    layout: [
      {
        blockType: 'homeHero',
        eyebrow: 'Branding Studio · Startups & SME Việt Nam',
        title: HERO.title,
        subtitle: HERO.subtitle,
        primaryLabel: HERO.primaryCta.label,
        primaryHref: HERO.primaryCta.href,
        secondaryLabel: HERO.secondaryCta.label,
        secondaryHref: HERO.secondaryCta.href,
        promise: BRAND_PROMISE,
      },
      { blockType: 'usp', no: '01', eyebrow: 'Cam kết của chúng tôi', title: 'Ba điều Aim luôn giữ', pillars: USP_PILLARS },
      { blockType: 'whyAim', no: '02', eyebrow: 'Vì sao chọn Aim', title: 'Vấn đề thật — cách giải thật', items: PAIN_SOLUTIONS },
      {
        blockType: 'servicesPreview',
        no: '03',
        eyebrow: 'Dịch vụ',
        title: 'Những gì Aim làm cùng bạn',
        cards: SERVICE_CARDS,
        ctaLabel: SERVICES_CTA.label,
        ctaHref: SERVICES_CTA.href,
      },
      { blockType: 'steps', tone: 'navy', no: '04', eyebrow: 'Quy trình', title: 'Bốn bước, minh bạch từ đầu', items: PROCESS_STEPS },
      { blockType: 'bookFlip', eyebrow: 'Sản phẩm bàn giao · Brand book', title: 'Cuốn cẩm nang bạn sẽ cầm trên tay' },
      { blockType: 'timeline', tone: 'ivory', no: '05', eyebrow: 'Lộ trình phát triển', title: 'Aim đi đường dài', items: ROADMAP },
      { blockType: 'projectsGrid', tone: 'navy-ink', no: '06', eyebrow: 'Dự án nổi bật', title: 'Một vài thương hiệu đã tin Aim', note: PROJECTS_NDA_NOTE, limit: 9 },
      { blockType: 'finalCta', eyebrow: 'Bắt đầu', title: FINAL_CTA.title, body: FINAL_CTA.body, buttonLabel: FINAL_CTA.cta.label, buttonHref: FINAL_CTA.cta.href },
    ],
  },
  {
    slug: 'about',
    title: 'Giới thiệu',
    metaTitle: 'Giới thiệu · Aim Agency',
    metaDescription: 'Câu chuyện, giá trị và cách làm việc của Aim Agency — branding studio cho Startups & SME Việt.',
    layout: [
      { blockType: 'pageHero', eyebrow: ABOUT.hero.eyebrow, title: ABOUT.hero.title, intro: ABOUT.hero.intro },
      { blockType: 'heading', tone: 'ivory', no: '01', eyebrow: 'Câu chuyện', title: 'Vì sao Aim tồn tại' },
      { blockType: 'richText', tone: 'ivory', content: lex([...ABOUT.story]) },
      { blockType: 'heading', tone: 'navy', no: '02', eyebrow: 'Giá trị cốt lõi', title: 'Ba điều Aim luôn giữ' },
      {
        blockType: 'cards',
        tone: 'navy',
        columns: '3',
        items: ABOUT.values.map((v, i) => ({ icon: ['aim', 'precision', 'handshake'][i], title: v.vi, body: v.body })),
      },
      {
        blockType: 'steps',
        tone: 'ivory-raise',
        no: '03',
        eyebrow: 'Cách làm việc',
        title: 'Chúng tôi làm việc thế nào',
        items: ABOUT.approach.map((a, i) => ({ number: String(i + 1).padStart(2, '0'), title: a.title, body: a.body })),
      },
      { blockType: 'timeline', tone: 'navy', no: '04', eyebrow: 'Lộ trình phát triển', title: 'Aim đi đường dài', items: ROADMAP },
      { blockType: 'cta', tone: 'ivory', eyebrow: 'Bắt đầu', title: 'Cùng làm đúng từ đầu', buttonLabel: 'Bắt đầu dự án', buttonHref: '/contact', variant: 'gold' },
    ],
  },
  {
    slug: 'services',
    title: 'Dịch vụ & Bảng giá',
    metaTitle: 'Dịch vụ & Bảng giá · Aim Agency',
    metaDescription: 'Chiến lược thương hiệu, logo & identity, bộ nhận diện văn phòng và ấn phẩm truyền thông — cùng bảng giá minh bạch.',
    layout: [
      { blockType: 'pageHero', eyebrow: SERVICES_HERO.eyebrow, title: SERVICES_HERO.title, intro: SERVICES_HERO.intro },
      { blockType: 'heading', tone: 'ivory', no: '01', eyebrow: 'Dịch vụ', title: 'Bốn nhóm dịch vụ cốt lõi' },
      {
        blockType: 'cards',
        tone: 'ivory',
        columns: '2',
        items: SERVICES_DETAIL.map((s) => ({ icon: s.icon, title: s.title, body: s.body, points: s.items.map((point) => ({ point })) })),
      },
      { blockType: 'heading', tone: 'navy', no: '02', eyebrow: 'Gói & Báo giá', title: 'Chọn gói theo giai đoạn của bạn' },
      {
        blockType: 'pricing',
        tone: 'navy',
        tiers: TIERS.map((t) => ({ name: t.name, en: t.en, desc: t.desc, items: t.items.map((item) => ({ item })), featured: t.featured })),
      },
      { blockType: 'steps', tone: 'ivory-raise', no: '03', eyebrow: 'Quy trình', title: 'Bốn bước, minh bạch từ đầu', items: PROCESS_STEPS },
      { blockType: 'faq', tone: 'ivory', no: '04', eyebrow: 'Câu hỏi thường gặp', title: 'Những điều bạn có thể đang thắc mắc', items: FAQS },
      { blockType: 'cta', tone: 'navy', eyebrow: 'Bắt đầu', title: 'Nhận tư vấn không ràng buộc', buttonLabel: 'Bắt đầu dự án', buttonHref: '/contact', variant: 'gold' },
    ],
  },
  {
    slug: 'projects',
    title: 'Dự án',
    metaTitle: 'Dự án · Aim Agency',
    metaDescription: 'Một vài thương hiệu đã chọn làm đúng cùng Aim Agency, trên nhiều ngành nghề từ F&B đến công nghệ.',
    layout: [
      { blockType: 'pageHero', eyebrow: PROJECTS_HERO.eyebrow, title: PROJECTS_HERO.title, intro: PROJECTS_HERO.intro },
      { blockType: 'projectsGrid', tone: 'navy', no: '01', eyebrow: 'Dự án nổi bật', title: 'Thương hiệu đã tin Aim', note: PROJECTS_NDA_NOTE, limit: 12 },
      { blockType: 'cta', tone: 'ivory', eyebrow: 'Bắt đầu', title: 'Dự án tiếp theo có thể là của bạn', buttonLabel: 'Bắt đầu dự án', buttonHref: '/contact', variant: 'gold' },
    ],
  },
  {
    slug: 'contact',
    title: 'Liên hệ',
    metaTitle: 'Liên hệ · Aim Agency',
    metaDescription: 'Bắt đầu dự án cùng Aim Agency. Buổi trao đổi đầu tiên là để hiểu nhau, không ràng buộc.',
    layout: [
      { blockType: 'pageHero', eyebrow: CONTACT_HERO.eyebrow, title: CONTACT_HERO.title, intro: CONTACT_HERO.intro },
      { blockType: 'contactForm', heading: 'Cách khác để kết nối với Aim' },
    ],
  },
  {
    slug: 'blog',
    title: 'Blog',
    metaTitle: 'Blog · Aim Agency',
    metaDescription: 'Góc nhìn thực chiến về thương hiệu, marketing và xây dựng doanh nghiệp tại Việt Nam — cho Startups & SME.',
    layout: [
      { blockType: 'pageHero', eyebrow: BLOG_HERO.eyebrow, title: BLOG_HERO.title, intro: BLOG_HERO.intro },
      { blockType: 'postsList', tone: 'ivory', no: '01', eyebrow: 'Bài viết', title: 'Bài viết mới nhất', limit: 12 },
      { blockType: 'cta', tone: 'navy', eyebrow: 'Trong lúc chờ', title: 'Có câu hỏi về thương hiệu? Hỏi thẳng Aim', buttonLabel: 'Bắt đầu trò chuyện', buttonHref: '/contact', variant: 'gold' },
    ],
  },
];

export async function ensurePages(payload: Payload) {
  for (const pg of PAGES) {
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: pg.slug } }, limit: 1, depth: 0 });
    if (existing.totalDocs > 0) {
      console.log(`[pages] • /${pg.slug} đã có — bỏ qua`);
      continue;
    }
    await payload.create({
      collection: 'pages',
      data: { title: pg.title, slug: pg.slug, published: true, metaTitle: pg.metaTitle, metaDescription: pg.metaDescription, layout: pg.layout } as any,
    });
    console.log(`[pages] ✓ Tạo trang /${pg.slug}`);
  }
}
