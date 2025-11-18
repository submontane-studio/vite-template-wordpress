import sass from "sass";
import { defineConfig } from "vite";

export default defineConfig({
	root: "./src",
	base: "",
	build: {
		outDir: "../wordpress/themes/your-theme/assets",
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: "./main.ts",
				style: "./style.scss",
			},
			output: {
				assetFileNames: "[name].[ext]",
				entryFileNames: "[name].js",
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				implementation: sass,
			},
		},
	},
});
