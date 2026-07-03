/* Nội dung cho các trang con. Giọng: chân thành, thực chiến, điềm tĩnh — tiếng Việt.
   Tránh buzzword cấm. Tái sử dụng data ở content.ts khi có thể. */

/* ───────── ABOUT ───────── */
export const ABOUT = {
  hero: {
    eyebrow: 'Giới thiệu · About',
    title: 'Một studio thương hiệu làm đúng việc cho doanh nghiệp Việt',
    intro:
      'Aim ra đời để giúp Startups và SME xây thương hiệu một cách thực tế: chọn đúng việc cần làm, làm cho chuẩn, và nói thật trong suốt quá trình.',
  },
  story: [
    'Phần lớn doanh nghiệp nhỏ ở Việt Nam có sản phẩm tốt nhưng thương hiệu mờ nhạt — không phải vì thiếu nỗ lực, mà vì nguồn lực luôn phải dồn cho việc sống sót từng tháng. Branding thường bị xem là thứ xa xỉ, để sau.',
    'Chúng tôi nghĩ khác. Một nền tảng thương hiệu rõ ràng không phải là trang trí; nó là thứ giúp doanh nghiệp được nhớ, được tin và được chọn. Vấn đề chỉ là làm đúng phần quan trọng, trong đúng ngân sách.',
    'Aim được lập ra để làm đúng điều đó: chuẩn mực của một agency, mức phí hợp lý cho SME, và sự thẳng thắn của một người đồng hành thật sự.',
  ],
  values: [
    { vi: 'Lựa chọn đúng', en: 'Do Right Things', body: 'Chọn đúng việc cần làm trước khi làm nhiều. Không chạy theo trào lưu, không tiêu tiền vào thứ doanh nghiệp chưa cần.' },
    { vi: 'Thực thi chuẩn xác', en: 'Deliver Value Precisely', body: 'Mỗi sản phẩm bàn giao đều có lý do và tiêu chuẩn rõ ràng. Minh bạch, đúng hẹn, đúng phạm vi.' },
    { vi: 'Đồng hành chân thành', en: 'Honest Companionship', body: 'Nói thẳng cả khi điều đó không dễ nghe, và chịu trách nhiệm với việc mình làm. Bảo vệ nguồn lực của bạn là ưu tiên.' },
  ],
  approach: [
    { title: 'Lắng nghe trước', body: 'Buổi trao đổi đầu tiên là để hiểu doanh nghiệp của bạn, không phải để bán dịch vụ. Chúng tôi đề xuất sau khi đã hiểu.' },
    { title: 'Ngân sách thật', body: 'Chúng tôi gói phạm vi gọn trong nguồn lực thực tế của bạn, và nói rõ tiền của bạn tạo ra giá trị gì.' },
    { title: 'Có tên, có mặt', body: 'Phạm vi, tiến độ và người phụ trách đều minh bạch. Nói được làm được — không biến mất giữa chừng.' },
  ],
};

/* ───────── SERVICES (chi tiết + bảng giá + FAQ) ───────── */
export type ServiceDetail = {
  title: string;
  icon: 'strategy' | 'logo' | 'office' | 'publication';
  body: string;
  items: string[];
};

export const SERVICES_DETAIL: ServiceDetail[] = [
  {
    title: 'Chiến lược thương hiệu',
    icon: 'strategy',
    body: 'Nền móng để mọi thứ phía sau nhất quán và đúng hướng.',
    items: ['Nghiên cứu & khách hàng mục tiêu', 'Định vị & kiến trúc thương hiệu', 'Thông điệp & tông giọng', 'Hướng dẫn truyền thông'],
  },
  {
    title: 'Logo & Identity',
    icon: 'logo',
    body: 'Một bộ nhận diện cốt lõi gọn gàng, dùng được lâu dài.',
    items: ['Logo & các phiên bản', 'Hệ màu & typography', 'Quy chuẩn sử dụng', 'Brand book hoàn chỉnh'],
  },
  {
    title: 'Bộ nhận diện văn phòng',
    icon: 'office',
    body: 'Hình ảnh chuyên nghiệp ở mọi điểm chạm với khách hàng.',
    items: ['Danh thiếp & tiêu đề giấy', 'Hồ sơ năng lực', 'Template tài liệu', 'Biển hiệu & vật phẩm'],
  },
  {
    title: 'Ấn phẩm truyền thông',
    icon: 'publication',
    body: 'Đúng nhận diện, đúng mục tiêu — cho mỗi chiến dịch.',
    items: ['Ấn phẩm mạng xã hội', 'Brochure & standee', 'Packaging', 'Ấn phẩm chiến dịch'],
  },
];

export type Tier = {
  name: string;
  en: string;
  desc: string;
  items: string[];
  featured: boolean;
};

export const TIERS: Tier[] = [
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
];

export const PRICING_NOTE = 'Báo giá chi tiết tùy theo phạm vi thực tế — liên hệ để nhận tư vấn không ràng buộc.';

