import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_URL;

const API = axios.create({ baseURL: `${baseUrl}/api/auth` });
 
export const login = (data) => API.post('/login', data);
export const register = (data, token) => API.post('/register', data, { headers: { Authorization: `Bearer ${token}` } });
export const studentRegister = (data) => API.post('/student-register', data); 
export const adminRegister = (data) => API.post('/admin-register', data); 