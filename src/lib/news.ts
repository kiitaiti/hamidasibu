/**
 * NEWS の取得（Netlify Function /api/news 経由で microCMS から）
 * APIキーはブラウザに出しません。未設定・取得失敗時は空として扱います。
 */
export type NewsCategory = 'INFORMATION' | 'MEMBERS' | 'EVENT' | 'AUDITION' | string

export type NewsItem = {
  id: string
  title: string
  category: NewsCategory
  date: string
  body?: string
  thumbnail?: string | null
}

export type NewsListResult = { items: NewsItem[]; total: number; status: 'ok' | 'empty' | 'unavailable' }
export type NewsDetailResult = {
  item: NewsItem | null
  prev: { id: string; title: string } | null
  next: { id: string; title: string } | null
  status: 'ok' | 'notfound' | 'unavailable'
}

export const NEWS_CATEGORIES = ['INFORMATION', 'MEMBERS', 'EVENT', 'AUDITION'] as const

const API = '/api/news'

export async function fetchNewsList(opts: { limit?: number; offset?: number; category?: string } = {}): Promise<NewsListResult> {
  const q = new URLSearchParams({ limit: String(opts.limit ?? 10), offset: String(opts.offset ?? 0) })
  if (opts.category) q.set('category', opts.category)
  try {
    const r = await fetch(`${API}?${q}`, { headers: { accept: 'application/json' } })
    if (!r.ok || !r.headers.get('content-type')?.includes('json')) {
      return { items: [], total: 0, status: 'unavailable' }
    }
    const d = await r.json()
    const items = (d.contents ?? []) as NewsItem[]
    return { items, total: d.totalCount ?? items.length, status: items.length ? 'ok' : 'empty' }
  } catch {
    return { items: [], total: 0, status: 'unavailable' }
  }
}

export async function fetchNewsDetail(id: string): Promise<NewsDetailResult> {
  try {
    const r = await fetch(`${API}?id=${encodeURIComponent(id)}`, { headers: { accept: 'application/json' } })
    if (r.status === 404) return { item: null, prev: null, next: null, status: 'notfound' }
    if (!r.ok || !r.headers.get('content-type')?.includes('json')) {
      return { item: null, prev: null, next: null, status: 'unavailable' }
    }
    const d = await r.json()
    return { item: d.item, prev: d.prev ?? null, next: d.next ?? null, status: d.item ? 'ok' : 'notfound' }
  } catch {
    return { item: null, prev: null, next: null, status: 'unavailable' }
  }
}

export const formatDate = (iso: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`
}
