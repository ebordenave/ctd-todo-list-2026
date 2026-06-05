import { React, useState, createContext } from 'react'
export const AuthContext = createContext()
// import useAuth from '../hooks/useAuth'

//! AuthProvider
//! useState for auth data: email and token state variables
//! children prop: Allows this component to wrap other components
//! Context.Provider: Makes the value available to all child components

export function AuthProvider({ children }) {
  // State for authentication
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')

  // Functions will go here...
  //! login pattern:
  // Return success/error objects: Components can check result.
  // success and handle result.error
  // Update state on success: Only call setEmail and setToken when authentication succeeds
  // Include credentials: credentials: 'include' ensures cookies are sent with requests
  // Error handling: Catch network errors and API errors consistently
  const login = async (userEmail, password) => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password }),
        credentials: 'include',
      }

      const res = await fetch('/api/users/logon', options)
      const data = await res.json()

      if (res.status === 200 && data.name && data.csrfToken) {
        // Success: Update state
        setEmail(data.name)
        setToken(data.csrfToken)
        return { success: true }
      } else {
        // Failure: Return error
        return {
          success: false,
          error: `Authentication failed: ${data?.message}`,
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error,
      }
    }
  }

  const logout = async () => {
    if (!token) return setEmail(''), setToken('')

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
        },
        credentials: 'include',
      }

      const res = await fetch('/api/users/logoff', options)
      const data = await res.json()

      if (res.status === 200 && data.name && data.csrfToken) {
        // Success: Update state
        return { success: true }
      } else {
        return {
          success: false,
          error: `Authentication failed: ${data?.message}`,
        }
      }
    } catch (error) {
      console.error(error.message)
      return {
        success: false,
        error: error.message,
      }
    } finally {
      //! clear local state
      setToken('')
      setEmail('')
    }
  }

  // Context value object
  //!Context Value: Provide { email, token, isAuthenticated, login, logout }
  const value = {
    email,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  }
  //!<AuthContext.Provider value={value}>{children}</AuthContext.Provider> makes this value available to all descendant components. Any component wrapped by AuthProvider can call useAuth() to access these values and functions.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
