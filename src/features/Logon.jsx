import { useState } from 'react'

function Logon({ onSetEmail, onSetToken }) {
  const initialValue = ''
  //   note to self: getter is that var/values, setter is the function
  const [email, setEmail] = useState(initialValue)
  const [password, setPassword] = useState(initialValue)
  const [authError, setAuthError] = useState(initialValue)
  const [isLoggingOn, setIsLoggingOn] = useState(false)

  async function handleSubmit(e) {
    try {
      e.preventDefault()
      setIsLoggingOn(true)
      setAuthError('')

      const response = await fetch('/api/users/logon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.status === 200 && data.name && data.csrfToken) {
        onSetEmail(data.name)
        onSetToken(data.csrfToken)
      } else {
        setAuthError(`Authentication failed: ${data?.message}`)
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
          {isLoggingOn ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

export default Logon
