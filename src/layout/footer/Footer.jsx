// import footerlogo from "../../../public/footerlogo.svg"

import DesktopFooter from "./DesktopFooter"
import MobileFooter from "./MobileFooter"

const Footer = () => {
    return (
        <div>
            <DesktopFooter />
            <MobileFooter />
        </div>
        // <footer className="bg-gradient-to-b from-[#3160CF] w-full to-[#264AA0] text-white py-10">
        //     <div className="max-w-6xl mx-auto px-6">
        //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        //             <div>
        //                 <img src={footerlogo} alt="" />
        //                 <h3 className="text-xl font-bold my-4">About us</h3>
        //                 <p className="text-white">
        //                     We are a bridge between YOU and your next tutor. We pride ourselves on
        //                     integrity, attention to details & industry expert tutors. Our model is one-to-one
        //                     class type & mentorship sessions. Join our community today. Lets help you hire a tutor today.
        //                 </p>
        //             </div>
        //             <div>

        //                 
        //                 <form className="flex space-x-2">
        //                     <input
        //                         type="email"
        //                         placeholder="Enter your email"
        //                         className="flex-1 px-4 py-2 rounded-lg text-gray-900"
        //                     />
        //                     <button className="px-4 py-2 bg-blue-600 rounded-lg text-white">
        //                         Subscribe
        //                     </button>
        //                 </form>
        //             </div>
        //         </div>

        //         <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
        //             <div>
        //                 <h3 className="text-lg font-bold mb-4">Quick links</h3>
        //                 <ul className="space-y-2 text-white">
        //                     <li className="text-white">How to start</li>
        //                     <li className="text-white">Find a tutor</li>
        //                     <li className="text-white">Testimonial</li>
        //                     <li className="text-white">Got questions?</li>
        //                     <li className="text-white">Become a tutor</li>
        //                 </ul>
        //             </div>
        //             <div>
        //                 <h3 className="text-lg font-bold mb-4">Courses</h3>
        //                 <ul className="space-y-2 text-white">
        //                     <li className="text-white">Digital marketing</li>
        //                     <li className="text-white">ICAN</li>
        //                     <li className="text-white">Software engineering</li>
        //                     <li className="text-white">UX/UI design</li>
        //                     <li className="text-white">Back-end dev</li>
        //                     <li className="text-white">ATS</li>
        //                 </ul>
        //             </div>
        //             <div>
        //                 <h3 className="text-lg font-bold mb-4">Contact us</h3>
        //                 <p className="text-white mb-2">Call us: 08164790661</p>
        //                 <p className="text-white mb-2">Email us: Lanterntutors@gmail.com</p>
        //                 <p className="text-white">Follow us:
        //                     <span className="ml-2">🌐</span>
        //                     <span className="ml-2">📘</span>
        //                     <span className="ml-2">🐦</span>
        //                     <span className="ml-2">📸</span>
        //                 </p>
        //             </div>
        //         </div>

        //         <div className="text-center border-t border-gray-700 pt-4">
        //             <p className="text-gray-500">2024 Lantern. All rights reserved.</p>
        //         </div>
        //     </div>
        // </footer>
    )
}

export default Footer