
import apiClient from './apiClient'; 

// Fetch all goals from the backend
export const getGoals = async () => {
  const response = await apiClient.get('/api/goals');
  return response.data;
};

// Create a new goal
export const createGoal = async (goalData) => {
  const response = await apiClient.post('/api/goals', goalData);
  return response.data;
};

// Delete a goal by id
export const deleteGoal = async (id) => {
  await apiClient.delete(`/api/goals/${id}`);
};

// Update a goal (partial update)
export const updateGoal = async (id, updates) => {
  const response = await apiClient.put(`/api/goals/${id}`, updates);
  return response.data;
};