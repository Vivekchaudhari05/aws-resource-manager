import { useEffect, useState } from "react";

import { apiRequest } from "../../services/api";

function AwsConnectionStatus() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkConnection() {
      try {
        await apiRequest("/health");
        setConnected(true);
      } catch (error) {
        console.error("AWS connection check failed:", error);
        setConnected(false);
      } finally {
        setLoading(false);
      }
    }

    checkConnection();
  }, []);

  const statusText = loading
    ? "Checking..."
    : connected
      ? "Connected"
      : "Disconnected";

  return (
    <div className="dashboard-card connection-card">
      <div className="connection-card-top">
        <div className="connection-icon">
          AWS
        </div>

        <div>
          <span className="connection-label">
            AWS CONNECTION
          </span>

          <h3>{statusText}</h3>
        </div>
      </div>

      <div className="connection-details">
        <div>
          <span>Region</span>
          <strong>ap-south-1</strong>
        </div>

        <div>
          <span>Provider</span>
          <strong>Amazon Web Services</strong>
        </div>
      </div>
    </div>
  );
}

export default AwsConnectionStatus;