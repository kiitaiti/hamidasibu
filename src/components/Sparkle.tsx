/** ロゴの「！」に合わせた4点のキラッ */
export function Sparkle({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg className={`sparkle ${className}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.9 6.6 4.6 10.6 12 12-7.4 1.4-11.1 5.4-12 12-.9-6.6-4.6-10.6-12-12C7.4 10.6 11.1 6.6 12 0Z" fill="currentColor" />
    </svg>
  )
}
