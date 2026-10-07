import PageHeader from "../components/layout/PageHeader";

function Resources() {
  return (
    <div>
      <PageHeader
        title="AWS Resources"
        description="View an overview of your AWS infrastructure."
      />

      <div className="page-placeholder">
        <div className="placeholder-icon">AWS</div>

        <h2>Resource Overview</h2>

        <p>
          AWS resource information will appear here after the backend
          integration is completed.
        </p>
      </div>
    </div>
  );
}

export default Resources;