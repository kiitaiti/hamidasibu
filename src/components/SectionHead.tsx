import { MaskText } from './MaskText'

export function SectionHead({
  en,
  ja,
  tone = 'ink',
  align = 'left',
  as = 'h2',
}: {
  en: string
  ja: string
  tone?: 'ink' | 'paper'
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
}) {
  return (
    <header className={`shead shead--${tone} shead--${align}`}>
      <MaskText as={as} className="shead__en" lines={[en]} />
      <p className="shead__ja" data-reveal="">
        <span className="shead__bar" aria-hidden="true" />
        {ja}
      </p>
    </header>
  )
}
