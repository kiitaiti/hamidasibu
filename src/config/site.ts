/**
 * サイト全体の設定。
 * 未確定の項目は空文字のままにしておくと、サイト上には表示されません
 * （ダミーリンクや架空の情報を出さないため）。
 */
export const site = {
  name: 'ハミダシ部！',
  nameEn: 'HAMIDASHIBU!',
  catchCopy: 'ハミダシものは、カガヤキものだ。',
  subCopy: 'ハミダシものが、世界を変える。',
  description:
    'ハミダシ部！は、歌手・アイドル・声優を目指す女の子たちが、夢を追いかけながら活動するVTuberグループ。ハミダシものは、カガヤキものだ。',
  operator: 'ARTICLE',
  /** 運営会社サイト（空にすると非表示） */
  operatorUrl: 'https://article58.jp',
  /** 公式SNS。URLが決まったら入れてください。空のものは「COMING SOON」表示になります */
  sns: {
    youtube: '',
    x: '',
  },
  /** プライバシーポリシーの制定日（例: '2026年11月1日'）。空なら非表示 */
  privacyEffectiveDate: '',
  copyrightYear: 2026,
} as const

/** プレビュー環境（Netlify以外）で動いているかどうか */
export const isPreviewBuild = import.meta.env.VITE_HASH_ROUTER === 'true'

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
