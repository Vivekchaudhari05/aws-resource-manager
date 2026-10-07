import Modal from "../common/Modal";
import StatusBadge from "../common/StatusBadge";

function InstanceDetailsModal({
  instance,
  onClose,
}) {
  if (!instance) {
    return null;
  }

  return (
    <Modal
      isOpen={Boolean(instance)}
      onClose={onClose}
      title="Instance Details"
    >
      <div className="instance-details">
        <div className="detail-header">
          <div className="detail-instance-icon">
            EC2
          </div>

          <div>
            <h3>{instance.name}</h3>

            <span>{instance.id}</span>
          </div>

          <StatusBadge status={instance.state} />
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span>Instance Type</span>
            <strong>{instance.type}</strong>
          </div>

          <div className="detail-item">
            <span>Availability Zone</span>
            <strong>{instance.zone}</strong>
          </div>

          <div className="detail-item">
            <span>Private IP</span>
            <strong>{instance.privateIp}</strong>
          </div>

          <div className="detail-item">
            <span>Public IP</span>
            <strong>{instance.publicIp || "—"}</strong>
          </div>

          <div className="detail-item">
            <span>VPC</span>
            <strong>{instance.vpc || "—"}</strong>
          </div>

          <div className="detail-item">
            <span>Subnet</span>
            <strong>{instance.subnet || "—"}</strong>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default InstanceDetailsModal;