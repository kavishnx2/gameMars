import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svgr from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@public": path.resolve(__dirname, "./public"),
        "@three": path.resolve(__dirname, "./src/three"),
      },
    },
    server: {
      port: 3000,
    },
    define: {
      "process.env": {},
    },
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgr(),
      glsl(),
      nodePolyfills({
        protocolImports: true,
      }),
    ],
  };
});
