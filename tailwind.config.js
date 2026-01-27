/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern design system colors
        'dark': '#2c2c2c',
        'gold': '#b8860b',
        'light-accent': '#f4e4c1',
        'page-bg': '#f8f7f4',
        'border-color': '#e0d9cc',
      },
      fontFamily: {
        sansation: ['Sansation', 'sans-serif'],
      },
      backgroundColor: {
        'gold': '#b8860b',
        'dark': '#2c2c2c',
        'light-accent': '#f4e4c1',
        'page-bg': '#f8f7f4',
      },
      textColor: {
        'dark': '#2c2c2c',
        'gold': '#b8860b',
        'muted': '#666',
      },
      borderColor: {
        'gold': '#b8860b',
        'border': '#e0d9cc',
      },
      boxShadow: {
        'none': 'none',
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
        'card': '0 10px 20px rgba(0, 0, 0, 0.35)',
        'hover': '0 15px 30px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'slide-up': 'slideInUp 0.6s ease-out',
        'fade': 'fadeIn 0.6s ease-out',
        'slide-down': 'slideInDown 0.6s ease-out',
        'scale': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
