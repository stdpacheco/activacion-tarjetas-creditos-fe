import { defineConfig, loadEnv } from "file:///C:/TMP/DesaNW2/V11/contrataciones-tarjetas-creditos-fe/node_modules/vite/dist/node/index.js";
import react from "file:///C:/TMP/DesaNW2/V11/contrataciones-tarjetas-creditos-fe/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { createHtmlPlugin } from "file:///C:/TMP/DesaNW2/V11/contrataciones-tarjetas-creditos-fe/node_modules/vite-plugin-html/dist/index.mjs";
import tsConfigPaths from "file:///C:/TMP/DesaNW2/V11/contrataciones-tarjetas-creditos-fe/node_modules/vite-tsconfig-paths/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\TMP\\DesaNW2\\V11\\contrataciones-tarjetas-creditos-fe";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE_PATH ?? "/",
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        entry: "./src/main.tsx",
        template: "./index.html"
      }),
      tsConfigPaths()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"]
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
