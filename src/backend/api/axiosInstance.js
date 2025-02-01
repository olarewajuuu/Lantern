import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://lantern.academy/api/'
});

export default axiosInstance;

