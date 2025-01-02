import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.apk'], // Add this line to include .apk files as assets
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        apk: 'public/app.apk'
      }
    }
  }
});
