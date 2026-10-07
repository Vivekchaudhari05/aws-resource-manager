function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>

          <button
            className="modal-close"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;