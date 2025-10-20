import { defineConfig, loadEnv } from "file:///C:/Users/nx-ereinoso/Desktop/finalFront/contrataciones-tarjetas-creditos-fe/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/nx-ereinoso/Desktop/finalFront/contrataciones-tarjetas-creditos-fe/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { createHtmlPlugin } from "file:///C:/Users/nx-ereinoso/Desktop/finalFront/contrataciones-tarjetas-creditos-fe/node_modules/vite-plugin-html/dist/index.mjs";
import tsConfigPaths from "file:///C:/Users/nx-ereinoso/Desktop/finalFront/contrataciones-tarjetas-creditos-fe/node_modules/vite-tsconfig-paths/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\nx-ereinoso\\Desktop\\finalFront\\contrataciones-tarjetas-creditos-fe";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxueC1lcmVpbm9zb1xcXFxEZXNrdG9wXFxcXGZpbmFsRnJvbnRcXFxcY29udHJhdGFjaW9uZXMtdGFyamV0YXMtY3JlZGl0b3MtZmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG54LWVyZWlub3NvXFxcXERlc2t0b3BcXFxcZmluYWxGcm9udFxcXFxjb250cmF0YWNpb25lcy10YXJqZXRhcy1jcmVkaXRvcy1mZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbngtZXJlaW5vc28vRGVza3RvcC9maW5hbEZyb250L2NvbnRyYXRhY2lvbmVzLXRhcmpldGFzLWNyZWRpdG9zLWZlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgc3JpIGZyb20gXCJ2aXRlLXBsdWdpbi1zcmlcIjtcclxuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1odG1sXCI7XHJcbmltcG9ydCB0c0NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJhc2U6IGVudi5WSVRFX0JBU0VfUEFUSCA/PyBcIi9cIixcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgcmVhY3QoKSxcclxuICAgICAgY3JlYXRlSHRtbFBsdWdpbih7XHJcbiAgICAgICAgbWluaWZ5OiB0cnVlLFxyXG4gICAgICAgIGVudHJ5OiBcIi4vc3JjL21haW4udHN4XCIsXHJcbiAgICAgICAgdGVtcGxhdGU6IFwiLi9pbmRleC5odG1sXCIsXHJcbiAgICAgIH0pLFxyXG4gICAgICB0c0NvbmZpZ1BhdGhzKCksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgc2lsZW5jZURlcHJlY2F0aW9uczogW1wibGVnYWN5LWpzLWFwaVwiXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErWixTQUFTLGNBQWMsZUFBZTtBQUNyYyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRWpCLFNBQVMsd0JBQXdCO0FBQ2pDLE9BQU8sbUJBQW1CO0FBTDFCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFFdkMsU0FBTztBQUFBLElBQ0wsTUFBTSxJQUFJLGtCQUFrQjtBQUFBLElBQzVCLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLGlCQUFpQjtBQUFBLFFBQ2YsUUFBUTtBQUFBLFFBQ1IsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLE1BQ0QsY0FBYztBQUFBLElBQ2hCO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDdEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixxQkFBcUIsQ0FBQyxlQUFlO0FBQUEsUUFDdkM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
