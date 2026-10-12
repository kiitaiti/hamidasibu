import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLink } from '../components/ArrowLink'
import { Marquee } from '../components/Marquee'
import { MaskText } from '../components/MaskText'
import { Silhouette } from '../components/Silhouette'
import { Sparkle } from '../components/Sparkle'
import { audition } from '../data/audition'
import { members } from '../data/members'
import { usePageMeta } from '../hooks/usePageMeta'
import { useMotion } from '../hooks/useMotion'

const LIKES = ['ゲーム', '歌', '雑談', '企画', '表現活動']

export default function Audition() {
  usePageMeta({
    title: 'AUDITION',
    description: '次に、はみ出すのは君だ。ハミダシ部！オーディション情報（詳細公開予定）。',
  })
  const ref = useRef<HTMLDivElement>(null)
  useMotion(ref)
  const open = audition.status === 'open'

  return (
    <div ref={ref} className="aud">
      <section className="aud-hero">
        <div className="aud-hero__ghost" aria-hidden="true" data-scroll-x="-20">
          AUDITION AUDITION
        </div>
        <div className="container aud-hero__inner">
          <nav className="crumb" aria-label="パンくずリスト">
            <Link to="/">TOP</Link>
            <i aria-hidden="true">/</i>
            <span aria-current="page">AUDITION</span>
          </nav>
          <p className="aud-hero__en" data-reveal="">
            <Sparkle size={16} /> AUDITION
          </p>
          <MaskText as="h1" className="aud-hero__title" lines={['次に、', 'はみ出すのは', '君だ。']} />
          <p className="aud-hero__sub" data-reveal="" data-reveal-delay="0.3">
            誰かと同じじゃなくていい。
            <br />
            その個性が、才能になる。
          </p>
        </div>
        <div className="aud-hero__cast" aria-hidden="true">
          {members.map((m) => (
            <Silhouette key={m.slug} member={m} className="aud-hero__sil" alt="" />
          ))}
          <div className="aud-hero__slot">
            <span>?</span>
          </div>
        </div>
      </section>

      <Marquee items={['NEXT HAMIDASHI IS YOU', '次に、はみ出すのは君だ。']} tone="ink" tilt={-1.8} speed={38} className="band" />

      <section className="section aud-about">
        <div className="container aud-about__grid">
          <h2 className="aud-about__title" data-reveal="">
            ABOUT
            <br />
            AUDITION
            <small>オーディションについて</small>
          </h2>
          <div className="aud-about__body">
            <p data-reveal="">
              ハミダシ部！は、他人と違う個性や、自分だけの情熱を大切にするVTuberグループです。
            </p>
            <ul className="aud-about__likes" data-stagger="">
              {LIKES.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p data-reveal="">
              あなたの「好き」や「得意」が、誰かに勇気を届けるかもしれません。
              <br />
              私たちは、自分らしく挑戦したい人との出会いを大切にしています。
            </p>
          </div>
        </div>
      </section>

      {!open && (
        <section className="section aud-status">
          <div className="container">
            <div className="aud-status__box" data-reveal="">
              <p className="aud-status__big">
                AUDITION
                <span> — </span>
                COMING SOON
              </p>
              <p className="aud-status__text">
                現在、応募は受け付けていません。
                <br />
                募集要項・応募方法は、決まり次第このサイトのNEWSでお知らせします。
              </p>
              <ArrowLink to="/news" tone="paper">
                CHECK NEWS
              </ArrowLink>
            </div>
          </div>
        </section>
      )}

      {open && (
        <section className="section aud-open">
          <div className="container container--narrow">
            {audition.period && (
              <p className="aud-open__period">
                <span className="badge">応募受付中</span> {audition.period}
              </p>
            )}
            {audition.requirements && (
              <>
                <h2 className="aud-open__h">REQUIREMENTS<small>募集要項</small></h2>
                <dl className="operator__list">
                  {audition.requirements.map((r) => (
                    <div key={r.label}>
                      <dt>{r.label}</dt>
                      <dd>{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
            {audition.flow && (
              <>
                <h2 className="aud-open__h">FLOW<small>選考の流れ</small></h2>
                <ol className="aud-open__flow">
                  {audition.flow.map((s, i) => (
                    <li key={s.title}>
                      <b>{String(i + 1).padStart(2, '0')}</b>
                      <span>
                        <strong>{s.title}</strong>
                        {s.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </>
            )}
            {audition.faq && (
              <>
                <h2 className="aud-open__h">FAQ<small>よくある質問</small></h2>
                <div className="aud-open__faq">
                  {audition.faq.map((q) => (
                    <details key={q.q}>
                      <summary>{q.q}</summary>
                      <p>{q.a}</p>
                    </details>
                  ))}
                </div>
              </>
            )}
            {audition.entryUrl && (
              <a className="btn btn--pink" href={audition.entryUrl} target="_blank" rel="noopener noreferrer">
                <span className="btn__label">ENTRY</span>
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
