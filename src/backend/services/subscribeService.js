import axiosInstance from '../api/axiosInstance';

export const submitSubscribe = async (message) => {
    try {
        const response = await axiosInstance.post('/subscribe/submit', { message });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message;
    }
};
