import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://lantern-f173cie65-olarewajus-projects.vercel.app/api',
});

export default axiosInstance;
