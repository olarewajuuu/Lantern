import GroupPic from "../../../../public/group_pic.png";
import Star from "../../../../public/star.svg";
import HeroPic from "../../../../public/hero.png";
import TopDesign from "../../../layout/header/TopDesign";

export default function Homepage() {
  return (
    <>
      <div className="mt-[78px] vlg:mt-[106px] border-[1px] border-black">
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
            <div className="relative z-[1] mt-[-20px]">
              <TopDesign />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}
