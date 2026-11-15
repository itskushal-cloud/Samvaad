import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getPlan, formatPrice } from '../data/plans'
import { formatDate } from '../utils/dates'

function ProfilePage() {
  const { session, updateName, logout } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(session.name)
  const [saved, setSaved] = useState(false)

  const sub = session.subscription
  const plan = getPlan(sub.planId)
  const ending = sub.status === 'ending'

  const handleSave = (e) => {
    e.preventDefault()
    updateName(name.trim())
    setSaved(true)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <div className="page-head">
        <h1>Profile</h1>
        <p>Your account and plan details, all in one quiet place.</p>
      </div>

      <section className="profile-card">
        <div className="profile-head">
          <span className="avatar avatar-xl">{(session.name || 'F').slice(0, 1).toUpperCase()}</span>
          <div>
            <h2>{session.name}</h2>
            <p className="muted">{session.email}</p>
          </div>
        </div>

        <form className="name-form" onSubmit={handleSave}>
          <label htmlFor="display-name">Display name</label>
          <div className="name-row">
            <input
              id="display-name" value={name} maxLength={30}
              onChange={(e) => { setName(e.target.value); setSaved(false) }}
            />
            <button type="submit" className="btn btn-ghost btn-sm">Save</button>
          </div>
          {saved && <p className="muted" role="status">Saved.</p>}
        </form>

        <dl className="detail-list">
          <div className="detail-row">
            <dt>Anonymous name</dt>
            <dd>{session.handle}<span className="muted"> · shown on your community posts</span></dd>
          </div>
          <div className="detail-row">
            <dt>Member since</dt>
            <dd>{session.createdAt ? formatDate(session.createdAt) : 'Earlier this year'}</dd>
          </div>
        </dl>
      </section>

      <section className="profile-card" aria-labelledby="plan-details">
        <h2 id="plan-details">Your plan</h2>
        <dl className="detail-list">
          <div className="detail-row">
            <dt>Plan</dt>
            <dd>{plan.name} · {formatPrice(plan)}{plan.price > 0 && ' per month'}</dd>
          </div>
          <div className="detail-row">
            <dt>Includes</dt>
            <dd>{plan.cadence}</dd>
          </div>
          <div className="detail-row">
            <dt>Status</dt>
            <dd>{ending ? `Ends on ${formatDate(sub.endsOn)}` : 'Active'}</dd>
          </div>
          {plan.price > 0 && !ending && (
            <div className="detail-row">
              <dt>Renews on</dt>
              <dd>{formatDate(sub.renewsOn)}</dd>
            </div>
          )}
          {plan.sessionsPerMonth > 0 && (
            <div className="detail-row">
              <dt>Check-ins this month</dt>
              <dd>{sub.sessionsUsed} of {plan.sessionsPerMonth} used</dd>
            </div>
          )}
        </dl>
        <Link className="btn btn-ghost btn-sm" to="/app/subscription">Manage subscription</Link>
      </section>

      <p className="fine-print left">
        Prototype: this account lives only in this browser, and no payment information is collected.
      </p>
      <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Log out</button>
    </>
  )
}

export default ProfilePage
