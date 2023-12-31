import type { Config } from 'tailwindcss'

const config: Config = {
  content: {
    relative: true,
    files: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ]
  },
  theme: {
    extend: {
      backgroundColor: {
        
      }
    },
  },
  plugins: [],
  darkMode: ['class', '[data-mode="dark"]'],
}
export default config
