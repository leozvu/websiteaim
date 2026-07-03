/* REST API của Payload — /api/... Trả 503 khi CMS chưa kích hoạt trên Vercel. */
import config from '@payload-config';
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes';
import { cmsReady } from '@/lib/cms-ready';

const notReady = () =>
  Response.json({ error: 'CMS chưa kích hoạt — cần DATABASE_URL + PAYLOAD_SECRET trên Vercel (xem CMS_SETUP.md)' }, { status: 503 });

const guard = <T extends (...args: any[]) => any>(handler: T) =>
  ((...args: Parameters<T>) => (cmsReady ? handler(...args) : notReady())) as T;

export const GET = guard(REST_GET(config));
export const POST = guard(REST_POST(config));
export const DELETE = guard(REST_DELETE(config));
export const PATCH = guard(REST_PATCH(config));
export const PUT = guard(REST_PUT(config));
export const OPTIONS = guard(REST_OPTIONS(config));
