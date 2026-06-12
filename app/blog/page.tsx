import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Góc nhìn thực chiến về thương hiệu, marketing và xây dựng doanh nghiệp tại Việt Nam.',
};

export default function BlogPage() {
  return (
    <ComingSoon
      title="Blog của Aim"
      description="Những bài viết thực chiến về thương hiệu và marketing đang được chuẩn bị. Sẽ sớm ra mắt."
    />
  );
}
