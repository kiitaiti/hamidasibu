import { asset } from '../config/site'

/**
 * メンバーデータ（一元管理）
 * 正式公開時は、各メンバーの profile に情報を入れるだけで
 * 一覧・個別ページ・フッターへ自動で反映されます。
 * 未入力（undefined / 空）の項目はページに表示されません。
 */
export type MemberProfile = {
  name?: string
  nameRoman?: string
  catchCopy?: string
  introduction?: string
  birthday?: string
  height?: string
  likes?: string[]
  youtube?: string
  x?: string
  /** キャラクターカラー（例: '#E40080'） */
  color?: string
  /** 正式立ち絵（公開後に差し替え）。未設定ならシルエットを表示 */
  portrait?: string
  /** 配信予定 */
  schedule?: { date: string; title: string }[]
  /** 活動履歴 */
  history?: { date: string; text: string }[]
}

export type Member = {
  slug: string
  number: string
  silhouette: { webp: string; png: string; width: number; height: number }
  /** カードの背景バリエーション */
  tone: 'pink' | 'blush' | 'paper' | 'stripe' | 'dot'
  /** true になるまでは COMING SOON 表示 */
  revealed: boolean
  profile: MemberProfile
}

const sil = (n: number, width: number, height: number) => ({
  webp: asset(`images/member-0${n}.webp`),
  png: asset(`images/member-0${n}.png`),
  width,
  height,
})

export const members: Member[] = [
  { slug: 'member-01', number: '01', silhouette: sil(1, 567, 1467), tone: 'pink', revealed: false, profile: {} },
  { slug: 'member-02', number: '02', silhouette: sil(2, 618, 1474), tone: 'blush', revealed: false, profile: {} },
  { slug: 'member-03', number: '03', silhouette: sil(3, 986, 1498), tone: 'dot', revealed: false, profile: {} },
  { slug: 'member-04', number: '04', silhouette: sil(4, 743, 1469), tone: 'stripe', revealed: false, profile: {} },
  { slug: 'member-05', number: '05', silhouette: sil(5, 755, 1494), tone: 'paper', revealed: false, profile: {} },
]

export const memberBySlug = (slug?: string) => members.find((m) => m.slug === slug)

export const displayName = (m: Member) => (m.revealed && m.profile.name ? m.profile.name : '？？？')
