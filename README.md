# AIM AGENCY — Website

Website chính thức của **Aim Agency** — branding studio ứng dụng AI cho Startups & SME Việt.
**Do Right Things.** · [aimagency.vn](https://aimagency.vn)

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (brand tokens trong `tailwind.config.ts`)
- **Framer Motion** (fade-in-up on scroll, parallax nhẹ, hover zoom — tôn trọng `prefers-reduced-motion`)
- **next/font**: Playfair Display (display) + Be Vietnam Pro (body, subset `vietnamese`)
- Deploy: Vercel-ready

## Brand system

| Token | Hex | Vai trò |
| --- | --- | --- |
| `navy` | `#1B2A4A` | Primary / nền tối |
| `beige` | `#F0EAD9` | Secondary / nền sáng |
| `steel` | `#6E8CA8` | Accent — card / divider |
| `gold` | `#B89968` | Nhấn (<10%, chỉ CTA & điểm nhấn) |

Nền **navy / beige luân phiên**, không bao giờ trắng tinh.

## Bắt đầu

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build production
npm run start    # chạy bản build
npm run lint
```

## Cấu trúc

```
app/                # App Router: layout, home, 404, sitemap, robots, stub pages
  page.tsx          # Trang chủ — ghép 8 section
components/
  Header / MobileNav / Footer / Logo / ComingSoon
  ui/               # Section, Reveal, Button, Icons (primitives tái sử dụng)
  sections/         # Hero, USP, WhyAim, ServicesPreview, Process, Roadmap, Projects, FinalCTA
lib/
  content.ts        # Toàn bộ copy tiếng Việt (tách data khỏi UI)
  nav.ts            # Nav + thông tin site
public/             # favicon.svg, og-image.svg
```

## Trạng thái

- ✅ Trang chủ (8 section) + global layout (Header/Footer)
- ✅ SEO (metadata, OG, sitemap.xml, robots.txt, schema.org Organization), A11y (WCAG AA, keyboard nav, skip link), 404 custom
- 🚧 About / Services / Projects / Contact / Blog — hiện là stub "Đang hoàn thiện" (build ở phase sau)

## Branch

Trang chủ được phát triển trên branch `home-v1` để review qua Pull Request.
