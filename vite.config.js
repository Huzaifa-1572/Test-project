import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { src: "/src" },
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    assetsInlineLimit: 0
  },
  optimizeDeps: {
    include: ['@mui/material', '@emotion/react', '@emotion/styled'],
    force: true,
  },
  server: {
    host: '0.0.0.0', // Allow access from network devices
  },
})
