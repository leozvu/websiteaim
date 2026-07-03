/* Các KHỐI kéo-thả cho trình dựng trang (giống Elementor). Mỗi khối là một Block
   của Payload: editor kéo vào, điền field, kéo ≡ để sắp xếp, xem trước trực tiếp.
   Front-end render bằng component thương hiệu AIM (components/blocks/RenderBlocks). */

import type { Block, Field } from 'payload';

const toneField: Field = {
  name: 'tone',
  label: 'Nền',
  type: 'select',
  defaultValue: 'ivory',
  options: [
    { label: 'Navy', value: 'navy' },
    { label: 'Navy đậm', value: 'navy-ink' },
    { label: 'Ivory', value: 'ivory' },
    { label: 'Ivory nhạt', value: 'ivory-raise' },
  ],
};

const ICONS = ['aim', 'precision', 'handshake', 'strategy', 'logo', 'office', 'publication', 'check'];
const iconField: Field = {
  name: 'icon',
  label: 'Biểu tượng',
  type: 'select',
  defaultValue: 'aim',
  options: ICONS.map((v) => ({ label: v, value: v })),
};
const variantField: Field = {
  name: 'variant',
  label: 'Kiểu nút',
  type: 'select',
  defaultValue: 'gold',
  options: [
    { label: 'Gold (chính)', value: 'gold' },
    { label: 'Navy', value: 'navy' },
    { label: 'Viền sáng', value: 'outline-light' },
    { label: 'Viền tối', value: 'outline-dark' },
  ],
};

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero (đầu trang)', plural: 'Hero' },
  fields: [
    { name: 'eyebrow', label: 'Nhãn nhỏ', type: 'text' },
    { name: 'title', label: 'Tiêu đề lớn', type: 'text', required: true },
    { name: 'subtitle', label: 'Mô tả', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'primaryLabel', label: 'Nút chính', type: 'text', admin: { width: '50%' } },
        { name: 'primaryHref', label: 'Link nút chính', type: 'text', defaultValue: '/contact', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'secondaryLabel', label: 'Nút phụ', type: 'text', admin: { width: '50%' } },
        { name: 'secondaryHref', label: 'Link nút phụ', type: 'text', admin: { width: '50%' } },
      ],
    },
  ],
};

export const Heading: Block = {
  slug: 'heading',
  labels: { singular: 'Tiêu đề mục', plural: 'Tiêu đề mục' },
  fields: [
    toneField,
    {
      type: 'row',
      fields: [
        { name: 'no', label: 'Số thứ tự', type: 'text', admin: { width: '30%', placeholder: '01' } },
        { name: 'eyebrow', label: 'Nhãn nhỏ', type: 'text', admin: { width: '70%' } },
      ],
    },
    { name: 'title', label: 'Tiêu đề', type: 'text', required: true },
    { name: 'intro', label: 'Mô tả', type: 'textarea' },
    { name: 'align', label: 'Căn giữa', type: 'checkbox', defaultValue: false },
  ],
};

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Đoạn văn', plural: 'Đoạn văn' },
  fields: [toneField, { name: 'content', label: 'Nội dung', type: 'richText' }],
};

