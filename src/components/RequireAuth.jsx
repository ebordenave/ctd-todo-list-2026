import { Navigate, useLocation } from 'react-router'
import useAuth from '../contexts/AuthContext'

export default function RequireAuth({ children }) {
  const { isAuthenticated, token } = useAuth()
  const location = useLocation()

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
