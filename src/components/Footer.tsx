import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { asset, site } from '../config/site'
import { displayName, type Member } from '../data/members'
import { gsap } from '../lib/motion'
import { useMotion } from '../hooks/useMotion'
import { NAV } from './nav'
import { Silhouette } from './Silhouette'
import { SnsLinks } from './SnsLinks'
import { Sparkle } from './Sparkle'

/** ページごとにキャラクターが変わる共通フッター */
export function Footer({ member }: { member: Member }) {
  const ref = useRef<HTMLElement>(null)

  useMotion(
    ref,
    () => {
      const root = ref.current!
      gsap.from(root.querySelector('.ftr__cast'), {
        yPercent: 22,
        autoAlpha: 0,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 80%', once: true },
      })
      gsap.from(root.querySelectorAll('.ftr__name > *'), {
        x: -30,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.9,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 80%', once: true },
      })
    },
    [member.slug],
  )

  const backToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <footer ref={ref} className="ftr">
      <div className="ftr__inner container">
        <div className="ftr__info">
          <Link to="/" className="ftr__logo" aria-label={`${site.name} トップへ`}>
            <img src={asset('images/logo.webp')} width="1200" height="216" alt={site.name} loading="lazy" />
          </Link>
          <p className="ftr__copy">
            ハミダシものは、
            <br />
            カガヤキものだ。
          </p>
          <nav aria-label="フッターナビゲーション">
            <ul className="ftr__nav">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>
                    <span aria-hidden="true">—</span> {n.en}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <SnsLinks className="ftr__sns" />
          <ul className="ftr__sub">
            <li>
              <Link to="/privacy">プライバシーポリシー</Link>
            </li>
            <li>
              <Link to="/contact">お問い合わせ</Link>
            </li>
            <li>
              運営：
              {site.operatorUrl ? (
                <a href={site.operatorUrl} target="_blank" rel="noopener noreferrer">
                  {site.operator}
                </a>
              ) : (
                site.operator
              )}
            </li>
          </ul>
          <p className="ftr__note">
            当サイトに掲載されている文章・画像・イラスト等の
            <br className="sp-only" />
            無断転載・複製を禁じます。
          </p>
          <p className="ftr__copyright">
            © {site.copyrightYear} {site.operator} / {site.nameEn}
          </p>
        </div>

        <div className="ftr__castwrap" aria-hidden="true">
          <div className="ftr__cast">
            <Silhouette member={member} alt="" />
          </div>
          <div className="ftr__name">
            <span className="ftr__name-no">
              <Sparkle size={14} /> MEMBER {member.number}
            </span>
            <span className="ftr__name-ja">{displayName(member)}</span>
            <span className="ftr__name-en">{member.revealed ? member.profile.nameRoman : 'COMING SOON'}</span>
          </div>
        </div>
      </div>
      <button type="button" className="ftr__top" onClick={backToTop} aria-label="ページの先頭へ戻る">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M12 21V4M5 11l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2.6" />
        </svg>
        <span>TOP</span>
      </button>
    </footer>
  )
}
