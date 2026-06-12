/**
 * Dữ liệu trang Dịch vụ & Bảng giá — AIM AGENCY.
 * Bảng giá minh bạch theo 5 phân khúc là cam kết công khai của Aim:
 * con số ở đây là con số trong hợp đồng.
 *
 * Quy ước giá: number = VNĐ; null = "Liên hệ" (báo giá theo phạm vi thực tế).
 */

export type TierId = 'corp' | 'sme' | 'series-a' | 'after-b' | 'hkd';

export type Tier = {
  id: TierId;
  /** Nhãn ngắn trên selector. */
  label: string;
  /** Mô tả phân khúc — hiện dưới selector để khách tự nhận diện. */
  description: string;
};

export const TIERS: Tier[] = [
  {
    id: 'corp',
    label: 'Corporate',
    description: 'Doanh nghiệp lớn, nhiều phòng ban — phạm vi rộng, yêu cầu quản trị thương hiệu chặt chẽ.',
  },
  {
    id: 'sme',
    label: 'SMEs',
    description: 'Doanh nghiệp 20–200 nhân sự — cần bộ nhận diện chuẩn chỉnh để cạnh tranh ở tầm cao hơn.',
  },
  {
    id: 'series-a',
    label: 'Startup Series A',
    description: 'Đội ngũ dưới 20 người, vừa gọi vốn — cần thương hiệu đáng tin để tăng trưởng và tuyển dụng.',
  },
  {
    id: 'after-b',
    label: 'Startup sau Series B',
    description: 'Đã có nền tảng và đội ngũ in-house — Aim bổ sung đúng hạng mục còn thiếu, không làm lại từ đầu.',
  },
  {
    id: 'hkd',
    label: 'Small Biz (HKD)',
    description: 'Hộ kinh doanh, cửa hàng nhỏ — khởi đầu gọn với chi phí thấp nhất, đủ dùng và nghiêm túc.',
  },
];

export const DEFAULT_TIER: TierId = 'sme';

export function isTierId(value: string | null | undefined): value is TierId {
  return TIERS.some((t) => t.id === value);
}

/** Giá theo thứ tự phân khúc cố định: corp / sme / series-a / after-b / hkd. */
export type PriceByTier = Record<TierId, number | null>;

function prices(
  corp: number | null,
  sme: number | null,
  seriesA: number | null,
  afterB: number | null,
  hkd: number | null,
): PriceByTier {
  return { corp, sme, 'series-a': seriesA, 'after-b': afterB, hkd };
}

/** Một hạng mục có giá riêng từng phân khúc (nhóm 3 & 4). */
export type PricedItem = {
  name: string;
  price: PriceByTier;
};

/** Nhóm dịch vụ trọn gói: một giá cho cả nhóm (nhóm 1 & 2). */
export type PackageGroup = {
  kind: 'package';
  number: string;
  title: string;
  intro: string;
  /** Các hạng mục nằm trong gói. */
  includes: string[];
  price: PriceByTier;
};

/** Nhóm dịch vụ tính theo hạng mục: bảng giá chi tiết per item (nhóm 3 & 4). */
export type ItemizedGroup = {
  kind: 'itemized';
  number: string;
  title: string;
  intro: string;
  items: PricedItem[];
  /** Ghi chú nổi bật trong card (ví dụ ưu đãi book nhiều hạng mục). */
  note?: { strong: string; detail: string };
};

