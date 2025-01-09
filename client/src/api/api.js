import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const registerUser = (userData) => api.post('/auth/registration/', userData);
export const loginUser = (userData) => api.post('/auth/login/', userData);
export const getAlbums = () => api.get('/albums/');
export const addAlbum = (albumData) => api.post('/albums/', albumData);

export default api;
