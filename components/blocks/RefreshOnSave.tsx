'use client';

/* Live Preview: khi editor lưu trong /admin, iframe xem trước tự refresh để thấy
   thay đổi (kéo-thả khối → lưu → hiện ngay). */

import { RefreshRouteOnSave as PayloadRefresh } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation';

export function RefreshOnSave() {
  const router = useRouter();
  const serverURL = typeof window !== 'undefined' ? window.location.origin : '';
  return <PayloadRefresh refresh={() => router.refresh()} serverURL={serverURL} />;
}
