/* TẠM THỜI — chẩn đoán kết nối DB. Xoá sau khi fix xong. */
import { DB_URL } from '@/lib/cms-ready';

export const dynamic = 'force-dynamic';

function mask(u: string) {
  try {
    const x = new URL(u);
    return { host: x.host, db: x.pathname, params: x.search, user: x.username ? x.username.slice(0, 3) + '…' : '' };
  } catch {
    return { host: '(parse fail)', raw: u.slice(0, 20) };
  }
}

export async function GET() {
  const envNames = Object.keys(process.env)
    .filter((k) => /POSTGRES|DATABASE|PG/.test(k))
    .sort();
  const out: any = { dbUrlResolved: DB_URL ? mask(DB_URL) : null, envNamesPresent: envNames };
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([import('payload'), import('../../payload.config')]);
    const payload = await getPayload({ config });
    const res = await payload.count({ collection: 'users' });
    out.ok = true;
    out.userCount = res.totalDocs;
  } catch (err: any) {
    out.ok = false;
    out.error = String(err?.message || err).slice(0, 500);
    out.cause = err?.cause ? String(err.cause?.message || err.cause).slice(0, 300) : undefined;
  }
  return Response.json(out);
}
