import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useMotion } from '../hooks/useMotion'
import { MaskText } from './MaskText'

/** 下層ページ共通の見出しエリア */
export function PageHero({
  en,
  ja,
  tone = 'paper',
  lead,
  crumb,
  children,
}: {
  en: string
  ja: string
  tone?: 'paper' | 'pink' | 'ink'
  lead?: ReactNode
  crumb?: { to: string; label: string }[]
  children?: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  useMotion(ref)
  return (
    <section ref={ref} className={`phero phero--${tone}`}>
      <div className="phero__ghost" aria-hidden="true" data-scroll-x="-18">
        {en} {en} {en}
      </div>
      <div className="container phero__inner">
        <nav className="crumb" aria-label="パンくずリスト">
          <Link to="/">TOP</Link>
          {crumb?.map((c) => (
            <span key={c.to}>
              <i aria-hidden="true">/</i>
              <Link to={c.to}>{c.label}</Link>
            </span>
          ))}
          <span>
            <i aria-hidden="true">/</i>
            <span aria-current="page">{en}</span>
          </span>
        </nav>
        <MaskText as="h1" className="phero__en" lines={[en]} />
        <p className="phero__ja" data-reveal="" data-reveal-delay="0.15">
          <span className="shead__bar" aria-hidden="true" />
          {ja}
        </p>
        {lead && (
          <div className="phero__lead" data-reveal="" data-reveal-delay="0.25">
            {lead}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
