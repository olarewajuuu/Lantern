import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://lantern.academy/backend'
});

export default axiosInstance;

