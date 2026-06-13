import React from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router'
import useAuth from '../contexts/AuthContext'

export default function RequireAuth({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, token } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        replace: true,
        state: location,
      })
    }
  }, [isAuthenticated, navigate, location])

  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}
// Create src/components/RequireAuth.jsx.

// [ ] Implement wrapper component checking isAuthenticated from auth context.

// [ ] Use useEffect to redirect unauthenticated users to /login, passing the current location in the state wrapper.
