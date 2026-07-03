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
      fields: [iconField, { name: 'title', label: 'Tiêu đề', type: 'text', required: true }, { name: 'body', label: 'Nội dung', type: 'textarea' }],
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

export const pageBlocks: Block[] = [Hero, Heading, RichTextBlock, Cards, Pricing, Projects, ImageBlock, CTA];
