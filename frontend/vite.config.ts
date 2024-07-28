import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react() // Plugin for integrating React with Vite
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Alias to resolve '@' to './src' directory
    }
  },
  base: '/', // Set the base path to make paths relative
  assetsInclude: ['**/*.gif', '**/*.mp4'], // Include GIF and MP4 files in assets
  build: {
    outDir: 'dist', // Specify the output directory for the build
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  preview: {
    port: 5173 // Configure the port for Vite's development server preview
  }
});
