import { NavLink } from 'react-router'
import React from 'react'
import useAuth from '../contexts/AuthContext'

import { NAV_SCHEME } from '../utils/theme-config'
import { Info, ListTodo, User, LogIn } from 'lucide-react'

export default function Navigation() {
  const getNavLinkClass = ({ isActive }) => {
    return `${NAV_SCHEME.baseLink} ${isActive ? NAV_SCHEME.active : NAV_SCHEME.inactive}`
  }

  const { isAuthenticated } = useAuth()

  return (
    <nav className={NAV_SCHEME.navbar}>
      <NavLink to="/about" className={getNavLinkClass}>
        <Info /> About
      </NavLink>

      {isAuthenticated ? (
        <>
          <NavLink to="/todos" className={getNavLinkClass}>
            <ListTodo />
            Todos
          </NavLink>
          <NavLink to="/profile" className={getNavLinkClass}>
            <User /> Profile
          </NavLink>
        </>
      ) : (
        <NavLink to="/login" className={getNavLinkClass}>
          <LogIn /> Login
        </NavLink>
      )}
    </nav>
  )
}
