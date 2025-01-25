import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://lantern-pro.vercel.app/api',
});

export default axiosInstance;
