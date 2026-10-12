import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { members, memberBySlug } from '../data/members'
import { ScrollTrigger } from '../lib/motion'
import { Footer } from './Footer'
import { Header } from './Header'

/** ページごとのフッターキャラクター（members 配列の index） */
function footerMemberFor(pathname: string) {
  const p = pathname.replace(/\/+$/, '') || '/'
  if (p === '/') return members[0]
  if (p.startsWith('/news')) return members[1]
  if (p === '/about') return members[2]
  if (p === '/members') return members[3]
  if (p.startsWith('/members/')) {
    // 個別ページでは、そのページの子とは別のメンバー（次の番号）を表示
    const current = memberBySlug(p.split('/')[2])
    if (current) {
      const i = members.indexOf(current)
      return members[(i + 1) % members.length]
    }
    return members[3]
  }
  if (p === '/contact') return members[4]
  if (p === '/audition') return members[0]
  if (p === '/privacy') return members[1]
  return members[4]
}

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => window.clearTimeout(t)
  }, [pathname])

  return (
    <>
      <a className="skip" href="#main">
        本文へスキップ
      </a>
      <Header />
      <main id="main" className="page" key={pathname}>
        <Outlet />
      </main>
      <Footer member={footerMemberFor(pathname)} />
    </>
  )
}
