/* CMS sẵn sàng chưa? Local: luôn sẵn (SQLite file). Trên Vercel: BẮT BUỘC có
   DATABASE_URL (Neon/Postgres) — SQLite /tmp serverless không có schema (drizzle
   push chỉ chạy ở dev) nên mọi query sẽ chết. Khi chưa sẵn sàng: /admin hiện
   trang hướng dẫn, API trả 503, site dùng nội dung tĩnh. */
export const cmsReady = Boolean(process.env.DATABASE_URL) || !process.env.VERCEL;
