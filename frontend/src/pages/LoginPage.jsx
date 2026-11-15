import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import Logo from '../component/Logo'
import PasswordField from '../component/PasswordField'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const { session, login } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [lockedUntil, setLockedUntil] = useState(0)
  const [now, setNow] = useState(Date.now())

  // Ticks only while the form is locked, to show a countdown
  useEffect(() => {
    if (lockedUntil <= Date.now()) return
    const id = setInterval(() => setNow(Date.now()), 500)
    return () => clearInterval(id)
  }, [lockedUntil])

  if (session) return <Navigate to="/app" replace />

  const secondsLocked = Math.max(0, Math.ceil((lockedUntil - now) / 1000))
  const locked = secondsLocked > 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (locked || busy) return
    setError('')
    setBusy(true)
    const result = await login({ email, password })
    setBusy(false)
    if (!result.ok) {
      setPassword('')
      setError(result.error)
      if (result.lockedUntil) {
        setLockedUntil(result.lockedUntil)
        setNow(Date.now())
      }
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="brand">
          <Logo />
          <span className="brand-name">samvaad</span>
        </Link>

        <h1>Welcome back.</h1>

        {location.state?.reason === 'idle' && (
          <p className="notice" role="status">
            You were signed out after a period of inactivity, to keep your space private.
          </p>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email" type="email" value={email} required
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email" inputMode="email"
            />
          </div>

          <PasswordField
            id="password" label="Password" value={password}
            onChange={setPassword} autoComplete="current-password"
          />

          {error && <p className="form-error" role="alert">{error}{locked && ` (${secondsLocked}s)`}</p>}

          <button type="submit" className="btn btn-primary" disabled={locked || busy}>
            {busy ? 'Checking…' : locked ? `Try again in ${secondsLocked}s` : 'Log in'}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link className="text-link" to="/signup">Create an account</Link>
        </p>

        <p className="fine-print left">
          Demo mode: accounts exist only in this browser and nothing is sent to a server. Please don't use a
          password you use anywhere else.
        </p>
      </div>
    </div>
  )
}

export default LoginPage