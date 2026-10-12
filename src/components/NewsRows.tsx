import { Link } from 'react-router-dom'
import { formatDate, type NewsItem } from '../lib/news'

export function NewsRows({ items }: { items: NewsItem[] }) {
  return (
    <ul className="nrows">
      {items.map((n) => (
        <li key={n.id}>
          <Link to={`/news/${n.id}`} className="nrow">
            <time className="nrow__date" dateTime={n.date}>
              {formatDate(n.date)}
            </time>
            <span className="nrow__cat">{n.category}</span>
            <span className="nrow__title">{n.title}</span>
            <span className="nrow__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M3 12h16M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.6" />
              </svg>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function NewsSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <ul className="nrows is-loading" aria-busy="true" aria-label="読み込み中">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="nrow nrow--skeleton">
          <span />
          <span />
          <span />
        </li>
      ))}
    </ul>
  )
}

export function NewsEmpty({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`nempty ${compact ? 'nempty--compact' : ''}`}>
      <p className="nempty__big" aria-hidden="true">
        COMING SOON
      </p>
      <p className="nempty__text">
        <strong>最初のおしらせを、準備中です。</strong>
        <br />
        ハミダシ部！の第一報まで、もう少しだけお待ちください。
      </p>
    </div>
  )
}
