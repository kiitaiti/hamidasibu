import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLink } from '../components/ArrowLink'
import { Marquee } from '../components/Marquee'
import { MaskText } from '../components/MaskText'
import { MemberCard } from '../components/MemberCard'
import { NewsEmpty, NewsRows, NewsSkeleton } from '../components/NewsRows'
import { SectionHead } from '../components/SectionHead'
import { Silhouette } from '../components/Silhouette'
import { Sparkle } from '../components/Sparkle'
import { asset, site } from '../config/site'
import { audition } from '../data/audition'
import { members } from '../data/members'
import { usePageMeta } from '../hooks/usePageMeta'
import { useMotion } from '../hooks/useMotion'
import { fetchNewsList, type NewsListResult } from '../lib/news'
import { gsap } from '../lib/motion'

/** ファーストビューでの並び順（中央にツインテールの03） */
const HERO_ORDER = [4, 1, 2, 3, 0]

export default function Home() {
  usePageMeta({})
  const ref = useRef<HTMLDivElement>(null)
  const [news, setNews] = useState<NewsListResult | null>(null)

  useEffect(() => {
    fetchNewsList({ limit: 3 }).then(setNews)
  }, [])

  useMotion(ref, () => {
    const root = ref.current!
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.from('.hero__slab', { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', duration: 1.2, ease: 'power4.inOut' })
      .from('.hero__sil', { yPercent: 40, autoAlpha: 0, duration: 1.3, stagger: { each: 0.09, from: 'center' } }, '-=0.55')
      .from('.hero__logo', { scale: 0.6, rotate: -14, autoAlpha: 0, duration: 1.1, ease: 'back.out(1.8)' }, '-=1.1')
      .from('.hero__copy .mask-line > span', { yPercent: 110, duration: 1.1, stagger: 0.12 }, '-=0.8')
      .from('.hero__sub, .hero__soon, .hero__scroll', { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, '-=0.7')
      .from('.hero__tape', { xPercent: -100, duration: 1.1, ease: 'power4.out' }, '-=0.9')

    // スクロールで巨大英字が左右に流れる・シルエットがわずかに沈む
    gsap.to('.hero__giant--a', {
      xPercent: -22,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 },
    })
    gsap.to('.hero__giant--b', {
      xPercent: 16,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 },
    })
    gsap.to('.hero__cast', {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 },
    })
    // ABOUT の大きなコピーで「ハミダシ」が枠からはみ出していく
    gsap.fromTo(
      root.querySelectorAll('.habout__hami'),
      { x: 0 },
      {
        x: () => Math.min(window.innerWidth * 0.06, 90),
        ease: 'none',
        scrollTrigger: { trigger: '.habout', start: 'top 70%', end: 'bottom 30%', scrub: 0.6 },
      },
    )
  })

  return (
    <div ref={ref} className="home">
      {/* ── FIRST VIEW ───────────────────────────── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__giant hero__giant--a" aria-hidden="true">
          HAMIDASHI HAMIDASHI
        </div>
        <div className="hero__slab" aria-hidden="true">
          <div className="hero__giant hero__giant--b">KAGAYAKI KAGAYAKI</div>
        </div>

        <div className="hero__cast" aria-hidden="true">
          {HERO_ORDER.map((idx, i) => (
            <Silhouette
              key={members[idx].slug}
              member={members[idx]}
              className={`hero__sil hero__sil--${i + 1}`}
              eager
              alt=""
            />
          ))}
        </div>

        <div className="hero__body">
          <h1 id="hero-title" className="hero__logo">
            <img src={asset('images/logo.webp')} width="1200" height="216" alt={site.name} fetchPriority="high" />
          </h1>
          <p className="hero__sub">{site.subCopy}</p>
          <p className="hero__soon">
            <span className="hero__soon-dot" aria-hidden="true" />5 MEMBERS — DEBUT COMING SOON
          </p>
        </div>

        <MaskText
          as="p"
          auto={false}
          className="hero__copy"
          lines={[
            <>
              <em>ハミダシ</em>ものは、
            </>,
            <>
              <em>カガヤキ</em>ものだ。
            </>,
          ]}
        />

        <a href="#home-news" className="hero__scroll">
          <span>SCROLL</span>
        </a>

        <div className="hero__tape">
          <Marquee
            items={['ハミダシ部！', 'DEBUT COMING SOON', 'ハミダシものは、カガヤキものだ。', 'CHASE YOUR DREAM']}
            tone="ink"
            speed={46}
          />
        </div>
      </section>

      {/* ── NEWS ────────────────────────────────── */}
      <section id="home-news" className="hnews section">
        <div className="container hnews__grid">
          <div className="hnews__head">
            <SectionHead en="NEWS" ja="おしらせ" />
            <ArrowLink to="/news" className="hnews__more pc-only">
              VIEW ALL
            </ArrowLink>
          </div>
          <div className="hnews__body" data-reveal="">
            {!news && <NewsSkeleton />}
            {news && news.status === 'ok' && <NewsRows items={news.items} />}
            {news && news.status !== 'ok' && <NewsEmpty compact />}
            <ArrowLink to="/news" className="hnews__more sp-only">
              VIEW ALL
            </ArrowLink>
          </div>
        </div>
      </section>

      <Marquee items={['ABOUT', 'ハミダシ部！について']} tone="pink" tilt={-2.2} speed={34} className="band" />

      {/* ── ABOUT ───────────────────────────────── */}
      <section className="habout section">
        <div className="habout__ghost" aria-hidden="true" data-scroll-x="-25">
          NOT NORMAL, THAT'S GOOD.
        </div>
        <div className="container">
          <SectionHead en="ABOUT" ja="ハミダシ部！について" tone="paper" />
          <p className="habout__copy">
            <span className="mask-line" data-reveal="">
              <span>
                <span className="habout__hami">ハミダシ</span>ものは、
              </span>
            </span>
            <span className="mask-line" data-reveal="" data-reveal-delay="0.12">
              <span>
                <span className="habout__kaga">
                  カガヤキ
                  <Sparkle className="habout__spark" size={40} />
                </span>
                ものだ。
              </span>
            </span>
          </p>
          <div className="habout__foot">
            <p className="habout__text" data-reveal="">
              みんなと同じになれなくてもいい。
              <br />
              好きなことに、夢中になっていい。
              <br />
              歌手、アイドル、声優。ハミダシ部！は、本気の夢を持つ女の子たちが
              <br className="pc-only" />
              VTuberとして活動しながら、その夢を叶えにいくグループです。
              <br className="pc-only" />
              夢を追いかける姿で、画面の向こうのあなたに勇気を届けます。
            </p>
            <ArrowLink to="/about" tone="pink" className="habout__btn">
              MORE ABOUT
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* ── MEMBERS ─────────────────────────────── */}
      <section className="hmembers section">
        <div className="container">
          <div className="hmembers__head">
            <SectionHead en="MEMBERS" ja="メンバー" />
            <p className="hmembers__lead" data-reveal="">
              夢を追いかける、5人のハミダシもの。
              <br />
              デビューまで、シルエットから推しを見つけておいて。
            </p>
          </div>
        </div>
        <div className="hmembers__row" data-stagger="">
          {members.map((m) => (
            <MemberCard key={m.slug} member={m} />
          ))}
        </div>
        <div className="container hmembers__more">
          <ArrowLink to="/members">VIEW ALL MEMBERS</ArrowLink>
        </div>
      </section>

      {/* ── AUDITION ────────────────────────────── */}
      <section className="haudition">
        <div className="haudition__giant" aria-hidden="true" data-scroll-x="-30">
          AUDITION AUDITION AUDITION
        </div>
        <div className="container haudition__grid">
          <div className="haudition__body">
            <p className="haudition__en" data-reveal="">
              <Sparkle size={16} /> AUDITION
            </p>
            <MaskText
              as="h2"
              className="haudition__title"
              lines={['次に、', 'はみ出すのは', '君だ。']}
            />
            <p className="haudition__sub" data-reveal="">
              その夢を、ここから叶えにいこう。
            </p>
            <div className="haudition__actions" data-reveal="">
              {audition.status !== 'open' && <span className="badge">詳細公開予定</span>}
              <ArrowLink to="/audition" tone="paper">
                AUDITION
              </ArrowLink>
            </div>
          </div>
          <Link to="/audition" className="haudition__slot" data-reveal="" aria-label="オーディションページへ">
            <span className="haudition__slot-q" aria-hidden="true">
              ?
            </span>
            <span className="haudition__slot-label">
              MEMBER 06
              <small>— IT COULD BE YOU</small>
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
