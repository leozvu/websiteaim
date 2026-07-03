/* Trang chủ — đọc trang khối slug 'home' từ CMS (team sửa được toàn bộ trong
   /admin, kéo-thả + live edit). CMS trống/lỗi → fallback bản tĩnh HomeSections
   (site không bao giờ trắng trang). ?preview=1 → chỉnh sửa tương tác. */

import { getPayload } from 'payload';
import config from '@payload-config';
import { cmsReady } from '@/lib/cms-ready';
import { RenderBlocks } from '@/components/blocks/RenderBlocks';
import { LivePreviewClient } from '@/components/blocks/LivePreviewClient';
import HomeSections from '@/components/home/sections';

export const dynamic = 'force-dynamic';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const preview = sp?.preview === '1';
  if (cmsReady) {
    try {
      const payload = await getPayload({ config });
      const where = preview
        ? { slug: { equals: 'home' } }
        : { and: [{ slug: { equals: 'home' } }, { published: { equals: true } }] };
      const res = await payload.find({ collection: 'pages', where: where as any, limit: 1, depth: 2 });
      const doc: any = res.docs[0];
      if (doc) return preview ? <LivePreviewClient initialDoc={doc} /> : <RenderBlocks blocks={doc.layout} />;
    } catch {
      /* fallback tĩnh */
    }
  }
  return <HomeSections />;
}
