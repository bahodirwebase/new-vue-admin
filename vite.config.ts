import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: "es2015",
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split naive-ui into its own chunk for better long-term caching
          if (
            id.includes("naive-ui") ||
            id.includes("vueuc") ||
            id.includes("@css-render")
          ) {
            return "naive-ui";
          }
          // Group remaining node_modules into a shared vendor chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  esbuild: {
    // Strip all console and debugger statements from the production build
    drop: ["console", "debugger"],
  },
  optimizeDeps: {
    include: ["vue", "vue-router", "pinia", "naive-ui"],
  },
});
