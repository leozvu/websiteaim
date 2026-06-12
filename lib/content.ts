/**
 * Toàn bộ nội dung tiếng Việt của trang chủ AIM AGENCY.
 * Tách data khỏi UI để dễ chỉnh sửa và tái sử dụng.
 * Giọng thương hiệu: chân thành, thực chiến, điềm tĩnh — ưu tiên tiếng Việt.
 */

export const BRAND_PROMISE =
  'Aim không bao giờ bán những dịch vụ viển vông, luôn tập trung bảo vệ nguồn lực và hiện thực hóa mục tiêu của doanh nghiệp bằng hoạt động marketing hợp lý.';

export const HERO = {
  title: 'Do Right Things.',
  subtitle:
    'Branding studio cho Startups & SME Việt. Lựa chọn đúng. Thực thi chuẩn xác. Đồng hành chân thành.',
  primaryCta: { label: 'Xem bảng giá', href: '/services' },
  secondaryCta: { label: 'Bắt đầu dự án', href: '/contact' },
} as const;

/** Section 2 — 3 trụ USP. icon: định danh để component render SVG line tương ứng. */
export type UspPillar = {
  vi: string;
  en: string;
  body: string;
  icon: 'aim' | 'precision' | 'handshake';
};

export const USP_PILLARS: UspPillar[] = [
  {
    vi: 'Lựa chọn đúng',
    en: 'Do Right Things',
    icon: 'aim',
    body: 'Trước khi làm nhiều, chúng tôi giúp bạn chọn đúng việc cần làm. Định vị rõ ràng, mục tiêu thực tế — không chạy theo trào lưu, không tiêu tiền vào thứ doanh nghiệp chưa cần.',
  },
  {
    vi: 'Thực thi chuẩn xác',
    en: 'Deliver Value Precisely',
    icon: 'precision',
    body: 'Mỗi sản phẩm bàn giao đều có lý do và tiêu chuẩn rõ ràng. Quy trình minh bạch, đúng hẹn, đúng phạm vi — bạn luôn biết tiền của mình đang tạo ra giá trị gì.',
  },
  {
    vi: 'Đồng hành chân thành',
    en: 'Honest Companionship',
    icon: 'handshake',
    body: 'Chúng tôi nói thẳng cả khi điều đó không dễ nghe, và chịu trách nhiệm với việc mình làm. Bảo vệ nguồn lực của bạn là ưu tiên, không phải bán thêm dịch vụ.',
  },
];

/** Section 3 — Vì sao AIM: pain point đối lập với cách Aim giải. */
export type PainSolution = {
  painTitle: string;
  pain: string;
  solutionTitle: string;
  solution: string;
};

export const PAIN_SOLUTIONS: PainSolution[] = [
  {
    painTitle: 'Vô danh trên thị trường',
    pain: 'Sản phẩm tốt nhưng khách hàng không biết bạn là ai, không nhớ tên, không có lý do để chọn bạn thay vì đối thủ.',
    solutionTitle: 'Một định vị khách hàng nhớ được',
    solution: 'Chúng tôi xây nền tảng thương hiệu từ giá trị thật của bạn: bạn là ai, khác biệt ở đâu, vì sao đáng tin. Đủ rõ để thị trường gọi đúng tên.',
  },
  {
    painTitle: 'Mắc kẹt trong survival mode',
    pain: 'Mọi nguồn lực dồn cho việc sống sót từng tháng, không còn chỗ cho thương hiệu — dù biết về lâu dài đó là điều giữ doanh nghiệp đứng vững.',
    solutionTitle: 'Làm đúng phần quan trọng trước',
    solution: 'Chúng tôi không bắt bạn làm tất cả cùng lúc. Ưu tiên đúng hạng mục tạo ra khác biệt ngay, gói gọn trong ngân sách thực tế của doanh nghiệp.',
  },
  {
    painTitle: 'Khủng hoảng thuê ngoài',
    pain: 'Agency lớn báo giá quá đắt và xa cách. Freelancer rẻ hơn nhưng thiếu trách nhiệm, làm nửa chừng rồi biến mất, để lại mớ việc dang dở.',
    solutionTitle: 'Cam kết rõ, chịu trách nhiệm rõ',
    solution: 'Một đội ngũ chuẩn agency với mức phí hợp lý cho SME. Phạm vi, tiến độ và người phụ trách đều minh bạch — nói được làm được, có tên có mặt.',
  },
  {
    painTitle: 'Thương hiệu già hóa',
    pain: 'Bộ nhận diện làm từ nhiều năm trước nay đã lỗi thời, không còn phản ánh đúng vị thế và khiến doanh nghiệp trông cũ kỹ trong mắt khách hàng mới.',
    solutionTitle: 'Làm mới mà không đánh mất gốc',
    solution: 'Chúng tôi giữ lại những gì khách hàng đã tin tưởng và làm mới phần cần thiết, để thương hiệu trông đúng tầm hiện tại mà vẫn liền mạch với quá khứ.',
  },
];

/** Section 4 — Dịch vụ preview. */
export type ServiceCard = {
  title: string;
  body: string;
  icon: 'strategy' | 'logo' | 'office' | 'publication';
};

