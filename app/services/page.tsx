import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Dịch vụ & Bảng giá',
  description:
    'Chiến lược thương hiệu, logo & identity, bộ nhận diện văn phòng và ấn phẩm truyền thông — cùng bảng giá minh bạch.',
};

export default function ServicesPage() {
  return (
    <ComingSoon
      title="Dịch vụ & Bảng giá"
      description="Trang dịch vụ chi tiết và bảng giá minh bạch đang được hoàn thiện. Hãy liên hệ để nhận tư vấn phù hợp với nhu cầu của bạn."
    />
  );
}
