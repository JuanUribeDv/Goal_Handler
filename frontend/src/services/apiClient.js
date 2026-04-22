
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Sesión expirada, redirigiendo...');
      // Aquí podrías limpiar el localStorage o redirigir al login
    }
    return Promise.reject(error);
  }
);

export default apiClient;