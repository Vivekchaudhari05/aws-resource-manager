function InstanceFilters({
  search,
  setSearch,
  state,
  setState,
}) {
  return (
    <div className="resource-filters">
      <div className="search-box">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search instances..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <select
        value={state}
        onChange={(event) => setState(event.target.value)}
      >
        <option value="all">All states</option>
        <option value="running">Running</option>
        <option value="stopped">Stopped</option>
        <option value="pending">Pending</option>
        <option value="stopping">Stopping</option>
        <option value="terminated">Terminated</option>
      </select>
    </div>
  );
}

export default InstanceFilters;