import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description:
    'Câu chuyện, giá trị và con người của Aim Agency — branding studio cho Startups & SME Việt.',
};

export default function AboutPage() {
  return (
    <ComingSoon
      title="Giới thiệu về Aim"
      description="Câu chuyện và con người đằng sau Aim Agency đang được hoàn thiện. Trong lúc chờ, hãy bắt đầu một cuộc trò chuyện với chúng tôi."
    />
  );
}
