// import { useState, useEffect, useRef } from "react";
import footerlogo from "../../../public/footerlogo.svg"
import twitterlogo from "../../../public/twitterr.svg"
import facebooklogo from "../../../public/facebook.svg"
import linkedinlogo from "../../../public/linkedin.svg"
import { useState } from "react"
import { subscribeToNewsletter } from "../api/subscribe";

const DesktopFooter = () => {

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };


    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Clear previous messages
        setMessage("");
    
        // Validate email
        if (!email.trim()) {
            setMessage("Please enter an email.");
            return;
        }
    
        if (!validateEmail(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }
    
        try {
            // Send the email to the backend
            const response = await fetch("http://localhost:5000/api/subscribe", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
    
            if (response.ok) {
                const result = await response.json();
                setMessage(result.message || "Thank you for subscribing!");
                setEmail(""); // Clear the email input
            } else {
                const error = await response.json();
                setMessage(error.error || "Oops! Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting email:", error);
            setMessage("An error occurred. Please try again.");
        }
    };
    

    return (
        <footer className="hidden lg:block bg-gradient-to-b from-[#3160CF] w-full to-[#264AA0] text-white py-10">
            <div className="max-w-6xl mx-auto px-0">
                <div className="grid grid-cols-3 mb-0 ml-60">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick links</h3>
                        <ul className="space-y-2">
                            <li onClick={() => scrollToSection("hero", "How to Start your Tech Career")} className="text-white">How to start</li>
                            <li onClick={() => scrollToSection("courses", "Courses")} className="text-white">Find a tutor</li>
                            <li className="text-white">Testimonial</li>
                            <li className="text-white">Got questions?</li>
                            <li className="text-white">Become a tutor</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Courses</h3>
                        <ul className="space-y-2">
                            <li className="text-white">Digital marketing</li>
                            <li className="text-white">ICAN</li>
                            <li className="text-white">Software engineering</li>
                            <li className="text-white">UX/UI design</li>
                            <li className="text-white">Back-end dev</li>
                            <li className="text-white">ATS</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact us</h3>
                        <p className="text-white mb-6">Call us: 08164790661</p>
                        <p className="text-white mb-6">Email us: info@lantern.academy</p>
                        <p className="text-white flex">
                            Follow us:
                            <span className="ml-7"><img src={twitterlogo} alt="" /></span>
                            <span className="ml-7"><img src={facebooklogo} alt="" /></span>
                            <span className="ml-7"><img src={linkedinlogo} alt="" /></span>
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-32 mb-8">
                    <div className="mb-20">
                        <img src={footerlogo} alt="" className="mb-10" />
                        <h3 className="text-xl font-bold mb-4">About us</h3>
                        <p className="text-white">
                            We are a bridge between YOU and your next tutor. We pride ourselves
                            on integrity, attention to details & industry expert tutors. Our
                            model is one-to-one class type & mentorship sessions. Join our
                            community today. Lets help you hire a tutor today.
                        </p>
                    </div>
                    <div className="mt-40">
                        <p className="text-white mb-4">Subscribe to our newsletter and receive weekly free resource</p>
                        <form onSubmit={handleSubmit} className="flex space-x-2 relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-[15px] text-gray-900 "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit" className="px-5 py-2 bg-gradient-to-b from-[#152F56] to-[#2E67BC] rounded-full text-white absolute right-2 top-1">
                                Subscribe
                            </button>
                        </form>
                        {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
                    </div>
                </div>
                <div className="text-center pt-4">
                    <p className="text-white">2024 Lantern. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default DesktopFooter