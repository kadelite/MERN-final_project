import axios from 'axios';

const API = axios.create({ baseURL: '/api/users' });
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getAllStudents = (search) => API.get('/', { params: { search } });
export const getStudent = (id) => API.get(`/${id}`);
export const updateStudent = (id, data) => API.put(`/${id}`, data);
export const deleteStudent = (id) => API.delete(`/${id}`); 