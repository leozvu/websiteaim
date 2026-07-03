/* Trang admin Payload — /admin và mọi segment con. */
import type { Metadata } from 'next';
import config from '@payload-config';
import { generatePageMetadata, RootPage } from '@payloadcms/next/views';
import { cmsReady } from '@/lib/cms-ready';
import { importMap } from '../importMap.js';

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
  if (!cmsReady) return { title: 'CMS chưa kích hoạt · AIM Agency' };
  return generatePageMetadata({ config, params, searchParams });
};

const Page = ({ params, searchParams }: Args) => {
  if (!cmsReady) return null; // layout đã hiện trang hướng dẫn
  return RootPage({ config, params, searchParams, importMap });
};

export default Page;
