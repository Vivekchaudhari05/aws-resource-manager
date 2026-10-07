function StatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase() || "unknown";

  return (
    <span className={`status-badge ${normalizedStatus}`}>
      <span className="status-badge-dot"></span>
      {status || "Unknown"}
    </span>
  );
}

export default StatusBadge;