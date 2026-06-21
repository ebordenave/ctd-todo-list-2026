import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useAuth from '../contexts/AuthContext'

import React from 'react'

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos', { replace: true })
    } else {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])
  return (
    <div>
      <p>Redirecting...</p>
    </div>
  )
}
