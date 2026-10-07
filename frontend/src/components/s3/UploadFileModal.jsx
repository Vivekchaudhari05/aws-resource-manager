import { useState } from "react";
import Modal from "../common/Modal";

function UploadFileModal({
  isOpen,
  onClose,
  onUpload,
  bucketName,
}) {
  const [file, setFile] = useState(null);

  const [objectKey, setObjectKey] =
    useState("");

  const [formError, setFormError] =
    useState("");

  const handleFileChange = (event) => {
    const selectedFile =
      event.target.files?.[0] || null;

    setFile(selectedFile);
    setFormError("");

    if (
      selectedFile &&
      !objectKey.trim()
    ) {
      setObjectKey(selectedFile.name);
    }
  };

  const handleObjectKeyChange = (event) => {
    setObjectKey(event.target.value);
    setFormError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedObjectKey =
      objectKey.trim();

    if (!file) {
      setFormError(
        "Please select a file before uploading."
      );
      return;
    }

    if (!trimmedObjectKey) {
      setFormError(
        "Object key cannot be empty."
      );
      return;
    }

    if (trimmedObjectKey.length > 1024) {
      setFormError(
        "Object key must not exceed 1024 characters."
      );
      return;
    }

    if (trimmedObjectKey.startsWith("/")) {
      setFormError(
        "Object key cannot start with /."
      );
      return;
    }

    if (trimmedObjectKey.includes("\\")) {
      setFormError(
        "Object key cannot contain backslashes. Use / instead."
      );
      return;
    }

    if (!bucketName) {
      setFormError(
        "Please select a destination bucket."
      );
      return;
    }

    onUpload({
      file,
      objectKey: trimmedObjectKey,
      bucketName,
    });

    setFile(null);
    setObjectKey("");
    setFormError("");
  };

  const handleClose = () => {
    setFile(null);
    setObjectKey("");
    setFormError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Upload File"
    >
      <form
        className="resource-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>
            Destination Bucket
          </label>

          <input
            value={bucketName || ""}
            readOnly
            placeholder="Select a bucket"
          />
        </div>

        <div className="form-group">
          <label htmlFor="objectFile">
            Select File
          </label>

          <input
            id="objectFile"
            type="file"
            onChange={handleFileChange}
            required
          />

          {file && (
            <small className="form-help">
              Selected: {file.name}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="objectKey">
            Object Key
          </label>

          <input
            id="objectKey"
            value={objectKey}
            onChange={handleObjectKeyChange}
            placeholder="folder/file-name.txt"
            required
          />

          <small className="form-help">
            This is the path/name used to store the
            file in S3.
          </small>

          {formError && (
            <div className="form-error">
              {formError}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={handleClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={!file}
          >
            Upload File
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default UploadFileModal;