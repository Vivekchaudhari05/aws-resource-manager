import { apiRequest } from "./api";

export async function getEC2Instances() {
  return apiRequest("/ec2/instances");
}

export async function startEC2Instance(instanceId) {
  return apiRequest("/ec2/start", {
    method: "POST",
    body: JSON.stringify({
      instance_id: instanceId,
    }),
  });
}

export async function stopEC2Instance(instanceId) {
  return apiRequest("/ec2/stop", {
    method: "POST",
    body: JSON.stringify({
      instance_id: instanceId,
    }),
  });
}

export async function rebootEC2Instance(instanceId) {
  return apiRequest("/ec2/reboot", {
    method: "POST",
    body: JSON.stringify({
      instance_id: instanceId,
    }),
  });
}

export async function terminateEC2Instance(instanceId) {
  return apiRequest("/ec2/terminate", {
    method: "DELETE",
    body: JSON.stringify({
      instance_id: instanceId,
    }),
  });
}

export async function launchEC2Instance(
  imageId,
  instanceType,
  minCount = 1,
  maxCount = 1
) {
  return apiRequest("/ec2/launch", {
    method: "POST",
    body: JSON.stringify({
      image_id: imageId,
      instance_type: instanceType,
      min_count: minCount,
      max_count: maxCount,
    }),
  });
}