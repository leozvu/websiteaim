'use client';

/* Đăng ký các block AIM với Builder.io — quyết định những gì hiện trong panel kéo-thả
   và các tùy chọn (input) cho mỗi block. */

import type { RegisteredComponent } from '@builder.io/sdk-react';
import { AimSection, AimHeading, AimButton, AimCard, AimGrid, AimProjectTile, AimPricingTier } from './blocks';

const TONES = ['navy', 'navy-ink', 'ivory', 'ivory-raise'];
const ICONS = ['aim', 'precision', 'handshake', 'strategy', 'logo', 'office', 'publication', 'check'];

export const customComponents: RegisteredComponent[] = [
  {
    component: AimSection,
    name: 'AIM Section',
    canHaveChildren: true,
    inputs: [
      { name: 'tone', type: 'string', enum: TONES, defaultValue: 'navy' },
      { name: 'paddingY', type: 'number', defaultValue: 96 },
    ],
  },
  {
    component: AimHeading,
    name: 'AIM Heading',
    inputs: [
      { name: 'no', type: 'string', defaultValue: '' },
      { name: 'eyebrow', type: 'string', defaultValue: 'Eyebrow' },
      { name: 'title', type: 'string', defaultValue: 'Tiêu đề mục' },
      { name: 'intro', type: 'longText', defaultValue: '' },
      { name: 'align', type: 'string', enum: ['left', 'center'], defaultValue: 'left' },
      { name: 'dark', type: 'boolean', defaultValue: false },
    ],
  },
  {
    component: AimButton,
    name: 'AIM Button',
    inputs: [
      { name: 'label', type: 'string', defaultValue: 'Bắt đầu dự án' },
      { name: 'href', type: 'string', defaultValue: '/contact' },
      { name: 'variant', type: 'string', enum: ['gold', 'navy', 'outline-light', 'outline-dark'], defaultValue: 'gold' },
      { name: 'withArrow', type: 'boolean', defaultValue: true },
    ],
  },
  {
    component: AimCard,
    name: 'AIM Card',
    inputs: [
      { name: 'icon', type: 'string', enum: ICONS, defaultValue: 'aim' },
      { name: 'title', type: 'string', defaultValue: 'Tiêu đề thẻ' },
      { name: 'body', type: 'longText', defaultValue: 'Mô tả ngắn cho thẻ này.' },
      { name: 'dark', type: 'boolean', defaultValue: false },
    ],
  },
  {
    component: AimGrid,
    name: 'AIM Grid',
    canHaveChildren: true,
    inputs: [{ name: 'columns', type: 'string', enum: ['2', '3', '4'], defaultValue: '3' }],
  },
  {
    component: AimProjectTile,
    name: 'AIM Project Tile',
    inputs: [
      { name: 'name', type: 'string', defaultValue: 'Tên dự án' },
      { name: 'industry', type: 'string', defaultValue: 'Ngành' },
      { name: 'from', type: 'color', defaultValue: '#081650' },
      { name: 'to', type: 'color', defaultValue: '#6e7c89' },
    ],
  },
  {
    component: AimPricingTier,
    name: 'AIM Pricing Tier',
    inputs: [
      { name: 'name', type: 'string', defaultValue: 'Gói' },
      { name: 'en', type: 'string', defaultValue: 'Plan' },
      { name: 'desc', type: 'longText', defaultValue: 'Mô tả gói.' },
      {
        name: 'items',
        type: 'list',
        defaultValue: [{ item: 'Hạng mục 1' }, { item: 'Hạng mục 2' }],
        subFields: [{ name: 'item', type: 'string', defaultValue: 'Hạng mục' }],
      },
      { name: 'featured', type: 'boolean', defaultValue: false },
      { name: 'dark', type: 'boolean', defaultValue: true },
    ],
  },
];
