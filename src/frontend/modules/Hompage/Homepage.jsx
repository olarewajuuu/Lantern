import GroupPic from "../../../../public/group_pic.png";
import Star from "../../../../public/star.svg";
import HeroPic from "../../../../public/hero.png";
import TopDesign from "../../../layout/header/TopDesign";
import Circle from "../../components/icons/circle";
import EmptyCircle from "../../components/icons/empty_circle";
import { courses, list_data } from "../../utils/data";
import FaceShadow from "../../../../public/face_shadow";

export default function Homepage() {
  return (
    <>
      <div className="mt-[78px] vlg:mt-[106px] bg-[#F3F1FC]">
        <div id="hero" className="flex flex-col md:max-w-[700px] mx-auto vlg:max-w-[1001px]">
          <div className="pt-[2rem] px-[1.5rem] md:pt-[3rem] md:text-center md:flex md:flex-col md:items-center ">
            <h1 className="text-darkBlue text-[2rem] leading-[44px] font-bold md:text-[2.5rem] vlg:text-[3.25rem] vlg:leading-[60.6px]">
            EDUCATION BEYOND THE FOUR WALLS 
            </h1>
            <p className="vlg:max-w-[700px] md:text-[1.125rem] text-lightBlue mt-[1rem]">
            Your Pathway to limitless career growth.
            </p>

            <div className="my-[1.2rem] py-[0.5rem] space-y-[5px] borde-black brder-[1px] md:my-[1.5rem]  md:flex md:flex-col md:items-center">
              <h3 className="text-lightBlue">
                Join 1,234+ students learning with us
              </h3>
              <div className="flex space-x-[4px]">
                <div>
                  <img src={GroupPic} alt="" />
                </div>
                <div className="flex items-center">
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] max-w-[750px] mx-auto">
            <div className="relative z-[2]">
              <img
                className="w-[100%] md:rounded-[10px]"
                src={HeroPic}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-[1] mt-[-20px]">
        <TopDesign />
      </div>
      <div className="px-[1.5rem] py-[2rem] flex flex-col items-center space-y-[1rem] vlg:py-[3rem]">
        <h1 className="font-semibold flex flex-col items-center text-[1.5rem] text-darkBlue space-y-[3px] md:space-y-[10px] md:text-[2rem] vlg:text-[3rem]">
          <span className="block">
            <Circle />
          </span>
          <span>How to Start</span>
        </h1>

        <div className="relative">
          <div className="absolute top-[61px] left-[150px] hidden vlg:block h-[4px] w-[850px] bg-[#EFF3FC]"></div>
          <div className="space-y-[2rem] vlg:space-y-0 grid vlg:grid-cols-3 vlg:[grid-gap:2rem]">
            {list_data.map((data, i) => (
              <div
                key={i}
                className="py-[1rem] space-y-[1.5rem] flex flex-col items-center vlg:py-[2rem]"
              >
                <h1
                  className={`z-[3] w-[68px] flex items-center justify-center rounded-[8px] h-[35px] p-[8px] md:text-[1.5rem] bg-darkBlue font-semibold text-white md:w-[108px] md:h-[61px] ${
                    i === 1 ? "bg-[#6392D9]" : i === 2 ? "bg-[#BDD1EF]" : ""
                  }`}
                >
                  Step {i + 1}
                </h1>

                <div className="space-y-[2.5rem]">
                  {data.map((el) => (
                    <div key={el} className="space-y-[2.5rem] md:max-w-[368px]">
                      <div className="text-center text-[1rem] text-darkBlue flex flex-col items-center space-y-[5px] vlg:flex-row vlg:text-left vlg:space-x-[8px]">
                        <span className="block">
                          <EmptyCircle />
                        </span>
                        <p>{el}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* third screen */}
      <div className="bg-[#F3F1FC]">
        <TopDesign />
        <div id="courses" className="flex flex-col px-[1.5rem] py-[2rem] md:pb-[3rem] md:space-y-[3rem] space-y-[2rem]">
          <h1 className="space-y-[5px] flex flex-col items-center">
            <span className="md:*:h-[94px] md:*:w-[96px]">
              <FaceShadow />
            </span>
            <span className="font-semibold text-darkBlue text-[1.5rem] md:text-[2rem] lg:text-[3rem]">
              Our Courses/Classes
            </span>
          </h1>

          <div className="flex flex-col space-y-[2rem] lg:mx-auto lg:max-w-[950px] lg:space-y-0 lg:grid lg:grid-cols-2 lg:[grid-gap:4rem]">
            {courses.map((data, i) => (
              <div
                key={i}
                className="mx-auto max-w-[402px] lg:mx-0 lg:max-w-[none]  flex space-x-[8px] p-[1.5rem] pl-[1rem] rounded-[1rem] bg-[#F1F4F9] border-[1px] border-[#D7E5FB]"
              >
                <img
                  src={`./${data.path}`}
                  className="w-[40px] h-[40px]"
                  alt=""
                />
                <div className="space-y-[0.5rem]">
                  <h1 className="text-darkBlue flex items-center text-[1.2rem]  md:text-[1.5rem] font-medium">
                    {data.title}
                  </h1>
                  <div className="space-y-[20px]">
                    <p className="text-[1rem] text-darkBlue font-light">
                      {data.text}
                    </p>

                    <div className="flex space-x-[1rem] items-center">
                      <div className="text-[#6D7D95] hidden md:block">
                        {data.subText}
                      </div>
                      <button className="flex  justify-center items-center space-x-[4px] text-[0.75rem] w-[127px] h-[31px] rounded-[24px] bg-[#F5F8FD] text-[#8594AA] border-[1px] border-[#152f5680]">
                        <span>Learn more</span>
                        <span>
                          <img src="./arrowRight.svg" alt="" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
