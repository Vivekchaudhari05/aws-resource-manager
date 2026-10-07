import { useEffect, useState } from "react";

import PageHeader from "../components/layout/PageHeader";

import StatCard from "../components/dashboard/StatCard";
import ResourceOverview from "../components/dashboard/ResourceOverview";
import InstanceStatusChart from "../components/dashboard/InstanceStatusChart";
import AwsConnectionStatus from "../components/dashboard/AwsConnectionStatus";
import RecentActivity from "../components/dashboard/RecentActivity";

import { getDashboardData } from "../services/resourceService";
import { getActivity } from "../services/activityService";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [activityCount, setActivityCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await getDashboardData();
        setDashboardData(response.data);

        const activityResponse = await getActivity();
        setActivityCount(activityResponse.data?.length ?? 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const ec2Count = dashboardData?.summary?.ec2_instances ?? 0;
  const s3Count = dashboardData?.summary?.s3_buckets ?? 0;

  const resourceCount = ec2Count + s3Count;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Monitor and manage your AWS infrastructure from one place."
      />

      {loading && (
        <p>Loading AWS dashboard data...</p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          Error: {error}
        </p>
      )}

      <section className="stats-grid">
        <StatCard
          title="EC2 Instances"
          value={ec2Count}
          description="Total instances"
          icon="EC2"
          variant="blue"
        />

        <StatCard
          title="S3 Buckets"
          value={s3Count}
          description="Total buckets"
          icon="S3"
          variant="purple"
        />

        <StatCard
          title="AWS Resources"
          value={resourceCount}
          description="Discovered resources"
          icon="AWS"
          variant="green"
        />

        <StatCard
          title="Operations"
          value={activityCount}
          description="Recent operations"
          icon="◷"
          variant="orange"
        />
      </section>

      <section className="dashboard-grid">
        <ResourceOverview />

        <InstanceStatusChart />

        <AwsConnectionStatus />

        <RecentActivity />
      </section>
    </div>
  );
}

export default Dashboard;