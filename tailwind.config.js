/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
