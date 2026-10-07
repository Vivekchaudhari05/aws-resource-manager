function ObjectActions({
  object,
  onDownload,
  onDelete,
}) {
  const handleDownload = () => {
    onDownload(object);
  };

  const handleDelete = () => {
    onDelete(object);
  };

  return (
    <div className="object-actions">
      <button
        type="button"
        className="action-button view"
        onClick={handleDownload}
        title={`Download ${object.name}`}
      >
        <span className="action-icon">
          ↓
        </span>

        <span>Download</span>
      </button>

      <button
        type="button"
        className="action-button danger"
        onClick={handleDelete}
        title={`Delete ${object.name}`}
      >
        <span className="action-icon">
          ×
        </span>

        <span>Delete</span>
      </button>
    </div>
  );
}

export default ObjectActions;