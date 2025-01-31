export const subscribeToNewsletter = async (email) => {
    try {
        const response = await fetch("/backend/api/newsletters", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
            mode: "cors"
        })
        

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'An error occurred');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};


