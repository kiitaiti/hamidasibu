import { PageHero } from '../components/PageHero'
import { site } from '../config/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Privacy() {
  usePageMeta({ title: 'PRIVACY POLICY', description: 'ハミダシ部！公式サイトのプライバシーポリシーです。' })
  return (
    <>
      <PageHero en="PRIVACY POLICY" ja="プライバシーポリシー" tone="paper" />
      <section className="section">
        <div className="container container--narrow prose prose--policy">
          <p>
            {site.operator}（以下「運営」といいます）は、{site.name}
            公式サイト（以下「本サイト」といいます）における個人情報の取り扱いについて、以下のとおり定めます。
          </p>
          <h2>1. 取得する情報</h2>
          <p>
            本サイトのお問い合わせフォームでは、お名前、メールアドレス、会社名・団体名（任意）、お問い合わせ内容を取得します。
          </p>
          <h2>2. 利用目的</h2>
          <ul>
            <li>お問い合わせへの回答およびご連絡のため</li>
            <li>お仕事のご依頼・コラボレーション・取材等の検討および調整のため</li>
            <li>本サイトおよびサービスの改善のため</li>
          </ul>
          <h2>3. 第三者提供</h2>
          <p>法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。</p>
          <h2>4. 外部サービスの利用</h2>
          <p>
            本サイトは、ホスティングおよびフォーム送信の処理に外部サービス（Netlify）を利用しています。送信された情報は、当該サービスのサーバーを経由して運営に届きます。
          </p>
          <h2>5. 安全管理</h2>
          <p>取得した個人情報は、漏えい・滅失・毀損の防止のため、適切な安全管理措置を講じて管理します。</p>
          <h2>6. 開示・訂正・削除</h2>
          <p>
            ご本人から個人情報の開示・訂正・利用停止・削除のご請求があった場合は、本人確認のうえ、法令に従い対応いたします。お問い合わせフォームよりご連絡ください。
          </p>
          <h2>7. 改定</h2>
          <p>本ポリシーの内容は、必要に応じて予告なく変更することがあります。変更後の内容は本サイトに掲載した時点で効力を生じます。</p>
          <h2>8. お問い合わせ窓口</h2>
          <p>
            運営：{site.operator}
            <br />
            本ポリシーに関するお問い合わせは、お問い合わせフォームよりお願いいたします。
          </p>
          {site.privacyEffectiveDate && <p className="prose__date">制定日：{site.privacyEffectiveDate}</p>}
        </div>
      </section>
    </>
  )
}
