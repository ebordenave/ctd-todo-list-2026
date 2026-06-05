//! Remove props parameter

import useAuth from '../hooks/useAuth'

//! Use useAuth() to access isAuthenticated

function Header() {
  //! I don't have any props
  // eslint-disable-next-line no-unused-vars
  const { isAuthenticated } = useAuth() //! why?
  return <h1>Todo List</h1>
}

export default Header
