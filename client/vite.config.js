import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/NEWS-AGGREGATOR/',
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000', // your backend runs on port 5000
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
