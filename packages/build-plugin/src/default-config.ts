import { Plugin } from "vite";
import pathe from "pathe";
import { readFile } from "fs/promises";

type Format = "es" | "cjs" | "iife";

function defaultOutExtension({
  format,
  pkgType,
}: {
  format: Format;
  pkgType?: string;
}): { js: string; dts: string } {
  let jsExtension = ".js";
  let dtsExtension = ".d.ts";
  const isModule = pkgType === "module";
  if (isModule && format === "cjs") {
    jsExtension = ".cjs";
    dtsExtension = ".d.cts";
  }
  if (!isModule && format === "es") {
    jsExtension = ".mjs";
    dtsExtension = ".d.mts";
  }
  if (format === "iife") {
    jsExtension = ".global.js";
  }
  return {
    js: jsExtension,
    dts: dtsExtension,
  };
}

export function config(options: {
  entry: string[];
  formats: Format[];
  outDir?: string;
}): Plugin {
  return {
    name: "node-config",
    async config(config) {
      const root = config.root ?? process.cwd();
      const jsonPath = pathe.resolve(root, "package.json");

      const packageJson = JSON.parse(await readFile(jsonPath, "utf-8"));

      return {
        build: {
          outDir: options.outDir,
          lib: {
            entry: options.entry,
            formats: options.formats,
            fileName(_format, entryName) {
              const ext = defaultOutExtension({
                format: _format as any,
                pkgType: packageJson.type,
              });

              return `${pathe.basename(entryName, pathe.extname(entryName))}${ext.js}`;
            },
          },
          target: "esnext",
        },
        resolve: {
          mainFields: ["module", "jsnext:main", "jsnext"],
          conditions: ["node"],
        },
      };
    },
    apply: "build",
  };
}
