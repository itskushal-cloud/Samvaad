import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const IDLE_MS = 10 * 60 * 1000 // sign out after 10 minutes of no activity
const WARN_MS = 60 * 1000 // warn during the last minute

// Protects privacy on shared devices: signs out after a period of inactivity.
// It pauses on the call page, where people may sit quietly for a while.
function IdleGuard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [secondsLeft, setSecondsLeft] = useState(null)
  const lastActive = useRef(Date.now())
  const warningRef = useRef(false)
  const pathRef = useRef(pathname)
  const buttonRef = useRef(null)

  useEffect(() => { pathRef.current = pathname }, [pathname])

  useEffect(() => {
    const markActive = () => {
      if (!warningRef.current) lastActive.current = Date.now()
    }
    const events = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll']
    events.forEach((e) => window.addEventListener(e, markActive, { passive: true }))

    const timer = setInterval(() => {
      if (pathRef.current.endsWith('/call')) {
        lastActive.current = Date.now()
        return
      }
      const idle = Date.now() - lastActive.current
      if (idle >= IDLE_MS) {
        logout()
        navigate('/login', { state: { reason: 'idle' }, replace: true })
      } else if (idle >= IDLE_MS - WARN_MS) {
        warningRef.current = true
        setSecondsLeft(Math.ceil((IDLE_MS - idle) / 1000))
      }
    }, 1000)

    return () => {
      events.forEach((e) => window.removeEventListener(e, markActive))
      clearInterval(timer)
    }
  }, [logout, navigate])

  const warning = secondsLeft !== null

  useEffect(() => {
    if (warning) buttonRef.current?.focus()
  }, [warning])

  const stay = () => {
    warningRef.current = false
    lastActive.current = Date.now()
    setSecondsLeft(null)
  }

  if (!warning) return null

  return (
    <div className="modal-backdrop">
      <div className="modal" role="alertdialog" aria-modal="true" aria-labelledby="idle-title">
        <h2 id="idle-title">Still there?</h2>
        <p>To keep your space private, we will sign you out in {secondsLeft} seconds.</p>
        <button ref={buttonRef} className="btn btn-primary" onClick={stay}>Stay signed in</button>
      </div>
    </div>
  )
}

export default IdleGuard
