import { Sparkle } from './Sparkle'

/** 斜めに流れるテープ */
export function Marquee({
  items,
  tone = 'ink',
  reverse = false,
  tilt = 0,
  speed = 40,
  className = '',
}: {
  items: string[]
  tone?: 'ink' | 'pink' | 'paper'
  reverse?: boolean
  tilt?: number
  speed?: number
  className?: string
}) {
  const row = (
    <div className="marquee__row" aria-hidden="true">
      {Array.from({ length: 4 }).flatMap((_, k) =>
        items.map((t, i) => (
          <span className="marquee__item" key={`${k}-${i}`}>
            {t}
            <Sparkle size={18} />
          </span>
        )),
      )}
    </div>
  )
  return (
    <div
      className={`marquee marquee--${tone} ${reverse ? 'is-reverse' : ''} ${className}`}
      style={{ ['--tilt' as string]: `${tilt}deg`, ['--speed' as string]: `${speed}s` }}
    >
      <div className="marquee__track">
        {row}
        {row}
      </div>
    </div>
  )
}
