export const submitTutorForm = async (formData, syllabusFile, cvFile) => {
    try {
        const data = new FormData();
        Objects.keys(formData).forEach((key) => data.append(key, formData[key]));
        data.append('syllabusFile', syllabusFile);
        data.append('cvFile', cvFile);

        const response = await fetch('/backend/api/tutors/submit', {
            method: 'POST',
            body: data,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'An error occured');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};