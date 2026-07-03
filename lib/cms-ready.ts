/* Chuỗi kết nối Postgres — nhận mọi tên biến mà Vercel/Neon tự tạo khi bấm
   "Create Database" (không phải copy tay). Ưu tiên bản non-pooling cho việc
   đồng bộ schema (DDL). */
export const DB_URL =
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  '';

/* CMS sẵn sàng chưa? Local: luôn sẵn (SQLite file). Trên Vercel: cần Postgres
   (SQLite /tmp serverless không giữ schema). Chưa sẵn → /admin hiện hướng dẫn,
   site dùng nội dung tĩnh. */
export const cmsReady = Boolean(DB_URL) || !process.env.VERCEL;
