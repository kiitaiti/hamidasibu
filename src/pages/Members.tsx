import { useRef } from 'react'
import { MemberCard } from '../components/MemberCard'
import { PageHero } from '../components/PageHero'
import { members } from '../data/members'
import { usePageMeta } from '../hooks/usePageMeta'
import { useMotion } from '../hooks/useMotion'

export default function Members() {
  usePageMeta({ title: 'MEMBERS', description: 'ハミダシ部！のメンバー一覧。5人のハミダシもの、まもなく公開。' })
  const ref = useRef<HTMLElement>(null)
  useMotion(ref)
  return (
    <>
      <PageHero
        en="MEMBERS"
        ja="メンバー"
        tone="pink"
        lead={
          <p>
            5人のハミダシもの、まもなく公開。
            <br />
            気になるシルエットをタップして、続報を待っていてください。
          </p>
        }
      />
      <section ref={ref} className="section members-page">
        <div className="container">
          <div className="members-grid" data-stagger="">
            {members.map((m) => (
              <MemberCard key={m.slug} member={m} />
            ))}
          </div>
          <p className="members-page__note" data-reveal="">
            ※ メンバーの名前・ビジュアル・プロフィールは、決まり次第このサイトのNEWSでお知らせします。
          </p>
        </div>
      </section>
    </>
  )
}
