import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState(initialValue)
  const [password, setPassword] = useState(initialValue)
  const [authError, setAuthError] = useState(initialValue)
  const [isLoggingOn, setIsLoggingOn] = useState(false)
  const initialValue = ''

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  //! Get intended destination from location state, default to /todos
  const from = location.state?.from?.pathname || '/todos'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoggingOn(true)

    try {
      const result = await login(email, password)
      if (result.success) {
        setAuthError('')
      } else {
        setAuthError(result.error)
      }
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`)
    } finally {
      setIsLoggingOn(false)
    }
  }

  return (
    <div>
      {authError && <div role="alert">{authError}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoggingOn}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoggingOn}
            autoComplete="current-password"
          />
        </div>
        <button type="submit" disabled={isLoggingOn}>
          {isLoggingOn ? 'Logging in' : 'Log On'}
        </button>
      </form>
    </div>
  )
}