export type ServiceGroup = PackageGroup | ItemizedGroup;

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    kind: 'package',
    number: '01',
    title: 'Chiến lược thương hiệu',
    intro:
      'Nền móng trước khi chạm vào thiết kế: bạn là ai, nói với ai, và vì sao họ nên tin. Làm một lần, dùng cho mọi quyết định về sau.',
    includes: [
      'Sáng tạo tên thương hiệu',
      'Brand Purpose & Core Values',
      'Brand Story',
      'Brand Positioning',
      'Brand Voice & Tone',
    ],
    price: prices(null, 10_000_000, 5_000_000, null, null),
  },
  {
    kind: 'package',
    number: '02',
    title: 'Logo & nhận diện cốt lõi',
    intro:
      'Bộ nhận diện gọn gàng và dùng được lâu dài — kèm quy chuẩn rõ ràng để đội ngũ của bạn tự vận hành sau bàn giao.',
    includes: [
      'Logo chính + biến thể',
      'Hệ màu',
      'Typography',
      'Pattern / graphic',
      'Brand guidelines',
    ],
    price: prices(null, 35_000_000, 15_000_000, 10_000_000, 600_000),
  },
  {
    kind: 'itemized',
    number: '03',
    title: 'Bộ nhận diện văn phòng',
    intro:
      'Hình ảnh chuyên nghiệp ở từng điểm chạm hằng ngày — chọn đúng hạng mục bạn cần, không phải mua cả combo.',
    items: [
      { name: 'Danh thiếp', price: prices(3_500_000, 1_500_000, 800_000, 650_000, 500_000) },
      { name: 'Letterhead', price: prices(1_000_000, 500_000, 400_000, 300_000, null) },
      { name: 'Phong bì', price: prices(800_000, 500_000, 350_000, 300_000, 350_000) },
      { name: 'Bìa kẹp tài liệu', price: prices(2_500_000, 1_500_000, 800_000, 650_000, null) },
      { name: 'Báo giá design', price: prices(1_500_000, 800_000, 500_000, 500_000, null) },
      { name: 'Thẻ nhân viên', price: prices(2_500_000, 1_500_000, 800_000, 650_000, null) },
      { name: 'Đồng phục', price: prices(6_000_000, 3_000_000, 1_500_000, 1_000_000, 800_000) },
    ],
    note: {
      strong: 'Book từ 6 hạng mục trở lên: giảm 10% tổng chi phí.',
      detail: 'Không áp dụng cho Small Biz (HKD).',
    },
  },
  {
    kind: 'itemized',
    number: '04',
    title: 'Ấn phẩm truyền thông',
    intro:
      'Ấn phẩm cho bán hàng và truyền thông — thiết kế theo đúng nhận diện đã có, mỗi ấn phẩm phục vụ một mục tiêu cụ thể.',
    items: [
      { name: 'Brochure', price: prices(35_000_000, 20_000_000, 10_000_000, 6_000_000, null) },
      { name: 'Company Profile', price: prices(35_000_000, 20_000_000, 10_000_000, 6_000_000, null) },
      { name: 'Catalogue', price: prices(35_000_000, 20_000_000, 10_000_000, 6_000_000, null) },
      { name: 'Pitch Deck', price: prices(50_000_000, 30_000_000, 15_000_000, 10_000_000, 7_000_000) },
      { name: 'Leaflet', price: prices(15_000_000, 9_500_000, 4_500_000, 3_000_000, 800_000) },
      { name: 'Flyer A4/A5', price: prices(3_500_000, 1_500_000, 800_000, 650_000, 500_000) },
      { name: 'Voucher', price: prices(3_500_000, 1_500_000, 800_000, 650_000, 500_000) },
      { name: 'Thiệp mời', price: prices(5_500_000, 3_500_000, 2_000_000, 1_500_000, null) },
      { name: 'Banner', price: prices(5_500_000, 3_000_000, 2_000_000, 1_500_000, 650_000) },
    ],
  },
];

/** Format giá VNĐ: 35.000.000đ. null → "Liên hệ" (báo giá theo phạm vi thực tế). */
const vnNumber = new Intl.NumberFormat('vi-VN');

export function formatPrice(price: number | null): string {
  if (price === null) return 'Liên hệ';
  return `${vnNumber.format(price)}đ`;
}

/** Quy trình 4 bước — bản chi tiết cho trang Dịch vụ, kèm thời lượng từng bước. */
export type ProcessDetail = {
  number: string;
  title: string;
  en: string;
  duration: string;
  body: string;
};

export const PROCESS_DETAIL: ProcessDetail[] = [
  {
    number: '01',
    title: 'Khám phá',
    en: 'Discover',
    duration: '2–3 ngày',
    body: 'Bạn điền một form chi tiết theo nhịp của mình — không cần xếp lịch họp. Chúng tôi đọc kỹ, đặt câu hỏi làm rõ và xác nhận phạm vi phù hợp với ngân sách thật.',
  },
  {
    number: '02',
    title: 'Chiến lược',
    en: 'Strategy',
    duration: '1 tuần',
    body: 'Chốt định vị và dựng moodboard để thống nhất cảm giác thị giác. Hai bên đồng thuận về hướng đi trước khi vẽ bất kỳ thứ gì — sửa ở giai đoạn này rẻ hơn nhiều lần.',
  },
  {
    number: '03',
    title: 'Thiết kế',
    en: 'Design',
    duration: '2–3 tuần',
    body: 'Phát triển concept từ chiến lược đã chốt, trình bày kèm lý do cho từng lựa chọn. Hai vòng revision đã nằm sẵn trong giá — không phát sinh bất ngờ.',
  },
  {
    number: '04',
    title: 'Bàn giao',
    en: 'Deliver',
    duration: '1 tuần',
    body: 'Đóng gói brand book, file gốc AI/Figma và toàn bộ asset xuất sẵn. Bạn nhận đủ công cụ để tự vận hành — không phụ thuộc vào chúng tôi sau dự án.',
  },
];

