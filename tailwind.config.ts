import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — chính xác theo BRAND BOOK AIM AGENCY (không theo brief cũ)
        // Primary: Deep Royal Navy (PANTONE 2756 C) — royal/indigo đậm, mood "Bleu de Chanel"
        navy: {
          DEFAULT: '#1A2150',
          deep: '#12183C', // navy đậm hơn cho footer/lớp nền sâu
          soft: '#27306A', // navy nhạt hơn cho hairline/khối phụ trên nền navy
        },
        // Secondary accent: Light Beige (cream) — nền sáng, không trắng tinh
        beige: {
          DEFAULT: '#F0EAD9',
          warm: '#E7DFC9', // beige ấm hơn cho card/divider trên nền beige
        },
        // Steel = Dusty Blue (PANTONE 7544 C) theo book — cấu trúc/divider
        steel: {
          DEFAULT: '#6E7C89',
          soft: '#93A0AB',
        },
        // Wild Dove (PANTONE 877 C) — xám bạc, dùng rất tiết chế
        dove: '#9DA0A6',
        // Gold/Bronze — "mực" nhấn: hairline, số chương, gạch chân active (<5%)
        gold: {
          DEFAULT: '#B89968',
          bright: '#C7AA7D',
          // Bronze đậm cho TEXT gold trên nền beige (gold thường chỉ ~2:1 — fail AA)
          deep: '#6F5933',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        brand: '0.35em', // tagline "DO RIGHT THINGS" giãn cách rộng
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.06)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        'glow-pulse': 'glow-pulse 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
