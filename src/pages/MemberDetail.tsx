import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLink } from '../components/ArrowLink'
import { MemberCard } from '../components/MemberCard'
import { Silhouette } from '../components/Silhouette'
import { Sparkle } from '../components/Sparkle'
import { displayName, hasProfile, members, memberBySlug, type Member } from '../data/members'
import { usePageMeta } from '../hooks/usePageMeta'
import { useMotion } from '../hooks/useMotion'
import { gsap } from '../lib/motion'
import NotFound from './NotFound'

/** 公開済みの項目だけを表示するプロフィール */
function Profile({ m }: { m: Member }) {
  const p = m.profile
  const rows = [
    { k: '誕生日', v: p.birthday },
    { k: '身長', v: p.height },
    { k: '好きなもの', v: p.likes?.join('、') },
  ].filter((r) => r.v)
  return (
    <div className="mprofile">
      {p.catchCopy && <p className="mprofile__catch">{p.catchCopy}</p>}
      {p.introduction && <p className="mprofile__intro">{p.introduction}</p>}
      {rows.length > 0 && (
        <dl className="mprofile__dl">
          {rows.map((r) => (
            <div key={r.k}>
              <dt>{r.k}</dt>
              <dd>{r.v}</dd>
            </div>
          ))}
        </dl>
      )}
      {(p.youtube || p.x) && (
        <ul className="mprofile__sns">
          {p.youtube && (
            <li>
              <a href={p.youtube} target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            </li>
          )}
          {p.x && (
            <li>
              <a href={p.x} target="_blank" rel="noopener noreferrer">
                X
              </a>
            </li>
          )}
        </ul>
      )}
      {p.schedule && p.schedule.length > 0 && (
        <section className="mprofile__list">
          <h2>SCHEDULE</h2>
          <ul>
            {p.schedule.map((s) => (
              <li key={s.date + s.title}>
                <time>{s.date}</time>
                {s.title}
              </li>
            ))}
          </ul>
        </section>
      )}
      {p.history && p.history.length > 0 && (
        <section className="mprofile__list">
          <h2>HISTORY</h2>
          <ul>
            {p.history.map((h) => (
              <li key={h.date + h.text}>
                <time>{h.date}</time>
                {h.text}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default function MemberDetail() {
  const { slug } = useParams()
  const member = memberBySlug(slug)
  const ref = useRef<HTMLDivElement>(null)

  usePageMeta({
    title: member ? `${displayName(member)}（MEMBER ${member.number}）` : 'MEMBERS',
    description: member ? `ハミダシ部！ MEMBER ${member.number} ${displayName(member)}のプロフィールページ。` : undefined,
  })

  useMotion(
    ref,
    () => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.mdetail__num', { xPercent: -30, autoAlpha: 0, duration: 1.4 })
        .from('.mdetail__sil', { yPercent: 18, autoAlpha: 0, duration: 1.3 }, '-=1.2')
        .from('.mdetail__info > *', { y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.9 }, '-=1')
    },
    [slug],
  )

  if (!member) return <NotFound />

  const i = members.indexOf(member)
  const prev = members[(i - 1 + members.length) % members.length]
  const next = members[(i + 1) % members.length]
  const others = members.filter((m) => m !== member)
  const accent = member.profile.color

  return (
    <div ref={ref} className="mdetail-page">
      <section className={`mdetail mdetail--${member.tone}`} style={accent ? { ['--accent' as string]: accent } : undefined}>
        <div className="mdetail__visual">
          <span className="mdetail__num" aria-hidden="true">
            {member.number}
          </span>
          {member.revealed && member.profile.portrait ? (
            <img className="mdetail__sil" src={member.profile.portrait} alt={displayName(member)} />
          ) : (
            <Silhouette member={member} className="mdetail__sil" eager />
          )}
        </div>
        <div className="mdetail__info">
          <nav className="crumb crumb--dark" aria-label="パンくずリスト">
            <Link to="/">TOP</Link>
            <i aria-hidden="true">/</i>
            <Link to="/members">MEMBERS</Link>
            <i aria-hidden="true">/</i>
            <span aria-current="page">MEMBER {member.number}</span>
          </nav>
          <p className="mdetail__label">
            <Sparkle size={14} /> MEMBER {member.number}
          </p>
          <h1 className="mdetail__name">
            {displayName(member)}
            {member.revealed && member.profile.nameRoman && <small>{member.profile.nameRoman}</small>}
          </h1>
          {member.revealed && hasProfile(member) ? (
            <Profile m={member} />
          ) : (
            <div className="mdetail__soon">
              <p className="mdetail__soon-big">
                <span className="hero__soon-dot" aria-hidden="true" />
                COMING SOON
              </p>
              <p className="mdetail__soon-text">ビジュアルとプロフィールの公開まで、もう少しだけお待ちください。</p>
            </div>
          )}
          <nav className="mdetail__pn" aria-label="ほかのメンバーへ">
            <Link to={`/members/${prev.slug}`} className="mdetail__pn-btn">
              <Silhouette member={prev} alt="" />
              <span>
                <small>PREV MEMBER {prev.number}</small>
                {displayName(prev)}
              </span>
            </Link>
            <Link to={`/members/${next.slug}`} className="mdetail__pn-btn mdetail__pn-btn--next">
              <span>
                <small>NEXT MEMBER {next.number}</small>
                {displayName(next)}
              </span>
              <Silhouette member={next} alt="" />
            </Link>
          </nav>
          <ArrowLink to="/members" className="mdetail__back">
            BACK TO MEMBERS
          </ArrowLink>
        </div>
      </section>

      <section className="section others">
        <div className="container">
          <h2 className="others__title" data-reveal="">
            OTHER MEMBERS
          </h2>
          <div className="others__row" data-stagger="">
            {others.map((m) => (
              <MemberCard key={m.slug} member={m} compact />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
