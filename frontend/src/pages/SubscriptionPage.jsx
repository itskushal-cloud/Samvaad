import { useState } from 'react'
import PlanCards from '../component/PlanCards'
import ConfirmModal from '../component/ConfirmModal'
import { useAuth } from '../context/AuthContext'
import { getPlan, formatPrice } from '../data/plans'
import { formatDate } from '../utils/dates'

function SubscriptionPage() {
  const { session, choosePlan, cancelSubscription, resumeSubscription } = useAuth()
  const sub = session.subscription
  const plan = getPlan(sub.planId)
  const ending = sub.status === 'ending'
  const isPaid = plan.price > 0

  const [pending, setPending] = useState(null) // { type: 'switch' | 'cancel', plan? }
  const [message, setMessage] = useState('')

  const handleSelect = (target) => {
    setMessage('')
    if (target.id === plan.id) {
      if (ending) {
        resumeSubscription()
        setMessage('Your plan will continue as usual.')
      }
      return
    }
    if (target.id === 'community') setPending({ type: 'cancel' })
    else setPending({ type: 'switch', plan: target })
  }

  const confirm = () => {
    if (pending.type === 'cancel') {
      cancelSubscription()
      setMessage(`Your plan will end on ${formatDate(sub.renewsOn)}. You keep everything until then.`)
    } else {
      choosePlan(pending.plan.id)
      setMessage(`You are now on the ${pending.plan.name} plan.`)
    }
    setPending(null)
  }

  const used = sub.sessionsUsed
  const total = plan.sessionsPerMonth

  return (
    <>
      <div className="page-head">
        <h1>Subscription</h1>
        <p>See your plan, switch to another, or cancel. Nothing here is ever rushed.</p>
      </div>

      {message && <p className="notice" role="status">{message}</p>}

      <section className="sub-summary" aria-labelledby="current-plan">
        <div className="sub-top">
          <div>
            <p className="muted" id="current-plan">Your current plan</p>
            <p className="sub-name">{plan.name}</p>
          </div>
          <span className={`status ${ending ? 'ending' : ''}`}>
            {ending ? `Ends on ${formatDate(sub.endsOn)}` : 'Active'}
          </span>
        </div>

        <dl className="sub-meta">
          <div>
            <dt>Price</dt>
            <dd>{formatPrice(plan)}{isPaid && ' per month'}</dd>
          </div>
          <div>
            <dt>Includes</dt>
            <dd>{plan.cadence}</dd>
          </div>
          {isPaid && !ending && (
            <div>
              <dt>Renews on</dt>
              <dd>{formatDate(sub.renewsOn)}</dd>
            </div>
          )}
        </dl>

        {total > 0 && (
          <div>
            <p className="muted">{used} of {total} check-ins used this month</p>
            <div className="meter" role="img" aria-label={`${used} of ${total} check-ins used`}>
              <span style={{ width: `${(used / total) * 100}%` }} />
            </div>
          </div>
        )}

        {ending && (
          <div className="inline-actions">
            <button className="btn btn-primary btn-sm" onClick={() => handleSelect(plan)}>Keep my plan</button>
          </div>
        )}
      </section>

      <section className="sub-section" aria-labelledby="change-plan">
        <h2 id="change-plan">Change your plan</h2>
        <p className="muted">Prototype: no payment is taken when you switch.</p>
        <PlanCards mode="manage" currentId={plan.id} ending={ending} onSelect={handleSelect} />
      </section>

      <section className="sub-section sub-cancel" aria-labelledby="cancel-plan">
        <h2 id="cancel-plan">Cancel subscription</h2>
        {!isPaid && <p className="muted">Community is free, so there is nothing to cancel. You can upgrade whenever you feel ready.</p>}
        {isPaid && ending && <p className="muted">Your cancellation is scheduled. You can keep your plan above if you change your mind.</p>}
        {isPaid && !ending && (
          <>
            <p className="muted">
              If you cancel, you keep your {plan.name} plan until {formatDate(sub.renewsOn)}, then move to the free
              Community plan. You are welcome back at any time.
            </p>
            <button className="btn btn-ghost btn-sm" onClick={() => setPending({ type: 'cancel' })}>
              Cancel subscription
            </button>
          </>
        )}
      </section>

      {pending?.type === 'cancel' && (
        <ConfirmModal
          title="Cancel your plan?"
          confirmLabel="Yes, cancel"
          cancelLabel="Keep my plan"
          onConfirm={confirm}
          onCancel={() => setPending(null)}
        >
          <p>
            You keep your {plan.name} plan until {formatDate(sub.renewsOn)}, then move to the free Community plan.
          </p>
          <p className="fine-print left">Prototype: no payment is involved.</p>
        </ConfirmModal>
      )}

      {pending?.type === 'switch' && (
        <ConfirmModal
          title={`Switch to ${pending.plan.name}?`}
          confirmLabel="Yes, switch"
          onConfirm={confirm}
          onCancel={() => setPending(null)}
        >
          <p>
            {pending.plan.name} is {formatPrice(pending.plan)} per month · {pending.plan.cadence}. It starts today,
            and your check-in count for the month begins fresh.
          </p>
          <p className="fine-print left">Prototype: no payment is taken.</p>
        </ConfirmModal>
      )}
    </>
  )
}

export default SubscriptionPage
