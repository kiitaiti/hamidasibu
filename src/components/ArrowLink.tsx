import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function ArrowLink({
  to,
  children,
  tone = 'ink',
  className = '',
}: {
  to: string
  children: ReactNode
  tone?: 'ink' | 'pink' | 'paper'
  className?: string
}) {
  return (
    <Link to={to} className={`btn btn--${tone} ${className}`}>
      <span className="btn__label">{children}</span>
      <span className="btn__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M3 12h16M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
        </svg>
      </span>
    </Link>
  )
}
