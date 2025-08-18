import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],  // both CommonJS + ESM
  dts: true,               // generate .d.ts files
  sourcemap: true,
  clean: true,             // clean dist before build
  minify: true,            // optional, for smaller bundle
});
