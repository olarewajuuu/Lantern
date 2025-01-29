import { useState } from "react";
import TopDesign from "../../layout/header/TopDesign";
import becometutoricon from "../../../public/becometutoricon.svg"
import upload from "../../../public/upload.svg"
import { submitTutorForm } from '../api/tutor';


const BecomeTutorForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    course: "",
    portfolio: "",
    duration: "",
    fee: "",
    uniqueInfo: "",
    syllabusFile: null,
    cvFile: null,
  });

  const [message, setMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // change axios to fetch
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for text inputs
    if (
        !formData.fullName ||
        !formData.phoneNumber ||
        !formData.email ||
        !formData.course ||
        !formData.duration ||
        !formData.fee ||
        !formData.uniqueInfo
    ) {
        setMessage("Please fill all required fields.");
        return;
    }

    // Validation for email format
    if (!emailRegex.test(formData.email)) {
        setMessage("Please enter a valid email address.");
        return;
    }

    // Validation for file inputs
    if (!formData.syllabusFile) {
        setMessage("Please upload the course outline/syllabus.");
        return;
    }
    if (!formData.cvFile) {
        setMessage("Please upload your CV.");
        return;
    }

    try {
        const formDataToSend = new FormData();
        formDataToSend.append("fullName", formData.fullName);
        formDataToSend.append("phoneNumber", formData.phoneNumber);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("course", formData.course);
        formDataToSend.append("portfolio", formData.portfolio);
        formDataToSend.append("duration", formData.duration);
        formDataToSend.append("fee", formData.fee);
        formDataToSend.append("uniqueInfo", formData.uniqueInfo);
        formDataToSend.append("syllabusFile", formData.syllabusFile);
        formDataToSend.append("cvFile", formData.cvFile);

        // Fetch POST request
        const response = await fetch("/api/tutors/submit", {
            method: "POST",
            body: formDataToSend, // FormData handles multipart/form-data automatically
        });

        if (response.ok) {
            const result = await response.json();
            setMessage("Application submitted successfully!");
            setFormData({
                fullName: "",
                phoneNumber: "",
                email: "",
                course: "",
                portfolio: "",
                duration: "",
                fee: "",
                uniqueInfo: "",
                syllabusFile: null,
                cvFile: null,
            });
        } else {
            const error = await response.json();
            setMessage(error.error || "Error submitting application. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred. Please try again.");
    }
};



  return (
    <div className="my-16" id="become-tutor">
      <TopDesign />
      <div className="max-w-4xl mx-auto  text-[#152F56]">
        <span><img className="mb-6 mx-auto" src={becometutoricon} alt="" /></span>
        <h1 className="text-[36px] font-bold text-center mb-4">Become a Tutor, Come Join Us!</h1>
        <p className="text-center mt-14 mb-10 text-[20px] text-red-600">Please fill out the form and submit application</p>
        <div className="bg-gray-50 p-6 rounded shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <label className="block font-medium mb-2">Full Name <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#152F56] rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Phone Number <span className="text-red-600">*</span></label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#152F56] rounded"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <label className="block font-medium mb-2">Full Email <span className="text-red-600">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#152F56] rounded"
                  required
                />
                {message && <p className="text-center mt-4">{message}</p>}
              </div>
              <div>
                <label className="block font-medium mb-2">Course You Want to Teach <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#152F56] rounded"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <label className="block font-medium mb-2">Paste the Link of Your Portfolio (Optional)</label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#152F56] rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Course/Class Duration <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#152F56] rounded"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-medium mb-2">Proposed Course Fee (Amount in Naira) <span className="text-red-600">*</span></label>
              <input
                type="text"
                name="fee"
                value={formData.fee}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#152F56] rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Tell Us Something Unique About You <span className="text-red-600">*</span></label>
              <textarea
                name="uniqueInfo"
                value={formData.uniqueInfo}
                onChange={handleInputChange}
                className="w-full p-16 border border-[#152F56] rounded"
                required
              ></textarea>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Upload Course Outline/Syllabus <span className="text-red-600">*</span>
              </label>
              <label
                htmlFor="syllabusFile"
                className="p-14 border border-[#152F56] rounded flex items-center justify-center cursor-pointer w-full"
              >
                <input
                  type="file"
                  name="syllabusFile"
                  onChange={handleFileChange}
                  className="hidden"
                  id="syllabusFile"
                />
                <div className="flex flex-col items-center">
                  <img src={upload} alt="Upload" className="w-12 h-12" />
                  <h4 className="text-[#152F56] text-[24px] my-3">Upload</h4>
                  <span className="text-[16px] text-[#152F56]">
                    {formData.syllabusFile ? formData.syllabusFile.name : "Drag and drop files here"}
                  </span>
                </div>
              </label>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Upload CV <span className="text-red-600">*</span>
              </label>
              <label
                htmlFor="cvFile"
                className="p-14 border border-[#152F56] rounded flex items-center justify-center cursor-pointer w-full"
              >
                <input
                  type="file"
                  name="cvFile"
                  onChange={handleFileChange}
                  className="hidden"
                  id="cvFile"
                />
                <div className="flex flex-col items-center">
                  <img src={upload} alt="Upload" className="w-12 h-12" />
                  <h4 className="text-[#152F56] text-[24px] my-3">Upload</h4>
                  <span className="text-[16px] text-[#152F56]">
                    {formData.cvFile ? formData.cvFile.name : "Drag and drop files here"}
                  </span>
                </div>
              </label>
            </div>


            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                className="w-full lg:w-5/12 mx-auto text-center bg-gradient-to-b from-[#152F56] to-[#2E67BC] text-white py-3 rounded-[16px] hover:bg-[#3b7ad8] transition text-[18px]"
              >
                Submit Application
              </button>
            </div>
            {message && <p className="text-center mt-4 text-red-600">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeTutorForm;
