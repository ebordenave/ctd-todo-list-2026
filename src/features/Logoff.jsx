// ! where in the instructions were we supposed to create this?
import { useState } from 'react'
// Remove props parameter
// Use useAuth() to access logout() method
// Handle logout success/error from context
import useAuth from '../hooks/useAuth'

export default function Logoff() {
  const [authError, setAuthError] = useState('')

  const { logout } = useAuth()
  const [isLoggingOn, setIsLoggingOn] = useState(false)

  async function handleSubmit(e) {
    // set to true
    setIsLoggingOn(true)
    e.preventDefault()
    try {
      const result = await logout()
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
      {authError && <div>{authError}</div>}
      {!isLoggingOn && (
        <form action="" onSubmit={handleSubmit}>
          <button>Log Out</button>
        </form>
      )}
    </div>
  )
}
