import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix: Define __dirname for ESM environment as it is not globally available
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  resolve: {
    alias: {
      // Fix: Use the ESM-defined __dirname to resolve path
      '@': path.resolve(__dirname, './'),
      // Fix: Use the ESM-defined __dirname to resolve path
      'components': path.resolve(__dirname, './components'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    historyApiFallback: true
  }
});
