import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite dev server proxies API + uploads to the Express backend on :3001
// so the frontend can use same-origin relative paths in fetch/axios.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': { target: 'http://localhost:3001', changeOrigin: true },
      '/uploads': { target: 'http://localhost:3001', changeOrigin: true }
    }
  }
});
