import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';




export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './src/index.jsx',
      name: 'ChatWidget',
      fileName: () => 'chat-widget.js',
      formats: ['iife']
    },
    cssCodeSplit: false 
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': '{}',
    'process': '{}'
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
});
