import { Plugin } from "vite";
import dts, { PluginOptions as DtsPluginOptions } from "vite-plugin-dts";

import { dependencies } from "./dependencies";
import { config } from "./default-config";
import { shims } from "./shims";

export interface BuildOptions {
  entry?: string | string[];
  formats?: ("es" | "cjs")[];
  dts?: DtsPluginOptions;
}

export async function node(options?: BuildOptions): Promise<Plugin[]> {
  const entry = options?.entry
    ? Array.isArray(options.entry)
      ? options.entry
      : [options.entry]
    : ["src/index.ts"];

  const plugins: Plugin[] = [
    dependencies(),
    config({
      entry,
      formats: options?.formats ?? ["es"],
      outDir: "dist",
    }),
    shims(),
    dts({ rollupTypes: true, ...(options?.dts ?? {}) }),
  ];

  return plugins;
}
