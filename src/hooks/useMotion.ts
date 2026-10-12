import { useLayoutEffect, type RefObject } from 'react'
import { gsap, ScrollTrigger, MOTION_OK } from '../lib/motion'

/**
 * 共通のスクロール演出をまとめて適用するフック。
 *  [data-reveal]        … 下からフェードイン（data-reveal-delay で遅延）
 *  [data-mask]          … 中の .mask-line > span がマスクから立ち上がる
 *  [data-scroll-x="-30"]… スクロール量に合わせて横移動（xPercent）
 *  [data-stagger]       … 直下の子要素を順番に表示
 * prefers-reduced-motion が有効な環境では何もしません（最初から表示）。
 */
export function useMotion(scope: RefObject<HTMLElement>, extra?: () => void, deps: unknown[] = []) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root) return
    // 入れ子のスコープ（PageHero など）は、それぞれのフックに任せる
    root.setAttribute('data-motion-scope', '')
    const own = (sel: string) =>
      Array.from(root.querySelectorAll<HTMLElement>(sel)).filter((el) => el.closest('[data-motion-scope]') === root)
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      own('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 48,
          autoAlpha: 0,
          duration: 1,
          delay: Number(el.dataset.revealDelay || 0),
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
      own('[data-mask]').forEach((el) => {
        gsap.from(el.querySelectorAll('.mask-line > span'), {
          yPercent: 115,
          rotate: 4,
          duration: 1.05,
          stagger: 0.09,
          delay: Number(el.dataset.revealDelay || 0),
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
      own('[data-stagger]').forEach((el) => {
        gsap.from(el.children, {
          y: 60,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      })
      own('[data-scroll-x]').forEach((el) => {
        gsap.to(el, {
          xPercent: Number(el.dataset.scrollX),
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      })
      extra?.()
    })
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => {
      window.clearTimeout(t)
      mm.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
