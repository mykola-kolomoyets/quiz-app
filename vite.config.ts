import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  css: {
    postcss: null,
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: `@import ${path.resolve(
    //       __dirname,
    //       "src/variables.scss"
    //     )}; @import ${path.resolve(__dirname, "src/reset.scss")};`,
    //   },
    // },
  },
});
