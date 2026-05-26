//TODO: Create a functional component that accepts props: sortBy, sortDirection, onSortByChange, onSortDirectionChange Create two select dropdowns with proper labels and htmlFor attributes First dropdown: "Sort by" with options for 'creationDate' ("Creation Date") and 'title' ("Title") Second dropdown: "Order" with options for 'desc' ("Descending") and 'asc' ("Ascending") Use controlled component pattern with value and onChange handlers that call the respective prop functions

function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <>
      <label htmlFor="sort-category">Sort By</label>
      <select
        name="Sort By"
        id="sort-category"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="creationDate">Creation Date</option>
        <option value="title">Title</option>
      </select>
      <label htmlFor="order-category">Order</label>
      <select
        name=""
        id="order-category"
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </>
  )
}

export default SortBy
