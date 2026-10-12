/**
 * NEWS 取得用の Netlify Function（microCMS のプロキシ）
 *
 * APIキーはサーバー側（この関数）だけで使い、ブラウザには一切渡しません。
 *   GET /api/news?limit=10&offset=0&category=INFORMATION  … 一覧
 *   GET /api/news?id=xxxx                                 … 詳細（前後記事つき）
 *
 * 環境変数が未設定のときは 503 と { configured: false } を返し、
 * フロント側は「COMING SOON」の空状態を表示します。
 */

type CmsNews = {
  id: string
  title: string
  category?: string[] | string
  body?: string
  thumbnail?: { url: string; width?: number; height?: number }
  publishedAt?: string
  date?: string
}

const json = (data: unknown, status = 200, cache = 'public, max-age=60') =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': cache },
  })

const normalize = (n: CmsNews) => ({
  id: n.id,
  title: n.title,
  category: (Array.isArray(n.category) ? n.category[0] : n.category) || 'INFORMATION',
  date: n.date || n.publishedAt || '',
  body: n.body ?? '',
  thumbnail: n.thumbnail?.url ?? null,
})

export default async (req: Request) => {
  const domain = process.env.MICROCMS_SERVICE_DOMAIN
  const key = process.env.MICROCMS_API_KEY
  const endpoint = process.env.MICROCMS_NEWS_ENDPOINT || 'news'

  if (!domain || !key) {
    return json({ configured: false, contents: [], totalCount: 0 }, 503, 'no-store')
  }

  const url = new URL(req.url)
  const base = `https://${domain}.microcms.io/api/v1/${endpoint}`
  const headers = { 'X-MICROCMS-API-KEY': key }

  try {
    const id = url.searchParams.get('id')
    if (id) {
      const r = await fetch(`${base}/${encodeURIComponent(id)}`, { headers })
      if (r.status === 404) return json({ configured: true, item: null }, 404)
      if (!r.ok) throw new Error(`microCMS ${r.status}`)
      const item = normalize(await r.json())

      // 前後記事（新しい順の並びで隣り合う記事）
      const listR = await fetch(`${base}?fields=id,title,publishedAt,date&orders=-publishedAt&limit=100`, { headers })
      let prev = null
      let next = null
      if (listR.ok) {
        const list = (await listR.json()).contents as CmsNews[]
        const i = list.findIndex((n) => n.id === item.id)
        if (i > -1) {
          const newer = list[i - 1]
          const older = list[i + 1]
          prev = older ? { id: older.id, title: older.title } : null
          next = newer ? { id: newer.id, title: newer.title } : null
        }
      }
      return json({ configured: true, item, prev, next })
    }

    const limit = Math.min(Number(url.searchParams.get('limit')) || 10, 50)
    const offset = Math.max(Number(url.searchParams.get('offset')) || 0, 0)
    const category = url.searchParams.get('category')
    const q = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      orders: '-publishedAt',
      fields: 'id,title,category,publishedAt,date,thumbnail',
    })
    if (category) q.set('filters', `category[contains]${category}`)

    const r = await fetch(`${base}?${q}`, { headers })
    if (!r.ok) throw new Error(`microCMS ${r.status}`)
    const data = await r.json()
    return json({
      configured: true,
      contents: (data.contents as CmsNews[]).map(normalize),
      totalCount: data.totalCount as number,
    })
  } catch (e) {
    console.error(e)
    return json({ configured: true, error: true, contents: [], totalCount: 0 }, 502, 'no-store')
  }
}

export const config = { path: '/api/news' }
