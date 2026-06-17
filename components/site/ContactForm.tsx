'use client';

import { useState } from 'react';
import { Button, Icon } from '@/components/brandbook/ds';

/* Form liên hệ — trạng thái "đã gửi" tại chỗ (chưa nối backend). */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div style={{ padding: '40px 28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-accent)', background: 'rgba(248,242,235,0.05)', textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-flex',
            height: 56,
            width: 56,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'var(--gold)',
            color: 'var(--navy)',
          }}
        >
          <Icon name="check" size={28} />
        </span>
        <h3 className="aim-display" style={{ fontSize: 24, color: 'var(--ivory)', marginTop: 18 }}>
          Đã nhận, cảm ơn bạn!
        </h3>
        <p style={{ marginTop: 10, fontSize: 14.5, color: 'var(--text-on-dark-muted)' }}>Chúng tôi sẽ phản hồi trong vòng 1–2 ngày làm việc.</p>
        <div style={{ marginTop: 22, display: 'inline-flex' }}>
          <Button variant="outline-light" type="button" onClick={() => setSent(false)}>
            Gửi yêu cầu khác
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
    >
      <input className="aim-input" placeholder="Tên của bạn" aria-label="Tên của bạn" required />
      <input className="aim-input" type="email" placeholder="Email" aria-label="Email" required />
      <input className="aim-input" placeholder="Tên doanh nghiệp" aria-label="Tên doanh nghiệp" />
      <textarea
        className="aim-input"
        rows={5}
        placeholder="Bạn đang cần gì? Kể ngắn gọn về doanh nghiệp và mục tiêu."
        aria-label="Nội dung"
        style={{ resize: 'vertical' }}
      />
      <Button variant="gold" withArrow fullWidth>
        Gửi yêu cầu
      </Button>
    </form>
  );
}
