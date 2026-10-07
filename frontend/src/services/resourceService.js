import { apiRequest } from "./api";

export async function getDashboardData() {
  return apiRequest("/dashboard");
}

export async function getResources() {
  return apiRequest("/resources");
}