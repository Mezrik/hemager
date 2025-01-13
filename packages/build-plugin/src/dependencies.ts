import { Plugin } from "vite";
import { nodeExternals } from "rollup-plugin-node-externals";

export function dependencies(): Plugin {
  return {
    ...nodeExternals(),
    name: "node-externals",
    enforce: "pre",
    apply: "build",
  };
}
