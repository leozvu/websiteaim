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
        <div style={{ maxWidth: 560, textAlign: 'center' }}>
          <div style={{ fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c5ad8a', marginBottom: 18 }}>
            AIM Agency CMS
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 600, margin: 0, lineHeight: 1.25 }}>CMS chưa được kích hoạt trên production</h1>
          <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.7, color: 'rgba(248,242,235,0.78)' }}>
            Cần thêm biến môi trường <code style={{ color: '#d8c39e' }}>DATABASE_URL</code> (Postgres — Neon free) và{' '}
            <code style={{ color: '#d8c39e' }}>PAYLOAD_SECRET</code> trên Vercel, sau đó chạy{' '}
            <code style={{ color: '#d8c39e' }}>npm run cms:init</code> một lần để khởi tạo schema + tài khoản admin.
          </p>
          <p style={{ marginTop: 10, fontSize: 13.5, color: 'rgba(248,242,235,0.55)' }}>
            Hướng dẫn từng bước trong <code style={{ color: '#d8c39e' }}>CMS_SETUP.md</code> của repo. Website vẫn chạy bình thường với nội
            dung tĩnh trong lúc chờ.
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
