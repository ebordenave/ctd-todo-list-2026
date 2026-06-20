import useAuth from '../contexts/AuthContext'

export default function Logoff() {
  const { logout } = useAuth()

  return (
    <button
      onClick={logout}
      className="text-sm font-medium text-zinc-500 hover:text-zinc-800 transition-colors"
    >
      Logout
    </button>
  )
}
