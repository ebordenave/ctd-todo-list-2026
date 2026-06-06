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
        <option value="creationAt">Creation Date</option>
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
