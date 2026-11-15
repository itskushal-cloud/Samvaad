import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ChoosePlanPage from './pages/ChoosePlanPage'
import DashboardPage from './pages/DashboardPage'
import CommunityPage from './pages/CommunityPage'
import CheckInsPage from './pages/CheckInsPage'
import CallPage from './pages/CallPage'
import SubscriptionPage from './pages/SubscriptionPage'
import ProfilePage from './pages/ProfilePage'
import AppLayout from './component/AppLayout'
import ProtectedRoute from './component/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Signed in, but a plan has not been chosen yet */}
      <Route
        path="/choose-plan"
        element={
          <ProtectedRoute requirePlan={false}>
            <ChoosePlanPage />
          </ProtectedRoute>
        }
      />

      {/* Signed in with a plan */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="check-ins" element={<CheckInsPage />} />
        <Route path="call" element={<CallPage />} />
        <Route path="subscription" element={<SubscriptionPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App