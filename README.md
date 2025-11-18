# Vite + WordPress 開発テンプレート

高速・軽量な WordPress テーマ開発のためのテンプレートです。  
Vite を用いたフロントエンドビルドと、wp-env による WordPress ローカル環境を統合しています。

---

## 🚀 Features

| 機能 | 使用技術 | 説明 |
|------|----------|------|
| 高速ビルド | Vite | HMR / 高速コンパイル |
| CSS 最適化 | Autoprefixer / cssnano | ベンダープレフィックス付与 & 圧縮 |
| 型チェック | TypeScript / vite-plugin-checker | ビルド時に型とエラーを可視化 |
| 画像最適化 | Sharp | JPEG / PNG / WebP / AVIF などを軽量化 |
| コード品質維持 | Biome | Lint & Format を一元管理 |
| WP ローカル環境 | @wordpress/env | WordPress + DB + wp-cli を Docker で自動構築 |
| 並列実行 | concurrently | WP 環境と Vite を同時起動 |

---

## 📁 ディレクトリ構成

project-root/
├── package.json               # 依存関係を一元管理
├── node_modules/
├── vite-app/                  # フロントエンド（Vite）
│   ├── src/
│   ├── vite.config.ts
│   ├── package.json           # build / dev のみを保持
│   ├── tsconfig.json
│   └── biome.json
└── wordpress/                 # WordPress ローカル環境
├── .wp-env.json
└── wp-content/
└── themes/
└── your-theme/    # 出力先テーマ

---

## ⚙️ セットアップ

```bash
# 1. 依存インストール
npm install

# 2. 開発開始 (WordPress + Viteを同時起動)
npm run dev

# 3. 本番ビルド
npm run vite:build
```

⸻

📌 主要コマンド

コマンド	説明
npm run dev	WordPress + Vite（watch）を同時起動
npm run vite:dev	Vite を監視モードで起動
npm run vite:build	Vite の本番ビルド
npm run vite:preview	ビルド済みファイルをローカルで確認
npm run wp:start	wp-env による WordPress 環境起動
npm run wp:stop	WP 環境停止
npm run wp:destroy	WP 環境完全削除
npm run lint	Biome によるコードチェック
npm run fix	Biome による自動整形


⸻

🧠 設計ポリシー
	•	WordPress テーマ開発を「高速・現代的・シンプル」にすることを目的としています。
	•	Webpack / Gulp などの複雑な構成を排除し、Vite + wp-env に統合。
	•	依存関係をルート package.json に集約し、node_modules の二重構造を回避。
	•	Biome によって Lint & Format を統一。
	•	Sharp による画像最適化を標準装備。

⸻

🧰 推奨環境
	•	Node.js 20+
	•	Docker（wp-env が内部で利用します）
	•	VSCode + Biome extension

⸻

📜 License

MIT © SUBMONTANE STUDIO