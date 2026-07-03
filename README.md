# AIM AGENCY — Website

Website chính thức của **AIM AGENCY** (branding studio cho Startups & SME Việt — _Do Right Things_).
Tài liệu này để **team tiếp nhận và phát triển tiếp**.

- **Production:** https://aimagency-web.vercel.app (alias) — sẽ trỏ về `aimagency.vn` khi go-live
- **Repo:** github.com/leozvu/websiteaim
- **Nhánh phát triển:** `redesign-editorial-atelier`

---

## 1. Tech stack

| Mảng | Công nghệ |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | CSS variables (design tokens) + Tailwind (tiện ích) + inline style |
| Fonts | EB Garamond + Cormorant Garamond (display) · Be Vietnam Pro (body) — qua `next/font` |
| CMS kéo-thả | Builder.io (`@builder.io/sdk-react`) |
| Hosting | Vercel |

Dự án **không** dùng three.js/framer-motion/lenis nữa (đã gỡ) — animation hiện làm bằng CSS + IntersectionObserver, nhẹ và mượt.

## 2. Chạy & build

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build production
npm run start    # chạy bản build
npm run lint     # ESLint
```

Tạo file `.env.local` (xem `.env.example`) nếu dùng CMS:
```
NEXT_PUBLIC_BUILDER_API_KEY=...
```

## 3. Cấu trúc thư mục

```
app/
  layout.tsx            # Root: fonts, metadata/SEO, JSON-LD, Header + Footer
  page.tsx              # Trang chủ → HomeSections
  about|services|projects|contact|blog/page.tsx   # 5 trang nội dung
  [...page]/page.tsx    # Catch-all cho trang dựng bằng Builder.io (CMS)
  not-found.tsx         # 404
  sitemap.ts, robots.ts # SEO
  globals.css           # ★ DESIGN TOKENS + utility (.aim-*) + responsive grid
components/
  brandbook/
    ds.tsx              # ★ Design system: Icon, Eyebrow, Badge, Button, Card, OmegaMark, Logo
    primitives.tsx      # Reveal (fade-up), Tilt3D, PullQuote… (editorial primitives)
    data.ts             # Dữ liệu brand-book (dùng nội bộ primitives)
  home/
    sections.tsx        # 8 section trang chủ
    HeroShowcase.tsx    # Hero "reel" showcase sản phẩm (motion-design, asset thật)
    SiteHeader.tsx      # Header toàn site
    SiteFooter.tsx      # Footer toàn site
  site/
    kit.tsx             # Band / SectionHead / PageHero — dùng chung cho trang con
    ContactForm.tsx     # Form liên hệ
  builder/              # ★ Tích hợp CMS (xem BUILDER_SETUP.md)
    blocks.tsx          # 7 block AIM cho kéo-thả
    registry.tsx        # Đăng ký block với Builder
    RenderBuilderContent.tsx
lib/
  content.ts            # ★ Nội dung trang chủ (hero, USP, services, process, roadmap, projects…)
  pages.ts              # ★ Nội dung các trang con (about, services chi tiết, FAQ, blog…)
  nav.ts                # ★ Menu, thông tin SITE (email/SĐT/địa chỉ), social
public/images/brand/    # Logo Omega PNG thật + favicon + og-image
```

★ = nơi team sẽ sửa thường xuyên.

## 4. Hệ thống thương hiệu (design system)

Tất cả token nằm trong **`app/globals.css`** (`:root`). Quy tắc bất di bất dịch:

- **Màu:** nền **navy `#081650` ↔ ivory `#f8f2eb` luân phiên**, KHÔNG dùng trắng tinh. Champagne `#c5ad8a` chỉ là **nhấn (<5%)** — số chương, đường kẻ, 1 CTA. Steel `#6e7c89` phụ trợ. Dùng biến: `var(--navy)`, `var(--ivory)`, `var(--gold)`, `var(--steel)`…
- **Chữ:** tiêu đề = Garamond (`var(--font-display)` / số lớn `var(--font-numeral)`); nội dung = Be Vietnam Pro (`var(--font-body)`).
- **Tiện ích sẵn:** `.aim-container`, `.aim-eyebrow`, `.aim-display`, `.aim-numeral`, `.aim-rule`, `.aim-grid-2/3/4`, `.aim-input`.
- **Logo:** luôn dùng asset thật trong `public/images/brand/` qua component `<Logo>` / `<OmegaMark>` — **không vẽ lại logo**.

### Component dùng lại (import từ `@/components/brandbook/ds`)
`Button` (variant: gold/navy/outline-light/outline-dark) · `Card` (tone: beige/navy…) · `Badge` · `Icon` (aim, precision, handshake, strategy, logo, office, publication, check, arrow-right, facebook, instagram…) · `Logo` · `OmegaMark` · `Eyebrow`.

## 5. Sửa nội dung (không cần CMS)

- Nội dung **trang chủ** → `lib/content.ts`
- Nội dung **trang con** (about/services/FAQ/blog…) → `lib/pages.ts`
- **Menu, liên hệ, social** → `lib/nav.ts`

Sửa text ở đây là đủ; giao diện tự cập nhật. Giọng thương hiệu: chân thành, thực chiến, điềm tĩnh, tiếng Việt. **Cấm buzzword:** "đồng hành cùng khách hàng trên hành trình", "kiến tạo", "tận tâm phục vụ", "giải pháp toàn diện", "đột phá", "empowering", "unlock potential".

## 6. Thêm một trang code mới

Tạo `app/<tên>/page.tsx`, ghép sẵn các khối từ `@/components/site/kit`:

```tsx
import { Band, SectionHead, PageHero } from '@/components/site/kit';
import { Button } from '@/components/brandbook/ds';

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Nhãn" title="Tiêu đề" intro="Mô tả…" />
      <Band tone="ivory">
        <SectionHead no="01" eyebrow="Mục" title="Tiêu đề mục" />
        {/* nội dung */}
      </Band>
    </>
  );
}
```
Header/Footer tự có (ở `layout.tsx`). Thêm link vào menu ở `lib/nav.ts`.

## 7. CMS kéo-thả (Builder.io)

Team tạo/sửa trang bằng kéo-thả các block AIM, không cần code. **Hướng dẫn đầy đủ trong [`BUILDER_SETUP.md`](BUILDER_SETUP.md).** Tóm tắt: tạo tài khoản Builder.io → lấy Public API Key → dán vào `.env.local` + Vercel env → Content → New Page → kéo-thả. Trang đã code luôn ưu tiên; Builder quản các URL chưa code.

Thêm block kéo-thả mới: viết component trong `components/builder/blocks.tsx` rồi đăng ký ở `components/builder/registry.tsx`.

## 8. Deploy

Tự động qua Vercel khi push. Thủ công:
```bash
vercel --prod
```
**Biến môi trường trên Vercel:** `NEXT_PUBLIC_BUILDER_API_KEY` (nếu dùng CMS).

## 9. SEO & chất lượng

- Metadata + OpenGraph ở `app/layout.tsx` (+ mỗi trang có `metadata` riêng), JSON-LD Organization.
- `sitemap.ts`, `robots.ts` tự sinh.
- A11y: contrast đạt WCAG AA, focus ring, semantic landmarks, reduced-motion được tôn trọng.
- Đã build sạch, lint sạch (`npm run build`, `npm run lint`).

---

_© 2026 AIM AGENCY. Do Right Things._
