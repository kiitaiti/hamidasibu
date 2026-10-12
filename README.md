# ハミダシ部！ 公式サイト

React + TypeScript + Vite + React Router + GSAP。Netlify で公開する前提の構成です。

## ページ

| ページ | URL |
|---|---|
| TOP | `/` |
| NEWS 一覧 | `/news`（`?category=` `?page=` 対応） |
| NEWS 詳細 | `/news/:id`（microCMS のコンテンツID） |
| ABOUT | `/about` |
| MEMBERS 一覧 | `/members` |
| MEMBERS 個別 | `/members/member-01` 〜 `member-05` |
| CONTACT | `/contact` |
| AUDITION | `/audition` |
| プライバシーポリシー | `/privacy` |
| 404 | 上記以外 |

フッターのキャラクター：TOP=01 / NEWS=02 / ABOUT=03 / MEMBERS=04 / CONTACT=05 / AUDITION=01 / 個別ページ=次の番号の子

## ローカルで動かす

```bash
npm install
npm run dev          # http://localhost:5173
```

NEWS（Netlify Function）とフォームまで試す場合は Netlify CLI を使います。

```bash
npm i -g netlify-cli
netlify dev
```

## Netlify へ公開

1. このフォルダを GitHub に push し、Netlify で「Import from Git」
   （ビルド設定は `netlify.toml` に入っているので入力不要）
2. **Site configuration → Forms** で「Form detection」を有効にする
   → CONTACT の送信内容が Netlify の管理画面に届きます。通知メールの宛先も Forms の設定で追加してください
3. 独自ドメインを使う場合は環境変数 `SITE_URL` に `https://〜` を設定（sitemap.xml / OGP に使用）

## NEWS（microCMS）の設定

1. microCMS で API を作成（エンドポイント名 `news`、リスト形式）
2. フィールド

| フィールドID | 種類 | 備考 |
|---|---|---|
| `title` | テキスト | 必須 |
| `category` | セレクト | `INFORMATION` / `MEMBERS` / `EVENT` / `AUDITION` |
| `body` | リッチエディタ | 本文 |
| `thumbnail` | 画像 | 任意 |
| `date` | 日時 | 任意（未入力なら公開日を表示） |

3. Netlify の環境変数に設定（`.env.example` 参照）
   - `MICROCMS_SERVICE_DOMAIN`（例：`hamidashibu`）
   - `MICROCMS_API_KEY`（GET権限のみのキーを推奨）

APIキーは `netlify/functions/news.mts` の中だけで使い、ブラウザには出ません。
`VITE_` を頭に付けると公開されてしまうので付けないでください。
未設定の間は「COMING SOON」の表示になります。

## 公開前・公開後に差し替えるところ

| 何を | どこで |
|---|---|
| 仮のニュース（架空の内容） | `src/data/news.sample.ts`。正式公開前に `src/config/site.ts` の `useSampleNews` を `false` に |
| 公式 YouTube / X のURL | `src/config/site.ts` の `sns`（空の間は COMING SOON 表示） |
| プライバシーポリシー制定日 | `src/config/site.ts` の `privacyEffectiveDate` |
| プライバシーポリシー本文 | `src/pages/Privacy.tsx`（一般的な内容の雛形です。公開前に確認を） |
| メンバーの名前・プロフィール | `src/data/members.ts`（`revealed: true` と `profile` を入れると全ページに反映） |
| 正式立ち絵 | `public/images/` に置き、`profile.portrait` にパスを指定 |
| オーディション募集開始 | `src/data/audition.ts`（`status: 'open'` と要項・フロー・FAQ・応募URL） |

## プレビュー用ビルド

`npm run build:preview` は、URLが `#/about` 形式になる単体確認用のビルドです（本番では使いません）。
