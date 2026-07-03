/* Khởi tạo schema Postgres LÚC BUILD trên Vercel (DATABASE_URL có sẵn, chạy trong
   Node đầy đủ — không phải serverless nên push/DDL hoạt động).
   - Không có DB → bỏ qua (build local/preview không DB vẫn chạy).
   - Có DB → bật PAYLOAD_DB_PUSH=1 rồi getPayload → drizzle push tạo/đồng bộ bảng.
   KHÔNG tạo user: để trống cho màn "Create first user" của Payload ở /admin. */

export {}; // đánh dấu module (cho phép top-level await)

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
  await getPayload({ config });
  console.log('[db-init] ✓ Schema Postgres đã được tạo/đồng bộ.');
  process.exit(0);
} catch (err) {
  console.error('[db-init] ✗ Lỗi khi tạo schema:', err);
  process.exit(1);
}
