/* AIM Agency — nội dung brand book (port y chang từ design bundle data.jsx).
   Vietnamese-first, bilingual sub-labels. Nội dung thật của AIM. */

export const SITE = {
  name: 'AIM AGENCY',
  tagline: 'Do Right Things',
  domain: 'aimagency.vn',
  email: 'aimagency.hcm@gmail.com',
  phone: '(+84) 799 699 039',
  address: '67 Huỳnh Thiện Lộc, Phường Tân Phú, Hồ Chí Minh',
};

export type Chapter = { no: string; id: string; vi: string; en: string };

export const CHAPTERS: Chapter[] = [
  { no: '01', id: 'strategy', vi: 'Chiến lược thương hiệu', en: 'Brand Strategy' },
  { no: '02', id: 'logo', vi: 'Logo & Nhận diện', en: 'Logo & Identity' },
  { no: '03', id: 'system', vi: 'Màu sắc & Kiểu chữ', en: 'Color & Typography' },
  { no: '04', id: 'stationery', vi: 'Nhận diện văn phòng', en: 'Stationery & Office' },
  { no: '05', id: 'collateral', vi: 'Ấn phẩm truyền thông', en: 'Marketing Collaterals' },
  { no: '06', id: 'pricing', vi: 'Gói & Báo giá', en: 'Packages / Pricing' },
  { no: '07', id: 'start', vi: 'Bắt đầu dự án', en: 'Start Project' },
];

export const STRATEGY = {
  topics: [
    ['Khách hàng mục tiêu', 'Target Customer'],
    ['Sứ mệnh & tầm nhìn', 'Purpose & Vision'],
    ['Lời hứa & giá trị cốt lõi', 'Promise & Core Values'],
    ['Tính cách & giọng nói', 'Personality & Tone'],
    ['Hướng dẫn truyền thông', 'Communication Guide'],
    ['Định vị thương hiệu', 'Brand Positioning'],
  ] as [string, string][],
  quote:
    'Nền tảng chiến lược thương hiệu của Aim — kim chỉ nam cho hành trình xây dựng thương hiệu và tất cả các hoạt động marketing khác.',
  pillars: [
    {
      vi: 'Lựa chọn đúng',
      en: 'Do Right Things',
      body: 'Chọn đúng việc cần làm trước khi làm nhiều. Định vị rõ ràng, mục tiêu thực tế — không chạy theo trào lưu.',
    },
    {
      vi: 'Thực thi chuẩn xác',
      en: 'Deliver Value Precisely',
      body: 'Mỗi sản phẩm bàn giao đều có lý do và tiêu chuẩn rõ ràng. Minh bạch, đúng hẹn, đúng phạm vi.',
    },
    {
      vi: 'Đồng hành chân thành',
      en: 'Honest Companionship',
      body: 'Nói thẳng cả khi điều đó không dễ nghe, và chịu trách nhiệm. Bảo vệ nguồn lực của bạn là ưu tiên.',
    },
  ],
  plate: 'Hình ảnh định hướng chiến lược',
};

export const LOGO = {
  topics: [
    ['Logo chính', 'Primary logo'],
    ['Cấu trúc & tỷ lệ', 'Structure & Grid'],
    ['Khoảng cách an toàn', 'Clear space'],
    ['Các phiên bản', 'Logo Variations'],
    ['Trên nền màu & đơn sắc', 'Background & Monochrome'],
    ['Tránh dùng sai', 'Logo misuses'],
  ] as [string, string][],
  quote:
    'Logo của Aim không chỉ là dấu hiệu nhận diện, mà là kết quả của sự tính toán cẩn trọng trong từng đường nét, tỷ lệ và cấu trúc.',
  backgrounds: [
    { label: 'Trên nền ivory', bg: 'var(--ivory)', fg: 'var(--navy)' },
    { label: 'Trên nền navy', bg: 'var(--navy)', fg: 'var(--ivory)' },
    { label: 'Trên nền phụ trợ', bg: 'var(--steel-pale)', fg: 'var(--navy)' },
    { label: 'Trên nền steel', bg: 'var(--steel)', fg: 'var(--ivory)' },
  ],
  misuses: ['Co kéo logo', 'Sử dụng màu sai quy chuẩn', 'Thay đổi khoảng cách thành tố'],
};

