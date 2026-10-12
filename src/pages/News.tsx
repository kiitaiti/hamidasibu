import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { NewsEmpty, NewsRows, NewsSkeleton } from '../components/NewsRows'
import { PageHero } from '../components/PageHero'
import { usePageMeta } from '../hooks/usePageMeta'
import { fetchNewsList, NEWS_CATEGORIES, type NewsListResult } from '../lib/news'

const PER_PAGE = 10

export default function News() {
  usePageMeta({ title: 'NEWS', description: 'ハミダシ部！の最新情報・おしらせ一覧です。' })
  const [params] = useSearchParams()
  const page = Math.max(1, Number(params.get('page')) || 1)
  const category = params.get('category') || ''
  const [data, setData] = useState<NewsListResult | null>(null)

  useEffect(() => {
    setData(null)
    fetchNewsList({ limit: PER_PAGE, offset: (page - 1) * PER_PAGE, category: category || undefined }).then(setData)
  }, [page, category])

  const pages = data ? Math.max(1, Math.ceil(data.total / PER_PAGE)) : 1
  const link = (p: number, c = category) => {
    const q = new URLSearchParams()
    if (c) q.set('category', c)
    if (p > 1) q.set('page', String(p))
    const s = q.toString()
    return s ? `/news?${s}` : '/news'
  }
  const cms = data?.status !== 'unavailable'

  return (
    <>
      <PageHero en="NEWS" ja="おしらせ" tone="paper" lead={<p>ハミダシ部！の最新情報をお届けします。</p>} />
      <section className="section news-page">
        <div className="container">
          {cms && (
            <nav className="ntabs" aria-label="カテゴリで絞り込む">
              <Link to={link(1, '')} className={!category ? 'is-active' : ''} aria-current={!category ? 'page' : undefined}>
                ALL
              </Link>
              {NEWS_CATEGORIES.map((c) => (
                <Link
                  key={c}
                  to={link(1, c)}
                  className={category === c ? 'is-active' : ''}
                  aria-current={category === c ? 'page' : undefined}
                >
                  {c}
                </Link>
              ))}
            </nav>
          )}

          {!data && <NewsSkeleton rows={5} />}
          {data?.status === 'ok' && <NewsRows items={data.items} />}
          {data && data.status !== 'ok' && <NewsEmpty />}

          {data?.status === 'ok' && pages > 1 && (
            <nav className="pager" aria-label="ページ送り">
              {page > 1 ? (
                <Link to={link(page - 1)} className="pager__step">
                  PREV
                </Link>
              ) : (
                <span className="pager__step is-disabled">PREV</span>
              )}
              <ol>
                {Array.from({ length: pages }).map((_, i) => (
                  <li key={i}>
                    <Link
                      to={link(i + 1)}
                      className={page === i + 1 ? 'is-current' : ''}
                      aria-current={page === i + 1 ? 'page' : undefined}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </Link>
                  </li>
                ))}
              </ol>
              {page < pages ? (
                <Link to={link(page + 1)} className="pager__step">
                  NEXT
                </Link>
              ) : (
                <span className="pager__step is-disabled">NEXT</span>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  )
}
