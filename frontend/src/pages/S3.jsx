import { useEffect, useMemo, useState } from "react";

import PageHeader from "../components/layout/PageHeader";
import BucketFilters from "../components/s3/BucketFilters";
import BucketTable from "../components/s3/BucketTable";
import BucketDetails from "../components/s3/BucketDetails";
import ObjectTable from "../components/s3/ObjectTable";
import CreateBucketModal from "../components/s3/CreateBucketModal";
import UploadFileModal from "../components/s3/UploadFileModal";
import ConfirmDialog from "../components/common/ConfirmDialog";

import {
  getS3Buckets,
  createS3Bucket,
  getS3Objects,
  uploadS3Object,
  deleteS3Object,
} from "../services/s3Service";

function S3() {
  const [search, setSearch] = useState("");

  const [selectedBucket, setSelectedBucket] =
    useState(null);

  const [bucketForDetails, setBucketForDetails] =
    useState(null);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showUploadModal, setShowUploadModal] =
    useState(false);

  const [objectToDelete, setObjectToDelete] =
    useState(null);

  const [buckets, setBuckets] = useState([]);

  const [objects, setObjects] = useState([]);

  const [loadingBuckets, setLoadingBuckets] =
    useState(true);

  const [loadingObjects, setLoadingObjects] =
    useState(false);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [error, setError] = useState("");

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) {
      return "0 B";
    }

    const units = [
      "B",
      "KB",
      "MB",
      "GB",
      "TB",
    ];

    const index = Math.min(
      Math.floor(
        Math.log(bytes) / Math.log(1024)
      ),
      units.length - 1
    );

    const size =
      bytes / Math.pow(1024, index);

    return `${size.toFixed(1)} ${units[index]}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "—";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  const loadBuckets = async () => {
    try {
      setError("");
      setLoadingBuckets(true);

      const response = await getS3Buckets();

      const formattedBuckets = (
        response.data || []
      ).map((bucket) => ({
        name: bucket.name,
        region: "ap-south-1",
        objects: 0,
        size: "0 B",
        status: "active",
        created: formatDate(
          bucket.created_at
        ),
      }));

      setBuckets(formattedBuckets);

      if (selectedBucket) {
        const updatedSelectedBucket =
          formattedBuckets.find(
            (bucket) =>
              bucket.name ===
              selectedBucket.name
          );

        if (updatedSelectedBucket) {
          setSelectedBucket(
            updatedSelectedBucket
          );
        } else {
          setSelectedBucket(null);
          setObjects([]);
        }
      }
    } catch (err) {
      setError(
        err.message ||
          "Failed to load S3 buckets."
      );
    } finally {
      setLoadingBuckets(false);
    }
  };

  const loadObjects = async (bucketName) => {
    if (!bucketName) {
      setObjects([]);
      return;
    }

    try {
      setError("");
      setLoadingObjects(true);

      const response =
        await getS3Objects(bucketName);

      const responseObjects =
        response.data || [];

      const formattedObjects =
        responseObjects.map(
          (object) => ({
            key: object.key,
            name:
              object.key
                ?.split("/")
                .pop() ||
              object.key,
            type:
              object.key
                ?.split(".")
                .pop()
                ?.toUpperCase() ||
              "FILE",
            size: formatFileSize(
              object.size
            ),
            lastModified: formatDate(
              object.last_modified
            ),
            storageClass:
              object.storage_class ||
              "STANDARD",
            bucket: bucketName,
          })
        );

      setObjects(formattedObjects);

      const totalSize =
        responseObjects.reduce(
          (total, object) =>
            total + (object.size || 0),
          0
        );

      setBuckets((current) =>
        current.map((bucket) => {
          if (
            bucket.name !== bucketName
          ) {
            return bucket;
          }

          return {
            ...bucket,
            objects:
              formattedObjects.length,
            size: formatFileSize(
              totalSize
            ),
          };
        })
      );

      setSelectedBucket((current) => {
        if (
          !current ||
          current.name !== bucketName
        ) {
          return current;
        }

        return {
          ...current,
          objects:
            formattedObjects.length,
          size: formatFileSize(
            totalSize
          ),
        };
      });
    } catch (err) {
      setError(
        err.message ||
          "Failed to load S3 objects."
      );

      setObjects([]);
    } finally {
      setLoadingObjects(false);
    }
  };

  useEffect(() => {
    loadBuckets();
  }, []);

  const filteredBuckets = useMemo(() => {
    return buckets.filter((bucket) =>
      bucket.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [buckets, search]);

  const selectedObjects = useMemo(() => {
    if (!selectedBucket) {
      return [];
    }

    return objects.filter(
      (object) =>
        object.bucket ===
        selectedBucket.name
    );
  }, [objects, selectedBucket]);

  const handleSelectBucket = async (
    bucket
  ) => {
    setError("");
    setSelectedBucket(bucket);
    await loadObjects(bucket.name);
  };

  const handleViewBucket = (bucket) => {
    setBucketForDetails(bucket);
  };

  const handleClearSelection = () => {
    setSelectedBucket(null);
    setObjects([]);
    setError("");
  };

  const handleCreateBucket = async (
    form
  ) => {
    const bucketName = form.name
      .trim()
      .toLowerCase();

    if (!bucketName) {
      setError(
        "Bucket name cannot be empty."
      );
      return;
    }

    const bucketExists = buckets.some(
      (bucket) =>
        bucket.name.toLowerCase() ===
        bucketName
    );

    if (bucketExists) {
      setError(
        `Bucket "${bucketName}" already exists.`
      );
      return;
    }

    try {
      setError("");
      setActionLoading(true);

      await createS3Bucket(bucketName);

      setShowCreateModal(false);

      await loadBuckets();
    } catch (err) {
      setError(
        err.message ||
          "Failed to create S3 bucket."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpload = async (
    uploadData
  ) => {
    if (
      !uploadData?.file ||
      !uploadData?.bucketName ||
      !uploadData?.objectKey
    ) {
      setError(
        "File, bucket, and object key are required."
      );
      return;
    }

    try {
      setError("");
      setActionLoading(true);

      await uploadS3Object(
        uploadData.bucketName,
        uploadData.file,
        uploadData.objectKey
      );

      setShowUploadModal(false);

      await loadObjects(
        uploadData.bucketName
      );
    } catch (err) {
      setError(
        err.message ||
          "Failed to upload S3 object."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDownload = async (
    object
  ) => {
    if (
      !object?.bucket ||
      !object?.key
    ) {
      setError(
        "Unable to download this S3 object."
      );
      return;
    }

    try {
      setError("");
      setActionLoading(true);

      const response = await fetch(
        `http://127.0.0.1:5000/api/s3/download?bucket=${encodeURIComponent(
          object.bucket
        )}&key=${encodeURIComponent(
          object.key
        )}`
      );

      if (!response.ok) {
        let message =
          "S3 download failed.";

        try {
          const data =
            await response.json();

          message =
            data.message || message;
        } catch {
          // Ignore JSON parsing errors.
        }

        throw new Error(message);
      }

      const blob =
        await response.blob();

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download =
        object.name || "download";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err.message ||
          "Failed to download S3 object."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteObject = (
    object
  ) => {
    if (!object?.bucket || !object?.key) {
      setError(
        "Unable to delete this S3 object."
      );
      return;
    }

    setError("");
    setObjectToDelete(object);
  };

  const confirmDeleteObject =
    async () => {
      if (!objectToDelete) {
        return;
      }

      try {
        setError("");
        setActionLoading(true);

        await deleteS3Object(
          objectToDelete.bucket,
          objectToDelete.key
        );

        const deletedBucket =
          objectToDelete.bucket;

        setObjectToDelete(null);

        await loadObjects(
          deletedBucket
        );
      } catch (err) {
        setError(
          err.message ||
            "Failed to delete S3 object."
        );
      } finally {
        setActionLoading(false);
      }
    };

  const handleCloseCreateModal = () => {
    if (actionLoading) {
      return;
    }

    setShowCreateModal(false);
  };

  const handleCloseUploadModal = () => {
    if (actionLoading) {
      return;
    }

    setShowUploadModal(false);
  };

  const handleCloseDeleteDialog = () => {
    if (actionLoading) {
      return;
    }

    setObjectToDelete(null);
  };

  return (
    <div className="s3-page">
      <PageHeader
        title="S3 Storage"
        description="View and manage your Amazon S3 buckets."
        action={
          <div className="page-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                if (!selectedBucket) {
                  setError(
                    "Please select a bucket first."
                  );
                  return;
                }

                setError("");
                setShowUploadModal(true);
              }}
              disabled={actionLoading}
            >
              ↑ Upload File
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={() => {
                setError("");
                setShowCreateModal(true);
              }}
              disabled={actionLoading}
            >
              + Create Bucket
            </button>
          </div>
        }
      />

      {error && (
        <div
          role="alert"
          style={{
            color: "#b42318",
            backgroundColor: "#fef3f2",
            border:
              "1px solid #fecdca",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
            disabled={actionLoading}
            style={{
              border: "none",
              background: "transparent",
              cursor: actionLoading
                ? "not-allowed"
                : "pointer",
              fontSize: "18px",
              lineHeight: 1,
              color: "inherit",
            }}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      <div className="resource-panel">
        {loadingBuckets ? (
          <p>
            Loading S3 buckets from AWS...
          </p>
        ) : (
          <>
            <BucketFilters
              search={search}
              setSearch={setSearch}
            />

            <BucketTable
              buckets={filteredBuckets}
              onSelect={handleSelectBucket}
              onView={handleViewBucket}
              selectedBucket={
                selectedBucket
              }
            />
          </>
        )}
      </div>

      {selectedBucket ? (
        <div className="resource-panel s3-object-panel">
          <div className="s3-object-header">
            <div>
              <div className="s3-object-title-row">
                <h3>
                  Objects in{" "}
                  {selectedBucket.name}
                </h3>

                <span className="object-count-badge">
                  {loadingObjects
                    ? "Loading..."
                    : `${selectedObjects.length} ${
                        selectedObjects.length ===
                        1
                          ? "Object"
                          : "Objects"
                      }`}
                </span>
              </div>

              <p>
                Files and objects stored in
                this bucket.
              </p>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={
                handleClearSelection
              }
              disabled={actionLoading}
            >
              Clear Selection
            </button>
          </div>

          {loadingObjects ? (
            <p>
              Loading objects from AWS S3...
            </p>
          ) : (
            <ObjectTable
              objects={selectedObjects}
              onDownload={handleDownload}
              onDelete={
                handleDeleteObject
              }
            />
          )}
        </div>
      ) : (
        <div className="resource-panel s3-selection-empty">
          <div className="selection-empty-icon">
            S3
          </div>

          <h3>
            Select a bucket to manage objects
          </h3>

          <p>
            Choose a bucket from the table
            above to view, download, upload,
            and delete objects.
          </p>
        </div>
      )}

      <BucketDetails
        bucket={bucketForDetails}
        onClose={() =>
          setBucketForDetails(null)
        }
      />

      <CreateBucketModal
        isOpen={showCreateModal}
        onClose={
          handleCloseCreateModal
        }
        onCreate={handleCreateBucket}
      />

      <UploadFileModal
        isOpen={showUploadModal}
        onClose={
          handleCloseUploadModal
        }
        onUpload={handleUpload}
        bucketName={
          selectedBucket?.name || ""
        }
      />

      <ConfirmDialog
        isOpen={Boolean(objectToDelete)}
        onClose={
          handleCloseDeleteDialog
        }
        onConfirm={
          confirmDeleteObject
        }
        title="Delete S3 Object"
        message={
          objectToDelete
            ? `Are you sure you want to permanently delete "${objectToDelete.key}" from "${objectToDelete.bucket}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete Object"
        danger
      />
    </div>
  );
}

export default S3;