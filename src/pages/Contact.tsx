import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { isPreviewBuild } from '../config/site'
import { usePageMeta } from '../hooks/usePageMeta'

const TYPES = ['お仕事のご依頼', 'コラボレーション', 'メディア・取材', 'その他'] as const

type Fields = { type: string; company: string; name: string; email: string; message: string; agree: boolean }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'success' | 'error'

const initial: Fields = { type: '', company: '', name: '', email: '', message: '', agree: false }

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.type) e.type = 'お問い合わせ種別を選択してください。'
  if (!f.name.trim()) e.name = 'お名前を入力してください。'
  if (!f.email.trim()) e.email = 'メールアドレスを入力してください。'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'メールアドレスの形式が正しくありません。'
  if (!f.message.trim()) e.message = 'お問い合わせ内容を入力してください。'
  else if (f.message.trim().length < 10) e.message = 'お問い合わせ内容は10文字以上で入力してください。'
  if (!f.agree) e.agree = '個人情報の取り扱いへの同意が必要です。'
  return e
}

export default function Contact() {
  usePageMeta({
    title: 'CONTACT',
    description: 'ハミダシ部！へのお仕事のご依頼、コラボレーション、取材に関するお問い合わせはこちら。',
  })
  const [f, setF] = useState<Fields>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    const nf = { ...f, [k]: v }
    setF(nf)
    if (touched[k]) setErrors(validate(nf))
  }
  const blur = (k: keyof Fields) => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(f))
  }
  const err = (k: keyof Fields) => (touched[k] ? errors[k] : undefined)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const v = validate(f)
    setErrors(v)
    setTouched({ type: true, name: true, email: true, message: true, agree: true })
    if (Object.keys(v).length) {
      const first = e.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')
      first?.focus()
      return
    }
    if (isPreviewBuild) return
    setStatus('sending')
    try {
      const body = new URLSearchParams({
        'form-name': 'contact',
        'bot-field': (e.currentTarget.elements.namedItem('bot-field') as HTMLInputElement)?.value ?? '',
        type: f.type,
        company: f.company,
        name: f.name,
        email: f.email,
        message: f.message,
        agree: f.agree ? 'yes' : 'no',
      })
      // Netlify Forms：静的HTML（public/__forms.html）に定義したフォームへ送信
      const r = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!r.ok) throw new Error(String(r.status))
      setStatus('success')
      setF(initial)
      setTouched({})
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageHero
        en="CONTACT"
        ja="お問い合わせ"
        tone="paper"
        lead={
          <p>
            ハミダシ部！へのお仕事のご依頼、コラボレーション、取材に関するお問い合わせはこちらからお願いいたします。
          </p>
        }
      />
      <section className="section contact">
        <div className="container contact__grid">
          <aside className="contact__aside" data-reveal="">
            <ol className="contact__steps">
              <li className={status !== 'success' ? 'is-active' : ''}>
                <b>01</b>入力
              </li>
              <li className={status === 'success' ? 'is-active' : ''}>
                <b>02</b>送信完了
              </li>
            </ol>
            <ul className="contact__notes">
              <li>内容を確認のうえ、担当者よりメールでご連絡いたします。</li>
              <li>お問い合わせの内容によっては、お返事を差し上げられない場合がございます。</li>
              <li>ファンレター・プレゼントの受付方法は、決まり次第NEWSでお知らせします。</li>
            </ul>
          </aside>

          <div className="contact__main">
            {status === 'success' ? (
              <div className="formdone" role="status">
                <p className="formdone__big">THANK YOU!</p>
                <h2>お問い合わせを受け付けました。</h2>
                <p>内容を確認のうえ、担当者よりご連絡いたします。今しばらくお待ちください。</p>
                <button type="button" className="btn btn--ink" onClick={() => setStatus('idle')}>
                  <span className="btn__label">続けて問い合わせる</span>
                </button>
              </div>
            ) : (
              <form className="form" noValidate onSubmit={onSubmit} name="contact" data-reveal="">
                {isPreviewBuild && (
                  <p className="form__notice" role="note">
                    これはプレビュー版のため、フォームは送信されません。Netlifyに公開すると送信できるようになります。
                  </p>
                )}
                {status === 'error' && (
                  <p className="form__alert" role="alert">
                    送信できませんでした。時間をおいて再度お試しください。
                  </p>
                )}
                <p className="form__hp" aria-hidden="true">
                  <label>
                    この欄は空のままにしてください
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <fieldset className="field">
                  <legend className="field__label">
                    お問い合わせ種別<span className="req">必須</span>
                  </legend>
                  <div className="chips" role="radiogroup">
                    {TYPES.map((t) => (
                      <label key={t} className={`chip ${f.type === t ? 'is-checked' : ''}`}>
                        <input
                          type="radio"
                          name="type"
                          value={t}
                          checked={f.type === t}
                          onChange={() => {
                            setTouched((x) => ({ ...x, type: true }))
                            set('type', t)
                          }}
                          aria-invalid={!!err('type')}
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                  {err('type') && <p className="field__err">{err('type')}</p>}
                </fieldset>

                <div className="field">
                  <label className="field__label" htmlFor="c-company">
                    会社名・団体名<span className="opt">任意</span>
                  </label>
                  <input
                    id="c-company"
                    name="company"
                    autoComplete="organization"
                    value={f.company}
                    onChange={(e) => set('company', e.target.value)}
                  />
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="c-name">
                    お名前<span className="req">必須</span>
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    autoComplete="name"
                    value={f.name}
                    onChange={(e) => set('name', e.target.value)}
                    onBlur={() => blur('name')}
                    aria-invalid={!!err('name')}
                    aria-describedby={err('name') ? 'c-name-err' : undefined}
                  />
                  {err('name') && (
                    <p className="field__err" id="c-name-err">
                      {err('name')}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="c-email">
                    メールアドレス<span className="req">必須</span>
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={f.email}
                    onChange={(e) => set('email', e.target.value)}
                    onBlur={() => blur('email')}
                    aria-invalid={!!err('email')}
                    aria-describedby={err('email') ? 'c-email-err' : undefined}
                  />
                  {err('email') && (
                    <p className="field__err" id="c-email-err">
                      {err('email')}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="c-message">
                    お問い合わせ内容<span className="req">必須</span>
                  </label>
                  <textarea
                    id="c-message"
                    name="message"
                    rows={8}
                    value={f.message}
                    onChange={(e) => set('message', e.target.value)}
                    onBlur={() => blur('message')}
                    aria-invalid={!!err('message')}
                    aria-describedby={err('message') ? 'c-message-err' : undefined}
                  />
                  {err('message') && (
                    <p className="field__err" id="c-message-err">
                      {err('message')}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label className={`check ${f.agree ? 'is-checked' : ''}`}>
                    <input
                      type="checkbox"
                      name="agree"
                      checked={f.agree}
                      onChange={(e) => {
                        setTouched((x) => ({ ...x, agree: true }))
                        set('agree', e.target.checked)
                      }}
                      aria-invalid={!!err('agree')}
                    />
                    <span className="check__box" aria-hidden="true" />
                    <span>
                      <Link to="/privacy" target="_blank">
                        プライバシーポリシー
                      </Link>
                      に同意する
                    </span>
                  </label>
                  {err('agree') && <p className="field__err">{err('agree')}</p>}
                </div>

                <button type="submit" className="btn btn--pink form__submit" disabled={status === 'sending' || isPreviewBuild}>
                  <span className="btn__label">{status === 'sending' ? 'SENDING…' : 'SEND'}</span>
                  <span className="btn__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path d="M3 12h16M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.6" />
                    </svg>
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
