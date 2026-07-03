/* Root layout riêng cho Payload admin — KHÔNG dùng Header/Footer của site.
   Khi CMS chưa kích hoạt trên Vercel (thiếu DATABASE_URL) → hiện trang hướng dẫn
   thay vì crash (SQLite /tmp serverless không có schema). */
import config from '@payload-config';
import '@payloadcms/next/css';
import type { ServerFunctionClient } from 'payload';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import React from 'react';
import { cmsReady } from '@/lib/cms-ready';

import { importMap } from './admin/importMap.js';

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  'use server';
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

function CmsNotReady() {
  return (
    <html lang="vi">
      <body
        style={{
          margin: 0,
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#081650',
          color: '#f8f2eb',
          fontFamily: 'Georgia, serif',
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 600, textAlign: 'left' }}>
          <div style={{ fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c5ad8a', marginBottom: 18, textAlign: 'center' }}>
            AIM Agency CMS
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0, lineHeight: 1.25, textAlign: 'center' }}>Còn 1 bước để bật CMS</h1>
          <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.7, color: 'rgba(248,242,235,0.78)', textAlign: 'center' }}>
            CMS cần một cơ sở dữ liệu (miễn phí). Không có mã lệnh nào phải gõ — chỉ bấm trong bảng điều khiển Vercel:
          </p>
          <ol style={{ marginTop: 22, paddingLeft: 22, fontSize: 14.5, lineHeight: 1.9, color: 'rgba(248,242,235,0.9)' }}>
            <li>
              Mở <strong>Vercel</strong> → dự án <strong>aimagency-web</strong> → tab <strong>Storage</strong> →{' '}
              <strong>Create Database</strong> → chọn <strong>Neon (Postgres)</strong> → Create.
            </li>
            <li>Bấm <strong>Connect</strong> để gắn vào dự án (Vercel tự tạo biến kết nối — không cần copy gì).</li>
            <li>
              Vào tab <strong>Deployments</strong> → bản mới nhất → <strong>Redeploy</strong>.
            </li>
            <li>
              Quay lại <code style={{ color: '#d8c39e' }}>/admin</code> → màn hình <em>Create first user</em> → tạo tài khoản team → xong.
            </li>
          </ol>
          <p style={{ marginTop: 16, fontSize: 12.5, color: 'rgba(248,242,235,0.5)', textAlign: 'center' }}>
            Khoá bảo mật đã được cấu hình sẵn. Website vẫn chạy bình thường với nội dung tĩnh trong lúc chờ.
          </p>
        </div>
      </body>
    </html>
  );
}

const Layout = ({ children }: Args) => {
  if (!cmsReady) return <CmsNotReady />;
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
};

export default Layout;
