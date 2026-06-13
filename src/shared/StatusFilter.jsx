import React from 'react'
// import { useSearchParams } from 'react-router'

function StatusFilter({ statusFilter, onStatusChange }) {
  // Implement useSearchParams state management hooking into status.
  // const [searchParams, setSearchParams] = useSearchParams()
  // const currentStatus = searchParams.get('status') || 'all'

  // //
  // const handleStatusChange = (status) => {
  //   // selecting all cleanly drops the URL parameters
  //   if (status === 'all') {
  //     searchParams.delete('status')
  //   } else {
  //     searchParams.set('status', status)
  //   }
  //   setSearchParams(searchParams)
  // }

  return (
    <div>
      <label htmlFor="statusFilter">Show:</label>
      <select
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)} // onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="all">All Todos</option>
        <option value="active">Active Todos</option>
        <option value="completed">Completed Todos</option>
      </select>
    </div>
  )
}

export default StatusFilter