export const Cards: Block = {
  slug: 'cards',
  labels: { singular: 'Lưới thẻ', plural: 'Lưới thẻ' },
  fields: [
    toneField,
    {
      name: 'columns',
      label: 'Số cột',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    {
      name: 'items',
      label: 'Các thẻ',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Thẻ', plural: 'Thẻ' },
      fields: [
        iconField,
        { name: 'title', label: 'Tiêu đề', type: 'text', required: true },
        { name: 'body', label: 'Nội dung', type: 'textarea' },
        {
          name: 'points',
          label: 'Gạch đầu dòng (tuỳ chọn)',
          type: 'array',
          labels: { singular: 'Dòng', plural: 'Dòng' },
          fields: [{ name: 'point', type: 'text' }],
        },
      ],
    },
  ],
};

export const Pricing: Block = {
  slug: 'pricing',
  labels: { singular: 'Bảng giá', plural: 'Bảng giá' },
  fields: [
    toneField,
    {
      name: 'tiers',
      label: 'Các gói',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Gói', plural: 'Gói' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', label: 'Tên gói', type: 'text', required: true, admin: { width: '60%' } },
            { name: 'en', label: 'Tên EN', type: 'text', admin: { width: '40%' } },
          ],
        },
        { name: 'desc', label: 'Mô tả', type: 'textarea' },
        {
          name: 'items',
          label: 'Hạng mục',
          type: 'array',
          labels: { singular: 'Dòng', plural: 'Dòng' },
          fields: [{ name: 'item', type: 'text' }],
        },
        { name: 'featured', label: 'Nổi bật', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
};

export const Projects: Block = {
  slug: 'projects',
  labels: { singular: 'Lưới dự án', plural: 'Lưới dự án' },
  fields: [
    toneField,
    {
      name: 'items',
      label: 'Dự án',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Dự án', plural: 'Dự án' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', label: 'Tên', type: 'text', required: true, admin: { width: '60%' } },
            { name: 'industry', label: 'Ngành', type: 'text', admin: { width: '40%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'from', label: 'Màu đầu', type: 'text', defaultValue: '#081650', admin: { width: '50%' } },
            { name: 'to', label: 'Màu cuối', type: 'text', defaultValue: '#6e7c89', admin: { width: '50%' } },
          ],
        },
      ],
    },
  ],
};

export const ImageBlock: Block = {
  slug: 'image',
  labels: { singular: 'Ảnh', plural: 'Ảnh' },
  fields: [
    toneField,
    { name: 'image', label: 'Ảnh', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', label: 'Chú thích', type: 'text' },
  ],
};

export const CTA: Block = {
  slug: 'cta',
  labels: { singular: 'Kêu gọi hành động', plural: 'CTA' },
  fields: [
    { ...toneField, defaultValue: 'navy' },
    { name: 'eyebrow', label: 'Nhãn nhỏ', type: 'text', defaultValue: 'Bắt đầu' },
    { name: 'title', label: 'Tiêu đề', type: 'text', required: true },
    { name: 'body', label: 'Mô tả', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'buttonLabel', label: 'Nút', type: 'text', defaultValue: 'Bắt đầu dự án', admin: { width: '50%' } },
        { name: 'buttonHref', label: 'Link', type: 'text', defaultValue: '/contact', admin: { width: '50%' } },
      ],
    },
    variantField,
  ],
};

/* ══ Khối generic bổ sung ══ */

const sectionHeadFields: Field[] = [
  {
    type: 'row',
    fields: [
      { name: 'no', label: 'Số thứ tự', type: 'text', admin: { width: '30%', placeholder: '01' } },
      { name: 'eyebrow', label: 'Nhãn nhỏ', type: 'text', admin: { width: '70%' } },
    ],
  },
  { name: 'title', label: 'Tiêu đề mục', type: 'text' },
];

export const PageHero: Block = {
  slug: 'pageHero',
  labels: { singular: 'Hero trang con', plural: 'Hero trang con' },
  fields: [
    { name: 'eyebrow', label: 'Nhãn nhỏ', type: 'text' },
    { name: 'title', label: 'Tiêu đề', type: 'text', required: true },
    { name: 'intro', label: 'Mô tả', type: 'textarea' },
  ],
};

export const FAQ: Block = {
  slug: 'faq',
  labels: { singular: 'Hỏi đáp (FAQ)', plural: 'FAQ' },
  fields: [
    toneField,
    ...sectionHeadFields,
    {
      name: 'items',
      label: 'Câu hỏi',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Câu hỏi', plural: 'Câu hỏi' },
      fields: [
        { name: 'q', label: 'Câu hỏi', type: 'text', required: true },
        { name: 'a', label: 'Trả lời', type: 'textarea', required: true },
      ],
    },
  ],
};

