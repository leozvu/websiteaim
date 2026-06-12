import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Dự án',
  description: 'Các dự án branding tiêu biểu Aim đã thực hiện cùng Startups & SME Việt.',
};

export default function ProjectsPage() {
  return (
    <ComingSoon
      title="Dự án của Aim"
      description="Bộ sưu tập dự án đầy đủ đang được hoàn thiện. Một số dự án được ẩn theo thỏa thuận bảo mật (NDA)."
    />
  );
}
