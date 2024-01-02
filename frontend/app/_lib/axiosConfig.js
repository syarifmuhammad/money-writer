import axios from 'axios';

// Membuat instance Axios
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API
});

// instance.interceptors.request.use(
//   (config) => {
//     if (['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
//       const token = '4d932797eb7eba8643df6e4e837bd412a30a4478e0f5fa04f03de9f47967ae27';
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default instance;