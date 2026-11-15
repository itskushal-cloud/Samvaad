import { Link } from 'react-router-dom'
import Icon from '../component/Icon'
import { useAuth } from '../context/AuthContext'
import { THERAPISTS } from '../data/demoData'
import { getPlan } from '../data/plans'

function DashboardPage() {
  const { session, cancelCheckIn } = useAuth()
  const booked = session.booking && THERAPISTS.find((t) => t.id === session.booking.therapistId)
  const sub = session.subscription
  const plan = getPlan(sub.planId)
  const total = plan.sessionsPerMonth

  return (
    <>
      <div className="page-head">
        <h1>Welcome, {session.name}.</h1>
        <p>Take things at your own pace. Here are a few places you can begin.</p>
      </div>

      <div className="dash-grid">
        <article className="dash-card tone-peach">
          <Icon name="people" />
          <h2>Community</h2>
          <p>Read, share, and reply in gentle peer spaces. You appear under your anonymous name, <strong>{session.handle}</strong>.</p>
          <Link className="text-link" to="/app/community">Open community</Link>
        </article>

        <article className="dash-card tone-sage">
          <Icon name="chat" />
          <h2>Therapist check-ins</h2>
          <p>
            {total > 0
              ? 'Browse trainee therapists, see how they are supervised, and pick a short 60-minute check-in.'
              : 'Check-ins are part of the Support and Steady plans. You can still meet our trainee therapists.'}
          </p>
          <Link className="text-link" to="/app/check-ins">Browse check-ins</Link>
        </article>
      </div>

      <section className="upcoming" aria-labelledby="plan-title">
        <Icon name="card" />
        <div className="upcoming-body">
          <h2 id="plan-title">Your plan</h2>
          <p>
            <strong>{plan.name}</strong>
            {total > 0 ? ` · ${sub.sessionsUsed} of ${total} check-ins used this month` : ' · Community forum access'}
            {sub.status === 'ending' && <span className="badge">Ending soon</span>}
          </p>
          <div className="inline-actions">
            <Link className="text-link" to="/app/subscription">Manage subscription</Link>
          </div>
        </div>
      </section>

      <section className="upcoming" aria-labelledby="upcoming-title">
        <Icon name="calendar" />
        <div className="upcoming-body">
          <h2 id="upcoming-title">Your next check-in</h2>
          {booked ? (
            <>
              <p>
                <strong>{booked.name}</strong> · {session.booking.slot}
                <span className="badge">Demo booking</span>
              </p>
              <div className="inline-actions">
                <Link className="btn btn-primary btn-sm" to="/app/call">Join call room</Link>
                <button className="text-link" onClick={cancelCheckIn}>Remove</button>
              </div>
            </>
          ) : (
            <p>
              Nothing planned yet, and that is completely fine.{' '}
              <Link className="text-link" to="/app/check-ins">Find a check-in</Link>
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export default DashboardPage