export const Steps: Block = {
  slug: 'steps',
  labels: { singular: 'Các bước (quy trình)', plural: 'Các bước' },
  fields: [
    { ...toneField, defaultValue: 'navy' },
    ...sectionHeadFields,
    {
      name: 'items',
      label: 'Bước',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Bước', plural: 'Bước' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'number', label: 'Số', type: 'text', defaultValue: '01', admin: { width: '25%' } },
            { name: 'title', label: 'Tên bước', type: 'text', required: true, admin: { width: '40%' } },
            { name: 'en', label: 'Tên EN', type: 'text', admin: { width: '35%' } },
          ],
        },
        { name: 'body', label: 'Mô tả', type: 'textarea' },
      ],
    },
  ],
};

export const Timeline: Block = {
  slug: 'timeline',
  labels: { singular: 'Dòng thời gian', plural: 'Dòng thời gian' },
  fields: [
    toneField,
    ...sectionHeadFields,
    {
      name: 'items',
      label: 'Mốc',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Mốc', plural: 'Mốc' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'year', label: 'Năm', type: 'text', required: true, admin: { width: '30%' } },
            { name: 'title', label: 'Tiêu đề', type: 'text', required: true, admin: { width: '70%' } },
          ],
        },
        { name: 'body', label: 'Mô tả', type: 'textarea' },
      ],
    },
  ],
};

export const VideoBlock: Block = {
  slug: 'video',
  labels: { singular: 'Video', plural: 'Video' },
  fields: [
    toneField,
    { name: 'url', label: 'Link video (YouTube/Vimeo/mp4)', type: 'text' },
    { name: 'media', label: 'Hoặc upload video', type: 'upload', relationTo: 'media' },
    { name: 'caption', label: 'Chú thích', type: 'text' },
  ],
};

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: { singular: 'Form liên hệ + thông tin', plural: 'Form liên hệ' },
  fields: [{ name: 'heading', label: 'Tiêu đề cột thông tin', type: 'text', defaultValue: 'Cách khác để kết nối với Aim' }],
};

export const PostsList: Block = {
  slug: 'postsList',
  labels: { singular: 'Danh sách bài viết', plural: 'Danh sách bài viết' },
  fields: [
    toneField,
    ...sectionHeadFields,
    { name: 'limit', label: 'Số bài tối đa', type: 'number', defaultValue: 12 },
  ],
};

/* ══ Khối premium của TRANG CHỦ — bọc chính các section đã code (giữ nguyên
   thiết kế: video hero, tilt, count-up, focal timeline, spotlight...) ══ */

export const HomeHero: Block = {
  slug: 'homeHero',
  labels: { singular: 'Trang chủ — Hero video', plural: 'Trang chủ — Hero video' },
  fields: [
    { name: 'eyebrow', label: 'Nhãn nhỏ', type: 'text' },
    { name: 'title', label: 'Tiêu đề lớn', type: 'text', required: true },
    { name: 'subtitle', label: 'Mô tả', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'primaryLabel', label: 'Nút chính', type: 'text', admin: { width: '50%' } },
        { name: 'primaryHref', label: 'Link chính', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'secondaryLabel', label: 'Nút phụ', type: 'text', admin: { width: '50%' } },
        { name: 'secondaryHref', label: 'Link phụ', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'promise', label: 'Dòng cam kết (chân hero)', type: 'textarea' },
  ],
};

export const Usp: Block = {
  slug: 'usp',
  labels: { singular: 'Trang chủ — 3 trụ USP', plural: 'Trang chủ — USP' },
  fields: [
    ...sectionHeadFields,
    {
      name: 'pillars',
      label: 'Các trụ',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Trụ', plural: 'Trụ' },
      fields: [
        iconField,
        {
          type: 'row',
          fields: [
            { name: 'vi', label: 'Tên (VI)', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'en', label: 'Tên (EN)', type: 'text', admin: { width: '50%' } },
          ],
        },
        { name: 'body', label: 'Nội dung', type: 'textarea' },
      ],
    },
  ],
};

