import ObjectActions from "./ObjectActions";

function getObjectIcon(type) {
  const normalizedType = (
    type || ""
  ).toLowerCase();

  if (
    normalizedType.includes("image") ||
    normalizedType.includes("png") ||
    normalizedType.includes("jpg") ||
    normalizedType.includes("jpeg")
  ) {
    return "IMG";
  }

  if (
    normalizedType.includes("pdf")
  ) {
    return "PDF";
  }

  if (
    normalizedType.includes("json")
  ) {
    return "JSON";
  }

  if (
    normalizedType.includes("text") ||
    normalizedType.includes("txt")
  ) {
    return "TXT";
  }

  if (
    normalizedType.includes("csv")
  ) {
    return "CSV";
  }

  if (
    normalizedType.includes("video")
  ) {
    return "VID";
  }

  return "FILE";
}

function ObjectTable({
  objects,
  onDownload,
  onDelete,
}) {
  if (objects.length === 0) {
    return (
      <div className="table-empty">
        <div className="table-empty-icon">
          S3
        </div>

        <h3>No objects found</h3>

        <p>
          This bucket does not contain any files
          yet.
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="resource-table object-table">
        <thead>
          <tr>
            <th>Object</th>
            <th>Type</th>
            <th>Size</th>
            <th>Last Modified</th>
            <th>Storage Class</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {objects.map((object) => (
            <tr
              key={`${object.bucket || "bucket"}-${object.key}`}
            >
              <td>
                <div className="object-name-cell">
                  <div className="object-icon">
                    {getObjectIcon(
                      object.type
                    )}
                  </div>

                  <div className="object-name-content">
                    <strong>
                      {object.name}
                    </strong>

                    {object.key &&
                      object.key !==
                        object.name && (
                        <span className="object-key">
                          {object.key}
                        </span>
                      )}
                  </div>
                </div>
              </td>

              <td>
                <span className="object-type">
                  {object.type || "Unknown"}
                </span>
              </td>

              <td>
                <span className="object-size">
                  {object.size || "0 B"}
                </span>
              </td>

              <td>
                <span className="object-date">
                  {object.lastModified ||
                    "Not available"}
                </span>
              </td>

              <td>
                <span className="storage-class">
                  {object.storageClass ||
                    "STANDARD"}
                </span>
              </td>

              <td>
                <ObjectActions
                  object={object}
                  onDownload={onDownload}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ObjectTable;