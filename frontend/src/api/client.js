import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'https://marshall-backend4.onrender.com'}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('verdant_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('verdant_token');
      localStorage.removeItem('verdant_user');
    }
    return Promise.reject(err);
  }
);

export const MenuAPI = {
  list: () => api.get('/menu').then(r => r.data),
  byCategory: (c) => api.get(`/menu/category/${c}`).then(r => r.data),
};
export const ReservationAPI = {
  create: (data) => api.post('/reservations', data).then(r => r.data),
  list: () => api.get('/reservations').then(r => r.data),
  updateStatus: (id, status) => api.patch(`/reservations/${id}/status`, { status }).then(r => r.data),
};
export const OrderAPI = {
  create: (data) => api.post('/orders', data).then(r => r.data),
  list: () => api.get('/orders').then(r => r.data),
};
export const ContactAPI = {
  create: (data) => api.post('/contact', data).then(r => r.data),
  list: () => api.get('/contact').then(r => r.data),
};
export const BlogAPI = {
  list: () => api.get('/blog').then(r => r.data),
  bySlug: (slug) => api.get(`/blog/${slug}`).then(r => r.data),
  create: (data) => api.post('/blog', data).then(r => r.data),
};
export const AuthAPI = {
  signup: (data) => api.post('/auth/signup', data).then(r => r.data),
  login: (data) => api.post('/auth/login', data).then(r => r.data),
  me: () => api.get('/auth/me').then(r => r.data),
};

export default api;