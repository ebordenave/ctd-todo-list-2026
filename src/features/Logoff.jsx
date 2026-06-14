import useAuth from '../contexts/AuthContext'

export default function Logoff() {
  const { logout } = useAuth()

  return <button onClick={logout}>Logout</button>
}
