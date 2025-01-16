import { defineConfig } from "vite";
import * as path from "path";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: [path.resolve(__dirname, "./src/index.ts")],
      formats: ["es"],
    },
  },
  plugins: [
    dtsPlugin({
      entryRoot: path.resolve(__dirname, "src"),
      outDir: path.resolve(__dirname, "dist"),
      tsconfigPath: path.resolve(__dirname, "tsconfig.json"),
      rollupTypes: true,
      staticImport: true,
    }),
  ],
});
