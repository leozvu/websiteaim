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
        // ── AIM Luxury Visual System: "Lit Ink & Metal" ──
        // Ba lớp tối để xếp tầng chiều sâu (deep ink → midnight → royal)
        ink: '#060815', // lớp sâu nhất / nền tối
        midnight: '#0B102B', // lớp giữa
        royal: '#121A44', // lớp nâng / lõi spotlight / card
        // Hai sắc vàng kim loại (shadow → highlight)
        gold: {
          DEFAULT: '#B89968', // giữ cho tương thích
          bright: '#C7AA7D',
          deep: '#6F5933', // bronze đậm cho text gold trên nền sáng (AA)
          antique: '#A9782A', // tông tối của kim loại
          champagne: '#D8B46A', // tông sáng / glint / active
        },
        // Sáng ấm
        ivory: '#F7EEDB', // text display trên nền tối + section "light relief"
        muted: '#BDB6A8', // body text ấm-trầm trên nền tối
        // ── Brand book tokens (giữ cho các trang khác) ──
        navy: { DEFAULT: '#1A2150', deep: '#12183C', soft: '#27306A' },
        beige: { DEFAULT: '#F0EAD9', warm: '#E7DFC9' },
        steel: { DEFAULT: '#6E7C89', soft: '#93A0AB' },
        dove: '#9DA0A6',
      },
      borderColor: {
        hairline: 'rgba(247, 238, 219, 0.14)',
        'hairline-strong': 'rgba(247, 238, 219, 0.22)',
        'gold-line': 'rgba(216, 180, 106, 0.35)',
      },
      backgroundImage: {
        'metal-gold': 'linear-gradient(160deg, #E3C588 0%, #D8B46A 35%, #A9782A 100%)',
      },
      boxShadow: {
        'ink-panel': 'inset 0 1px 0 0 rgba(247,238,219,0.06), 0 24px 50px -28px rgba(0,0,0,0.7)',
        lift: '0 36px 70px -34px rgba(0,0,0,0.65)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        brand: '0.35em', // tagline "DO RIGHT THINGS" giãn cách rộng
      },
      // Motion tokens — rút từ capture reference (chữ ký easing/duration)
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.55, 0.085, 0, 0.99)',
      },
      transitionDuration: {
        450: '450ms',
        600: '600ms',
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