export const SERVICE_CARDS: ServiceCard[] = [
  {
    title: 'Chiến lược thương hiệu',
    icon: 'strategy',
    body: 'Định vị, kiến trúc thương hiệu, thông điệp và tông giọng. Nền móng để mọi thứ phía sau nhất quán và đúng hướng.',
  },
  {
    title: 'Logo & Identity',
    icon: 'logo',
    body: 'Logo, hệ màu, typography và quy chuẩn sử dụng. Một bộ nhận diện cốt lõi gọn gàng, dùng được lâu dài.',
  },
  {
    title: 'Bộ nhận diện văn phòng',
    icon: 'office',
    body: 'Danh thiếp, hồ sơ năng lực, template tài liệu, biển hiệu. Hình ảnh chuyên nghiệp ở mọi điểm chạm với khách hàng.',
  },
  {
    title: 'Ấn phẩm truyền thông',
    icon: 'publication',
    body: 'Ấn phẩm số và in ấn cho chiến dịch: social, brochure, standee, packaging. Đúng nhận diện, đúng mục tiêu.',
  },
];

export const SERVICES_CTA = { label: 'Xem bảng giá chi tiết', href: '/services' } as const;

/** Section 5 — Quy trình 4 bước. */
export type ProcessStep = {
  number: string;
  title: string;
  en: string;
  body: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Khám phá',
    en: 'Discover',
    body: 'Bắt đầu bằng một form tìm hiểu không ràng buộc thời gian. Bạn chia sẻ về doanh nghiệp, mục tiêu và nguồn lực — chúng tôi lắng nghe trước khi đề xuất.',
  },
  {
    number: '02',
    title: 'Chiến lược',
    en: 'Strategy',
    body: 'Chốt định vị và hướng đi, dựng moodboard để thống nhất cảm giác thị giác. Đồng thuận về chiến lược trước khi chạm vào thiết kế.',
  },
  {
    number: '03',
    title: 'Thiết kế',
    en: 'Design',
    body: 'Phát triển concept, trình bày phương án và tinh chỉnh qua các vòng revision rõ ràng. Bạn thấy được lý do đằng sau mỗi lựa chọn.',
  },
  {
    number: '04',
    title: 'Bàn giao',
    en: 'Deliver',
    body: 'Đóng gói brand book cùng toàn bộ file gốc và asset. Bạn nhận đủ công cụ để vận hành thương hiệu một cách độc lập.',
  },
];

/** Section 6 — Lộ trình phát triển của Aim. */
export type RoadmapMilestone = {
  year: string;
  title: string;
  body: string;
};

export const ROADMAP: RoadmapMilestone[] = [
  {
    year: '2026',
    title: 'Branding Agency',
    body: 'Khởi đầu với năng lực cốt lõi: chiến lược và nhận diện thương hiệu cho Startups & SME Việt.',
  },
  {
    year: '2028',
    title: 'Digital Marketing',
    body: 'Mở rộng sang vận hành kênh số, đưa thương hiệu đã xây ra đến đúng khách hàng.',
  },
  {
    year: '2029',
    title: 'KOL / Influencer Booking',
    body: 'Kết nối thương hiệu với mạng lưới gương mặt phù hợp, có chọn lọc và đo lường được.',
  },
  {
    year: '2030',
    title: 'Production House',
    body: 'Tự chủ sản xuất hình ảnh và video, kiểm soát chất lượng từ ý tưởng đến thành phẩm.',
  },
  {
    year: '2036',
    title: 'Media Agency',
    body: 'Hợp nhất chiến lược, sáng tạo, sản xuất và truyền thông trong một hệ thống hoàn chỉnh.',
  },
];

/** Section 7 — Dự án nổi bật (mock). */
export type Project = {
  name: string;
  industry: string;
  /** Cặp màu gradient cho SVG placeholder (from -> to). */
  from: string;
  to: string;
};

export const PROJECTS: Project[] = [
  { name: 'BamBoo Café', industry: 'F&B', from: '#1B2A4A', to: '#6E8CA8' },
  { name: 'ZenMart', industry: 'Bán lẻ', from: '#2A3A5C', to: '#B89968' },
  { name: 'Akashi Studio', industry: 'Sáng tạo', from: '#15213B', to: '#8FA6BC' },
  { name: 'Nhà Mộc', industry: 'Nội thất', from: '#1B2A4A', to: '#B89968' },
  { name: 'VietGrain', industry: 'Nông nghiệp', from: '#243859', to: '#6E8CA8' },
  { name: 'Lumen Tech', industry: 'Công nghệ', from: '#15213B', to: '#6E8CA8' },
];

export const PROJECTS_NDA_NOTE = 'Một số dự án được ẩn theo thỏa thuận bảo mật (NDA).';

/** Section 8 — CTA cuối. */
export const FINAL_CTA = {
  title: 'Sẵn sàng làm đúng từ đầu?',
  body: 'Kể cho chúng tôi nghe về doanh nghiệp của bạn. Buổi trao đổi đầu tiên là để hiểu nhau, không ràng buộc.',
  cta: { label: 'Bắt đầu dự án', href: '/contact' },
} as const;
