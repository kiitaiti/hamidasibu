import { useRef } from 'react'
import { ArrowLink } from '../components/ArrowLink'
import { Marquee } from '../components/Marquee'
import { MaskText } from '../components/MaskText'
import { PageHero } from '../components/PageHero'
import { Silhouette } from '../components/Silhouette'
import { Sparkle } from '../components/Sparkle'
import { site } from '../config/site'
import { members } from '../data/members'
import { usePageMeta } from '../hooks/usePageMeta'
import { useMotion } from '../hooks/useMotion'

const STORY: { text: string[]; size?: 'l' | 'xl'; tone?: 'pink' }[] = [
  { text: ['誰とでも繋がれる時代。', 'それなのに、自分らしくいられる場所は、', '案外少ない。'] },
  { text: ['みんなと違うことが怖かったり、', '失敗することが恥ずかしかったり。'] },
  { text: ['でも、私たちは思う。'], size: 'l' },
  { text: ['周りからはみ出した部分にこそ、', 'その人だけの魅力がある。'], size: 'xl', tone: 'pink' },
  { text: ['ハミダシ部！は、', 'そんな個性が集まる場所。'], size: 'l' },
  { text: ['歌手、アイドル、声優。', 'ここに集まったのは、本気の夢を持つ女の子たち。', 'VTuberとして活動しながら、その夢を叶えにいく。'] },
  { text: ['夢を追いかける姿は、', '見ている誰かの勇気になる。'], size: 'l' },
  { text: ['好きなことに夢中になることも、', '大きな夢に挑戦することも、', '誰かと違う道を選ぶことも。'] },
  { text: ['全部、自分らしさだ。'], size: 'xl' },
]

export default function About() {
  usePageMeta({
    title: 'ABOUT',
    description: '普通じゃない。それが、いい。夢を追いかけるVTuberグループ、ハミダシ部！の想いをご紹介します。',
  })
  const ref = useRef<HTMLDivElement>(null)
  useMotion(ref)

  return (
    <div ref={ref}>
      <PageHero
        en="ABOUT US"
        ja="ハミダシ部！について"
        tone="ink"
        lead={
          <p className="about-hero__copy">
            普通じゃない。
            <br />
            <em>それが、いい。</em>
          </p>
        }
      />

      <section className="story section">
        <div className="container story__grid">
          <div className="story__aside" aria-hidden="true">
            <div className="story__sticky">
              <span className="story__label">
                <Sparkle size={14} /> OUR STORY
              </span>
              <Silhouette member={members[3]} className="story__sil" alt="" />
            </div>
          </div>
          <div className="story__body">
            {STORY.map((b, i) => (
              <p
                key={i}
                className={`story__block ${b.size ? `story__block--${b.size}` : ''} ${b.tone ? 'is-pink' : ''}`}
                data-reveal=""
              >
                {b.text.map((t, k) => (
                  <span key={k}>{t}</span>
                ))}
              </p>
            ))}
            <div className="story__finale" data-reveal="">
              <p className="story__finale-copy">
                <span>
                  <em>ハミダシ</em>ものは、
                </span>
                <span>
                  <em>カガヤキ</em>ものだ。
                </span>
              </p>
              <p className="story__finale-sub">私たちは、その可能性を信じています。</p>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={['個性', '自由', '挑戦', '仲間', '青春', '反骨精神', 'カワイイ × カッコイイ', 'はみ出す勇気']}
        tone="ink"
        tilt={1.6}
        speed={50}
        className="band"
      />

      <section className="mv section">
        <div className="container mv__grid">
          <div className="mv__card mv__card--mission" data-reveal="">
            <p className="mv__en">MISSION</p>
            <MaskText as="h2" className="mv__text" lines={['ハミダシものが、', '人生に勇気を与える。']} />
          </div>
          <div className="mv__card mv__card--vision" data-reveal="" data-reveal-delay="0.1">
            <p className="mv__en">VISION</p>
            <MaskText
              as="h2"
              className="mv__text"
              lines={['一人ひとりの個性が輝き、', '誰もが自分らしく', '挑戦できる世界へ。']}
            />
          </div>
        </div>
      </section>

      <section className="operator section">
        <div className="container operator__grid">
          <h2 className="operator__title" data-reveal="">
            COMPANY
            <small>運営情報</small>
          </h2>
          <dl className="operator__list" data-reveal="">
            <div>
              <dt>グループ名</dt>
              <dd>
                {site.name}（{site.nameEn}）
              </dd>
            </div>
            <div>
              <dt>運営</dt>
              <dd>
                {site.operatorUrl ? (
                  <a href={site.operatorUrl} target="_blank" rel="noopener noreferrer">
                    {site.operator}
                  </a>
                ) : (
                  site.operator
                )}
              </dd>
            </div>
            <div>
              <dt>お問い合わせ</dt>
              <dd>
                <ArrowLink to="/contact" className="btn--sm">
                  CONTACT
                </ArrowLink>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  )
}
