/* Khởi tạo schema Postgres LÚC BUILD trên Vercel + seed admin/nội dung mẫu.
   Quan trọng: Payload chỉ auto-push schema khi NODE_ENV !== 'production'. Vercel
   build là production → phải ép NODE_ENV='development' TRONG process này (chỉ ảnh
   hưởng bước db-init, không ảnh hưởng `next build` chạy sau ở process riêng).
   Idempotent: chạy lại nhiều lần không nhân đôi. */

export {}; // module (cho phép top-level await)

/* NODE_ENV=development được set qua npm script (cross-env) để drizzle push chạy —
   không gán trong file này vì next build type-check NODE_ENV là read-only. */
process.env.PAYLOAD_DB_PUSH = '1';

const hasDb = Boolean(
  process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL
);

if (!hasDb) {
  console.log('[db-init] Không có DATABASE_URL — bỏ qua (dùng SQLite/nội dung tĩnh).');
  process.exit(0);
}

try {
  const [{ getPayload }, { default: config }] = await Promise.all([import('payload'), import('../payload.config')]);
  const payload = await getPayload({ config });
  console.log('[db-init] ✓ Schema Postgres đã được tạo/đồng bộ.');

  // Admin đầu tiên (đổi mật khẩu sau khi đăng nhập)
  const users = await payload.count({ collection: 'users' });
  if (users.totalDocs === 0) {
    const email = process.env.SEED_EMAIL || 'admin@aimagency.vn';
    await payload.create({
      collection: 'users',
      data: { email, password: process.env.SEED_PASSWORD || 'DoRightThings2026!', name: 'AIM Admin' },
    });
    console.log(`[db-init] ✓ Tạo admin: ${email}`);
  } else {
    console.log(`[db-init] • Đã có ${users.totalDocs} user — bỏ qua tạo admin.`);
  }

  // Nội dung mẫu (chỉ khi trống)
  const posts = await payload.count({ collection: 'posts' });
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
    console.log('[db-init] ✓ Tạo bài viết mẫu.');
  }

  process.exit(0);
} catch (err) {
  console.error('[db-init] ✗ Lỗi khi tạo schema:', err);
  process.exit(1);
}
