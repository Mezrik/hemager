import { defineConfig } from 'vite';
import { node } from '@hemager/build-plugin';
import * as path from 'path';

export default defineConfig({
  plugins: [
    node({
      entry: [path.resolve(__dirname, './src/index.ts')],
      formats: ['es', 'cjs'],
      dts: {
        entryRoot: path.resolve(__dirname, 'src'),
        outDir: path.resolve(__dirname, 'dist'),
        tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
        rollupTypes: true,
        staticImport: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
