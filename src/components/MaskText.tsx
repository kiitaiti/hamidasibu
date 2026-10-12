import type { ElementType, ReactNode } from 'react'

/** 行ごとにマスクから立ち上がる見出し（useMotion の [data-mask] と連動） */
export function MaskText({
  as: Tag = 'h2',
  lines,
  className = '',
  delay,
  auto = true,
}: {
  as?: ElementType
  lines: ReactNode[]
  className?: string
  delay?: number
  /** false にすると共通のスクロール演出を付けない（個別にアニメーションする場合） */
  auto?: boolean
}) {
  return (
    <Tag className={className} data-mask={auto ? '' : undefined} data-reveal-delay={delay}>
      {lines.map((l, i) => (
        <span className="mask-line" key={i}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  )
}
