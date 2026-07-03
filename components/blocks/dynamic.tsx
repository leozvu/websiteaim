'use client';

/* Khối động — dữ liệu lấy từ REST /api của Payload phía client (hoạt động cả
   trong khung Live Preview lẫn trang thật). */

import { useEffect, useState } from 'react';
import { Card } from '@/components/brandbook/ds';
import { Reveal } from '@/components/brandbook/primitives';
import { Projects, type Tone } from '@/components/home/sections';
import { PROJECTS } from '@/lib/content';

/* Lưới dự án — đọc collection "Dự án" trong CMS (fallback data tĩnh). */
export function ProjectsGridBlock(b: any) {
  const [items, setItems] = useState<any[] | null>(null);
  useEffect(() => {
    fetch(`/api/projects?limit=${b.limit || 9}&sort=order&depth=0`)
      .then((r) => r.json())
      .then((d) => setItems(d?.docs?.length ? d.docs : (PROJECTS as any[])))
      .catch(() => setItems(PROJECTS as any[]));
  }, [b.limit]);
  return (
    <Projects
      tone={(b.tone as Tone) || 'navy-ink'}
      no={b.no}
      eyebrow={b.eyebrow}
      title={b.title}
      note={b.note}
      items={items ?? []}
    />
  );
}

/* Danh sách bài viết — đọc collection "Bài viết" (published). */
export function PostsListBlock(b: any) {
  const dark = b.tone === 'navy' || b.tone === 'navy-ink';
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const q = new URLSearchParams({
      limit: String(b.limit || 12),
      sort: '-publishedAt',
      depth: '0',
      'where[published][equals]': 'true',
    });
    fetch(`/api/posts?${q}`)
      .then((r) => r.json())
      .then((d) => setPosts(d?.docs || []))
      .catch(() => setPosts([]));
  }, [b.limit]);
  return (
    <div className="aim-grid-3">
      {posts.map((post, i) => (
        <Reveal key={post.id || i} delay={i * 0.05} depth style={{ height: '100%' }}>
          <Card tone={dark ? 'navy' : 'beige'} interactive padding="28px" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span className="aim-eyebrow" style={{ color: dark ? 'var(--gold-bright)' : 'var(--gold-deep)' }}>
                {post.category || 'Góc nhìn'}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--steel)',
                  border: '1px solid var(--border-steel)',
                  borderRadius: 'var(--radius-full)',
                  padding: '3px 9px',
                }}
              >
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : 'Mới'}
              </span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h4)', lineHeight: 1.3, color: dark ? 'var(--ivory)' : 'var(--navy)', margin: '16px 0 0' }}>
              {post.title}
            </h3>
            <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-on-light-muted)', flex: 1 }}>
              {post.excerpt}
            </p>
            <hr className={`aim-rule ${dark ? 'aim-rule--dark' : ''}`} style={{ marginTop: 20 }} />
          </Card>
        </Reveal>
      ))}
      {posts.length === 0 && (
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: dark ? 'var(--text-on-dark-subtle)' : 'var(--steel)' }}>
          Chưa có bài viết — thêm trong /admin → Bài viết.
        </p>
      )}
    </div>
  );
}
