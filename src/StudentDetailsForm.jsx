import  { useState } from "react";

const StudentDetailsForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    location: "",
    sponsor: "",
    selectedCourses: [],
  });

  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const selectedCourses = checked
        ? [...prev.selectedCourses, value]
        : prev.selectedCourses.filter((course) => course !== value);
      return { ...prev, selectedCourses };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.location) newErrors.location = "Location/City is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("https://your-backend-url.com/student-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        setFormData({
          fullName: "",
          phoneNumber: "",
          email: "",
          location: "",
          sponsor: "",
          selectedCourses: [],
        });
        closeModal();
      } else {
        alert("Error submitting application. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Enter Your Details Here</h1>
      <p className="text-center text-gray-600 mb-6">
        Please fill out the form below to submit your application to become a tutor.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Full Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block font-medium">Location/City</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>
        </div>
        <div>
          <label className="block font-medium">Sponsor (Optional)</label>
          <input
            type="text"
            name="sponsor"
            value={formData.sponsor}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Select a Course/Class</label>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {["Software Engineering", "ICAN", "GMAT", "UI/UX Design", "Data Science/Analytics", "Backend Development", "IELTS", "Digital Marketing", "Project Management", "Virtual Assistant"].map(
              (course) => (
                <label key={course} className="flex items-center">
                  <input
                    type="checkbox"
                    value={course}
                    onChange={handleCheckboxChange}
                    checked={formData.selectedCourses.includes(course)}
                    className="mr-2"
                  />
                  {course}
                </label>
              )
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-[#152F56] text-white py-2 rounded hover:bg-[#1d3e6e] transition"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentDetailsForm;