export type Faq = { q: string; a: string };
export const FAQS: Faq[] = [
  {
    q: 'Một dự án branding ở Aim có chi phí khoảng bao nhiêu?',
    a: 'Chi phí phụ thuộc vào phạm vi thực tế. Chúng tôi có ba gói tham chiếu (Khởi đầu, Chuyên nghiệp, Toàn diện) và sẽ báo giá rõ ràng sau buổi trao đổi đầu tiên — bạn luôn biết mình trả cho những gì.',
  },
  {
    q: 'Một dự án thường kéo dài bao lâu?',
    a: 'Một bộ nhận diện cốt lõi thường mất 3–6 tuần; dự án đầy đủ kèm ấn phẩm có thể 8–12 tuần. Tiến độ cụ thể được chốt cùng bạn ngay từ đầu.',
  },
  {
    q: 'Tôi đã có logo rồi, có cần làm lại từ đầu không?',
    a: 'Không nhất thiết. Chúng tôi giữ lại những gì khách hàng của bạn đã tin tưởng và chỉ làm mới phần cần thiết, để thương hiệu đúng tầm hiện tại mà vẫn liền mạch với quá khứ.',
  },
  {
    q: 'Aim có làm việc từ xa với doanh nghiệp ngoài TP.HCM không?',
    a: 'Có. Phần lớn quy trình diễn ra qua online với các mốc rõ ràng; chúng tôi gặp trực tiếp khi thật sự cần.',
  },
  {
    q: 'Sau khi bàn giao thì sao?',
    a: 'Bạn nhận đủ brand book, file gốc và asset để vận hành độc lập. Nếu cần, Aim đồng hành tiếp ở gói Toàn diện trong 6–12 tháng.',
  },
];

export const SERVICES_HERO = {
  eyebrow: 'Dịch vụ & Bảng giá · Services',
  title: 'Làm đúng phần quan trọng, trong đúng ngân sách',
  intro: 'Từ chiến lược đến nhận diện và ấn phẩm — chọn gói phù hợp với giai đoạn của doanh nghiệp bạn.',
};

/* ───────── PROJECTS ───────── */
export const PROJECTS_HERO = {
  eyebrow: 'Dự án · Work',
  title: 'Những thương hiệu đã chọn làm đúng cùng Aim',
  intro: 'Một vài dự án tiêu biểu trên nhiều ngành nghề. Một số dự án được ẩn theo thỏa thuận bảo mật.',
};

/* ───────── CONTACT ───────── */
export const CONTACT_HERO = {
  eyebrow: 'Liên hệ · Contact',
  title: 'Sẵn sàng làm đúng từ đầu?',
  intro: 'Kể cho chúng tôi nghe về doanh nghiệp của bạn. Buổi trao đổi đầu tiên là để hiểu nhau, không ràng buộc.',
};

/* ───────── BLOG ───────── */
export type Post = { title: string; category: string; excerpt: string; status: string };
export const BLOG_HERO = {
  eyebrow: 'Góc nhìn · Journal',
  title: 'Suy nghĩ thẳng thắn về thương hiệu',
  intro: 'Những bài viết thực chiến về branding cho Startups & SME Việt — không lý thuyết suông, không buzzword.',
};
export const POSTS: Post[] = [
  { title: 'Khi nào doanh nghiệp nhỏ thật sự cần làm thương hiệu?', category: 'Chiến lược', excerpt: 'Branding không phải lúc nào cũng là ưu tiên đầu tiên. Đây là cách nhận ra thời điểm đúng.', status: 'Sắp ra mắt' },
  { title: 'Logo đẹp không cứu được một định vị mơ hồ', category: 'Nhận diện', excerpt: 'Vì sao chiến lược phải đi trước thiết kế, và điều gì xảy ra khi làm ngược lại.', status: 'Sắp ra mắt' },
  { title: 'Ngân sách branding cho SME: tiêu vào đâu trước?', category: 'Thực chiến', excerpt: 'Một cách phân bổ thực tế để mỗi đồng chi ra đều tạo khác biệt nhìn thấy được.', status: 'Sắp ra mắt' },
  { title: 'Làm mới thương hiệu mà không đánh mất khách hàng cũ', category: 'Tái định vị', excerpt: 'Giữ lại điều gì, thay đổi điều gì — và cách truyền thông sự thay đổi đó.', status: 'Sắp ra mắt' },
  { title: 'Agency, freelancer hay tự làm: chọn sao cho đúng?', category: 'Vận hành', excerpt: 'Ưu nhược điểm thật của từng lựa chọn, nhìn từ phía doanh nghiệp nhỏ.', status: 'Sắp ra mắt' },
  { title: 'Brand book: tài liệu hay công cụ vận hành?', category: 'Bàn giao', excerpt: 'Cách dùng brand book để giữ thương hiệu nhất quán sau khi dự án kết thúc.', status: 'Sắp ra mắt' },
];
