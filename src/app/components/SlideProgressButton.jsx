"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

export default function SlideProgressButton({
  onNext,
  duration = 5000,
  activeIndex,
  slides = [],
}) {
  const controls = useAnimation();
  const timeoutRef = useRef(null);
  const firstLoad = useRef(true);

  const nextIndex = (activeIndex + 1) % slides.length;
  const nextImage = slides[nextIndex]?.image || "";

  const width = 138;
  const height = 138;
  const baseStroke = 4;
  const animatedStroke = 8;
  const perimeter = 2 * (width - animatedStroke + height - animatedStroke);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      controls.set({ strokeDashoffset: perimeter });
      controls.start({
        strokeDashoffset: 0,
        transition: { duration: duration / 1000, ease: "linear" },
      });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(onNext, duration);
    }

    return () => {
      controls.stop();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, onNext, duration, controls, perimeter]);

  const handleClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    controls.set({ strokeDashoffset: perimeter });
    controls.start({
      strokeDashoffset: 0,
      transition: { duration: duration / 1000, ease: "linear" },
    });

    onNext();
  };

  return (
    <section
      onClick={handleClick}
      className="group absolute right-8 bottom-8 z-50 cursor-pointer"
      aria-label="Next Slide"
    >
      <div className="relative flex items-center justify-center p-6">
        <svg
          className="pointer-events-none absolute inset-0"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Static background border */}
          <rect
            x={baseStroke / 4}
            y={baseStroke / 4}
            width={width - baseStroke}
            height={height - baseStroke}
            stroke="#EEF4F9"
            strokeWidth={baseStroke}
            opacity="0.5"
          />
          {/* Animated progress border */}
          <motion.rect
            x={animatedStroke / 2}
            y={animatedStroke / 2}
            width={width - animatedStroke}
            height={height - animatedStroke}
            stroke="#EEF4F9"
            strokeWidth={animatedStroke}
            strokeDasharray={perimeter}
            strokeDashoffset={perimeter}
            strokeLinecap="round"
            animate={controls}
          />
        </svg>

        {/* Slide thumbnail */}
        {nextImage && (
          <div className="relative flex h-[97px] w-[97px] items-center justify-center overflow-hidden">
            <AnimatePresence>
              <motion.div
                key={activeIndex}
                initial={
                  firstLoad.current
                    ? false
                    : { clipPath: "inset(40% 0% 40% 0%)" }
                }
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 z-20"
              >
                <img
                  src={nextImage}
                  alt="Next"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Next button */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center">
          <button
            className="font-work-sans text-[16px] leading-[110%] font-normal tracking-[0px] text-[#EEF4F9] select-none"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
