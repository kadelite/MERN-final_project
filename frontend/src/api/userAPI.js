import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_URL;

const API = axios.create({ baseURL: `${baseUrl}/api/users` });
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getAllStudents = (search = '', className = '') =>
  API.get('/', { params: { search, ...(className && { class: className }) } });
export const getStudent = (id) => API.get(`/${id}`);
export const updateStudent = (id, data) => API.put(`/${id}`, data);
export const deleteStudent = (id) => API.delete(`/${id}`);

// Get unique class names for the admin's students
export const getAdminClasses = async () => {
  const res = await getAllStudents();
  const classes = [...new Set(res.data.map(s => s.class))];
  return classes;
}; 