import Icon from './Icon'
import { PLANS, formatPrice } from '../data/plans'

// The three plan cards, used both after sign-up and on the Subscription page.
// mode: 'onboarding' (no plan yet) or 'manage' (changing an existing plan)
function PlanCards({ currentId, ending = false, mode = 'onboarding', onSelect }) {
  const currentIsPaid = currentId && currentId !== 'community'

  return (
    <div className="plan-grid">
      {PLANS.map((plan, index) => {
        const isCurrent = plan.id === currentId
        const waitingToDowngrade = plan.id === 'community' && currentIsPaid && ending
        const disabled = (isCurrent && !ending) || waitingToDowngrade

        let label
        if (isCurrent) label = ending ? 'Keep this plan' : 'Your current plan'
        else if (waitingToDowngrade) label = 'Starts after your plan ends'
        else if (mode === 'onboarding') label = plan.price === 0 ? 'Start for free' : `Choose ${plan.name}`
        else label = plan.price === 0 ? 'Switch to Community' : `Switch to ${plan.name}`

        return (
          <article
            key={plan.id}
            className={`plan-card ${isCurrent ? 'is-current' : ''}`}
            style={{ '--i': index }}
          >
            {isCurrent && <span className="tag plan-tag">Current plan</span>}
            <h3>{plan.name}</h3>
            <p className="plan-tagline">{plan.tagline}</p>

            <p className="plan-price">
              {formatPrice(plan)}
              {plan.price > 0 && <small>per month</small>}
            </p>

            <ul className="plan-features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Icon name="check" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`btn ${plan.price > 0 && !disabled ? 'btn-primary' : 'btn-ghost'}`}
              disabled={disabled}
              onClick={() => onSelect(plan)}
            >
              {label}
            </button>
          </article>
        )
      })}
    </div>
  )
}

export default PlanCards
