import Modal from "../common/Modal";
import StatusBadge from "../common/StatusBadge";

function BucketDetails({
  bucket,
  onClose,
}) {
  if (!bucket) {
    return null;
  }

  return (
    <Modal
      isOpen={Boolean(bucket)}
      onClose={onClose}
      title="Bucket Details"
    >
      <div className="bucket-details">
        <div className="detail-header bucket-detail-header">
          <div className="detail-instance-icon bucket-detail-icon">
            S3
          </div>

          <div className="bucket-detail-title">
            <h3>{bucket.name}</h3>

            <span>
              Amazon S3 Bucket
            </span>
          </div>

          <StatusBadge
            status={bucket.status}
          />
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span>Bucket Name</span>

            <strong
              title={bucket.name}
            >
              {bucket.name}
            </strong>
          </div>

          <div className="detail-item">
            <span>AWS Region</span>

            <strong>
              {bucket.region}
            </strong>
          </div>

          <div className="detail-item">
            <span>Objects</span>

            <strong>
              {bucket.objects}
            </strong>
          </div>

          <div className="detail-item">
            <span>Total Size</span>

            <strong>
              {bucket.size}
            </strong>
          </div>

          <div className="detail-item">
            <span>Bucket Status</span>

            <strong>
              {bucket.status}
            </strong>
          </div>

          <div className="detail-item">
            <span>Created</span>

            <strong>
              {bucket.created}
            </strong>
          </div>
        </div>

        <div className="bucket-detail-footer">
          <div>
            <span className="bucket-footer-label">
              Storage
            </span>

            <strong>
              Amazon S3
            </strong>
          </div>

          <div>
            <span className="bucket-footer-label">
              Access
            </span>

            <strong>
              Private
            </strong>
          </div>
        </div>

        <div className="form-actions bucket-detail-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default BucketDetails;