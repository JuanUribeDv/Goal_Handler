import apiClient from "./apiClient";

export const GetGalery = async () => {
    const response = await apiClient.get('/api/galery')
    return response.data;
}

export const deleteGalery = async (id) => {
    await apiClient.delete(`/api/galery/${id}`);
}

export const UpdateGalery = async (id, updates) => {
    const response = await apiClient.put(`/api/goals/${id}`, updates);
    return response.data;
}