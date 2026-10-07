import StatusBadge from "../common/StatusBadge";
import InstanceActions from "./InstanceActions";

function InstanceTable({
  instances,
  onView,
  onStart,
  onStop,
  onReboot,
  onTerminate,
}) {
  if (instances.length === 0) {
    return (
      <div className="table-empty">
        <div className="table-empty-icon">EC2</div>

        <h3>No EC2 instances found</h3>

        <p>
          There are currently no instances matching your search
          or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="resource-table">
        <thead>
          <tr>
            <th>Instance ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>State</th>
            <th>Availability Zone</th>
            <th>Private IP</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {instances.map((instance) => (
            <tr key={instance.id}>
              <td>
                <span className="instance-id">
                  {instance.id}
                </span>
              </td>

              <td>
                <strong>{instance.name}</strong>
              </td>

              <td>{instance.type}</td>

              <td>
                <StatusBadge status={instance.state} />
              </td>

              <td>{instance.zone}</td>

              <td>{instance.privateIp}</td>

              <td>
                <InstanceActions
                  instance={instance}
                  onView={onView}
                  onStart={onStart}
                  onStop={onStop}
                  onReboot={onReboot}
                  onTerminate={onTerminate}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InstanceTable;