import { defineConfig } from 'vite';
import { node } from '@hemager/build-plugin';
import * as path from 'path';

export default defineConfig({
  plugins: [node()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
