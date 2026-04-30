import apiClient from "./apiClient";

export const GetDaily_tasks = async () => {
  const response = await apiClient.get("/api/daily_tasks");
  return response.data;
};

export const CreateDaily_tasks = async (data) => {
  const response = await apiClient.post("/api/daily_tasks", data);
  return response.data;
};