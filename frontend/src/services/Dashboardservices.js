import apiClient from './apiClient';  

export const getGoals = async () => {
  const response = await apiClient.get('/api/goals');
  return response.data;
};