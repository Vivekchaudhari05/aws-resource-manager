import PageHeader from "../components/layout/PageHeader";

function Settings() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Configure application and AWS connection preferences."
      />

      <div className="page-placeholder">
        <div className="placeholder-icon">⚙</div>

        <h2>Application Settings</h2>

        <p>
          Application configuration options will be added later.
        </p>
      </div>
    </div>
  );
}

export default Settings;