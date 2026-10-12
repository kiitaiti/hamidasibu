import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { asset, site } from '../config/site'
import { members } from '../data/members'
import { NAV } from './nav'
import { Silhouette } from './Silhouette'
import { SnsLinks } from './SnsLinks'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.documentElement.classList.toggle('is-menu-open', open)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`hdr ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="hdr__bar">
        <Link to="/" className="hdr__logo" aria-label={`${site.name} トップへ`}>
          <img src={asset('images/logo.webp')} width="1200" height="216" alt={site.name} />
        </Link>
        <nav className="hdr__nav" aria-label="グローバルナビゲーション">
          <ul>
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} className={`hdr__link ${n.en === 'AUDITION' ? 'hdr__link--cta' : ''}`}>
                  <span className="hdr__en" data-text={n.en}>
                    {n.en}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="hdr__burger"
          aria-expanded={open}
          aria-controls="drawer"
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="drawer" className="drawer" hidden={!open}>
        <nav aria-label="メニュー">
          <ul className="drawer__list">
            <li style={{ ['--i' as string]: 0 }}>
              <NavLink to="/" end>
                <b>TOP</b>
                <small>トップ</small>
              </NavLink>
            </li>
            {NAV.map((n, i) => (
              <li key={n.to} style={{ ['--i' as string]: i + 1 }}>
                <NavLink to={n.to}>
                  <b>{n.en}</b>
                  <small>{n.ja}</small>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <SnsLinks className="drawer__sns" />
        <Silhouette member={members[2]} className="drawer__sil" alt="" />
      </div>
    </header>
  )
}
