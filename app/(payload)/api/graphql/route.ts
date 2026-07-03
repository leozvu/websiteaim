import config from '@payload-config';
import { GRAPHQL_POST, REST_OPTIONS } from '@payloadcms/next/routes';
import { cmsReady } from '@/lib/cms-ready';

const notReady = () => Response.json({ error: 'CMS chưa kích hoạt (xem CMS_SETUP.md)' }, { status: 503 });

const gqlPost = GRAPHQL_POST(config);
const restOptions = REST_OPTIONS(config);

export const POST = ((...args: Parameters<typeof gqlPost>) => (cmsReady ? gqlPost(...args) : notReady())) as typeof gqlPost;
export const OPTIONS = ((...args: Parameters<typeof restOptions>) => (cmsReady ? restOptions(...args) : notReady())) as typeof restOptions;
