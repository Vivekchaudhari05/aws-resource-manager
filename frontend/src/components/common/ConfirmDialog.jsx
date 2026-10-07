import Modal from "./Modal";

function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  danger = false,
}) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className="confirm-dialog">
        <div className="confirm-icon-wrapper">
          <div className="confirm-icon">
            !
          </div>
        </div>

        <div className="confirm-content">
          <p className="confirm-message">
            {message}
          </p>

          {danger && (
            <p className="confirm-warning">
              This action cannot be undone.
            </p>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className={
              danger
                ? "danger-button"
                : "primary-button"
            }
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;