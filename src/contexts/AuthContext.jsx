import React, { useState, createContext, useContext } from 'react'
import { useNavigate } from 'react-router'

export const AuthContext = createContext()

export default function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [email, setEmail] = useState(
    () => localStorage.getItem('userEmail') || '',
  )
  const [token, setToken] = useState(
    () => localStorage.getItem('csrfToken') || '',
  )
  const navigate = useNavigate()

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
        setEmail(data.name)
        setToken(data.csrfToken)
        localStorage.setItem('userEmail', data.name)
        localStorage.setItem('csrfToken', data.csrfToken)
        return { success: true }
      } else {
        return {
          success: false,
          error: `Authentication failed: ${data?.message}`,
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  const logout = async () => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
        },
        credentials: 'include',
      }

      await fetch('/api/users/logoff', options)
      return { success: true }
    } catch (error) {
      console.error(error.message)
      return {
        success: false,
        error: error.message,
      }
    } finally {
      setEmail('')
      setToken('')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('csrfToken')

      navigate('/login')
    }
  }

  const value = {
    email,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
