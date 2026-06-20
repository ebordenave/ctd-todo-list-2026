import React from 'react'
import { CONTROL_BAR_SCHEME } from '../utils/theme-config'
import { ArrowUpDown } from 'lucide-react'

function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <>
      <label htmlFor="sort-category">
        <ArrowUpDown size={16} />
      </label>
      <div className="flex flex-row items-center gap-2 w-full">
        <select
          id="sort-category"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          // className={`${CONTROL_BAR_SCHEME.select} flex-1`}
          className={`${CONTROL_BAR_SCHEME.selectBase} flex-1`}
        >
          <option value="createdAt">Creation Date</option>
          <option value="title">Title</option>
        </select>

        <select
          aria-label="Sort order"
          id="order-category"
          value={sortDirection}
          onChange={(e) => onSortDirectionChange(e.target.value)}
          className={`${CONTROL_BAR_SCHEME.selectBase} flex-1`}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </>
  )
}

export default SortBy
