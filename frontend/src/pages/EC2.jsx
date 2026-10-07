import { useEffect, useMemo, useState } from "react";

import PageHeader from "../components/layout/PageHeader";
import InstanceFilters from "../components/ec2/InstanceFilters";
import InstanceTable from "../components/ec2/InstanceTable";
import InstanceDetailsModal from "../components/ec2/InstanceDetailsModal";
import LaunchInstanceModal from "../components/ec2/LaunchInstanceModal";

import {
  getEC2Instances,
  startEC2Instance,
  stopEC2Instance,
  rebootEC2Instance,
  terminateEC2Instance,
  launchEC2Instance,
} from "../services/ec2Service";

function EC2() {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("all");

  const [selectedInstance, setSelectedInstance] =
    useState(null);

  const [showLaunchModal, setShowLaunchModal] =
    useState(false);

  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  const loadInstances = async () => {
    try {
      setError("");
      setLoading(true);

      const response = await getEC2Instances();

      const formattedInstances = (response.data || []).map(
        (instance) => ({
          id: instance.instance_id,
          name: instance.instance_id,
          type: instance.instance_type,
          state: instance.state,
          zone: instance.availability_zone || "—",
          privateIp: instance.private_ip || "—",
          publicIp: instance.public_ip || "—",
          vpc: instance.vpc_id || "—",
          subnet: instance.subnet_id || "—",
        })
      );

      setInstances(formattedInstances);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInstances();
  }, []);

  const filteredInstances = useMemo(() => {
    return instances.filter((instance) => {
      const matchesSearch =
        instance.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        instance.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesState =
        state === "all" ||
        instance.state === state;

      return matchesSearch && matchesState;
    });
  }, [instances, search, state]);

  const refreshAfterAction = () => {
    setTimeout(() => {
      loadInstances();
    }, 3000);
  };

  const handleStart = async (instance) => {
    try {
      setError("");
      setActionLoading(instance.id);

      await startEC2Instance(instance.id);

      setInstances((current) =>
        current.map((item) =>
          item.id === instance.id
            ? { ...item, state: "pending" }
            : item
        )
      );

      refreshAfterAction();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading("");
    }
  };

  const handleStop = async (instance) => {
    try {
      setError("");
      setActionLoading(instance.id);

      await stopEC2Instance(instance.id);

      setInstances((current) =>
        current.map((item) =>
          item.id === instance.id
            ? { ...item, state: "stopping" }
            : item
        )
      );

      refreshAfterAction();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading("");
    }
  };

  const handleReboot = async (instance) => {
    try {
      setError("");
      setActionLoading(instance.id);

      await rebootEC2Instance(instance.id);

      setInstances((current) =>
        current.map((item) =>
          item.id === instance.id
            ? { ...item, state: "rebooting" }
            : item
        )
      );

      refreshAfterAction();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading("");
    }
  };

  const handleTerminate = async (instance) => {
    try {
      setError("");
      setActionLoading(instance.id);

      await terminateEC2Instance(instance.id);

      setInstances((current) =>
        current.map((item) =>
          item.id === instance.id
            ? { ...item, state: "shutting-down" }
            : item
        )
      );

      setTimeout(() => {
        loadInstances();
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading("");
    }
  };

  const handleLaunch = async (form) => {
    try {
      setError("");
      setActionLoading("launch");

      await launchEC2Instance(
        form.amiId,
        form.instanceType,
        1,
        1
      );

      setShowLaunchModal(false);

      await loadInstances();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading("");
    }
  };

  const isActionLoading = Boolean(actionLoading);

  return (
    <div>
      <PageHeader
        title="EC2 Instances"
        description="View and manage your Amazon EC2 instances."
        action={
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              className="secondary-button"
              onClick={loadInstances}
              disabled={loading || isActionLoading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>

            <button
              className="primary-button"
              onClick={() =>
                setShowLaunchModal(true)
              }
              disabled={isActionLoading}
            >
              + Launch Instance
            </button>
          </div>
        }
      />

      <div className="resource-panel">
        {loading && (
          <p>Loading EC2 instances...</p>
        )}

        {error && (
          <p style={{ color: "red" }}>
            Error: {error}
          </p>
        )}

        <InstanceFilters
          search={search}
          setSearch={setSearch}
          state={state}
          setState={setState}
        />

        <InstanceTable
          instances={filteredInstances}
          onView={setSelectedInstance}
          onStart={handleStart}
          onStop={handleStop}
          onReboot={handleReboot}
          onTerminate={handleTerminate}
        />
      </div>

      <InstanceDetailsModal
        instance={selectedInstance}
        onClose={() =>
          setSelectedInstance(null)
        }
      />

      <LaunchInstanceModal
        isOpen={showLaunchModal}
        onClose={() =>
          setShowLaunchModal(false)
        }
        onLaunch={handleLaunch}
      />
    </div>
  );
}

export default EC2;