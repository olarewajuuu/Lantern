import axiosInstance from '../api/axiosInstance';

export const submitTutorForm = async (formData) => {
    try {
        const response = await axiosInstance.post('/tutors/submit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message;
    }
};
