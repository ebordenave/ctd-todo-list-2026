import React from 'react'
import { useNavigate, Link } from 'react-router'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <Link to="/">Return Home</Link>
    </div>
  )
}