export const PROCESS_TOTAL_NOTE = 'Tổng thời gian một dự án nhận diện trọn vẹn: 4–6 tuần.';

/** FAQ — trả lời thẳng, có con số và điều kiện cụ thể. */
export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Tôi không hài lòng với concept đầu tiên thì sao?',
    answer:
      'Mỗi dự án có sẵn 2 vòng revision miễn phí — đủ để đi từ góp ý đến phương án hoàn thiện trong hầu hết trường hợp. Từ vòng thứ 3 trở đi, chi phí tính theo giờ làm việc thực tế và được báo trước khi bắt đầu.',
  },
  {
    question: 'Có hoàn tiền không?',
    answer:
      'Có, với điều kiện rõ ràng: hủy trước khi bước vào phase Design, bạn nhận lại 50% giá trị hợp đồng. Sau khi Design đã bắt đầu, chúng tôi không hoàn tiền — vì phần lớn công sức của dự án nằm ở đó.',
  },
  {
    question: 'Trả góp được không?',
    answer:
      'Thanh toán chia hai đợt: 50% đặt cọc khi ký hợp đồng, 50% còn lại khi bàn giao file. Không thu thêm khoản nào ở giữa.',
  },
  {
    question: 'Cần gấp hơn deadline thì sao?',
    answer:
      'Có phương án rush: phụ phí 30% trên giá trị hạng mục, đổi lại timeline rút ngắn 30–40%. Chúng tôi chỉ nhận rush khi chắc chắn giữ được chất lượng — nếu không làm kịp mà vẫn đạt chuẩn, chúng tôi sẽ từ chối thẳng.',
  },
  {
    question: 'Aim có làm cho đối thủ trực tiếp của tôi không?',
    answer:
      'Không, trong thời gian hợp tác. Hợp đồng có điều khoản NDA và non-compete trong ngành hàng cụ thể của bạn — chúng tôi không nhận hai thương hiệu cạnh tranh trực tiếp cùng lúc.',
  },
  {
    question: 'File source có được bàn giao không?',
    answer:
      'Có, đầy đủ. Bạn nhận file gốc AI/Figma, brand guidelines bản PDF và asset xuất sẵn cho các kênh thông dụng. File là tài sản của bạn, không giữ làm "con tin" cho dịch vụ về sau.',
  },
  {
    question: 'Sau khi bàn giao có support không?',
    answer:
      'Có 30 ngày hỗ trợ miễn phí cho các lỗi format, export hoặc hiển thị của file đã bàn giao. Nhu cầu thiết kế mới phát sinh sau đó sẽ được báo giá như một hạng mục riêng.',
  },
  {
    question: 'Tôi muốn nhiều hạng mục nhưng ngân sách khít thì sao?',
    answer:
      'Hai lựa chọn: book từ 6 hạng mục trở lên để được giảm 10% tổng chi phí, hoặc trao đổi 30 phút với chúng tôi để chia dự án thành các giai đoạn — làm phần quan trọng nhất trước, phần còn lại khi nguồn lực sẵn sàng.',
  },
];

/** Hero + CTA trang Services. */
export const SERVICES_HERO = {
  eyebrow: 'Dịch vụ & Bảng giá',
  title: 'Bảng giá minh bạch.',
  subtitle:
    'Chọn đúng phân khúc của bạn. Aim không bán những dịch vụ viển vông — mỗi con số dưới đây là cam kết.',
  /** Dòng meta khẳng định tính niêm yết — anchor of trust. */
  meta: ['Niêm yết công khai', 'Đơn vị: VNĐ', 'Hiệu lực từ 06/2026'],
} as const;

export const SERVICES_FINAL_CTA = {
  title: 'Bắt đầu từ một bước nhỏ — chọn đúng tên thương hiệu trước đã.',
  body: 'Một buổi trao đổi 30 phút, không ràng buộc. Bạn kể về doanh nghiệp, chúng tôi nói thẳng nên bắt đầu từ đâu — kể cả khi câu trả lời là "chưa cần thuê agency".',
  cta: { label: 'Đặt lịch tư vấn 30 phút', href: '/contact' },
} as const;
