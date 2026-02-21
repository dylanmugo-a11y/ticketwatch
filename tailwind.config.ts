import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        summer: {
          coral: '#FF6B6B',
          teal: '#00BFA6',
          yellow: '#FFD93D',
          sky: '#4ECDC4',
          pink: '#FF8ED4',
          orange: '#FF9F43',
          sand: '#FFF8F0',
          cream: '#FFFDF7',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-slower': 'float 13s ease-in-out infinite',
        'holo': 'holo-shift 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'holo-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'summer-coral': '0 4px 30px rgba(255, 107, 107, 0.2)',
        'summer-teal': '0 4px 30px rgba(0, 191, 166, 0.2)',
      },
    },
  },
  plugins: [],
}
export default config
