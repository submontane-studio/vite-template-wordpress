import { defineConfig } from "vite";
import { vitePluginWordpress } from "vite-plugin-wordpress";

const themeName = "wordpress-theme";

export default defineConfig({
	root: "./",

	plugins: [
		vitePluginWordpress({
			themePath: `../wordpress/themes/${themeName}`,
			baseFile: "src/functions.php"
		})
	],

	resolve: {
		alias: {
			"@": "/src"
		}
	},

	server: {
		port: 5173,
		strictPort: true,
		watch: {
			usePolling: true,
			interval: 100
		},
		hmr: {
			host: "localhost",
			protocol: "ws",
			clientPort: 5173
		}
	},

	css: {
		devSourcemap: true
	},

	build: {
		outDir: `../wordpress/themes/${themeName}`,
		emptyOutDir: true,
		manifest: true,
		rollupOptions: {
			input: "./src/main.ts",
			output: {
				// ⭐ ここを空文字にするだけで成果物が直下に吐き出される
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name][extname]`,
			},
		},
	}
});