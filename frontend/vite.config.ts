import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Polyfill for CustomEvent in Node.js environment
if (typeof global !== 'undefined' && !global.CustomEvent) {
  global.CustomEvent = class CustomEvent extends Event {
    constructor(event, params = {}) {
      super(event, params);
      this.detail = params.detail;
    }
  };
}

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
