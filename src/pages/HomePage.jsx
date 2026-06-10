import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

import React from 'react'

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    //! if the user is authenticated
    if (isAuthenticated) {
      //! navigate to todos
      navigate('/todos', { replace: true })
    } else {
      //!otherwise
      //!navigate back to login
      navigate('/login', { replace: false })
    }
  }, [isAuthenticated, navigate])
  return (
    <div>
      <p>Redirecting...</p>
    </div>
  )
}
