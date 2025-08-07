import { resolve } from 'node:path';

import { tanstackRouter } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    viteReact(),
    nodePolyfills()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
