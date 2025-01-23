import { useState } from "react";
import TopDesign from "../../layout/header/TopDesign"
import fqaicon from "../../../public/fqaicon.svg"
import fqaopen from "../../../public/fqaopen.svg"
// import fqaclose from ".././public/fqaclose.svg"
import fqacall from "../../../public/fqacall.svg"
import fqamail from "../../../public/fqamail.svg"


const Fqa = () => {

    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I interact with my tutor?",
            answer:
                "Not an issue, once you have been assigned to an instructor, he or she will reach out to you to share communication route.",
        },
        {
            question: "Will i get a job after completing a course?",
            answer:
                "That’s relative to what the course is, but in a scale of 1-10, you are 7/10 chances of we helping yu secure a job, terms and conditions applies.",
        },
        {
            question: "Will i get a certificate after completing a course?",
            answer:
                "Yes we issue a locally recognized certificate.",
        },
        {
            question: "How do i choose the right tech course?",
            answer:
                "You chat with us, we will advice you properly at zero cost.",
        },
    ];




    return (
        <div className="my-16">
            <TopDesign />

            <div className="max-w-4xl mx-auto p-6 text-[#152F56]">
                <span><img className="mb-6 mx-auto" src={fqaicon} alt="" /></span>
                <h2 className="text-[36px] font-bold text-center mb-6">
                    Got questions? Here are the answers!
                </h2>
                <div className="space-y-12">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-[#DFE5FB] rounded-lg p-4"
                        >
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleQuestion(index)}
                            >
                                <h3 className="font-semibold text-lg">{faq.question}</h3>
                                <button
                                    className={`text-xl font-bold transform transition-transform ${openQuestion === index ? "rotate-45" : "rotate-0"
                                        }`}
                                >
                                    <img src={fqaopen} alt="" />
                                </button>
                            </div>
                            {openQuestion === index && (
                                <div className="mt-4 text-gray-700">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
            <div className="max-w-[360px] mx-auto  text-[#152F56] mt-8 p-6 border border-[#DFE5FB] rounded-lg text-center">
                <h3 className="text-[26px] font-semibold mb-8">
                    Can’t find answers to <br />your questions?
                </h3>
                <div className="flex flex-col items-start space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl"><img src={fqacall} alt="" /></span>
                        <p className="text-[16px]">Chat us: 08154336976</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl"><img src={fqamail} alt="" /></span>
                        <p className="text-[16px]">Email us: Lanterntutors@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fqa;
