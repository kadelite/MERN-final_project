import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

const API = axios.create({ baseURL: `${baseUrl}/api/attendance` });
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const markAttendance = (data) => API.post('/mark', data);
export const updateAttendance = (date, data) => API.put(`/update/${date}`, data);
export const getAttendanceReport = (params) => API.get('/report', { params });
export const getStudentAttendance = (id) => API.get(`/student/${id}`); 