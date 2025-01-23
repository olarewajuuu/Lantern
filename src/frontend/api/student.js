const submitStudentDetails = async (data) => {
    const response = await fetch('/api/students/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'An error occurred while submitting');
    }
    return response.json();
};


export default submitStudentDetails;