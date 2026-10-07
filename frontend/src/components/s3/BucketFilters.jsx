function BucketFilters({
  search,
  setSearch,
}) {
  return (
    <div className="resource-filters">
      <div className="search-box">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search buckets..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />
      </div>
    </div>
  );
}

export default BucketFilters;