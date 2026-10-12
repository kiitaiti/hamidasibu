import { site } from '../config/site'

const icons = {
  youtube: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.8 2.3h7l4.8 6.4 5.6-6.4Zm-1.2 17.9h1.9L7.1 4.2H5.1l11.9 16Z" />
    </svg>
  ),
}

/** 公式SNS。URL未設定のものはリンクにせず COMING SOON 表示 */
export function SnsLinks({ className = '' }: { className?: string }) {
  const list = [
    { key: 'youtube' as const, label: 'YouTube', url: site.sns.youtube },
    { key: 'x' as const, label: 'X', url: site.sns.x },
  ]
  return (
    <ul className={`sns ${className}`}>
      {list.map((s) =>
        s.url ? (
          <li key={s.key}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="sns__link">
              {icons[s.key]}
              <span>OFFICIAL {s.label}</span>
            </a>
          </li>
        ) : (
          <li key={s.key} className="sns__soon">
            {icons[s.key]}
            <span>OFFICIAL {s.label}</span>
            <em>COMING SOON</em>
          </li>
        ),
      )}
    </ul>
  )
}
