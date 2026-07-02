import { fetchOneEntry } from '@builder.io/sdk-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { RenderBuilderContent } from '@/components/builder/RenderBuilderContent';

/* Catch-all cho các trang do team dựng bằng Builder.io (kéo-thả).
   Route tĩnh (/, /about, /services, ...) luôn ưu tiên hơn catch-all này;
   nên Builder chỉ quản các URL CHƯA được code (landing page, khuyến mãi, ...). */

export const dynamic = 'force-dynamic';

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || '';

type PageProps = {
  params: Promise<{ page?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function getContent(urlPath: string) {
  if (!apiKey) return null;
  try {
    return await fetchOneEntry({ model: 'page', apiKey, userAttributes: { urlPath } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const urlPath = '/' + (page?.join('/') || '');
  const content = await getContent(urlPath);
  const data = content?.data as { title?: string; description?: string } | undefined;
  return {
    title: data?.title,
    description: data?.description,
  };
}

export default async function BuilderCatchAll({ params, searchParams }: PageProps) {
  const { page } = await params;
  const sp = await searchParams;
  const urlPath = '/' + (page?.join('/') || '');
  const content = await getContent(urlPath);
  // Khi mở trong trình soạn Builder (?builder.* ) thì vẫn render canvas để chỉnh,
  // dù chưa có nội dung. Ngoài ra không có nội dung → trả 404 chuẩn.
  const previewing = Object.keys(sp).some((k) => k.startsWith('builder.'));
  if (!content && !previewing) notFound();
  return <RenderBuilderContent content={content} apiKey={apiKey} model="page" />;
}
