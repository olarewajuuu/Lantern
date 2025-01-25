import axiosInstance from '../api/axiosInstance';

export const submitNewsletter = async (message) => {
    try {
        const response = await axiosInstance.post('/newsletter/submit', { message });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message;
    }
};
