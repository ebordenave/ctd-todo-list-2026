import { SquareCheckBig, UserCircle } from 'lucide-react'
import Logoff from '../features/Logoff'
import Logon from '../features/Logon'
import useAuth from '../contexts/AuthContext'
import Navigation from './Navigation'
import { HEADER_SCHEME } from '../utils/theme-config'
import { getUserInitials } from '../utils/userUtils'

function Header() {
  const { isAuthenticated, email } = useAuth()

  const initials = getUserInitials(email)

  return (
    <div className={HEADER_SCHEME.wrapper}>
      <div className={HEADER_SCHEME.row}>
        <div className={HEADER_SCHEME.logoContainer}>
          <SquareCheckBig className={HEADER_SCHEME.logoIcon} size={24} />
          <h1 className={HEADER_SCHEME.logoText}>
            My<span className={HEADER_SCHEME.logoHighlight}>Todos</span>
          </h1>
        </div>

        <div className={HEADER_SCHEME.actionContainer}>
          {isAuthenticated ? (
            <div className={HEADER_SCHEME.authGroup}>
              <Logoff />
              {/* <UserCircle className={HEADER_SCHEME.userIcon} size={28} />
              // probably here */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-200 text-zinc-800 font-semibold text-sm">
                {initials}
              </div>
            </div>
          ) : (
            <Logon />
          )}
        </div>
      </div>
      <Navigation />
    </div>
  )
}

export default Header
