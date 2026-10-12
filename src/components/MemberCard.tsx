import { Link } from 'react-router-dom'
import { displayName, type Member } from '../data/members'
import { Silhouette } from './Silhouette'
import { Sparkle } from './Sparkle'

export function MemberCard({ member, compact = false }: { member: Member; compact?: boolean }) {
  return (
    <Link
      to={`/members/${member.slug}`}
      className={`mcard mcard--${member.tone} ${compact ? 'mcard--compact' : ''}`}
      aria-label={`MEMBER ${member.number}（${displayName(member)}）のページへ`}
    >
      <div className="mcard__stage">
        <div className="mcard__bg" aria-hidden="true">
          <span className="mcard__num">{member.number}</span>
          <span className="mcard__slide">MEMBER {member.number} — MEMBER {member.number} — MEMBER {member.number} —</span>
        </div>
        <Silhouette member={member} className="mcard__img" alt="" />
        <span className="mcard__view" aria-hidden="true">
          VIEW PROFILE
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path d="M3 12h16M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
        </span>
      </div>
      <div className="mcard__meta">
        <span className="mcard__label">
          <Sparkle size={12} /> MEMBER {member.number}
        </span>
        <span className="mcard__name">{displayName(member)}</span>
        <span className="mcard__soon">{member.revealed ? member.profile.nameRoman : 'COMING SOON'}</span>
      </div>
    </Link>
  )
}
