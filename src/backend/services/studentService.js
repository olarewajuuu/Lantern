import axiosInstance from '../api/axiosInstance';

export const submitStudentDetails = async (formData) => {
    try {
        const response = await axiosInstance.post('/students/submit', formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message;
    }
};
