/* Trang do team dựng bằng KÉO-THẢ trong /admin (collection "Trang").
   Route tĩnh (/, /about, ...) luôn ưu tiên; catch-all này lo mọi slug khác.
   ?preview=1 → hiện cả trang chưa xuất bản + bật Live Preview refresh. */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { cmsReady } from '@/lib/cms-ready';
import { RenderBlocks } from '@/components/blocks/RenderBlocks';
import { RefreshOnSave } from '@/components/blocks/RefreshOnSave';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ page?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function getPage(slug: string, preview: boolean) {
  if (!cmsReady) return null;
  try {
    const payload = await getPayload({ config });
    const where = preview
      ? { slug: { equals: slug } }
      : { and: [{ slug: { equals: slug } }, { published: { equals: true } }] };
    const res = await payload.find({ collection: 'pages', where: where as any, limit: 1, depth: 2 });
    return res.docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const slug = page?.join('/') || 'home';
  const doc: any = await getPage(slug, false);
  if (!doc) return {};
  return { title: doc.metaTitle || doc.title, description: doc.metaDescription };
}

export default async function BuilderPage({ params, searchParams }: Props) {
  const { page } = await params;
  const sp = await searchParams;
  const preview = sp?.preview === '1';
  const slug = page?.join('/') || 'home';
  const doc: any = await getPage(slug, preview);
  if (!doc) notFound();
  return (
    <>
      {preview && <RefreshOnSave />}
      <RenderBlocks blocks={doc.layout} />
    </>
  );
}
