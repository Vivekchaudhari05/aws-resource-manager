import { useEffect, useState } from "react";

import { getDashboardData } from "../../services/resourceService";

function ResourceOverview() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function loadResources() {
      try {
        const response = await getDashboardData();
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to load resource overview:", error);
      }
    }

    loadResources();
  }, []);

  const ec2Count = dashboardData?.summary?.ec2_instances ?? 0;
  const s3Count = dashboardData?.summary?.s3_buckets ?? 0;
  const resourceCount = ec2Count + s3Count;

  const resources = [
    {
      name: "EC2 Instances",
      count: ec2Count,
      icon: "EC2",
    },
    {
      name: "S3 Buckets",
      count: s3Count,
      icon: "S3",
    },
    {
      name: "AWS Resources",
      count: resourceCount,
      icon: "AWS",
    },
  ];

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div>
          <h3>Resource Overview</h3>
          <p>Current AWS resource inventory</p>
        </div>
      </div>

      <div className="resource-list">
        {resources.map((resource) => (
          <div
            className="resource-row"
            key={resource.name}
          >
            <div className="resource-left">
              <div className="resource-icon">
                {resource.icon}
              </div>

              <span>{resource.name}</span>
            </div>

            <strong>{resource.count}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourceOverview;