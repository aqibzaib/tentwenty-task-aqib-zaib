import React from "react";

export default function HeroSlideContent() {
  return (
    <>
      <div className="absolute inset-0 top-[16.3%] left-[6%] z-50 h-fit w-fit md:top-[35.3%] md:left-[9.5%]">
        <div className="font-work-sans text-[#EEF4F9]">
          <h1 className="font-work-sans mb-[15px] text-[14px] leading-[130%] font-normal tracking-[0px] text-[#EEF4F9] md:mb-6 md:text-[16px] md:leading-[150%]">
            Welcome To TenTwenty Farms
          </h1>
          <h1 className="font-work-sans max-w-[341px] text-[46px] leading-[100%] font-normal tracking-[0px] text-balance text-[#EEF4F9] capitalize md:max-w-[550px] md:text-[64px]">
            From our Farms to your hands
          </h1>
        </div>
      </div>
    </>
  );
}
