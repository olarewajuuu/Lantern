import { useState } from "react";
import TopDesign from "./layout/header/TopDesign";
import becometutoricon from "../public/becometutoricon.svg";

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
    if (formData.selectedCourses.length === 0)
      newErrors.selectedCourses = "At least one course must be selected.";
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
    <div>
      <div
        id="overlay"
        onClick={(e) => {
          if (e.target.id === "overlay") closeModal();
        }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-y-auto lg:pt-[450px] pt-[600px] text-[#152F56]"
      >
        <div className="bg-white px-10 pb-6 rounded-lg shadow-lg relative w-full max-w-3xl">
          <TopDesign className="" />
          <span>
            <img className="mx-auto w-14 mb-3" src={becometutoricon} alt="" />
          </span>
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 px-3 py-2 border border-[#152F56] rounded-[50px]"
          >
            ✖
          </button>

          <h1 className="text-2xl font-bold text-center mb-4">Enter Your Details Here</h1>
          <p className="text-center text-gray-600 mb-6">
            Please fill out the form below to submit your application to become a tutor.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <label className="block font-medium mb-2">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#152F56] rounded"
                  required
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#152F56] rounded"
                  required
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <label className="block font-medium mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#152F56] rounded"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Location/City <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#152F56] rounded"
                  required
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <label className="block font-medium mb-2 text-left">Sponsor (Optional)</label>
              <input
                type="text"
                name="sponsor"
                value={formData.sponsor}
                onChange={handleInputChange}
                className="w-full lg:w-1/2 p-3 border border-[#152F56] rounded"
              />
            </div>

            <div className="bg-[#F1F4F9] mx-1 lg:mx-20 py-6 px-4 lg:px-0 gap-8 flex flex-col items-start lg:items-center ">
              <div>
                <label className="block font-medium mb-6 ml-10 text-center">
                  Select a Course/Class <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "Software Engineering",
                    "ICAN",
                    "GMAT",
                    "UI/UX Design",
                    "Data Science/Analytics",
                    "Backend Development",
                    "IELTS",
                    "Digital Marketing",
                    "Project Management",
                    "Virtual Assistant",
                  ].map((course) => (
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
                  ))}
                </div>
                {errors.selectedCourses && (
                  <p className="text-red-500 text-sm">{errors.selectedCourses}</p>
                )}
              </div>
              <div className="w-full flex justify-center items-center">
                <button
                  type="submit"
                  className="w-full lg:w-8/12 mx-auto text-center bg-gradient-to-b from-[#152F56] to-[#2E67BC] text-white py-3 rounded-[16px] hover:bg-[#3b7ad8] transition text-[18px]"
                >
                  Register
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsForm;
