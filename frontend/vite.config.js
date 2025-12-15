import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer': ['framer-motion'],
          'axios': ['axios']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    target: 'es2015',
    cssCodeSplit: true,
    reportCompressedSize: false,
    sourcemap: false
  },
  server: {
    port: 5173
  }
})
