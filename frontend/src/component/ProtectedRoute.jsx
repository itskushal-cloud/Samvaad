import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// - Not signed in            -> login page
// - Signed in, no plan yet   -> plan page (right after creating an account)
// - Signed in with a plan    -> the page
function ProtectedRoute({ children, requirePlan = true }) {
  const { session } = useAuth()
  if (!session) return <Navigate to="/login" replace />
  if (requirePlan && !session.subscription) return <Navigate to="/choose-plan" replace />
  return children
}

export default ProtectedRoute