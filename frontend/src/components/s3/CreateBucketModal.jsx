import { useState } from "react";
import Modal from "../common/Modal";

function CreateBucketModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const [form, setForm] = useState({
    name: "",
    region: "ap-south-1",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (name === "name") {
      setError("");
    }
  };

  const validateBucketName = (name) => {
    if (name.length < 3 || name.length > 63) {
      return "Bucket name must be between 3 and 63 characters.";
    }

    const bucketNamePattern =
      /^[a-z0-9][a-z0-9.-]*[a-z0-9]$/;

    if (!bucketNamePattern.test(name)) {
      return "Use only lowercase letters, numbers, dots, and hyphens.";
    }

    if (name.includes("..")) {
      return "Bucket name cannot contain consecutive periods.";
    }

    if (name.includes(".-") || name.includes("-.")) {
      return "Bucket name cannot contain adjacent dot and hyphen.";
    }

    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = form.name.trim();

    const validationError =
      validateBucketName(trimmedName);

    if (validationError) {
      setError(validationError);
      return;
    }

    onCreate({
      ...form,
      name: trimmedName,
    });

    setForm({
      name: "",
      region: "ap-south-1",
    });

    setError("");
  };

  const handleClose = () => {
    setForm({
      name: "",
      region: "ap-south-1",
    });

    setError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create S3 Bucket"
    >
      <form
        className="resource-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="bucketName">
            Bucket Name
          </label>

          <input
            id="bucketName"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. my-project-bucket"
            required
          />

          <small className="form-help">
            Use 3–63 lowercase characters, numbers,
            dots, and hyphens.
          </small>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="bucketRegion">
            AWS Region
          </label>

          <select
            id="bucketRegion"
            name="region"
            value={form.region}
            onChange={handleChange}
          >
            <option value="ap-south-1">
              Asia Pacific (Mumbai) - ap-south-1
            </option>

            <option value="ap-southeast-1">
              Asia Pacific (Singapore) - ap-southeast-1
            </option>

            <option value="us-east-1">
              US East (N. Virginia) - us-east-1
            </option>

            <option value="us-west-2">
              US West (Oregon) - us-west-2
            </option>

            <option value="eu-west-1">
              Europe (Ireland) - eu-west-1
            </option>
          </select>
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
          >
            Create Bucket
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateBucketModal;