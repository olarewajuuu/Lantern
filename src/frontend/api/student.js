export default function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "https://lantern.academy");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
    if (req.method === "OPTIONS") {
      return res.status(200).end(); // Handle preflight request
    }
  
    // Your API logic here...
    res.status(200).json({ message: "Success!" });
  }
  
export const submitStudentDetails = async (data) => {
    console.log('studentResp')

    try {
        const response = await fetch('https://lantern-pro.vercel.app/api/students/submit', {
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
