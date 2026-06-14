import { NavLink } from 'react-router'
import React from 'react'
import useAuth from '../contexts/AuthContext'

// import LoginPage from '../pages/LoginPage'
// import TodosPage from '../pages/TodosPage'
// import AboutPage from '../pages/AboutPage'

export default function Navigation() {
  const navLinkStyles = ({ isActive }) => ({
    fontWeight: isActive ? 700 : 400,
    textDecoration: isActive ? 'underline' : 'none',
    padding: '2px 6px',
    borderRadius: 6,
    backgroundColor: isActive ? '#eee' : 'transparent',
  })
  const { isAuthenticated } = useAuth()

  return (
    <nav>
      <NavLink to="/about" style={navLinkStyles}>
        About
      </NavLink>

      {isAuthenticated ? (
        <>
          <NavLink to="/todos" style={navLinkStyles}>
            Todos
          </NavLink>
          <NavLink to="/profile" style={navLinkStyles}>
            Profile
          </NavLink>
        </>
      ) : (
        <NavLink to="/login" style={navLinkStyles}>
          Login
        </NavLink>
      )}
    </nav>
  )
}
