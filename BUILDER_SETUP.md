# Builder.io — Kéo-thả trang cho AIM (như Elementor)

Website Next.js đã được nối với **Builder.io**: team có thể tạo/sửa trang bằng
trình soạn trực quan, kéo-thả **chính các block thương hiệu AIM** (đã đăng ký sẵn),
không cần code. Deploy vẫn trên Vercel, giữ nguyên thiết kế.

## Cần làm 1 lần (bước con người — chỉ ~5 phút)

1. Vào **builder.io** → đăng ký tài khoản miễn phí (tạo Space cho AIM).
2. Vào **Account Settings → API Keys**, copy **Public API Key**.
3. Dán key vào 2 nơi:
   - **Local:** tạo file `.env.local` ở gốc dự án:
     ```
     NEXT_PUBLIC_BUILDER_API_KEY=dán_key_vào_đây
     ```
   - **Vercel:** Project → Settings → Environment Variables → thêm
     `NEXT_PUBLIC_BUILDER_API_KEY` = key, rồi redeploy.
4. Trong Builder.io → **Content → New → Page**, đặt URL (vd `/khuyen-mai-tet`).
5. Ở khung "Edit URL / Preview", trỏ tới site (vd `https://aimagency-web.vercel.app`
   hoặc `http://localhost:3000` khi chạy `npm run dev`).
6. Bắt đầu **kéo-thả**. Trong panel "Insert" sẽ thấy các block AIM:
   **AIM Section, AIM Heading, AIM Button, AIM Card, AIM Grid, AIM Project Tile,
   AIM Pricing Tier** — tất cả đúng màu/chữ thương hiệu.

## Cách hoạt động

- Các trang đã code (`/`, `/about`, `/services`, `/projects`, `/contact`, `/blog`)
  **luôn được ưu tiên** — Next.js dùng route tĩnh trước.
- Builder quản **mọi URL chưa được code** (landing page, khuyến mãi, sự kiện…)
  qua catch-all `app/[...page]/page.tsx`. URL không có nội dung → trả 404 chuẩn.
- Block AIM định nghĩa ở `components/builder/blocks.tsx`, đăng ký ở
  `components/builder/registry.tsx`. Muốn thêm block mới → thêm vào 2 file này.

## Muốn sửa luôn các trang đã code bằng kéo-thả?

Trang code hiện tại (home, services…) chưa phải nội dung Builder. Nếu muốn biến
một trang cụ thể thành "sửa được bằng Builder", báo tôi — tôi sẽ chuyển trang đó
sang dạng Builder section (giữ nguyên giao diện) để team tự sửa.
