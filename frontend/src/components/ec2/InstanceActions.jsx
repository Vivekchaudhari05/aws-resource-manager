function InstanceActions({
  instance,
  onView,
  onStart,
  onStop,
  onReboot,
  onTerminate,
}) {
  const isRunning = instance.state === "running";
  const isStopped = instance.state === "stopped";

  return (
    <div className="instance-actions">
      <button
        className="action-button view"
        onClick={() => onView(instance)}
      >
        View
      </button>

      {isStopped && (
        <button
          className="action-button start"
          onClick={() => onStart(instance)}
        >
          Start
        </button>
      )}

      {isRunning && (
        <>
          <button
            className="action-button stop"
            onClick={() => onStop(instance)}
          >
            Stop
          </button>

          <button
            className="action-button reboot"
            onClick={() => onReboot(instance)}
          >
            Reboot
          </button>
        </>
      )}

      {isStopped && (
        <button
          className="action-button danger"
          onClick={() => onTerminate(instance)}
        >
          Terminate
        </button>
      )}
    </div>
  );
}

export default InstanceActions;