import { ArrowLink } from '../components/ArrowLink'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta({ title: 'ページが見つかりません' })
  return (
    <section className="notfound">
      <div className="container">
        <p className="notfound__big" aria-hidden="true">
          404
        </p>
        <h1 className="notfound__title">
          このページは、
          <br />
          はみ出しすぎたみたい。
        </h1>
        <p className="notfound__text">お探しのページは移動または削除された可能性があります。</p>
        <ArrowLink to="/">BACK TO TOP</ArrowLink>
      </div>
    </section>
  )
}
