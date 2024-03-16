import type { Config } from 'tailwindcss';

const config: Config = {
  content: {
    relative: true,
    files: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        'line-input': '0 0 0 2px #85B8FF',
        'border-modal':
          '0px 0px 0px 1px #39424a, 0px 8px 12px #0304045C, 0px 0px 1px 1px #03040480',
      },
      transitionProperty: {
        'dark-mode': 'backgroundColor, transform',
      },
      backgroundColor: {
        overlay: '#000000a3',
        'surface-overlay': '#282E33',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
  important: true,
};
export default config;
