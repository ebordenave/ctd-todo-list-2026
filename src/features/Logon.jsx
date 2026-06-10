import { useState } from 'react'
import useAuth from '../hooks/useAuth'

function Logon() {
  const { login } = useAuth()

  const initialValue = ''

  const [email, setEmail] = useState(initialValue)
  const [password, setPassword] = useState(initialValue)
  const [authError, setAuthError] = useState(initialValue)
  const [isLoggingOn, setIsLoggingOn] = useState(false)

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

export default Logon
