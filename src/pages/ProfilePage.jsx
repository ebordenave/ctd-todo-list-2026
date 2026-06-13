import React, { useState, useEffect } from 'react'
import useAuth from '../contexts/AuthContext'

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

        const response = await fetch('/api/tasks', options)
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

  const completedPercentage = Math.round(
    (todoStats.completed / todoStats.total) * 100,
  )
  const activePercentage = Math.round(
    (todoStats.active / todoStats.total) * 100,
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>Profile</h2>
      <p>Logged in as: {email}</p>
      <section>
        <h2>Task Statistics</h2>
        <p>Total Tasks: {todoStats.total}</p>
        <p>Active Tasks: {todoStats.active}</p>
        <p>Completed Tasks: {todoStats.completed}</p>
        <p>Completed Percentage: {completedPercentage}%</p>
        <p>Active Percentage: {activePercentage}%</p>
      </section>
    </div>
  )
}
