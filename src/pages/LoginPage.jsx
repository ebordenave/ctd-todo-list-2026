import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { SquareCheckBig, Sparkles } from 'lucide-react'
import useAuth from '../contexts/AuthContext'
import { BUTTON_SCHEME } from '../utils/theme-config'
import Spinner from '../shared/Spinner'

export default function LoginPage() {
  const initialValue = ''
  const [email, setEmail] = useState(initialValue)
  const [password, setPassword] = useState(initialValue)
  const [authError, setAuthError] = useState(initialValue)
  const [isLoggingOn, setIsLoggingOn] = useState(false)

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/todos'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoggingOn(true)

    try {
      const result = await login(email, password)
      if (result.success) {
        setAuthError('')
      } else {
        setAuthError(result.error)
      }
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`)
    } finally {
      setIsLoggingOn(false)
    }
  }

  const DEMO_USER = {
    email: 'demo@email.com',
    password: 'pEQOzU1dL0Kflz!',
  }

  async function attemptLogin(email, password) {
    setIsLoggingOn(true)
    try {
      const result = await login(email, password)
      if (result.success) {
        setAuthError('')
      } else {
        setAuthError(result.error)
      }
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`)
    } finally {
      setIsLoggingOn(false)
    }
  }

  async function handleDemoLogin() {
    await attemptLogin(DEMO_USER.email, DEMO_USER.password)
  }

  return (
    <div className="px-8 pt-8 pb-10">
      <div className="flex items-center gap-2 justify-center mb-6">
        <SquareCheckBig className="text-[var(--accent-color)]" size={28} />
        <h1 className="text-2xl font-bold text-zinc-800">
          My<span className="text-[var(--accent-color)]">Todos</span>
        </h1>
      </div>
      {authError && (
        <div
          role="alert"
          className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200"
        >
          {authError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={100}
            disabled={isLoggingOn}
            autoComplete="email"
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-zinc-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength={100}
            disabled={isLoggingOn}
            autoComplete="current-password"
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={isLoggingOn}
          className="w-full mt-2 py-2 px-4 bg-[var(--accent-color)] hover:brightness-90 text-white font-medium rounded-full shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-color)] disabled:opacity-50 cursor-pointer"
        >
          {isLoggingOn ? 'Logging in...' : 'Log On'}
        </button>
        <div className="flex items-center gap-3 m-4">
          <div className="flex-1 h-px bg-gradient-to-r from-white via-blue-300 to-blue-300" />
          <span className="text-[11px] text-blue-400 uppercase tracking-widest">
            OR
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-300 via-blue-300 to-white" />
        </div>
      </form>
      <h4 className="mb-4">Want to explore the app first?</h4>
      {isLoggingOn ? (
        <button className={BUTTON_SCHEME.demo}>
          <Spinner /> Loading Demo...
        </button>
      ) : (
        <button className={BUTTON_SCHEME.demo} onClick={handleDemoLogin}>
          ✨ Try the Demo
        </button>
      )}
      {/* <p className="mt-4 text-sm text-zinc-600">
        Don't have an account?{' '}
        <a
          href="https://react-todo-list-v4-snowy.vercel.app/register"
          className="text-[var(--accent-color)] hover:underline font-medium"
        >
          Sign up
        </a>
      </p> */}
    </div>
  )
}
