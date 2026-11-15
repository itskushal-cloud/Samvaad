import { createContext, useContext, useState } from 'react'
import { hashPassword, newSalt, safeEqual, ITERATIONS } from '../utils/crypto'
import { evaluatePassword } from '../utils/passwordRules'
import { addMonths } from '../utils/dates'
import { getPlan } from '../data/plans'

/*
  DEMO authentication + subscriptions, frontend only.
  - Accounts (including each person's plan and booking) live in this browser's localStorage.
    Passwords are stored as salted PBKDF2 hashes, never as plain text.
  - Who is signed in lives in sessionStorage, so it ends when the tab is closed.
  - No payment is ever taken. Real billing and security come with the backend.
*/

const ACCOUNTS_KEY = 'samvaad-demo-accounts'
const SESSION_KEY = 'samvaad-demo-session'
const ATTEMPTS_KEY = 'samvaad-demo-attempts'
const MAX_ATTEMPTS = 5
const LOCK_MS = 30 * 1000

const ADJECTIVES = ['quiet', 'gentle', 'bright', 'calm', 'soft', 'steady']
const NOUNS = ['maple', 'river', 'willow', 'meadow', 'harbor', 'sparrow']
const pick = (list) => list[Math.floor(Math.random() * list.length)]

function read(storage, key, fallback) {
  try {
    return JSON.parse(storage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

function write(storage, key, value) {
  try {
    if (value === null) storage.removeItem(key)
    else storage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable */
  }
}

const normalizeEmail = (email) => email.trim().toLowerCase()

// Applies the passing of time to a subscription:
// - a scheduled cancellation that has arrived moves the person to Community
// - a new billing month resets the check-in count
function resolveSubscription(sub) {
  if (!sub) return null
  const now = new Date()

  if (sub.status === 'ending' && sub.endsOn && new Date(sub.endsOn) <= now) {
    return { planId: 'community', startedAt: sub.endsOn, renewsOn: null, endsOn: null, status: 'active', sessionsUsed: 0 }
  }

  if (sub.status === 'active' && sub.renewsOn) {
    let renews = new Date(sub.renewsOn)
    let used = sub.sessionsUsed
    while (renews <= now) {
      renews = addMonths(renews, 1)
      used = 0
    }
    return { ...sub, renewsOn: renews.toISOString(), sessionsUsed: used }
  }

  return sub
}

// What the rest of the app is allowed to see (never the password hash)
function buildSession(account) {
  const subscription = resolveSubscription(account.subscription)
  const plan = subscription ? getPlan(subscription.planId) : null
  return {
    email: account.email,
    name: account.name,
    handle: account.handle,
    createdAt: account.createdAt,
    subscription,
    booking: plan && plan.sessionsPerMonth > 0 ? account.booking ?? null : null,
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Clean up the older prototype session, if any
  try { localStorage.removeItem(SESSION_KEY) } catch { /* ignore */ }

  const [accounts, setAccounts] = useState(() => read(localStorage, ACCOUNTS_KEY, []))
  const [sessionEmail, setSessionEmail] = useState(() => read(sessionStorage, SESSION_KEY, null)?.email ?? null)

  const account = accounts.find((a) => a.email === sessionEmail)
  const session = account ? buildSession(account) : null

  const startSession = (email) => {
    setSessionEmail(email)
    write(sessionStorage, SESSION_KEY, email ? { email } : null)
  }

  // Saves changes to the signed-in person's account
  const save = (patch) => {
    const next = accounts.map((a) => (a.email === sessionEmail ? { ...a, ...patch } : a))
    setAccounts(next)
    write(localStorage, ACCOUNTS_KEY, next)
  }

  /* ---------- Sign up / log in / log out ---------- */

  const signup = async ({ name, email, password }) => {
    const cleanEmail = normalizeEmail(email)
    if (!evaluatePassword(password, { name, email: cleanEmail }).allRequiredMet) {
      return { ok: false, error: 'Please choose a password that meets every requirement.' }
    }

    const existing = read(localStorage, ACCOUNTS_KEY, [])
    if (existing.some((a) => a.email === cleanEmail)) {
      return { ok: false, error: 'This demo already has an account with that email. Try logging in instead.' }
    }

    try {
      const salt = newSalt()
      const hash = await hashPassword(password, salt)
      const created = {
        email: cleanEmail,
        name: name || 'Friend',
        handle: pick(ADJECTIVES) + pick(NOUNS),
        createdAt: new Date().toISOString(),
        salt, hash, iterations: ITERATIONS,
        subscription: null, // chosen on the plan page right after sign-up
        booking: null,
      }
      const next = [...existing, created]
      write(localStorage, ACCOUNTS_KEY, next)
      setAccounts(next)
      startSession(created.email)
      return { ok: true }
    } catch {
      return { ok: false, error: 'Secure features are not available in this browser or connection. Try localhost or HTTPS.' }
    }
  }

  const login = async ({ email, password }) => {
    const cleanEmail = normalizeEmail(email)
    const attempts = read(localStorage, ATTEMPTS_KEY, {})
    const record = attempts[cleanEmail] || { count: 0, until: 0 }

    if (record.until > Date.now()) {
      return { ok: false, lockedUntil: record.until, error: 'Too many attempts. Please wait a moment before trying again.' }
    }

    const stored = read(localStorage, ACCOUNTS_KEY, [])
    const found = stored.find((a) => a.email === cleanEmail)

    let matches = false
    try {
      // Hash even when the account doesn't exist, so timing doesn't reveal which emails are registered
      const hash = await hashPassword(password, found ? found.salt : newSalt(), found?.iterations)
      matches = Boolean(found) && safeEqual(hash, found.hash)
    } catch {
      return { ok: false, error: 'Secure features are not available in this browser or connection. Try localhost or HTTPS.' }
    }

    if (matches) {
      delete attempts[cleanEmail]
      write(localStorage, ATTEMPTS_KEY, attempts)
      setAccounts(stored)
      startSession(found.email)
      return { ok: true }
    }

    const count = record.count + 1
    if (count >= MAX_ATTEMPTS) {
      const until = Date.now() + LOCK_MS
      attempts[cleanEmail] = { count: 0, until }
      write(localStorage, ATTEMPTS_KEY, attempts)
      return { ok: false, lockedUntil: until, error: 'Too many attempts. Please wait a moment before trying again.' }
    }

    attempts[cleanEmail] = { count, until: 0 }
    write(localStorage, ATTEMPTS_KEY, attempts)
    const left = MAX_ATTEMPTS - count
    return { ok: false, error: `That email and password don't match. ${left} ${left === 1 ? 'try' : 'tries'} left.` }
  }

  /* ---------- Subscription ---------- */

  const choosePlan = (planId) => {
    const plan = getPlan(planId)
    const now = new Date()
    const keepBooking = plan.sessionsPerMonth > 0 && Boolean(session.booking)
    save({
      subscription: {
        planId,
        startedAt: now.toISOString(),
        renewsOn: plan.price > 0 ? addMonths(now, 1).toISOString() : null,
        endsOn: null,
        status: 'active',
        sessionsUsed: keepBooking ? 1 : 0,
      },
      booking: keepBooking ? session.booking : null,
    })
  }

  const cancelSubscription = () => {
    const sub = session.subscription
    if (!sub?.renewsOn) return
    save({ subscription: { ...sub, status: 'ending', endsOn: sub.renewsOn } })
  }

  const resumeSubscription = () => {
    save({ subscription: { ...session.subscription, status: 'active', endsOn: null } })
  }

  /* ---------- Check-in bookings (count toward the plan) ---------- */

  const bookCheckIn = (booking) => {
    const sub = session.subscription
    const plan = getPlan(sub.planId)
    if (plan.sessionsPerMonth === 0) return { ok: false }
    if (!session.booking && sub.sessionsUsed >= plan.sessionsPerMonth) return { ok: false }
    save({
      booking,
      subscription: { ...sub, sessionsUsed: session.booking ? sub.sessionsUsed : sub.sessionsUsed + 1 },
    })
    return { ok: true }
  }

  const cancelCheckIn = () => {
    if (!session.booking) return
    const sub = session.subscription
    save({ booking: null, subscription: { ...sub, sessionsUsed: Math.max(0, sub.sessionsUsed - 1) } })
  }

  const value = {
    session,
    signup,
    login,
    logout: () => startSession(null),
    updateName: (name) => save({ name: name || 'Friend' }),
    choosePlan,
    cancelSubscription,
    resumeSubscription,
    bookCheckIn,
    cancelCheckIn,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}