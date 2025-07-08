/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          50: '#fff8f5',
          100: '#ffefe6',
          200: '#ffdcc8',
          300: '#ffc29e',
          400: '#ff9e6b',
          500: '#F2732F',  // Your main orange
          600: '#e85d1a',
          700: '#d14613',
          800: '#a83a13',
          900: '#8a3014',
          950: '#4c1507',
        },
        secondary: {
          50: '#f0f9fc',
          100: '#ddf1f7',
          200: '#bfe3f0',
          300: '#93cfe5',
          400: '#60b2d6',
          500: '#2D8CA8',  // Your teal blue
          600: '#267599',
          700: '#21607e',
          800: '#1f5169',
          900: '#1e4459',
          950: '#112c3b',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin 15s linear infinite reverse',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'dash': 'dash 3s linear infinite',
        'dash-reverse': 'dash 4s linear infinite reverse',
        'dash-slow': 'dash 6s linear infinite',
        'orbit-slow': 'orbit 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        },
        dash: {
          '0%': { strokeDasharray: '0 100' },
          '50%': { strokeDasharray: '50 50' },
          '100%': { strokeDasharray: '100 0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(40px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(40px) rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
