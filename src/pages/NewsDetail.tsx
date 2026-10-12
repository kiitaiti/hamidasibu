import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLink } from '../components/ArrowLink'
import { NewsSkeleton } from '../components/NewsRows'
import { usePageMeta } from '../hooks/usePageMeta'
import { fetchNewsDetail, formatDate, type NewsDetailResult } from '../lib/news'

export default function NewsDetail() {
  const { slug = '' } = useParams()
  const [data, setData] = useState<NewsDetailResult | null>(null)

  useEffect(() => {
    setData(null)
    fetchNewsDetail(slug).then(setData)
  }, [slug])

  const item = data?.item
  usePageMeta({ title: item ? `${item.title}｜NEWS` : 'NEWS' })

  return (
    <article className="ndetail">
      <div className="container container--narrow">
        <nav className="crumb crumb--dark" aria-label="パンくずリスト">
          <Link to="/">TOP</Link>
          <i aria-hidden="true">/</i>
          <Link to="/news">NEWS</Link>
        </nav>

        {!data && <NewsSkeleton rows={2} />}

        {data && !item && (
          <div className="ndetail__missing">
            <p className="ndetail__missing-big" aria-hidden="true">
              NOT FOUND
            </p>
            <h1>この記事は見つかりませんでした。</h1>
            <p>URLが変更されたか、記事が公開されていない可能性があります。</p>
          </div>
        )}

        {item && (
          <>
            <header className="ndetail__head">
              <div className="ndetail__meta">
                <time dateTime={item.date}>{formatDate(item.date)}</time>
                <span className="nrow__cat">{item.category}</span>
              </div>
              <h1 className="ndetail__title">{item.title}</h1>
            </header>
            {item.thumbnail && <img className="ndetail__thumb" src={item.thumbnail} alt="" loading="lazy" />}
            {/* 本文は microCMS のリッチエディタ（運営のみが編集可能）から取得 */}
            <div className="ndetail__body prose" dangerouslySetInnerHTML={{ __html: item.body || '' }} />
            {(data.prev || data.next) && (
              <nav className="ndetail__pn" aria-label="前後の記事">
                {data.prev ? (
                  <Link to={`/news/${data.prev.id}`} className="ndetail__pn-prev">
                    <small>PREV</small>
                    {data.prev.title}
                  </Link>
                ) : (
                  <span />
                )}
                {data.next ? (
                  <Link to={`/news/${data.next.id}`} className="ndetail__pn-next">
                    <small>NEXT</small>
                    {data.next.title}
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </>
        )}
        <div className="ndetail__back">
          <ArrowLink to="/news">BACK TO NEWS</ArrowLink>
        </div>
      </div>
    </article>
  )
}
