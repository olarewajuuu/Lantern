export const submitStudentDetails = async (data) => {
    console.log('studentResp')

    const apiUrl = 'http://localhost:5000'
    try {
        const response = await fetch(`${apiUrl}/api/students/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        console.log('studentResp', response)

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'An error occurred');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
