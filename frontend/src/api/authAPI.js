import axios from 'axios';

const API = axios.create({ baseURL: '/api/auth' });
 
export const login = (data) => API.post('/login', data);
export const register = (data, token) => API.post('/register', data, { headers: { Authorization: `Bearer ${token}` } });
export const studentRegister = (data) => API.post('/student-register', data); 
export const adminRegister = (data) => API.post('/admin-register', data); 