import React from "react";
import SlideDetails from "./SlideDetails";
import SlideProgressButton from "./SlideProgressButton";

export default function SlideWithProgress({
  onNext,
  duration,
  activeIndex,
  slides,
  disabled = false,
}) {
  return (
    <div className="absolute top-[70%] left-[9.5%] z-60 w-full">
      <div className="flex w-full max-w-[345px] items-center justify-between rounded">
        <SlideProgressButton
          onNext={onNext}
          duration={duration}
          activeIndex={activeIndex}
          slides={slides}
          disabled={disabled}
        />
        <div className="w-full max-w-[174px]">
          <SlideDetails activeIndex={activeIndex} total={slides.length} />
        </div>
      </div>
    </div>
  );
}
