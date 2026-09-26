/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0710',
        bg2: '#140b1f',
        warmwhite: '#f6f1e9',
        glow: {
          pink: '#ff8fc9',
          purple: '#b78bff',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Sora"', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(183, 139, 255, 0.15)',
      },
      backdropBlur: {
        glass: '16px',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { transform: 'translateY(-110vh) translateX(20px)', opacity: 0 },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        floatUp: 'floatUp 8s linear infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
