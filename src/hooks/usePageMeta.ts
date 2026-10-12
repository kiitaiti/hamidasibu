import { useEffect } from 'react'
import { site } from '../config/site'

type Meta = { title?: string; description?: string }

const setMeta = (selector: string, attr: 'name' | 'property', key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/** ページごとの title / description / OGP を設定 */
export function usePageMeta({ title, description }: Meta) {
  useEffect(() => {
    const fullTitle = title ? `${title}｜${site.name} 公式サイト` : `${site.name} 公式サイト｜${site.catchCopy}`
    const desc = description || site.description
    document.title = fullTitle
    setMeta('meta[name="description"]', 'name', 'description', desc)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc)
    if (!import.meta.env.VITE_HASH_ROUTER) {
      setMeta('meta[property="og:url"]', 'property', 'og:url', window.location.href)
      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = window.location.origin + window.location.pathname
    }
  }, [title, description])
}
