import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { defineConfig } from "vite";
import { imageOptimizer } from "vite-plugin-image-optimizer";
import { vitePluginWordpress } from "vite-plugin-wordpress";

const themeName = "wordpress-theme";

export default defineConfig({
  root: "./",

  plugins: [
    vitePluginWordpress({
      themePath: `../wordpress/themes/${themeName}`,
      baseFile: "src/functions.php",
    }),
    imageOptimizer({
      patterns: [
        {
          from: "./src/assets/images/**/*",
          to: "images"
        }
      ],
      outDir: `../wordpress/wp-content/themes/${themeName}/assets`,
      quality: {
        jpeg: 82,
        png: 80,
        webp: 80,
        avif: 70,
      },
      generateWebp: true,
      generateAvif: true,
    }),
  ],

  resolve: {
    alias: {
      "@": "/src",
    },
  },

  server: {
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: {
      host: "localhost",
      protocol: "ws",
      clientPort: 5173,
    },
  },

  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        autoprefixer(),
        cssnano({
          preset: "default",
        }),
      ],
    },
  },

  build: {
    outDir: `../wordpress/themes/${themeName}`,
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: "./src/main.ts",
        style: "./src/style.scss",
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name][extname]`,
      },
    },
  },
});
