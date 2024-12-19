import { useState, useEffect, useRef } from "react";
import logo from "/logo.svg"
import openmenu from "/openmenu.svg"
import closemenu from "/closemenu.svg"
// mobile icons 
import mobilelogo from "/mobilelogo.svg"
import start from "/start.svg"
import course from "/course.svg"
import tutor from "/tutor.svg"
import becometutor from "/becometutor.svg"
import testimonial from "/testimonial.svg"






const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("How to Start your Tech Career"); // State for active link
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const scrollToSection = (id, sectionName) => {
    setActiveLink(sectionName);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Close menu on mobile
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div><img src={logo} alt="" /></div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-12 items-center">
          <li
            className={`cursor-pointer ${activeLink === "How to Start your Tech Career"
              ? "bg-[#DBD6F569] font-semibold px-4 py-2 rounded-[25px]"
              : "text-[#152F56] font-semibold text-[16px] hover:text-gray-800"
              }`}
            onClick={() => scrollToSection("hero", "How to Start your Tech Career")}
          >How to Start your Tech Career</li>
          <li
            className={`cursor-pointer ${activeLink === "Courses"
              ? "bg-[#DBD6F569] font-semibold px-4 py-2 rounded-[25px]"
              : "text-[#152F56] font-semibold text-[16px] hover:text-gray-800"
              }`}
            onClick={() => scrollToSection("courses", "Courses")}
          >Courses</li>
          <li
            className={`cursor-pointer ${activeLink === "Find a Tutor"
              ? "bg-[#DBD6F569] font-semibold px-4 py-2 rounded-[25px]"
              : "text-[#152F56] font-semibold text-[16px] hover:text-gray-800"
              }`}
            onClick={() => scrollToSection("find-tutor", "Find a Tutor")}
          >Find a Tutor</li>
          <li
            className={`cursor-pointer ${activeLink === "Become a Tutor"
              ? "bg-[#DBD6F569] font-semibold px-4 py-2 rounded-[25px]"
              : "text-[#152F56] text-[16px] font-semibold hover:text-gray-800"
              }`}
            onClick={() => scrollToSection("become-tutor", "Become a Tutor")}
          >Become a Tutor</li>
          <li>
            <button className="bg-gradient-to-b from-[#152F56] to-[#2E67BC] text-white font-bold py-2 px-6 rounded-[25px]">
              Join Community
            </button>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <img src={openmenu} alt="" className="h-6 w-6" /> : <img src={openmenu} alt="" className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 right-0 h-full w-3/4 bg-gray-50 shadow-lg z-30 transform transition-transform"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div><img src={mobilelogo} alt="" /></div>
            <button onClick={toggleMenu}>
              <img src={closemenu} alt="" className="h-6 w-6" />
            </button>
          </div>
          <ul className="flex flex-col p-6 space-y-6">
            <li
              className="text-[#152F56] text-[16px] font-semibold hover:text-gray-800 flex gap-2"
              onClick={() => scrollToSection("hero", "How to Start your Tech Career")}
            >
              <img src={start} alt="" />
              <span>How to Start</span>
            </li>
            <li
              className="text-[#152F56] text-[16px] font-semibold hover:text-gray-800 flex gap-2"
              onClick={() => scrollToSection("courses", "Courses")}
            >
              <img src={course} alt="" />
              <span>Courses</span>
            </li>
            <li
              className="text-[#152F56] text-[16px] font-semibold hover:text-gray-800 flex gap-2"
              onClick={() => scrollToSection("find-tutor", "Find a Tutor")}
            >
              <img src={tutor} alt="" />
              <span>Find a Tutor</span>
            </li>
            <li
              className="text-[#152F56] text-[16px] font-semibold hover:text-gray-800 flex gap-2"
              onClick={() => scrollToSection("become-tutor", "Become a Tutor")}
            >
              <img src={becometutor} alt="" />
              <span>Become a Tutor</span>
            </li>
            <li
              className="text-[#152F56] text-[16px] font-semibold hover:text-gray-800 flex gap-2"
              onClick={() => scrollToSection("testimonials", "Testimonials")}
            >
              <img src={testimonial} alt="" />
              <span>Testimonials</span>
            </li>
            <li className="w-full flex flex-col justify-center">
              <button className="bg-gradient-to-b from-[#152F56] w-full to-[#2E67BC] text-white font-bold py-2 px-6 rounded-[25px]">
                Join Community
              </button>
              <span className="text-[#8594AA] text-[12px] text-center" >Call us: 09160439575</span>
            </li>
          </ul>
        </div>

      )}
    </nav>
  );
};

export default Navbar;
