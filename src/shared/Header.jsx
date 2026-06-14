//! Remove props parameter

import Logoff from '../features/Logoff'
import Logon from '../features/Logon'
import useAuth from '../contexts/AuthContext'
import Navigation from './Navigation'

//! Use useAuth() to access isAuthenticated

function Header() {
  //! I don't have any props

  const { isAuthenticated } = useAuth() //! why?
  return (
    <div>
      <Navigation />
      {isAuthenticated ? (
        <div>
          <h1>Todo List</h1>
          <Logoff />
        </div>
      ) : (
        <div>
          <h1>Todo List</h1>
          {/* <Logon /> */}
        </div>
      )}
    </div>
  )
}

export default Header
