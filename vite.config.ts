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
          // Naive UI + its peer deps — large and stable, good cache target
          if (
            id.includes("naive-ui") ||
            id.includes("vueuc") ||
            id.includes("@css-render") ||
            id.includes("seemly") ||
            id.includes("evtd") ||
            id.includes("treemate")
          ) {
            return "naive-ui";
          }

          // ApexCharts — ~300 KB, only needed on pages with charts.
          // Keeping it separate means it is NOT downloaded on first load;
          // it is fetched only when a chart page is first visited.
          if (id.includes("apexcharts") || id.includes("vue3-apexcharts")) {
            return "charts";
          }

          // TipTap + ProseMirror — ~200 KB, only needed on the editor page.
          if (id.includes("@tiptap") || id.includes("prosemirror")) {
            return "editor";
          }

          // Icon sets — loaded per-page via dynamic imports, keep separate
          // so they are not forced into the eager vendor preload.
          if (id.includes("@vicons")) {
            return "icons";
          }

          // Vue core — tiny and needed immediately; isolated for long-term caching.
          if (
            id.includes("node_modules/vue/") ||
            id.includes("node_modules/vue-router/") ||
            id.includes("node_modules/pinia/") ||
            id.includes("node_modules/@vue/")
          ) {
            return "vue-core";
          }

          // Everything else (date-fns, axios, etc.)
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
