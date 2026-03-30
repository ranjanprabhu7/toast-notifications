import axios from 'axios';
import toast from './toast';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

api.interceptors.response.use(
  (response) => {
    toast.success(`${response.config.method?.toUpperCase()} ${response.config.url} succeeded`);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Request failed';

    if (status && status >= 400 && status < 500) {
      toast.warning(message);
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

export default api;
