import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/nav';

/** sitemap.xml — 7 trang theo sitemap brief. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/services', '/projects', '/contact', '/blog'];

  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
