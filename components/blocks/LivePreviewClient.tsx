'use client';

/* Chế độ chỉnh sửa tương tác (kiểu Elementor): khi trang mở trong khung Live
   Preview của /admin, hook useLivePreview nhận dữ liệu form qua postMessage —
   editor GÕ TỚI ĐÂU trang đổi tới đó, không cần bấm Lưu. Mở ngoài admin thì
   chỉ render dữ liệu ban đầu như trang thường. */

import { useLivePreview } from '@payloadcms/live-preview-react';
import { RenderBlocks } from './RenderBlocks';

export function LivePreviewClient({ initialDoc }: { initialDoc: any }) {
  const { data } = useLivePreview<any>({
    initialData: initialDoc,
    serverURL: typeof window !== 'undefined' ? window.location.origin : '',
    depth: 2,
  });
  return <RenderBlocks blocks={data?.layout} />;
}
