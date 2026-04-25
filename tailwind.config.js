/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ig-blue': '#0095f6',
        'accent': '#FF3040',
        instagram: {
          blue: '#0095f6',
          darkBlue: '#00376b',
          red: '#ff3040',
          grey: '#8e8e8e',
          lightGrey: '#dbdbdb',
          darkGrey: '#262626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pink-glow': 'pink-glow 2s ease-in-out infinite',
        'heart-pop': 'heart-pop 0.45s cubic-bezier(0.17, 0.89, 0.32, 1.49) forwards',
        'scanning': 'scanning 3s linear infinite',
      },
      keyframes: {
        'pink-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'heart-pop': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'scanning': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
