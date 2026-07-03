/* Payload CMS — admin kiểu WordPress tại /admin cho team AIM.
   DB: có DATABASE_URL (Neon/Postgres) → Postgres (production);
       không có → SQLite file (dev local; trên Vercel dùng /tmp — chỉ demo, không bền).
   Media: có BLOB_READ_WRITE_TOKEN → Vercel Blob; không → lưu file local (dev). */

import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import sharp from 'sharp';
import { DB_URL } from './lib/cms-ready';
import { pageBlocks } from './blocks/config';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/* URL front-end cho Live Preview (xem trước trực tiếp khi kéo-thả). */
const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/* push: true = tự đồng bộ schema khi khởi động — team không phải chạy migration.
   Vercel: có Postgres (DB_URL) → dùng Postgres; local: SQLite file.
   Phù hợp site marketing quy mô nhỏ; dữ liệu quan trọng thì chuyển sang migrations. */
/* Kết nối TRỰC TIẾP (non-pooling) — tránh lỗi pgbouncer với prepared statements.
   push (tạo/đồng bộ schema) chỉ chạy khi:
   - local dev (!VERCEL), hoặc
   - bước build DB init (PAYLOAD_DB_PUSH=1, xem scripts/db-init.ts)
   Runtime serverless trên Vercel: push tắt → chỉ query schema đã tạo sẵn lúc build. */
const dbPush = process.env.PAYLOAD_DB_PUSH === '1' || !process.env.VERCEL;
const db = DB_URL
  ? postgresAdapter({ pool: { connectionString: DB_URL }, push: dbPush })
  : sqliteAdapter({
      client: { url: `file:${path.join(dirname, 'payload.db')}` },
      push: true,
    });

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'aim-dev-secret-doi-o-production',
  db,
  editor: lexicalEditor(),
  sharp,
  telemetry: false,
  admin: {
    user: 'users',
    meta: { titleSuffix: ' · AIM Agency CMS' },
    livePreview: {
      url: ({ data }) => `${serverURL}/${(data?.slug as string) || ''}?preview=1`,
      collections: ['pages'],
      breakpoints: [
        { name: 'mobile', label: 'Điện thoại', width: 390, height: 844 },
        { name: 'tablet', label: 'Máy tính bảng', width: 768, height: 1024 },
        { name: 'desktop', label: 'Máy tính', width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    {
      slug: 'pages',
      labels: { singular: 'Trang', plural: 'Trang (kéo-thả)' },
      admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'published'] },
      access: { read: () => true },
      fields: [
        { name: 'title', label: 'Tên trang', type: 'text', required: true },
        {
          name: 'slug',
          label: 'Đường dẫn (slug)',
          type: 'text',
          required: true,
          unique: true,
          admin: { description: 'vd: khuyen-mai-tet → aimagency.vn/khuyen-mai-tet' },
        },
        {
          name: 'layout',
          label: 'Khối nội dung (kéo ≡ để sắp xếp)',
          type: 'blocks',
          blocks: pageBlocks,
        },
        { name: 'metaTitle', label: 'SEO — Tiêu đề', type: 'text' },
        { name: 'metaDescription', label: 'SEO — Mô tả', type: 'textarea' },
        { name: 'published', label: 'Xuất bản', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      slug: 'users',
      labels: { singular: 'Thành viên', plural: 'Thành viên' },
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [{ name: 'name', label: 'Tên', type: 'text' }],
    },
    {
      slug: 'media',
      labels: { singular: 'Media', plural: 'Media' },
      upload: {
        staticDir: path.join(dirname, 'media'),
        imageSizes: [
          { name: 'card', width: 800, height: 600, position: 'centre' },
          { name: 'og', width: 1200, height: 630, position: 'centre' },
        ],
      },
      access: { read: () => true },
      fields: [{ name: 'alt', label: 'Mô tả ảnh (alt)', type: 'text' }],
    },
    {
      slug: 'posts',
      labels: { singular: 'Bài viết', plural: 'Bài viết' },
      admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'published', 'publishedAt'] },
      access: { read: () => true },
      fields: [
        { name: 'title', label: 'Tiêu đề', type: 'text', required: true },
        {
          name: 'slug',
          label: 'Slug (đường dẫn)',
          type: 'text',
          required: true,
          unique: true,
          admin: { description: 'vd: ngan-sach-branding-cho-sme' },
        },
        { name: 'category', label: 'Chuyên mục', type: 'text', defaultValue: 'Chiến lược' },
        { name: 'excerpt', label: 'Mô tả ngắn', type: 'textarea' },
        { name: 'cover', label: 'Ảnh bìa', type: 'upload', relationTo: 'media' },
        { name: 'content', label: 'Nội dung', type: 'richText' },
        { name: 'published', label: 'Xuất bản', type: 'checkbox', defaultValue: false },
        { name: 'publishedAt', label: 'Ngày đăng', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
      ],
    },
    {
      slug: 'projects',
      labels: { singular: 'Dự án', plural: 'Dự án' },
      admin: { useAsTitle: 'name', defaultColumns: ['name', 'industry', 'order'] },
      access: { read: () => true },
      fields: [
        { name: 'name', label: 'Tên dự án', type: 'text', required: true },
        { name: 'industry', label: 'Ngành', type: 'text', required: true },
        { name: 'image', label: 'Ảnh dự án (nếu có)', type: 'upload', relationTo: 'media' },
        { name: 'from', label: 'Màu gradient bắt đầu', type: 'text', defaultValue: '#081650' },
        { name: 'to', label: 'Màu gradient kết thúc', type: 'text', defaultValue: '#6e7c89' },
        { name: 'order', label: 'Thứ tự', type: 'number', defaultValue: 0 },
      ],
    },
  ],
  plugins: process.env.BLOB_READ_WRITE_TOKEN
    ? [vercelBlobStorage({ collections: { media: true }, token: process.env.BLOB_READ_WRITE_TOKEN })]
    : [],
  typescript: { outputFile: path.join(dirname, 'payload-types.ts') },
});
