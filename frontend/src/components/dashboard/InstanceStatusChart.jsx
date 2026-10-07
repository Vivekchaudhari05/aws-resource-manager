import { useEffect, useState } from "react";

import { getEC2Instances } from "../../services/ec2Service";

function InstanceStatusChart() {
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    async function loadInstances() {
      try {
        const response = await getEC2Instances();
        setInstances(response.data || []);
      } catch (error) {
        console.error("Failed to load EC2 instances:", error);
      }
    }

    loadInstances();
  }, []);

  const statuses = [
    {
      label: "Running",
      value: instances.filter(
        (instance) => instance.state === "running"
      ).length,
      className: "running",
    },
    {
      label: "Stopped",
      value: instances.filter(
        (instance) => instance.state === "stopped"
      ).length,
      className: "stopped",
    },
    {
      label: "Pending",
      value: instances.filter(
        (instance) => instance.state === "pending"
      ).length,
      className: "pending",
    },
  ];

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div>
          <h3>Instance Status</h3>
          <p>EC2 instance health summary</p>
        </div>
      </div>

      <div className="instance-status">
        {statuses.map((status) => (
          <div
            className="instance-status-row"
            key={status.label}
          >
            <div className="status-label">
              <span
                className={`status-marker ${status.className}`}
              />

              <span>{status.label}</span>
            </div>

            <strong>{status.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstanceStatusChart;