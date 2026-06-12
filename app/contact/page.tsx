import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Bắt đầu dự án cùng Aim Agency. Buổi trao đổi đầu tiên là để hiểu nhau, không ràng buộc.',
};

export default function ContactPage() {
  return (
    <ComingSoon
      title="Bắt đầu dự án"
      description="Form liên hệ đang được hoàn thiện. Trong lúc chờ, bạn có thể gửi email trực tiếp tới hello@aimagency.vn để bắt đầu trao đổi."
    />
  );
}
