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
        // Brand palette — chính xác theo brand system AIM AGENCY
        navy: {
          DEFAULT: '#1B2A4A',
          deep: '#15213B', // navy đậm hơn cho gradient/footer
        },
        beige: {
          DEFAULT: '#F0EAD9',
          warm: '#E7DFC9', // beige ấm hơn cho card/divider trên nền beige
        },
        steel: {
          DEFAULT: '#6E8CA8',
          soft: '#8FA6BC',
        },
        gold: {
          DEFAULT: '#B89968',
          bright: '#C7AA7D',
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
