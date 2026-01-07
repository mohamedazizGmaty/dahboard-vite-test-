import { Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  requiredPermission?: string
}

export const ProtectedRoute = ({ requiredPermission }: ProtectedRouteProps) => {
  const { user, loading, permissions } = useAuth()
  const context = useOutletContext()

  if (loading) {
    return <div style={{ padding: '2rem', color: '#6b7280' }}>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredPermission && !permissions.includes(requiredPermission)) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    )
  }

  return <Outlet context={context} />
}
