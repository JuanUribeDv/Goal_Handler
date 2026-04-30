import apiClient from './apiClient';  

export const createJournal= async (JournalData) => {
    const response = await apiClient.post('/api/journal', JournalData)
    return response.data;
}

export const getJournal = async () => {
    const response = await apiClient.get('/api/journal')
    return response.data;
}