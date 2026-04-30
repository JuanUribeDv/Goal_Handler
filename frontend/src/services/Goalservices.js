
import apiClient from './apiClient'; 


export const getGoals = async () => {
  const response = await apiClient.get('/api/goals');
  return response.data;
};


export const createGoal = async (goalData) => {
  const response = await apiClient.post('/api/goals', goalData);
  return response.data;
};


export const deleteGoal = async (id) => {
  await apiClient.delete(`/api/goals/${id}`);
};


export const updateGoal = async (id, updates) => {
  const response = await apiClient.put(`/api/goals/${id}`, updates);
  return response.data;
};