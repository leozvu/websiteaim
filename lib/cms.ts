/* Đọc nội dung từ Payload CMS — fallback về data tĩnh khi CMS trống/lỗi
   (site không bao giờ chết vì CMS). Server-only. */

import { getPayload } from 'payload';
import config from '@payload-config';
import { POSTS as STATIC_POSTS, type Post as StaticPost } from '@/lib/pages';
import { PROJECTS as STATIC_PROJECTS, type Project as StaticProject } from '@/lib/content';

export type CmsPost = StaticPost & { slug?: string };

export async function getPosts(): Promise<{ posts: CmsPost[]; fromCms: boolean }> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: 'posts',
      where: { published: { equals: true } },
      sort: '-publishedAt',
      limit: 24,
      depth: 0,
    });
    if (res.docs.length > 0) {
      return {
        fromCms: true,
        posts: res.docs.map((d: any) => ({
          title: d.title,
          slug: d.slug,
          category: d.category || 'Góc nhìn',
          excerpt: d.excerpt || '',
          status: d.publishedAt ? new Date(d.publishedAt).toLocaleDateString('vi-VN') : 'Mới',
        })),
      };
    }
  } catch {
    /* CMS chưa sẵn sàng → dùng data tĩnh */
  }
  return { posts: STATIC_POSTS, fromCms: false };
}

export async function getProjects(): Promise<{ projects: StaticProject[]; fromCms: boolean }> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({ collection: 'projects', sort: 'order', limit: 24, depth: 0 });
    if (res.docs.length > 0) {
      return {
        fromCms: true,
        projects: res.docs.map((d: any) => ({
          name: d.name,
          industry: d.industry,
          from: d.from || '#081650',
          to: d.to || '#6e7c89',
        })),
      };
    }
  } catch {
    /* fallback */
  }
  return { projects: STATIC_PROJECTS, fromCms: false };
}
