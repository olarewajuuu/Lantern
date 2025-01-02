import GroupPic from "../../../../public/group_pic.png";
import Star from "../../../../public/star.svg";
import HeroPic from "../../../../public/hero.png";
import TopDesign from "../../../layout/header/TopDesign";
import Circle from "../../components/icons/circle";
import EmptyCircle from "../../components/icons/empty_circle";
import { list_data } from "../../utils/data";
import FaceShadow from "../../../../public/face_shadow";

export default function Homepage() {
  return (
    <>
      <div className="mt-[78px] vlg:mt-[106px] bg-[#F3F1FC]">
        <div className="flex flex-col md:max-w-[700px] mx-auto vlg:max-w-[1001px]">
          <div className="pt-[2rem] px-[1.5rem] md:pt-[3rem] md:text-center md:flex md:flex-col md:items-center ">
            <h1 className="text-darkBlue text-[2rem] leading-[44px] font-bold md:text-[2.5rem] vlg:text-[3.25rem] vlg:leading-[60.6px]">
              Experienced Tutors That Help You Master In-Demand Skills
            </h1>
            <p className="vlg:max-w-[700px] md:text-[1.125rem] text-lightBlue mt-[1rem]">
              Our platform lets you choose from experienced and caring tutors,
              who will teach and mentor you at your own pace, till you secure a
              job.
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
        <div className="px-[1.5rem]">
          <div>
            <FaceShadow />
            <h1>Our Courses/Classes</h1>
          </div>
        </div>
      </div>
    </>
  );
}
