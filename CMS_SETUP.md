# CMS cho team AIM — Payload (admin kiểu WordPress)

Website có sẵn **CMS nhúng** tại **`/admin`** — team đăng nhập và quản lý nội dung
như WordPress, không cần code, không cần dịch vụ ngoài.

## Team dùng thế nào

1. Mở **`https://aimagency-web.vercel.app/admin`** (hoặc `http://localhost:3000/admin` khi dev)
2. Đăng nhập (hoặc tạo tài khoản đầu tiên nếu DB mới)
3. Quản lý:

| Mục | Làm gì | Hiện ở đâu trên site |
|---|---|---|
| **Bài viết** | Viết bài (tiêu đề, chuyên mục, mô tả, nội dung rich-text, ảnh bìa), tick "Xuất bản" | `/blog` — hiện NGAY, không cần deploy lại |
| **Dự án** | Tên, ngành, màu gradient (hoặc ảnh) | `/projects` — hiện ngay |
| **Media** | Upload ảnh, tự resize | Gắn vào bài viết/dự án |
| **Thành viên** | Thêm/xóa tài khoản team | — |

Khi CMS **trống**, site tự fallback về nội dung tĩnh trong `lib/` — site không bao giờ trắng trang vì CMS.

## Kích hoạt trên production (1 lần, ~5 phút — việc của người quản trị)

> Khi CHƯA kích hoạt: `/admin` trên Vercel hiện trang "CMS chưa được kích hoạt"
> (không lỗi, không mất gì); site vẫn chạy bằng nội dung tĩnh.

**Bước 1 — tạo database:** vào **neon.tech** → đăng ký free → Create project →
copy **Connection string** (dạng `postgresql://...`).

**Bước 2 — khởi tạo schema + admin** (chạy 1 lần từ máy local, trong thư mục dự án):

```bash
DATABASE_URL="postgresql://...neon..." SEED_EMAIL="email-cua-ban" SEED_PASSWORD="mat-khau-manh" npm run cms:init
```
(Windows PowerShell: `$env:DATABASE_URL="..."; $env:SEED_EMAIL="..."; $env:SEED_PASSWORD="..."; npm run cms:init`)

**Bước 3 — set biến môi trường trên Vercel** (Settings → Environment Variables):
- `DATABASE_URL` = connection string Neon ở bước 1
- `PAYLOAD_SECRET` = chuỗi ngẫu nhiên dài (vd `openssl rand -hex 32`)
- *(tuỳ chọn, để upload ảnh bền)* `BLOB_READ_WRITE_TOKEN` — Vercel Storage → Create Blob store

**Bước 4:** Redeploy → mở `/admin` → đăng nhập bằng tài khoản ở bước 2 → xong.

## Dev local

```bash
npm run dev                     # SQLite file payload.db tự tạo, schema tự sync
npx tsx scripts/dev-seed.ts     # (tuỳ chọn) tạo admin + nội dung mẫu
# đăng nhập: admin@aimagency.vn / DoRightThings2026!  ← ĐỔI MẬT KHẨU ngay
```

## Cho dev: thêm loại nội dung mới

Sửa **`payload.config.ts`** → thêm collection vào mảng `collections` (schema tự sync nhờ `push: true`).
Đọc dữ liệu ra trang: xem mẫu **`lib/cms.ts`** (`getPayload` + `payload.find` + fallback tĩnh)
và cách dùng trong `app/(site)/blog/page.tsx`.

Cấu trúc route: site nằm trong `app/(site)/` (layout riêng có Header/Footer),
admin nằm trong `app/(payload)/` (layout riêng của Payload) — đừng trộn hai nhóm.

> Builder.io (kéo-thả landing page) vẫn tồn tại song song — xem `BUILDER_SETUP.md`.
> Payload = quản nội dung có cấu trúc (bài viết/dự án); Builder = dựng trang tự do.
