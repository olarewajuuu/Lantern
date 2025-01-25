<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal"
Modal.setAppElement("#root")
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
  const [activeLink, setActiveLink] = useState("How to Start"); // State for active link
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



  const redirectToTelegram = () => {
    window.open("https://t.me/LANTERNCOMMUNITY", "_blank");
  };




  return (
    <>
    <nav className="fixed top-0 z-20 w-full bg-white shadow-md">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto vlg:py-[0]">
        {/* Logo */}
        <div><img src={logo} alt="" /></div>

        {/* Desktop Links */}
        <ul className="items-center hidden space-x-12 vlg:flex">
          <li
            className={`cursor-pointer ${activeLink === "How to Start"
              ? "bg-[#DBD6F569] font-semibold px-4 py-2 rounded-[25px]"
              : "text-[#152F56] font-semibold text-[16px] hover:text-gray-800"
              }`}
            onClick={() => scrollToSection("hero", "How to Start")}
          >How to Start</li>
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
            <button onClick={redirectToTelegram} className="bg-gradient-to-b from-[#152F56] to-[#2E67BC] text-white font-bold py-2 px-6 rounded-[25px]">
              Join Community
            </button>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="flex items-center vlg:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <img src={openmenu} alt="" className="w-6 h-6" /> : <img src={openmenu} alt="" className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 right-0 z-30 w-3/4 h-full transition-transform transform shadow-lg bg-gray-50"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div><img src={mobilelogo} alt="" /></div>
            <button onClick={toggleMenu}>
              <img src={closemenu} alt="" className="w-6 h-6" />
            </button>
          </div>
          <ul className="flex flex-col p-6 space-y-6">
            <li
              className="text-[#152F56] text-[16px] font-semibold hover:text-gray-800 flex gap-2"
              onClick={() => scrollToSection("hero", "How to Start")}
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
            <li className="flex flex-col justify-center w-full">
              <div>
                <button onClick={redirectToTelegram} className="bg-gradient-to-b from-[#152F56] w-full to-[#2E67BC] text-white font-bold py-2 px-12 rounded-[25px]">
                  Join Community
                </button>
                
              </div>
              <span className="text-[#8594AA] text-[12px] text-center" >Chat us: 08164790661</span>
            </li>
          </ul>
        </div>

      )}
    </nav>
    </>
  );
};

export default Navbar;
=======
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal"
Modal.setAppElement("#root")
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
  const [activeLink, setActiveLink] = useState("How to Start"); // State for active link
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



  const redirectToTelegram = () => {
    window.open("https://t.me/LANTERNCOMMUNITY", "_blank");
  };




  return (
    <>
    <nav className="fixed top-0 z-20 w-full bg-white shadow-md">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto vlg:py-[0]">
        {/* Logo */}
        <div><img src={logo} alt="" /></div>

        {/* Desktop Links */}
        <ul className="items-center hidden space-x-12 vlg:flex">
          <li
            className={`cursor-pointer ${activeLink === "How to Start"
              ? "bg-[#DBD6F569] font-semibold px-4 py-2 rounded-[25px]"
              : "text-[#152F56] font-semibold text-[16px] hover:text-gray-800"
              }`}
            onClick={() => scrollToSection("hero", "How to Start")}
          >How to Start</li>
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
            <button onClick={redirectToTelegram} className="bg-gradient-to-b from-[#152F56] to-[#2E67BC] text-white font-bold py-2 px-6 rounded-[25px]">
              Join Community
            </button>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="flex items-center vlg:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <img src={openmenu} alt="" className="w-6 h-6" /> : <img src={openmenu} alt="" className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 right-0 z-30 w-3/4 h-full transition-transform transform shadow-lg bg-gray-50"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div><img src={mobilelogo} alt="" /></div>
            <button onClick={toggleMenu}>
              <img src={closemenu} alt="" className="w-6 h-6" />
            </button>
          </div>
          <ul className="flex flex-col p-6 space-y-6">
            <li
              className="text-[#152F56] text-[16px] font-semibold hover:text-gray-800 flex gap-2"
              onClick={() => scrollToSection("hero", "How to Start")}
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
            <li className="flex flex-col justify-center w-full">
              <div>
                <button onClick={redirectToTelegram} className="bg-gradient-to-b from-[#152F56] w-full to-[#2E67BC] text-white font-bold py-2 px-12 rounded-[25px]">
                  Join Community
                </button>
                
              </div>
              <span className="text-[#8594AA] text-[12px] text-center" >Chat us: 08164790661</span>
            </li>
          </ul>
        </div>

      )}
    </nav>
    </>
  );
};

export default Navbar;
>>>>>>> 429c29d55776d1400c06d51bd48cb68080d912ba
