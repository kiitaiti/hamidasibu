import type { Member } from '../data/members'

export function Silhouette({
  member,
  className = '',
  eager = false,
  alt,
}: {
  member: Member
  className?: string
  eager?: boolean
  alt?: string
}) {
  const s = member.silhouette
  return (
    <picture className={className}>
      <source srcSet={s.webp} type="image/webp" />
      <img
        src={s.png}
        width={s.width}
        height={s.height}
        alt={alt ?? `MEMBER ${member.number} のシルエット`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
      />
    </picture>
  )
}
