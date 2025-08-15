import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Set base for GitHub Pages based on package.json homepage
  base: '/Personal-letter/',
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  resolve: {
    alias: {
      events: 'events',
      process: 'process/browser',
    },
  },
  optimizeDeps: {
    include: ['events', 'process']
  }
});
