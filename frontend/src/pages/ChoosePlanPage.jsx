import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Logo from '../component/Logo'
import PlanCards from '../component/PlanCards'
import ConfirmModal from '../component/ConfirmModal'
import IdleGuard from '../component/IdleGuard'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../data/plans'

// Shown once, right after creating an account (and again only if no plan was ever chosen)
function ChoosePlanPage() {
  const { session, choosePlan, logout } = useAuth()
  const navigate = useNavigate()
  const [pending, setPending] = useState(null)

  // Already has a plan? Straight to the app.
  if (session.subscription) return <Navigate to="/app" replace />

  const handleSelect = (plan) => {
    if (plan.price === 0) choosePlan(plan.id)
    else setPending(plan)
  }

  const confirm = () => {
    choosePlan(pending.id)
    setPending(null)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="onboard">
      <IdleGuard />

      <div className="container onboard-bar">
        <div className="brand">
          <Logo />
          <span className="brand-name">samvaad</span>
        </div>
        <button className="text-link" onClick={handleLogout}>Log out</button>
      </div>

      <div className="container onboard-body">
        <header className="onboard-head">
          <h1>Welcome, {session.name}.</h1>
          <p className="lead">
            Choose how you would like to begin. Every plan includes our welcoming community, and you can
            switch or cancel whenever you like.
          </p>
        </header>

        <PlanCards mode="onboarding" onSelect={handleSelect} />

        <p className="fine-print">
          Prototype: no payment is taken and nothing is charged. Check-ins are offered by trainee therapists,
          with their training and supervision shown on each profile. Samvaad is not an emergency service.
        </p>
      </div>

      {pending && (
        <ConfirmModal
          title={`Start the ${pending.name} plan?`}
          confirmLabel="Yes, start"
          onConfirm={confirm}
          onCancel={() => setPending(null)}
        >
          <p>{formatPrice(pending)} per month · {pending.cadence}. You can switch or cancel any time.</p>
          <p className="fine-print left">Prototype: no payment is taken.</p>
        </ConfirmModal>
      )}
    </div>
  )
}

export default ChoosePlanPage
