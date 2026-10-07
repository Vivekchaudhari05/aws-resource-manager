import { useState } from "react";
import Modal from "../common/Modal";

function LaunchInstanceModal({
  isOpen,
  onClose,
  onLaunch,
}) {
  const [form, setForm] = useState({
    name: "",
    instanceType: "t3.micro",
    amiId: "",
    keyName: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onLaunch(form);

    setForm({
      name: "",
      instanceType: "t3.micro",
      amiId: "",
      keyName: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Launch EC2 Instance"
    >
      <form
        className="resource-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="name">
            Instance Name
          </label>

          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. web-server"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="instanceType">
            Instance Type
          </label>

          <select
            id="instanceType"
            name="instanceType"
            value={form.instanceType}
            onChange={handleChange}
          >
            <option value="t3.micro">
              t3.micro
            </option>

            <option value="t3.small">
              t3.small
            </option>

            <option value="t3.medium">
              t3.medium
            </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amiId">
            AMI ID
          </label>

          <input
            id="amiId"
            name="amiId"
            value={form.amiId}
            onChange={handleChange}
            placeholder="ami-xxxxxxxx"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="keyName">
            Key Pair
          </label>

          <input
            id="keyName"
            name="keyName"
            value={form.keyName}
            onChange={handleChange}
            placeholder="Your EC2 key pair"
          />
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
            type="submit"
            className="primary-button"
          >
            Launch Instance
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default LaunchInstanceModal;