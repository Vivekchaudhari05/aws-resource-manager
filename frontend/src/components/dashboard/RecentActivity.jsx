import { useEffect, useState } from "react";

import { getActivity } from "../../services/activityService";

function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadActivity() {
      try {
        const response = await getActivity();
        setActivities(response.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivity();
  }, []);

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div>
          <h3>Recent Activity</h3>
          <p>Latest resource operations</p>
        </div>

        <span className="activity-count">
          {activities.length} events
        </span>
      </div>

      {loading && (
        <div className="activity-empty">
          <h4>Loading activity...</h4>
        </div>
      )}

      {error && (
        <div className="activity-empty">
          <h4>Unable to load activity</h4>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && activities.length === 0 && (
        <div className="activity-empty">
          <div className="activity-empty-icon">
            ◷
          </div>

          <h4>No activity yet</h4>

          <p>
            AWS resource operations will appear here
            after you start managing your infrastructure.
          </p>
        </div>
      )}

      {!loading && !error && activities.length > 0 && (
        <div className="activity-list">
          {activities.slice(0, 5).map((activity) => (
            <div className="activity-item" key={activity.id}>
              <div>
                <strong>{activity.action}</strong>

                <p>
                  {activity.resource_type} ·{" "}
                  {activity.resource_id}
                </p>
              </div>

              <span className="activity-status">
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;