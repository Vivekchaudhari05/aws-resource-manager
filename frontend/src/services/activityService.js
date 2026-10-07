import { apiRequest } from "./api";

export async function getActivity() {
  return apiRequest("/activity");
}