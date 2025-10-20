import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import sri from "vite-plugin-sri";
import { createHtmlPlugin } from "vite-plugin-html";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE_PATH ?? "/",
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        entry: "./src/main.tsx",
        template: "./index.html",
      }),
      tsConfigPaths(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  };
});
