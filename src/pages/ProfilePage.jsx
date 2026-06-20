import React, { useState, useEffect } from 'react'
import useAuth from '../contexts/AuthContext'
import Header from '../shared/Header'
import { PROFILE_SCHEME } from '../utils/theme-config'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  })

  const { token, email } = useAuth()

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const options = {
          method: 'GET',
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        }

        const response = await fetch('/api/tasks?limit=100', options)
        if (!response.ok) throw new Error('Failed to fetch data')

        const data = await response.json()
        const taskList = data.tasks || []

        const total = taskList.reduce((acc) => acc + 1, 0)

        const completed = taskList.reduce((acc, curr) => {
          return curr.isCompleted ? acc + 1 : acc
        }, 0)

        const active = taskList.reduce((acc, curr) => {
          return !curr.isCompleted ? acc + 1 : acc
        }, 0)

        setTodoStats({ total, completed, active })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTodoStats()
  }, [token])

  const completedPercentage =
    todoStats.total > 0
      ? Math.round((todoStats.completed / todoStats.total) * 100)
      : 0

  const activePercentage =
    todoStats.total > 0
      ? Math.round((todoStats.active / todoStats.total) * 100)
      : 0

  if (loading) {
    return (
      <div>
        <Header />
        <div className={PROFILE_SCHEME.wrapper}>
          <p className="text-zinc-500 animate-pulse">
            Loading dashboard statistics...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className={PROFILE_SCHEME.wrapper}>
          <p className="text-red-500 font-medium">
            Error loading profile: {error}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className={PROFILE_SCHEME.wrapper}>
        <h1 className="text-2xl font-bold text-zinc-800 mb-6">Profile</h1>

        <div className={PROFILE_SCHEME.infoCard}>
          <p className="text-sm text-zinc-500">Logged in as</p>
          <p className="text-lg font-semibold text-zinc-800">{email}</p>
        </div>

        <h2 className="text-lg font-semibold text-zinc-800 mb-4">
          Task Statistics
        </h2>

        <div className={PROFILE_SCHEME.statsGrid}>
          <div className={PROFILE_SCHEME.statBox}>
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Total Tasks
            </span>
            <span className="text-2xl font-bold text-zinc-900">
              {todoStats.total}
            </span>
          </div>

          <div className={PROFILE_SCHEME.statBox}>
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Active
            </span>
            <span className="text-2xl font-bold text-emerald-600">
              {todoStats.active}
            </span>
            <span className="text-xs text-zinc-400">
              {activePercentage}% of total
            </span>
          </div>

          <div className={PROFILE_SCHEME.statBox}>
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Completed
            </span>
            <span className="text-2xl font-bold text-blue-600">
              {todoStats.completed}
            </span>
            <span className="text-xs text-zinc-400">
              {completedPercentage}% of total
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
