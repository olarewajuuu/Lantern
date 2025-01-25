import axiosInstance from '../api/axiosInstance';

export const submitReview = async (message) => {
    try {
        const response = await axiosInstance.post('/reviews/submit', { message });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message;
    }
};