export const WhyAim: Block = {
  slug: 'whyAim',
  labels: { singular: 'Trang chủ — Vì sao Aim', plural: 'Trang chủ — Vì sao Aim' },
  fields: [
    ...sectionHeadFields,
    {
      name: 'items',
      label: 'Cặp vấn đề ↔ cách giải',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Cặp', plural: 'Cặp' },
      fields: [
        { name: 'painTitle', label: 'Vấn đề — tiêu đề', type: 'text', required: true },
        { name: 'pain', label: 'Vấn đề — mô tả', type: 'textarea' },
        { name: 'solutionTitle', label: 'Cách giải — tiêu đề', type: 'text', required: true },
        { name: 'solution', label: 'Cách giải — mô tả', type: 'textarea' },
      ],
    },
  ],
};

export const ServicesPreview: Block = {
  slug: 'servicesPreview',
  labels: { singular: 'Trang chủ — Dịch vụ', plural: 'Trang chủ — Dịch vụ' },
  fields: [
    ...sectionHeadFields,
    {
      name: 'cards',
      label: 'Thẻ dịch vụ',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Thẻ', plural: 'Thẻ' },
      fields: [iconField, { name: 'title', label: 'Tên dịch vụ', type: 'text', required: true }, { name: 'body', label: 'Mô tả', type: 'textarea' }],
    },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', label: 'Nút CTA', type: 'text', admin: { width: '50%' } },
        { name: 'ctaHref', label: 'Link CTA', type: 'text', defaultValue: '/services', admin: { width: '50%' } },
      ],
    },
  ],
};

export const BookFlipBlock: Block = {
  slug: 'bookFlip',
  labels: { singular: 'Trang chủ — Brand book 3D', plural: 'Trang chủ — Brand book 3D' },
  fields: [
    { name: 'eyebrow', label: 'Nhãn nhỏ', type: 'text', defaultValue: 'Sản phẩm bàn giao · Brand book' },
    { name: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Cuốn cẩm nang bạn sẽ cầm trên tay' },
  ],
};

export const ProjectsGrid: Block = {
  slug: 'projectsGrid',
  labels: { singular: 'Lưới dự án (từ CMS Dự án)', plural: 'Lưới dự án (từ CMS)' },
  fields: [
    { ...toneField, defaultValue: 'navy-ink' },
    ...sectionHeadFields,
    { name: 'note', label: 'Ghi chú (NDA)', type: 'text' },
    { name: 'limit', label: 'Số dự án tối đa', type: 'number', defaultValue: 9 },
  ],
};

export const FinalCta: Block = {
  slug: 'finalCta',
  labels: { singular: 'Trang chủ — CTA spotlight', plural: 'Trang chủ — CTA spotlight' },
  fields: [
    { name: 'eyebrow', label: 'Nhãn nhỏ', type: 'text', defaultValue: 'Bắt đầu' },
    { name: 'title', label: 'Tiêu đề', type: 'text', required: true },
    { name: 'body', label: 'Mô tả', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'buttonLabel', label: 'Nút', type: 'text', defaultValue: 'Bắt đầu dự án', admin: { width: '50%' } },
        { name: 'buttonHref', label: 'Link', type: 'text', defaultValue: '/contact', admin: { width: '50%' } },
      ],
    },
  ],
};

export const pageBlocks: Block[] = [
  // generic
  Hero,
  PageHero,
  Heading,
  RichTextBlock,
  Cards,
  Pricing,
  Projects,
  ImageBlock,
  FAQ,
  Steps,
  Timeline,
  VideoBlock,
  ContactFormBlock,
  PostsList,
  CTA,
  // trang chủ (premium)
  HomeHero,
  Usp,
  WhyAim,
  ServicesPreview,
  BookFlipBlock,
  ProjectsGrid,
  FinalCta,
];
