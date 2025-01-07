import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { lingui } from '@lingui/vite-plugin';
import * as path from 'path';

const resolvePath = (str: string) => path.resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['macros'],
      },
    }),
    lingui(),
  ],
  resolve: {
    alias: {
      '@': resolvePath('./src'),
      '@wailsjs': resolvePath('./src/generated/wailsjs'),
      '@server-api': resolvePath('./src/generated/server'),
    },
  },
  base: './',
  server: {
    port: 8080,
    strictPort: true,
  },
});
