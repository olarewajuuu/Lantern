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
  
export const submitTutorForm = async (formData, syllabusFile, cvFile) => {
    try {
        const data = new FormData();
        Objects.keys(formData).forEach((key) => data.append(key, formData[key]));
        data.append('syllabusFile', syllabusFile);
        data.append('cvFile', cvFile);

        const response = await fetch('https://lantern-pro.vercel.app/api/tutors/submit', {
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