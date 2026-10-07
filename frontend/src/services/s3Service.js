import { apiRequest } from "./api";

export async function getS3Buckets() {
  return apiRequest("/s3/buckets");
}

export async function createS3Bucket(bucketName) {
  return apiRequest("/s3/buckets", {
    method: "POST",
    body: JSON.stringify({
      bucket_name: bucketName,
    }),
  });
}

export async function getS3Objects(bucketName) {
  return apiRequest(
    `/s3/objects?bucket=${encodeURIComponent(bucketName)}`
  );
}

export async function uploadS3Object(
  bucketName,
  file,
  objectKey
) {
  const formData = new FormData();

  formData.append("bucket", bucketName);
  formData.append("file", file);
  formData.append("object_key", objectKey);

  const response = await fetch(
    "http://127.0.0.1:5000/api/s3/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "S3 upload failed"
    );
  }

  return data;
}

export async function deleteS3Object(
  bucketName,
  objectKey
) {
  return apiRequest("/s3/object", {
    method: "DELETE",
    body: JSON.stringify({
      bucket: bucketName,
      key: objectKey,
    }),
  });
}