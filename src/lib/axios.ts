import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Konfigurasi Axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Sesuaikan dengan URL API Anda
});

const tokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';

const getToken = () => {
  return localStorage.getItem(tokenKey);
};

const setToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

const getRefreshToken = () => {
  return localStorage.getItem(refreshTokenKey);
};

const isTokenExpired = (token: string) => {
  const decoded: any = jwt_decode(token);
  return decoded.exp * 1000 < Date.now(); // Token expired jika waktu kedaluwarsa kurang dari waktu saat ini
};

const getRefreshedToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }
  const response = await axiosInstance.post('/auth/refresh', { refreshToken });
  return response.data.access_token; // Menganggap response berisi access token baru
};

const refreshToken = async () => {
  const newToken = await getRefreshedToken();
  setToken(newToken);
  return newToken;
};

// Request interceptor untuk memeriksa dan memperbarui token
axiosInstance.interceptors.request.use(
  async (req) => {
    const token = getToken();
    if (token && isTokenExpired(token)) {
      const newToken = await refreshToken();
      req.headers.Authorization = `Bearer ${newToken}`;
    } else if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk menangani refresh token jika permintaan gagal
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
