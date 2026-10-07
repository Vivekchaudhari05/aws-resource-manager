import PageHeader from "../components/layout/PageHeader";

function Activity() {
  return (
    <div>
      <PageHeader
        title="Activity"
        description="Track actions performed through AWS Resource Manager."
      />

      <div className="page-placeholder">
        <div className="placeholder-icon">◷</div>

        <h2>Activity Log</h2>

        <p>
          Resource activity and operation history will appear here.
        </p>
      </div>
    </div>
  );
}

export default Activity;