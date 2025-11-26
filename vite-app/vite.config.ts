import fs from "node:fs";
import path from "node:path";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { defineConfig } from "vite";
// @ts-expect-error vite-plugin-wordpress has no type declarations
import { vitePluginWordpress } from "vite-plugin-wordpress";

const themeName = "wordpress-theme";

export default defineConfig({
	root: "./src",

	plugins: [
		vitePluginWordpress({
			themePath: `../../wordpress/themes/${themeName}`,
			baseFile: "functions.php",
		}),
		{
			name: "fix-css-paths",
			apply: "build",
			closeBundle() {
				const cssPath = path.resolve(
					`../wordpress/themes/${themeName}/style.css`,
				);
				if (fs.existsSync(cssPath)) {
					let css = fs.readFileSync(cssPath, "utf-8");
					// ルート相対パスを相対パスに変換
					css = css.replace(/url\(\/assets\/images\//g, "url(assets/images/");
					fs.writeFileSync(cssPath, css);
				}
			},
		},
		{
			name: "dev-image-paths",
			apply: "serve",
			transform(code, id) {
				// 開発時: CSS内の画像パスをViteサーバーのURLに変換
				if (id.endsWith(".scss") || id.endsWith(".css")) {
					return code.replace(
						/url\((["']?)\.\.\/\.\.\/\.\.\/images\//g,
						'url($1http://localhost:5173/src/assets/images/',
					);
				}
			},
		},
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
		origin: "http://localhost:5173",
	},

	css: {
		devSourcemap: process.env.NODE_ENV !== "production",
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
		assetsInlineLimit: 0,
		outDir: `../../wordpress/themes/${themeName}`,
		emptyOutDir: false,
		manifest: true,
		rollupOptions: {
			input: {
				main: "./main.ts",
				style: "./style.scss",
				editor: "./editor.scss",
			},
			output: {
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: (assetInfo) => {
					const name = assetInfo.name || "";
					// 画像ファイル
					if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) {
						return "assets/images/[name][extname]";
					}
					// CSSファイル
					if (/\.css$/i.test(name)) {
						return "[name][extname]";
					}
					return "assets/[name][extname]";
				},
			},
		},
	},
});
