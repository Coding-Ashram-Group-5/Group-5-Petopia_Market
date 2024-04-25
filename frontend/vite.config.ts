import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './', // Set the base path to make paths relative
  build: {
    outDir: 'dist', // Specify the output directory for the build
    assetsDir: './', // Set assetsDir to make asset paths relative

  },
  preview: {
    port: 5137,
  }
})
