import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * 公開URL。Netlify ではビルド時に環境変数 URL が自動で入ります。
 * 独自ドメインを使う場合は Netlify の環境変数 SITE_URL に設定してください。
 */
const SITE_URL = (process.env.SITE_URL || process.env.URL || 'https://hamidashibu.netlify.app').replace(/\/$/, '')

/** sitemap.xml に載せる静的ルート（NEWS詳細はCMS管理のため対象外） */
const ROUTES = [
  '/', '/news', '/about', '/members',
  '/members/member-01', '/members/member-02', '/members/member-03', '/members/member-04', '/members/member-05',
  '/contact', '/audition', '/privacy',
]

function seoFiles(): Plugin {
  return {
    name: 'hamidashibu-seo-files',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', SITE_URL)
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = ROUTES.map(
        (r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`,
      ).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), seoFiles()],
  // プレビュー用（単体ページ）ビルドではJSを1ファイルにまとめる
  build:
    process.env.VITE_HASH_ROUTER === 'true'
      ? { rollupOptions: { output: { inlineDynamicImports: true } } }
      : undefined,
})
