/**
 * オーディション情報
 * status を 'open' にして各項目を入れると、募集要項・選考フロー・FAQ・応募ボタンが表示されます。
 * 'coming-soon' の間は「AUDITION — COMING SOON」のみを表示します。
 */
export type Audition = {
  status: 'coming-soon' | 'open' | 'closed'
  period?: string
  requirements?: { label: string; value: string }[]
  flow?: { title: string; text: string }[]
  faq?: { q: string; a: string }[]
  /** 応募フォームのURL（外部フォーム等） */
  entryUrl?: string
}

export const audition: Audition = {
  status: 'coming-soon',
}
