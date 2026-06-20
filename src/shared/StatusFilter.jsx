import { Funnel } from 'lucide-react'
import React from 'react'
import { useSearchParams } from 'react-router'
import { CONTROL_BAR_SCHEME } from '../utils/theme-config'

export default function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentStatus = searchParams.get('status') || 'all'

  const handleStatusChange = (status) => {
    const newParams = new URLSearchParams(searchParams)

    if (status === 'all') {
      newParams.delete('status')
    } else {
      newParams.set('status', status)
    }
    setSearchParams(newParams)
  }

  return (
    <>
      <label htmlFor="statusFilter">
        <Funnel size={16} />
      </label>
      <select
        id="statusFilter"
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        className={`${CONTROL_BAR_SCHEME.selectBase} w-43`}
      >
        <option value="all">All Todos</option>
        <option value="active">Active Todos</option>
        <option value="completed">Completed Todos</option>
      </select>
    </>
  )
}
