import footerlogo from "../../../public/footerlogo.svg"
import twitterlogo from "../../../public/twitterr.svg"
import facebooklogo from "../../../public/facebook.svg"
import linkedinlogo from "../../../public/linkedin.svg"

const MobileFooter = () => {
    return (
        <footer className="lg:hidden bg-gradient-to-b from-[#3160CF] w-full to-[#264AA0] text-white py-10">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-8">
                     <img src={footerlogo} alt="" className="mb-10"/>
                    <h3 className="text-xl font-bold mb-4">About us</h3>
                    <p className="text-white">
                        We are a bridge between YOU and your next tutor. We pride ourselves
                        on integrity, attention to details & industry expert tutors. Our
                        model is one-to-one class type & mentorship sessions. Join our
                        community today. Lets help you hire a tutor today.
                    </p>
                </div>
                <div className="mb-8">
                    <p className="text-white mb-4">Subscribe to our newsletter and receive weekly free resource</p>
                    <form className="flex flex-col space-y-2 relative">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-3 rounded-[15px] text-gray-900"
                        />
                        <button className="px-5 py-2 bg-gradient-to-b from-[#152F56] to-[#2E67BC] rounded-full text-white absolute right-2 bottom-1 ">
                            Subscribe
                        </button>
                    </form>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Quick links</h3>
                    <ul className="space-y-2">
                        <li className="text-white">How to start</li>
                        <li className="text-white">Find a tutor</li>
                        <li className="text-white">Testimonial</li>
                        <li className="text-white">Got questions?</li>
                        <li className="text-white">Become a tutor</li>
                    </ul>
                </div>
                <div className="mb-8">
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
                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Contact us</h3>
                    <p className="text-white mb-2">Call us: 08164790661</p>
                    <p className="text-white mb-2">Email us: Lanterntutors@gmail.com</p>
                    <p className="text-white flex">
                                                Follow us:
                                                <span className="ml-7"><img src={twitterlogo} alt="" /></span>
                                                <span className="ml-7"><img src={facebooklogo} alt="" /></span>
                                                <span className="ml-7"><img src={linkedinlogo} alt="" /></span>
                                            </p>
                </div>
                <div className="text-center pt-4">
                    <p className="text-white">2024 Lantern. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default MobileFooter