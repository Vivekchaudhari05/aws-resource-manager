import StatusBadge from "../common/StatusBadge";

function BucketTable({
  buckets,
  onSelect,
  onView,
  selectedBucket,
}) {
  if (buckets.length === 0) {
    return (
      <div className="table-empty">
        <div className="table-empty-icon">
          S3
        </div>

        <h3>No S3 buckets found</h3>

        <p>
          There are currently no buckets matching
          your search.
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="resource-table bucket-table">
        <thead>
          <tr>
            <th>Bucket</th>
            <th>Region</th>
            <th>Objects</th>
            <th>Size</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {buckets.map((bucket) => {
            const isSelected =
              selectedBucket?.name === bucket.name;

            return (
              <tr
                key={bucket.name}
                className={
                  isSelected
                    ? "bucket-row-selected"
                    : ""
                }
              >
                <td>
                  <div className="bucket-name-cell">
                    <div className="bucket-icon">
                      S3
                    </div>

                    <div className="bucket-name-content">
                      <strong
                        title={bucket.name}
                      >
                        {bucket.name}
                      </strong>

                      {isSelected && (
                        <span className="bucket-selected-label">
                          Selected
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                <td>
                  <span className="bucket-region">
                    {bucket.region}
                  </span>
                </td>

                <td>
                  <span className="bucket-object-count">
                    {bucket.objects}
                  </span>
                </td>

                <td>
                  <span className="bucket-size">
                    {bucket.size}
                  </span>
                </td>

                <td>
                  <StatusBadge
                    status={bucket.status}
                  />
                </td>

                <td>
                  <span className="bucket-created">
                    {bucket.created}
                  </span>
                </td>

                <td>
                  <div className="bucket-actions">
                    <button
                      type="button"
                      className={
                        isSelected
                          ? "action-button selected"
                          : "action-button view"
                      }
                      onClick={() =>
                        onSelect(bucket)
                      }
                    >
                      {isSelected
                        ? "Selected"
                        : "Select"}
                    </button>

                    <button
                      type="button"
                      className="action-button"
                      onClick={() =>
                        onView(bucket)
                      }
                    >
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BucketTable;