export const SYSTEM = {
  topics: [
    ['Màu sắc chủ đạo', 'Primary colors'],
    ['Màu thứ cấp & nhấn', 'Secondary & Accent'],
    ['Kiểu chữ tiêu đề', 'Primary typeface'],
    ['Kiểu chữ nội dung', 'Secondary typeface'],
  ] as [string, string][],
  quote:
    'Màu sắc tác động trực tiếp đến cảm xúc và nhận thức của người xem — bảng màu là hiện thân tính cách của thương hiệu.',
  colors: [
    { name: 'Deep Royal Navy', role: 'Màu chủ đạo · Primary', hex: '#081650', pantone: 'PANTONE 2766 C', fg: '#F8F2EB' },
    { name: 'Ivory', role: 'Màu nền · Paper', hex: '#F8F2EB', pantone: 'Warm neutral', fg: '#081650' },
    { name: 'Champagne', role: 'Màu nhấn · Accent', hex: '#C5AD8A', pantone: 'Ceremony only', fg: '#081650' },
    { name: 'Steel', role: 'Thứ cấp · Secondary', hex: '#6E7C89', pantone: 'PANTONE 7544 C', fg: '#F8F2EB' },
  ],
  type: {
    primary: { name: 'Garamond', sub: 'Cormorant / EB Garamond — Primary typeface', sample: 'Thương hiệu' },
    secondary: { name: 'Be Vietnam Pro', sub: 'Secondary typeface — body & UI', sample: 'Đồng hành chân thành' },
    weights: ['Light', 'Regular', 'Medium', 'Semibold', 'Bold'],
  },
};

export const STATIONERY = {
  topics: [
    ['Danh thiếp', 'Business card'],
    ['Tiêu đề giấy', 'Letterhead'],
    ['Phong bì, bao thư', 'Envelope'],
    ['Bìa kẹp tài liệu', 'Folder'],
    ['Thẻ nhân viên', 'ID Card'],
    ['Đồng phục', 'Uniform'],
    ['Báo giá', 'Quotation'],
    ['Các vật phẩm khác', 'Merchandises'],
  ] as [string, string][],
  quote: 'Hình ảnh chuyên nghiệp ở mọi điểm chạm với khách hàng — từ danh thiếp đến đồng phục.',
  items: [
    ['Danh thiếp', 'Business card'],
    ['Tiêu đề giấy', 'Letterhead'],
    ['Bìa kẹp tài liệu', 'Folder'],
    ['Phong bì', 'Envelope'],
    ['Đồng phục', 'Uniform'],
    ['Vật phẩm', 'Merchandise'],
  ] as [string, string][],
};

export const COLLATERAL = {
  topics: [
    ['Biển hiệu công ty', 'Company Signboard'],
    ['Băng-rôn', 'Banner'],
    ['Áp phích', 'Poster'],
    ['Ấn phẩm số', 'Digital'],
  ] as [string, string][],
  quote: 'Đúng nhận diện, đúng mục tiêu — ấn phẩm số và in ấn cho mỗi chiến dịch.',
  posters: [
    { kicker: 'Poster', line: 'Branding is about', em: 'Meaning' },
    { kicker: 'Banner', line: 'Sáng', em: 'tạo' },
    { kicker: 'Signboard', line: 'Do Right', em: 'Things' },
  ],
};

export const PRICING = {
  topics: [
    ['Gói dịch vụ', 'Service packages'],
    ['Phạm vi bàn giao', 'Scope & deliverables'],
    ['Quy trình & tiến độ', 'Process & timeline'],
  ] as [string, string][],
  quote:
    'Gói gọn trong ngân sách thực tế của doanh nghiệp — bạn luôn biết tiền của mình tạo ra giá trị gì.',
  tiers: [
    {
      name: 'Khởi đầu',
      en: 'Starter',
      desc: 'Bộ nhận diện cốt lõi cho doanh nghiệp mới.',
      items: ['Chiến lược thương hiệu cô đọng', 'Logo & hệ màu', 'Typography & quy chuẩn', 'Danh thiếp + tiêu đề giấy'],
      featured: false,
    },
    {
      name: 'Chuyên nghiệp',
      en: 'Professional',
      desc: 'Nhận diện đầy đủ cho SME đang tăng trưởng.',
      items: ['Toàn bộ gói Khởi đầu', 'Brand book hoàn chỉnh', 'Bộ nhận diện văn phòng', 'Ấn phẩm truyền thông cơ bản'],
      featured: true,
    },
    {
      name: 'Toàn diện',
      en: 'Complete',
      desc: 'Đồng hành trọn vẹn từ chiến lược đến thị trường.',
      items: ['Toàn bộ gói Chuyên nghiệp', 'Chiến lược truyền thông', 'Ấn phẩm chiến dịch', 'Đồng hành 6–12 tháng'],
      featured: false,
    },
  ],
  note: 'Báo giá chi tiết tùy theo phạm vi thực tế — liên hệ để nhận tư vấn không ràng buộc.',
};

export const START = {
  quote: 'Buổi trao đổi đầu tiên là để hiểu nhau, không ràng buộc.',
  title: 'Sẵn sàng làm đúng từ đầu?',
  body: 'Kể cho chúng tôi nghe về doanh nghiệp của bạn. Chúng tôi lắng nghe trước khi đề xuất.',
};
