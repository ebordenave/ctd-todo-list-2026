import { useContext } from 'react'
// const AuthContext = createContext()
import { AuthContext } from '../contexts/AuthContext'

export default function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
