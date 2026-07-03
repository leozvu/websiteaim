/* Seed dev: tạo admin đầu tiên + 1 bài viết + 1 dự án mẫu (chỉ khi DB trống).
   Chạy:  npx tsx scripts/dev-seed.ts
   Đổi email/mật khẩu qua env: SEED_EMAIL / SEED_PASSWORD (nhớ đổi sau khi đăng nhập!). */

import { getPayload } from 'payload';
import config from '../payload.config';

const payload = await getPayload({ config });

const users = await payload.find({ collection: 'users', limit: 1 });
if (users.totalDocs === 0) {
  const email = process.env.SEED_EMAIL || 'admin@aimagency.vn';
  await payload.create({
    collection: 'users',
    data: { email, password: process.env.SEED_PASSWORD || 'DoRightThings2026!', name: 'AIM Admin' },
  });
  console.log(`✓ Tạo admin: ${email} (đổi mật khẩu sau khi đăng nhập)`);
} else {
  console.log('• Admin đã tồn tại — bỏ qua');
}

const posts = await payload.find({ collection: 'posts', limit: 1 });
if (posts.totalDocs === 0) {
  await payload.create({
    collection: 'posts',
    data: {
      title: 'Ngân sách branding cho SME: tiêu vào đâu trước?',
      slug: 'ngan-sach-branding-cho-sme',
      category: 'Thực chiến',
      excerpt: 'Một cách phân bổ thực tế để mỗi đồng chi ra đều tạo khác biệt nhìn thấy được.',
      published: true,
      publishedAt: new Date().toISOString(),
    },
  });
  console.log('✓ Tạo bài viết mẫu');
}

const projCount = await payload.count({ collection: 'projects' });
if (projCount.totalDocs <= 1) {
  const { PROJECTS } = await import('../lib/content');
  for (let i = 0; i < PROJECTS.length; i++) {
    const pr = PROJECTS[i];
    const dup = await payload.find({ collection: 'projects', where: { name: { equals: pr.name } }, limit: 1, depth: 0 });
    if (dup.totalDocs === 0) {
      await payload.create({ collection: 'projects', data: { ...pr, order: i + 1 } });
      console.log(`✓ Tạo dự án: ${pr.name}`);
    }
  }
}

const { ensurePages } = await import('./seed-pages');
await ensurePages(payload);

console.log('DONE');
process.exit(0);
