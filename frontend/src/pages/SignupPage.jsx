import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Logo from '../component/Logo'
import PasswordField from '../component/PasswordField'
import PasswordStrength from '../component/PasswordStrength'
import { useAuth } from '../context/AuthContext'
import { evaluatePassword } from '../utils/passwordRules'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function SignupPage() {
  const { session, signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (session) return <Navigate to="/app" replace />

  const passwordOk = evaluatePassword(password, { name, email }).allRequiredMet
  const matches = password === confirm
  const canSubmit = EMAIL_PATTERN.test(email) && passwordOk && matches && confirm.length > 0 && agreed && !busy

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setError('')
    setBusy(true)
    const result = await signup({ name: name.trim(), email, password })
    setBusy(false)
    if (!result.ok) setError(result.error)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="brand">
          <Logo />
          <span className="brand-name">samvaad</span>
        </Link>

        <h1>Create your account.</h1>
        <p className="lead">A private space to begin, at your own pace.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label htmlFor="name">What should we call you? (optional)</label>
            <input
              id="name" type="text" maxLength={30} value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="given-name" placeholder="A first name or nickname"
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email" type="email" value={email} required
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email" inputMode="email"
            />
          </div>

          <PasswordField
            id="password" label="Create a password" value={password}
            onChange={setPassword} autoComplete="new-password"
          >
            <PasswordStrength password={password} name={name} email={email} />
          </PasswordField>

          <PasswordField
            id="confirm" label="Confirm password" value={confirm}
            onChange={setConfirm} autoComplete="new-password"
          >
            {confirm && !matches && <p className="form-error" role="alert">The two passwords don't match yet.</p>}
          </PasswordField>

          <label className="check">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <span>I understand this is a prototype and I won't use a real password from another account.</span>
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
            {busy ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link className="text-link" to="/login">Log in</Link>
        </p>

        <p className="fine-print left">
          Demo mode: your password is turned into a salted hash and kept only in this browser. A real account
          would be protected on our servers.
        </p>
      </div>
    </div>
  )
}

export default SignupPage
