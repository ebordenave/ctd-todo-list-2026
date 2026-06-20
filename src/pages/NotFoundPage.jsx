import React from 'react'
import { useNavigate, Link } from 'react-router'
import Header from '../shared/Header'
import { BUTTON_SCHEME, NOT_FOUND_SCHEME } from '../utils/theme-config'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div>
      <Header />
      <div className={NOT_FOUND_SCHEME.wrapper}>
        <img
          src="src/assets/aurmce.jpg"
          className="rounded-xl shadow-md max-w-md w-full my-6"
        />
        <p className={NOT_FOUND_SCHEME.title}>404</p>
        <p className={NOT_FOUND_SCHEME.subtitle}>Page Not Found</p>
        <p className={NOT_FOUND_SCHEME.description}>
          The page you are looking for does not exist.
        </p>
        <div className="flex flex-row justify-between gap-4">
          <button
            className={BUTTON_SCHEME.secondary}
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          <Link to="/" className={BUTTON_SCHEME.primary}>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
