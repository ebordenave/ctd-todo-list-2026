import { Search } from 'lucide-react'
import { CONTROL_BAR_SCHEME } from '../utils/theme-config'
function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <>
      <label htmlFor="filterInput">
        <Search size={16} />
        <span className="sr-only">Search Todos</span>
      </label>
      <input
        type="text"
        id="filterInput"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search todos..."
        className={CONTROL_BAR_SCHEME.input}
      />
    </>
  )
}

export default FilterInput
